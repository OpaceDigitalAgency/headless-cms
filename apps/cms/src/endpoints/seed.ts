import type { Endpoint } from 'payload'
import { createSeeder, isValidPresetId, PRESET_IDS, PRESET_METADATA, type PresetId } from '../seed/presets'

/**
 * Seed API Endpoints
 * 
 * Provides REST API endpoints for managing sample data:
 * - GET /api/seed/presets - List available presets
 * - GET /api/seed/status - Check if sample data exists
 * - POST /api/seed - Seed, re-seed, or clear data
 */

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
 * POST /api/seed
 * Handles seed, re-seed, and clear actions
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
 * All seed endpoints
 */
export const seedEndpoints: Endpoint[] = [
  getPresetsEndpoint,
  getSeedStatusEndpoint,
  seedActionEndpoint,
]

export default seedEndpoints
