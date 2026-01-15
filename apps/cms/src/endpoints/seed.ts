import type { Endpoint } from 'payload'
import { createSeeder, isValidPresetId, PRESET_IDS, PRESET_METADATA, type PresetId } from '../seed/presets'

/**
 * Seed API Endpoints
 * 
 * Provides REST API endpoints for managing sample data:
 * - GET /api/seed/presets - List available presets
 * - GET /api/seed/status - Check if sample data exists
 * - GET /api/seed/collections - Get per-collection status
 * - POST /api/seed - Seed, re-seed, or clear data by preset
 * - POST /api/seed/collection - Seed, re-seed, or clear individual collection
 * - POST /api/seed/all - Seed or clear all collections
 */

/**
 * Collection metadata for seed data
 */
const COLLECTION_SEED_CONFIG: Record<string, {
  label: string
  icon: string
  hasSeedData: boolean
  hasSeedMedia: boolean
}> = {
  pages: { label: 'Pages', icon: '📄', hasSeedData: true, hasSeedMedia: false },
  posts: { label: 'Posts', icon: '📝', hasSeedData: true, hasSeedMedia: false },
  categories: { label: 'Categories', icon: '🏷️', hasSeedData: true, hasSeedMedia: false },
  artifacts: { label: 'Artifacts', icon: '🏺', hasSeedData: true, hasSeedMedia: true },
  people: { label: 'People', icon: '👤', hasSeedData: true, hasSeedMedia: true },
  places: { label: 'Places', icon: '📍', hasSeedData: true, hasSeedMedia: true },
  'museum-collections': { label: 'Collections', icon: '🗂️', hasSeedData: true, hasSeedMedia: false },
  products: { label: 'Products', icon: '🛍️', hasSeedData: true, hasSeedMedia: true },
  'product-categories': { label: 'Product Categories', icon: '📦', hasSeedData: true, hasSeedMedia: false },
}

/**
 * GET /api/seed/presets
 * Returns list of available presets with metadata
 */
export const getPresetsEndpoint: Endpoint = {
  path: '/seed/presets',
  method: 'get',
  handler: async (req) => {
    const presets = PRESET_IDS.map(id => ({
      id,
      ...PRESET_METADATA[id],
    }))

    return Response.json({ presets })
  },
}

/**
 * GET /api/seed/status
 * Checks if sample data exists in the database
 */
export const getSeedStatusEndpoint: Endpoint = {
  path: '/seed/status',
  method: 'get',
  handler: async (req) => {
    const { payload } = req

    try {
      // Check if any sample data exists by looking at multiple collections
      const [pages, posts, artifacts] = await Promise.all([
        payload.count({ collection: 'pages' }),
        payload.count({ collection: 'posts' }),
        payload.count({ collection: 'artifacts' }),
      ])

      const hasData = pages.totalDocs > 0 || posts.totalDocs > 0 || artifacts.totalDocs > 0

      return Response.json({
        hasData,
        counts: {
          pages: pages.totalDocs,
          posts: posts.totalDocs,
          artifacts: artifacts.totalDocs,
        },
      })
    } catch (error) {
      return Response.json({ hasData: false, error: 'Failed to check status' })
    }
  },
}

/**
 * GET /api/seed/collections
 * Returns per-collection status with counts
 */
export const getCollectionsStatusEndpoint: Endpoint = {
  path: '/seed/collections',
  method: 'get',
  handler: async (req) => {
    const { payload } = req

    try {
      const collections = await Promise.all(
        Object.entries(COLLECTION_SEED_CONFIG).map(async ([slug, config]) => {
          try {
            const result = await payload.count({ collection: slug as any })
            return {
              slug,
              ...config,
              count: result.totalDocs,
            }
          } catch (error) {
            // Collection might not exist
            return {
              slug,
              ...config,
              count: 0,
            }
          }
        })
      )

      return Response.json({ collections })
    } catch (error) {
      return Response.json({ 
        collections: Object.entries(COLLECTION_SEED_CONFIG).map(([slug, config]) => ({
          slug,
          ...config,
          count: 0,
        })),
        error: 'Failed to fetch collection status' 
      })
    }
  },
}

/**
 * POST /api/seed
 * Handles seed, re-seed, and clear actions by preset
 */
