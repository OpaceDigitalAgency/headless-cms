import type { Endpoint } from 'payload'
import { createSeeder, isValidPresetId, PRESET_IDS, PRESET_METADATA, type PresetId } from '../seed/presets'
import { ensureShowcasePage } from '../seed/showcase'
import { isCollectionEnabled } from '../lib/collectionVisibility'
import { getTemplateById, allTemplates } from '../collection-templates'
import { createRichText } from '../seed/base'

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
  pages: { label: 'Pages', icon: 'file-text', hasSeedData: true, hasSeedMedia: false },
  posts: { label: 'Posts', icon: 'edit', hasSeedData: true, hasSeedMedia: false },
  categories: { label: 'Categories', icon: 'tag', hasSeedData: true, hasSeedMedia: false },
  tags: { label: 'Tags', icon: 'tag', hasSeedData: true, hasSeedMedia: false },
  'archive-items': { label: 'Archive Items', icon: 'archive', hasSeedData: true, hasSeedMedia: true },
  people: { label: 'People', icon: 'user', hasSeedData: true, hasSeedMedia: true },
  places: { label: 'Places', icon: 'map-pin', hasSeedData: true, hasSeedMedia: true },
  'content-types': { label: 'Content Types', icon: 'archive', hasSeedData: true, hasSeedMedia: false },
  'custom-items': { label: 'Custom Items', icon: 'box', hasSeedData: true, hasSeedMedia: false },
  products: { label: 'Products', icon: 'shopping-bag', hasSeedData: true, hasSeedMedia: true },
  'product-categories': { label: 'Product Categories', icon: 'box', hasSeedData: true, hasSeedMedia: false },
  'product-collections': { label: 'Product Collections', icon: 'shopping-bag', hasSeedData: true, hasSeedMedia: false },
  events: { label: 'Events', icon: 'calendar', hasSeedData: true, hasSeedMedia: true },
}

const COLLECTION_PRESET_OVERRIDES: Record<string, PresetId> = {
  products: 'ecommerce',
  'product-categories': 'ecommerce',
  'product-collections': 'ecommerce',
  'archive-items': 'archive',
  people: 'archive',
  places: 'archive',
  events: 'archive',
}

/**
 * Get the active preset from Settings global
 * Falls back to 'blog' if not set
 */
