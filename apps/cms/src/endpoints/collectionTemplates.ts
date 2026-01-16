/**
 * Collection Templates API Endpoints
 * 
 * Handles adding, removing, and managing collection templates.
 */

import type { Endpoint } from 'payload'
import { 
  allTemplates, 
  getTemplateById, 
  COLLECTION_BUNDLES,
  type BundleId,
} from '../collection-templates'

/**
 * Get all available templates
 */
export const getTemplatesEndpoint: Endpoint = {
  path: '/collection-templates',
  method: 'get',
  handler: async (req) => {
    return Response.json({
      templates: allTemplates.map(t => ({
        id: t.id,
        name: t.name,
        description: t.description,
        category: t.category,
        icon: t.icon,
        defaultSlug: t.defaultSlug,
        defaultSingular: t.defaultSingular,
        defaultPlural: t.defaultPlural,
        hasSeedData: t.hasSeedData,
        hasSeedMedia: t.hasSeedMedia,
        seedDataCount: t.seedDataCount,
      })),
      bundles: COLLECTION_BUNDLES,
    })
  },
}

/**
 * Get installed collections
 * 
 * Returns the slugs of collections that are currently active.
 * This checks which collections exist in the Payload config.
 */
export const getInstalledEndpoint: Endpoint = {
  path: '/collection-templates/installed',
  method: 'get',
  handler: async (req) => {
    const { payload } = req

    // Get all collection slugs from Payload config
    const collectionSlugs = payload.config.collections.map(c => c.slug)

    // Filter to only include template-based collections
    const templateSlugs = allTemplates.map(t => t.defaultSlug)
    const installedSlugs = collectionSlugs.filter(slug => 
      templateSlugs.includes(slug) || 
      // Also check for custom-named collections based on template patterns
      allTemplates.some(t => slug.includes(t.defaultSlug))
    )

    return Response.json({
      slugs: installedSlugs,
      collections: installedSlugs.map(slug => {
        const collection = payload.config.collections.find(c => c.slug === slug)
        return {
          slug,
          label: collection?.labels?.plural || slug,
        }
      }),
    })
  },
}

/**
 * Add a collection from a template
 * 
 * Note: In a production system, this would dynamically register the collection.
 * For now, it stores the configuration and requires a restart to take effect.
 * 
 * A better approach would be to use Payload's plugin system or
 * generate the collection config files.
 */