export const seedActionEndpoint: Endpoint = {
  path: '/seed',
  method: 'post',
  handler: async (req) => {
    const { payload, user } = req

    // Require authentication
    if (!user) {
      return Response.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    // Require admin role
    if (user.role !== 'admin') {
      return Response.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }

    try {
      const body = await req.json?.() || {}
      const { action, preset, includeMedia, clearExisting } = body

      // Validate preset
      if (!preset || !isValidPresetId(preset)) {
        return Response.json(
          { success: false, message: `Invalid preset: ${preset}. Available: ${PRESET_IDS.join(', ')}` },
          { status: 400 }
        )
      }

      const presetId = preset as PresetId
      const seeder = createSeeder(presetId, payload, {
        downloadMedia: includeMedia,
        clearExisting: clearExisting,
      })

      switch (action) {
        case 'seed':
          await seeder.seed()
          return Response.json({
            success: true,
            message: `Successfully seeded ${PRESET_METADATA[presetId].name} data`,
          })

        case 'reseed':
          await seeder.clear()
          await seeder.seed()
          return Response.json({
            success: true,
            message: `Successfully re-seeded ${PRESET_METADATA[presetId].name} data`,
          })

        case 'clear':
          await seeder.clear()
          return Response.json({
            success: true,
            message: `Successfully cleared ${PRESET_METADATA[presetId].name} data`,
          })

        default:
          return Response.json(
            { success: false, message: `Invalid action: ${action}. Use: seed, reseed, or clear` },
            { status: 400 }
          )
      }
    } catch (error) {
      payload.logger.error('Seed action failed:', error)
      return Response.json(
        { success: false, message: `Operation failed: ${error}` },
        { status: 500 }
      )
    }
  },
}

/**
 * POST /api/seed/collection
 * Handles seed, re-seed, and clear actions for individual collections
 */
export const seedCollectionEndpoint: Endpoint = {
  path: '/seed/collection',
  method: 'post',
  handler: async (req) => {
    const { payload, user } = req

    // Require authentication
    if (!user) {
      return Response.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    // Require admin role
    if (user.role !== 'admin') {
      return Response.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }

    try {
      const body = await req.json?.() || {}
      const { slug, action, includeMedia } = body

      // Validate collection
      if (!slug || !(slug in COLLECTION_SEED_CONFIG)) {
        return Response.json(
          { success: false, message: `Invalid collection: ${slug}` },
          { status: 400 }
        )
      }

      const config = COLLECTION_SEED_CONFIG[slug]

      // Use museum preset as base for seeding individual collections
      const seeder = createSeeder('museum-next', payload, {
        downloadMedia: includeMedia && config.hasSeedMedia,
        clearExisting: action === 'reseed',
      })

      let itemsAffected = 0

      switch (action) {
        case 'seed':
          await seeder.seedCollection(slug)
          const seedCount = await payload.count({ collection: slug as any })
          itemsAffected = seedCount.totalDocs
          return Response.json({
            success: true,
            message: `Successfully seeded ${config.label}`,
            itemsAffected,
          })

        case 'reseed':
          await seeder.clearCollection(slug)
          await seeder.seedCollection(slug)
          const reseedCount = await payload.count({ collection: slug as any })
          itemsAffected = reseedCount.totalDocs
          return Response.json({
            success: true,
            message: `Successfully re-seeded ${config.label}`,
            itemsAffected,
          })

        case 'clear':
          const beforeCount = await payload.count({ collection: slug as any })
          itemsAffected = beforeCount.totalDocs
          await seeder.clearCollection(slug)
          return Response.json({
            success: true,
            message: `Successfully cleared ${config.label}`,
            itemsAffected,
          })

        default:
          return Response.json(
            { success: false, message: `Invalid action: ${action}. Use: seed, reseed, or clear` },
            { status: 400 }
          )
      }
    } catch (error) {
      payload.logger.error('Collection seed action failed:', error)
      return Response.json(
        { success: false, message: `Operation failed: ${error}` },
        { status: 500 }
      )
    }
  },
}

/**
 * POST /api/seed/all
 * Seed or clear all collections at once
 */
export const seedAllEndpoint: Endpoint = {
  path: '/seed/all',
  method: 'post',
  handler: async (req) => {
    const { payload, user } = req

    // Require authentication
    if (!user) {
      return Response.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    // Require admin role
    if (user.role !== 'admin') {
      return Response.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }

    try {
      const body = await req.json?.() || {}
      const { action } = body

      // Use museum preset as it has the most collections
      const seeder = createSeeder('museum-next', payload, {
        downloadMedia: false,
        clearExisting: false,
      })

      switch (action) {
        case 'seed':
          await seeder.seed()
          return Response.json({
            success: true,
            message: 'Successfully seeded all collections',
          })

        case 'clear':
          await seeder.clear()
          return Response.json({
            success: true,
            message: 'Successfully cleared all collections',
          })

        default:
          return Response.json(
            { success: false, message: `Invalid action: ${action}. Use: seed or clear` },
            { status: 400 }
          )
      }
    } catch (error) {
      payload.logger.error('Seed all action failed:', error)
      return Response.json(
        { success: false, message: `Operation failed: ${error}` },
        { status: 500 }
      )
    }
  },
}

/**
 * All seed endpoints
 */
export const seedEndpoints: Endpoint[] = [
  getPresetsEndpoint,
  getSeedStatusEndpoint,
  getCollectionsStatusEndpoint,
  seedActionEndpoint,
  seedCollectionEndpoint,
  seedAllEndpoint,
]

export default seedEndpoints