async function getActivePreset(payload: any): Promise<PresetId> {
  try {
    const settings = await payload.findGlobal({ slug: 'settings' })
    const activePreset = settings?.activePreset || 'blog'

    // Validate it's a valid preset
    if (isValidPresetId(activePreset)) {
      return activePreset as PresetId
    }

    payload.logger.warn(`Invalid activePreset in Settings: ${activePreset}, falling back to 'blog'`)
    return 'blog'
  } catch (error) {
    payload.logger.warn('Failed to get activePreset from Settings, falling back to \'blog\'')
    return 'blog'
  }
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
      const [pages, posts, archiveItems] = await Promise.all([
        payload.count({ collection: 'pages' }),
        payload.count({ collection: 'posts' }),
        payload.count({ collection: 'archive-items' }),
      ])

      const hasData = pages.totalDocs > 0 || posts.totalDocs > 0 || archiveItems.totalDocs > 0

      return Response.json({
        hasData,
        counts: {
          pages: pages.totalDocs,
          posts: posts.totalDocs,
          'archive-items': archiveItems.totalDocs,
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
      const presetCollections = PRESET_METADATA[presetId].collections || []
      const enabledCollections: string[] = []
      for (const collection of presetCollections) {
        if (await isCollectionEnabled(payload, collection)) {
          enabledCollections.push(collection)
        }
      }

      if (enabledCollections.length === 0) {
        return Response.json(
          { success: false, message: 'No enabled collections found for this preset.' },
          { status: 400 }
        )
      }

      const seeder = createSeeder(presetId, payload, {
        downloadMedia: includeMedia,
        clearExisting: clearExisting,
        collections: enabledCollections,
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
    } catch (error: any) {
      payload.logger.error('Seed action failed:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      return Response.json(
        { success: false, message: `Operation failed: ${errorMessage}` },
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

      if (!(await isCollectionEnabled(payload, slug))) {
        return Response.json(
          { success: false, message: `Collection "${slug}" is disabled. Enable it before seeding.` },
          { status: 400 }
        )
      }

      const config = COLLECTION_SEED_CONFIG[slug]

      // Use collection-specific preset override, or fall back to active preset from Settings
      const presetId = COLLECTION_PRESET_OVERRIDES[slug] || await getActivePreset(payload)
      const seeder = createSeeder(presetId, payload, {
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
    } catch (error: any) {
      payload.logger.error('Collection seed action failed:', error)

      const errorMessage = error instanceof Error ? error.message : String(error)
      return Response.json(
        { success: false, message: `Operation failed: ${errorMessage}` },
        { status: 500 }
      )
    }
  },
}

/**
 * POST /api/seed/content-type
 * Seed or clear items for a custom content type template
 */
export const seedContentTypeEndpoint: Endpoint = {
  path: '/seed/content-type',
  method: 'post',
  handler: async (req) => {
    const { payload, user } = req

    if (!user) {
      return Response.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    if (user.role !== 'admin') {
      return Response.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }

    try {
      const body = await req.json?.() || {}
      const { templateId, action, contentTypeId, itemSlug } = body

      let template = typeof templateId === 'string' ? getTemplateById(templateId) : undefined

      let contentTypeDoc: any = null

      if (contentTypeId) {
        contentTypeDoc = await payload.findByID({
          collection: 'content-types',
          id: contentTypeId,
          depth: 0,
        })

        if (!template && contentTypeDoc?.templateId) {
          template = getTemplateById(contentTypeDoc.templateId)
        }
      }

      if (!template && contentTypeDoc?.template === 'article') {
        template = getTemplateById('blog-post')
      }

      // Allow seeding if it has seed data/items, even if contentTypeTemplate is not explicitly defined
      // (as is the case for updated core-to-custom templates like blog-post/article)
      if (!template || (!template.contentTypeTemplate && !template.hasSeedData && !template.seedItems)) {
        return Response.json(
          { success: false, message: 'Template not found or does not support seeding.' },
          { status: 404 }
        )
      }

      if (!contentTypeDoc) {
        const contentTypeSlug = template.defaultSlug
        const contentType = await payload.find({
          collection: 'content-types',
          where: {
            slug: { equals: contentTypeSlug },
          },
          limit: 1,
          depth: 0,
        })

        contentTypeDoc = contentType.docs[0]
      }

      if (!contentTypeDoc) {
        return Response.json(
          { success: false, message: 'Content type is not enabled yet.' },
          { status: 400 }
        )
      }

      const seedItems = Array.isArray(template.seedItems) ? template.seedItems : []

      switch (action) {
        case 'seed': {
          const displayName = contentTypeDoc?.pluralLabel || contentTypeDoc?.name || template.name
          if (!seedItems.length) {
            return Response.json({
              success: true,
              message: `No seed data configured for ${displayName}`,
              itemsAffected: 0,
            })
          }

          if (itemSlug) {
            const seedItem = seedItems.find(item => item.slug === itemSlug)
            if (!seedItem) {
              return Response.json(
                { success: false, message: `Seed item "${itemSlug}" not found` },
                { status: 404 }
              )
            }

            const existing = await payload.find({
              collection: 'custom-items',
              where: {
                slug: { equals: itemSlug },
                contentType: { equals: contentTypeDoc.id },
              },
              limit: 1,
              depth: 0,
            })

            if (existing.docs.length > 0) {
              return Response.json(
                { success: false, message: `"${seedItem.title}" already exists. Delete it first to reseed.` },
                { status: 409 }
              )
            }

            await payload.create({
              collection: 'custom-items',
              data: {
                title: seedItem.title,
                slug: seedItem.slug,
                excerpt: seedItem.excerpt,
                content: typeof seedItem.content === 'string' ? createRichText(seedItem.content) : seedItem.content,
                blocks: seedItem.blocks || [],
                featuredImage: seedItem.featuredImage as any,
                gallery: (seedItem.gallery || []) as any,
                contentType: contentTypeDoc.id,
                status: seedItem.status || 'published',
                customData: seedItem.customData || {},
              },
              overrideAccess: true,
            })

            return Response.json({
              success: true,
              message: `Seeded "${seedItem.title}"`,
              itemsAffected: 1,
            })
          }

          let createdCount = 0
          for (const item of seedItems) {
            // Check if item already exists for this content type to avoid duplicate slug errors
            const existing = await payload.find({
              collection: 'custom-items',
              where: {
                slug: { equals: item.slug },
                contentType: { equals: contentTypeDoc.id },
              },
              limit: 1,
              depth: 0,
            })

            if (existing.docs.length > 0) {
              continue // Skip existing items
            }

            await payload.create({
              collection: 'custom-items',
              data: {
                title: item.title,
                slug: item.slug,
                excerpt: item.excerpt,
                content: typeof item.content === 'string' ? createRichText(item.content) : item.content,
                blocks: item.blocks || [],
                featuredImage: item.featuredImage as any,
                gallery: (item.gallery || []) as any,
                contentType: contentTypeDoc.id,
                status: item.status || 'published',
                customData: item.customData || {},
              },
              overrideAccess: true,
            })
            createdCount += 1
          }

          return Response.json({
            success: true,
            message: `Seeded ${createdCount} items to ${displayName}`,
            itemsAffected: createdCount,
          })
        }

        case 'clear': {
          let deletedCount = 0
          while (true) {
            const results = await payload.find({
              collection: 'custom-items',
              where: {
                contentType: { equals: contentTypeDoc.id },
              },
              limit: 100,
              depth: 0,
            })

            if (!results.docs.length) break

            for (const doc of results.docs) {
              await payload.delete({
                collection: 'custom-items',
                id: doc.id,
                overrideAccess: true,
              })
              deletedCount += 1
            }
          }

          const clearDisplayName = contentTypeDoc?.pluralLabel || contentTypeDoc?.name || template.name
          return Response.json({
            success: true,
            message: `Cleared ${deletedCount} items from ${clearDisplayName}`,
            itemsAffected: deletedCount,
          })
        }

        default:
          return Response.json(
            { success: false, message: `Invalid action: ${action}. Use: seed or clear` },
            { status: 400 }
          )
      }
    } catch (error: any) {
      payload.logger.error('Content type seed action failed:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      return Response.json(
        { success: false, message: `Operation failed: ${errorMessage}` },
        { status: 500 }
      )
    }
  },
}

/**
 * POST /api/seed/showcase
 * Creates or updates the Blocks Showcase page
 */
export const seedShowcaseEndpoint: Endpoint = {
  path: '/seed/showcase',
  method: 'post',
  handler: async (req) => {
    const { payload, user } = req

    if (!user) {
      return Response.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    if (user.role !== 'admin') {
      return Response.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }

    try {
      const result = await ensureShowcasePage(payload, { updateHeader: true })
      const pageId = ('id' in result) ? result.id : (Array.isArray(result) ? result[0]?.id : undefined)
      const slug = ('slug' in result) ? result.slug : (Array.isArray(result) ? result[0]?.slug : undefined)

      return Response.json({
        success: true,
        message: 'Blocks Showcase page created/updated',
        pageId,
        slug,
      })
    } catch (error: any) {
      payload.logger.error('Showcase seed failed:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      return Response.json(
        { success: false, message: `Operation failed: ${errorMessage}` },
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

      // Use the core preset (archive-next) as it has the most collections
      const enabledCollections: string[] = []
      for (const slug of Object.keys(COLLECTION_SEED_CONFIG)) {
        if (await isCollectionEnabled(payload, slug)) {
          enabledCollections.push(slug)
        }
      }

      if (enabledCollections.length === 0) {
        return Response.json(
          { success: false, message: 'No enabled collections found to seed.' },
          { status: 400 }
        )
      }

      const seeder = createSeeder('archive', payload, {
        downloadMedia: false,
        clearExisting: false,
        collections: enabledCollections,
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
    } catch (error: any) {
      payload.logger.error('Seed all action failed:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      return Response.json(
        { success: false, message: `Operation failed: ${errorMessage}` },
        { status: 500 }
      )
    }
  },
}

/**
 * POST /api/seed/item
 * Seed a single item from a collection's seed data
 *
 * Note: Currently seeds the entire collection. Individual item seeding
 * requires refactoring the seeder architecture to support partial seeding.
 */
export const seedItemEndpoint: Endpoint = {
  path: '/seed/item',
  method: 'post',
  handler: async (req) => {
    const { payload, user } = req

    if (!user) {
      return Response.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    if (user.role !== 'admin') {
      return Response.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }

    try {
      const body = await req.json?.() || {}
      const { collectionSlug, itemSlug, presetId } = body

      if (!collectionSlug || !itemSlug) {
        return Response.json(
          { success: false, message: 'collectionSlug and itemSlug are required' },
          { status: 400 }
        )
      }

      if (!(await isCollectionEnabled(payload, collectionSlug))) {
        return Response.json(
          { success: false, message: `Collection "${collectionSlug}" is disabled` },
          { status: 400 }
        )
      }

      // Get the template to find seed items
      // Note: collectionSlug is the collection slug (e.g., 'pages'), not the template ID (e.g., 'page')
      // So we need to find the template by matching defaultSlug
      const template = allTemplates.find(t => t.defaultSlug === collectionSlug)
      if (!template || !template.seedItems) {
        return Response.json(
          { success: false, message: `No seed items found for ${collectionSlug}` },
          { status: 400 }
        )
      }

      const seedItem = template.seedItems.find(item => item.slug === itemSlug)
      if (!seedItem) {
        return Response.json(
          { success: false, message: `Seed item "${itemSlug}" not found` },
          { status: 404 }
        )
      }

      // Check if this specific item already exists
      const existing = await payload.find({
        collection: collectionSlug as any,
        where: {
          slug: {
            equals: itemSlug,
          },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        return Response.json(
          { success: false, message: `"${seedItem.title}" already exists. Delete it first to reseed.` },
          { status: 409 }
        )
      }

      // Seed only this specific item
      // Use provided preset, collection override, or active preset from Settings
      const presetToUse = presetId || COLLECTION_PRESET_OVERRIDES[collectionSlug] || await getActivePreset(payload)

      if (!isValidPresetId(presetToUse)) {
        return Response.json(
          { success: false, message: `Invalid preset: ${presetToUse}` },
          { status: 400 }
        )
      }

      const seeder = createSeeder(presetToUse as any, payload, {
        collections: [collectionSlug],
        seedOnlyItem: itemSlug, // Pass the specific item to seed
      })

      await seeder.seed()

      return Response.json({
        success: true,
        message: `Successfully seeded "${seedItem.title}"`,
      })
    } catch (error: any) {
      payload.logger.error('Seed item action failed:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      return Response.json(
        { success: false, message: `Operation failed: ${errorMessage}` },
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
  seedContentTypeEndpoint,
  seedShowcaseEndpoint,
  seedAllEndpoint,
  seedItemEndpoint,
]

export default seedEndpoints