export const addTemplateEndpoint: Endpoint = {
  path: '/collection-templates/add',
  method: 'post',
  handler: async (req) => {
    try {
      const body = await req.json?.() || {}
      const { templateId, customName, slug, singular, plural } = body

      if (!templateId || !customName || !slug) {
        return Response.json(
          { success: false, message: 'Missing required fields: templateId, customName, slug' },
          { status: 400 }
        )
      }

      const template = getTemplateById(templateId)
      if (!template) {
        return Response.json(
          { success: false, message: `Template not found: ${templateId}` },
          { status: 404 }
        )
      }

      // Check if collection already exists
      const { payload } = req
      const existingCollection = payload.config.collections.find(c => c.slug === slug)
      if (existingCollection) {
        return Response.json(
          { success: false, message: `Collection already exists: ${slug}` },
          { status: 409 }
        )
      }

      // Create collection config from template
      const collectionConfig = {
        slug,
        labels: {
          singular: singular || customName.replace(/s$/, ''),
          plural: plural || customName,
        },
        admin: {
          useAsTitle: 'title',
          group: template.adminGroup,
          defaultColumns: ['title', '_status', 'updatedAt'],
          description: template.description,
        },
        versions: {
          drafts: {
            autosave: { interval: 300 },
            schedulePublish: true,
          },
          maxPerDoc: 25,
        },
        access: {
          read: ({ req: { user } }) => {
            if (!user) return { _status: { equals: 'published' } }
            return true
          },
          create: ({ req: { user } }) => Boolean(user),
          update: ({ req: { user } }) => Boolean(user),
          delete: ({ req: { user } }) => user?.role === 'admin',
        },
        fields: template.fields,
        hooks: {
          afterChange: [
            async ({ doc, req }) => {
              if (doc._status === 'published') {
                const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
                try {
                  await fetch(`${revalidateUrl}/api/revalidate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      secret: process.env.REVALIDATION_SECRET,
                      collection: slug,
                      slug: doc.slug,
                    }),
                  })
                } catch (error) {
                  payload.logger.error(`Failed to revalidate ${slug}:`, error)
                }
              }
              return doc
            },
          ],
        },
      }

      // Register collection with Payload
      payload.config.collections.push(collectionConfig as any)

      // Log the action
      payload.logger.info(`Collection template installed: ${templateId} as "${customName}" (${slug})`)

      return Response.json({
        success: true,
        message: `Collection "${customName}" has been successfully added!`,
        collection: {
          templateId,
          customName,
          slug,
          singular: singular || customName.replace(/s$/, ''),
          plural: plural || customName,
        },
      })
    } catch (error) {
      console.error('Error adding template:', error)
      return Response.json(
        { success: false, message: 'Failed to add collection template' },
        { status: 500 }
      )
    }
  },
}

/**
 * Add a bundle of collections
 */
export const addBundleEndpoint: Endpoint = {
  path: '/collection-templates/add-bundle',
  method: 'post',
  handler: async (req) => {
    try {
      const body = await req.json?.() || {}
      const { bundleId } = body
      const { payload } = req

      if (!bundleId || !(bundleId in COLLECTION_BUNDLES)) {
        return Response.json(
          { success: false, message: `Invalid bundle: ${bundleId}` },
          { status: 400 }
        )
      }

      const bundle = COLLECTION_BUNDLES[bundleId as BundleId]
      const addedCollections = []
      const failedCollections = []

      // Install each template in the bundle
      for (const templateId of bundle.templates) {
        const template = getTemplateById(templateId)
        if (!template) {
          failedCollections.push(`${templateId} (template not found)`)
          continue
        }

        const slug = template.defaultSlug
        const existingCollection = payload.config.collections.find(c => c.slug === slug)

        if (existingCollection) {
          failedCollections.push(`${template.name} (already exists)`)
          continue
        }

        // Create and register collection
        const collectionConfig = {
          slug,
          labels: {
            singular: template.defaultSingular,
            plural: template.defaultPlural,
          },
          admin: {
            useAsTitle: 'title',
            group: template.adminGroup,
            defaultColumns: ['title', '_status', 'updatedAt'],
            description: template.description,
          },
          versions: {
            drafts: {
              autosave: { interval: 300 },
              schedulePublish: true,
            },
            maxPerDoc: 25,
          },
          access: {
            read: ({ req: { user } }) => {
              if (!user) return { _status: { equals: 'published' } }
              return true
            },
            create: ({ req: { user } }) => Boolean(user),
            update: ({ req: { user } }) => Boolean(user),
            delete: ({ req: { user } }) => user?.role === 'admin',
          },
          fields: template.fields,
          hooks: {
            afterChange: [
              async ({ doc, req }) => {
                if (doc._status === 'published') {
                  const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
                  try {
                    await fetch(`${revalidateUrl}/api/revalidate`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        secret: process.env.REVALIDATION_SECRET,
                        collection: slug,
                        slug: doc.slug,
                      }),
                    })
                  } catch (error) {
                    payload.logger.error(`Failed to revalidate ${slug}:`, error)
                  }
                }
                return doc
              },
            ],
          },
        }

        payload.config.collections.push(collectionConfig as any)
        addedCollections.push(template.name)
      }

      payload.logger.info(`Bundle installed: ${bundleId} (${addedCollections.join(', ')})`)

      return Response.json({
        success: addedCollections.length > 0,
        message: addedCollections.length > 0
          ? `Bundle "${bundle.name}" has been successfully added!`
          : `Failed to add bundle "${bundle.name}"`,
        bundle: {
          id: bundleId,
          name: bundle.name,
          addedCollections,
          failedCollections,
        },
      })
    } catch (error) {
      console.error('Error adding bundle:', error)
      return Response.json(
        { success: false, message: 'Failed to add bundle' },
        { status: 500 }
      )
    }
  },
}

/**
 * All collection template endpoints
 */
export const collectionTemplateEndpoints: Endpoint[] = [
  getTemplatesEndpoint,
  getInstalledEndpoint,
  addTemplateEndpoint,
  addBundleEndpoint,
]
