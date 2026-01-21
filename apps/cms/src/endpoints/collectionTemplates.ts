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

    const contentTypeTemplates = allTemplates.filter((template) => template.contentTypeTemplate)
    if (contentTypeTemplates.length > 0) {
      const contentTypes = await payload.find({
        collection: 'content-types',
        limit: 200,
        depth: 0,
        overrideAccess: true,
      })

      contentTypeTemplates.forEach((template) => {
        if (contentTypes.docs.some((doc: any) => doc.slug === template.defaultSlug)) {
          installedSlugs.push(template.defaultSlug)
        }
      })
    }
    const uniqueInstalledSlugs = Array.from(new Set(installedSlugs))

    return Response.json({
      slugs: uniqueInstalledSlugs,
      collections: uniqueInstalledSlugs.map(slug => {
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
 * Get content types for template manager (override access)
 */
export const getContentTypesEndpoint: Endpoint = {
  path: '/collection-templates/content-types',
  method: 'get',
  handler: async (req) => {
    const { payload, user } = req

    if (!user) {
      return Response.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    const contentTypes = await payload.find({
      collection: 'content-types',
      limit: 200,
      depth: 0,
      overrideAccess: true,
    })

    return Response.json({
      success: true,
      docs: contentTypes.docs.map((doc: any) => ({
        id: doc.id,
        slug: doc.slug,
        name: doc.name,
        singularLabel: doc.singularLabel,
        pluralLabel: doc.pluralLabel,
        template: doc.template,
        icon: doc.icon,
        description: doc.description,
        hasArchive: doc.hasArchive,
        archiveSlug: doc.archiveSlug,
        customFields: Array.isArray(doc.customFields) ? doc.customFields : [],
      })),
    })
  },
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Create a custom collection (content type) from a base template or existing type.
 */
export const createCustomCollectionEndpoint: Endpoint = {
  path: '/collection-templates/create-custom',
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
      const {
        name,
        slug,
        singularLabel,
        pluralLabel,
        templateId,
        baseTemplate,
        sourceContentTypeId,
        icon,
        description,
        hasArchive,
        archiveSlug,
      } = body

      let resolvedName = typeof name === 'string' ? name.trim() : ''
      let resolvedSlug = typeof slug === 'string' ? slug.trim() : ''
      let resolvedTemplate = typeof baseTemplate === 'string' ? baseTemplate : ''
      let resolvedIcon = typeof icon === 'string' ? icon : ''
      let resolvedDescription = typeof description === 'string' ? description : ''
      let resolvedHasArchive = typeof hasArchive === 'boolean' ? hasArchive : undefined
      let resolvedArchiveSlug = typeof archiveSlug === 'string' ? archiveSlug.trim() : ''
      let resolvedCustomFields: any[] = []

      if (sourceContentTypeId) {
        const source = await payload.findByID({
          collection: 'content-types',
          id: sourceContentTypeId,
          depth: 0,
          overrideAccess: true,
        })

        resolvedTemplate = resolvedTemplate || source?.template
        resolvedIcon = resolvedIcon || source?.icon
        resolvedDescription = resolvedDescription || source?.description
        resolvedHasArchive = typeof resolvedHasArchive === 'boolean' ? resolvedHasArchive : source?.hasArchive
        resolvedArchiveSlug = resolvedArchiveSlug || source?.archiveSlug
        resolvedCustomFields = Array.isArray(source?.customFields) ? source.customFields : []

        if (!resolvedName) {
          resolvedName = `${source?.name || 'Custom Collection'} Copy`
        }
      } else if (templateId) {
        const template = getTemplateById(templateId)
        if (!template || !template.contentTypeTemplate) {
          return Response.json(
            { success: false, message: `Template not found or not a content type: ${templateId}` },
            { status: 404 }
          )
        }

        resolvedTemplate = resolvedTemplate || template.contentTypeTemplate.template
        resolvedIcon = resolvedIcon || template.contentTypeTemplate.icon || 'box'
        resolvedDescription = resolvedDescription || template.description || ''
        resolvedHasArchive =
          typeof resolvedHasArchive === 'boolean'
            ? resolvedHasArchive
            : template.contentTypeTemplate.hasArchive ?? true
        resolvedArchiveSlug =
          resolvedArchiveSlug ||
          template.contentTypeTemplate.archiveSlug ||
          (resolvedSlug ? `items/${resolvedSlug}` : '')
        resolvedCustomFields = Array.isArray(template.contentTypeTemplate.customFields)
          ? template.contentTypeTemplate.customFields
          : []

        if (!resolvedName) {
          resolvedName = template.defaultPlural || template.name
        }
      }

      if (!resolvedTemplate) {
        if (typeof baseTemplate !== 'string' || !baseTemplate.trim()) {
          return Response.json(
            { success: false, message: 'Missing required field: baseTemplate' },
            { status: 400 }
          )
        }
        resolvedTemplate = baseTemplate.trim()
      }

      if (!resolvedName) {
        return Response.json(
          { success: false, message: 'Missing required field: name' },
          { status: 400 }
        )
      }

      if (!resolvedSlug) {
        resolvedSlug = slugify(resolvedName)
      } else {
        resolvedSlug = slugify(resolvedSlug)
      }

      if (!resolvedSlug) {
        return Response.json(
          { success: false, message: 'Invalid slug' },
          { status: 400 }
        )
      }

      const resolvedSingular =
        typeof singularLabel === 'string' && singularLabel.trim()
          ? singularLabel.trim()
          : resolvedName.replace(/s$/, '')
      const resolvedPlural =
        typeof pluralLabel === 'string' && pluralLabel.trim()
          ? pluralLabel.trim()
          : resolvedName

      if (typeof resolvedHasArchive !== 'boolean') {
        resolvedHasArchive = true
      }

      if (resolvedHasArchive && !resolvedArchiveSlug) {
        resolvedArchiveSlug = `items/${resolvedSlug}`
      }

      const created = await payload.create({
        collection: 'content-types',
        data: {
          name: resolvedName,
          slug: resolvedSlug,
          singularLabel: resolvedSingular,
          pluralLabel: resolvedPlural,
          icon: resolvedIcon || 'box',
          template: resolvedTemplate,
          description: resolvedDescription || undefined,
          hasArchive: resolvedHasArchive,
          archiveSlug: resolvedHasArchive ? resolvedArchiveSlug : undefined,
          customFields: resolvedCustomFields,
        },
        overrideAccess: true,
      })

      const navigationSettings = await payload.findGlobal({ slug: 'navigation-settings', depth: 0 }).catch(() => null)
      const currentCollections = Array.isArray(navigationSettings?.collections)
        ? navigationSettings.collections
        : []

      const ensureEnabled = (slugToEnable: string) => {
        const existingIndex = currentCollections.findIndex((item: any) => item?.slug === slugToEnable)
        if (existingIndex >= 0) {
          currentCollections[existingIndex] = {
            ...currentCollections[existingIndex],
            enabled: true,
            uninstalled: false,
          }
        } else {
          currentCollections.push({ slug: slugToEnable, enabled: true })
        }
      }

      ensureEnabled('content-types')
      ensureEnabled('custom-items')

      await payload.updateGlobal({
        slug: 'navigation-settings',
        data: { collections: currentCollections },
      })

      return Response.json({
        success: true,
        message: `Custom collection "${created.name}" created`,
        doc: created,
      })
    } catch (error) {
      payload.logger.error('Create custom collection failed:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      return Response.json(
        { success: false, message: `Operation failed: ${errorMessage}` },
        { status: 500 }
      )
    }
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
      const { payload } = req

      if (!templateId) {
        return Response.json(
          { success: false, message: 'Missing required field: templateId' },
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

      const resolvedName = customName || template.defaultPlural || template.name
      const resolvedSlug = slug || template.defaultSlug
      const resolvedSingular = singular || template.defaultSingular || resolvedName.replace(/s$/, '')
      const resolvedPlural = plural || template.defaultPlural || resolvedName

      if (template.contentTypeTemplate) {
        const existingType = await payload.find({
          collection: 'content-types',
          where: { slug: { equals: resolvedSlug } },
          limit: 1,
          depth: 0,
        })

        if (existingType.docs[0]) {
          payload.logger.info(`Content type already available: ${templateId} (${resolvedSlug})`)
          return Response.json({
            success: true,
            alreadyInstalled: true,
            message: `Content type "${resolvedName}" is already enabled!`,
            collection: {
              templateId,
              customName: resolvedName,
              slug: resolvedSlug,
              singular: resolvedSingular,
              plural: resolvedPlural,
            },
          })
        }

        const archiveSlug = template.contentTypeTemplate.archiveSlug || `items/${resolvedSlug}`

        await payload.create({
          collection: 'content-types',
          data: {
            name: resolvedName,
            slug: resolvedSlug,
            singularLabel: resolvedSingular,
            pluralLabel: resolvedPlural,
            icon: template.contentTypeTemplate.icon || 'box',
            template: template.contentTypeTemplate.template,
            description: template.description,
            hasArchive: template.contentTypeTemplate.hasArchive ?? true,
            archiveSlug,
            customFields: template.contentTypeTemplate.customFields || [],
          },
          overrideAccess: true,
        })

        const navigationSettings = await payload.findGlobal({ slug: 'navigation-settings', depth: 0 }).catch(() => null)
        const currentCollections = Array.isArray(navigationSettings?.collections)
          ? navigationSettings.collections
          : []
        const ensureEnabled = (slugToEnable: string) => {
          const existingIndex = currentCollections.findIndex((item: any) => item?.slug === slugToEnable)
          if (existingIndex >= 0) {
            currentCollections[existingIndex] = {
              ...currentCollections[existingIndex],
              enabled: true,
              uninstalled: false,
            }
          } else {
            currentCollections.push({ slug: slugToEnable, enabled: true })
          }
        }

        ensureEnabled('content-types')
        ensureEnabled('custom-items')

        await payload.updateGlobal({
          slug: 'navigation-settings',
          data: { collections: currentCollections },
        })

        return Response.json({
          success: true,
          message: `Content type "${resolvedName}" enabled`,
          collection: {
            templateId,
            customName: resolvedName,
            slug: resolvedSlug,
            singular: resolvedSingular,
            plural: resolvedPlural,
          },
        })
      }

      // Check if collection already exists
      const existingCollection = payload.config.collections.find(c => c.slug === resolvedSlug)
      if (existingCollection) {
        // Collection already exists - this is expected for pre-configured templates
        payload.logger.info(`Collection template already available: ${templateId} (${resolvedSlug})`)
        return Response.json({
          success: true,
          alreadyInstalled: true,
          message: `Collection "${resolvedName}" is already installed and available!`,
          collection: {
            templateId,
            customName: resolvedName,
            slug: resolvedSlug,
            singular: resolvedSingular,
            plural: resolvedPlural,
          },
        })
      }

      // If collection doesn't exist, it means it's a custom template that needs to be pre-configured
      payload.logger.warn(`Collection template not pre-configured: ${templateId} (${resolvedSlug})`)
      return Response.json({
        success: false,
        message: `Collection "${resolvedName}" is not yet available. This collection needs to be added to the payload.config.ts file first.`,
        collection: {
          templateId,
          customName: resolvedName,
          slug: resolvedSlug,
          singular: resolvedSingular,
          plural: resolvedPlural,
        },
      }, { status: 400 })
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
      const availableCollections = []
      const unavailableCollections = []

      // Check each template in the bundle
      for (const templateId of bundle.templates) {
        const template = getTemplateById(templateId)
        if (!template) {
          unavailableCollections.push(`${templateId} (template not found)`)
          continue
        }

        const slug = template.defaultSlug
        const existingCollection = payload.config.collections.find(c => c.slug === slug)

        if (existingCollection) {
          availableCollections.push(template.name)
        } else {
          unavailableCollections.push(`${template.name} (not pre-configured)`)
        }
      }

      payload.logger.info(`Bundle accessed: ${bundleId} (${availableCollections.join(', ')})`)

      return Response.json({
        success: availableCollections.length > 0,
        message: availableCollections.length > 0
          ? `Bundle "${bundle.name}" is now available! Collections: ${availableCollections.join(', ')}`
          : `Bundle "${bundle.name}" is not yet available.`,
        bundle: {
          id: bundleId,
          name: bundle.name,
          availableCollections,
          unavailableCollections,
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
 * Uninstall a collection
 *
 * Deletes all documents and hides the collection from navigation.
 */
export const uninstallCollectionEndpoint: Endpoint = {
  path: '/collection-templates/uninstall',
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
      const { slug } = body

      if (!slug || typeof slug !== 'string') {
        return Response.json(
          { success: false, message: 'Missing required field: slug' },
          { status: 400 }
        )
      }

      const template = allTemplates.find((t) => t.defaultSlug === slug)
      if (!template) {
        return Response.json(
          { success: false, message: `Unknown collection: ${slug}` },
          { status: 400 }
        )
      }

      if (template.status === 'core') {
        return Response.json(
          { success: false, message: 'Core collections cannot be uninstalled' },
          { status: 400 }
        )
      }

      let deletedCount = 0
      while (true) {
        const results = await payload.find({
          collection: slug as any,
          limit: 100,
          page: 1,
        })

        if (!results.docs.length) {
          break
        }

        for (const doc of results.docs) {
          await payload.delete({
            collection: slug as any,
            id: doc.id,
          })
          deletedCount += 1
        }
      }

      const navigationSettings = await payload.findGlobal({ slug: 'navigation-settings', depth: 0 }).catch(() => null)
      const currentCollections = Array.isArray(navigationSettings?.collections)
        ? navigationSettings.collections
        : []
      const existingIndex = currentCollections.findIndex((item: any) => item?.slug === slug)

      let updatedCollections
      if (existingIndex >= 0) {
        updatedCollections = [...currentCollections]
        updatedCollections[existingIndex] = {
          ...updatedCollections[existingIndex],
          enabled: false,
          uninstalled: true,
        }
      } else {
        updatedCollections = [
          ...currentCollections,
          {
            slug,
            enabled: false,
            uninstalled: true,
          },
        ]
      }

      await payload.updateGlobal({
        slug: 'navigation-settings',
        data: {
          collections: updatedCollections,
        },
      })

      return Response.json({
        success: true,
        message: `Uninstalled ${template.name} and removed ${deletedCount} items`,
        itemsRemoved: deletedCount,
      })
    } catch (error) {
      payload.logger.error('Uninstall collection failed:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      return Response.json(
        { success: false, message: `Operation failed: ${errorMessage}` },
        { status: 500 }
      )
    }
  },
}

/**
 * Reinstall a collection
 *
 * Restores collection visibility and clears uninstall flag.
 */
export const reinstallCollectionEndpoint: Endpoint = {
  path: '/collection-templates/reinstall',
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
      const { slug } = body

      if (!slug || typeof slug !== 'string') {
        return Response.json(
          { success: false, message: 'Missing required field: slug' },
          { status: 400 }
        )
      }

      const template = allTemplates.find((t) => t.defaultSlug === slug)
      if (!template) {
        return Response.json(
          { success: false, message: `Unknown collection: ${slug}` },
          { status: 400 }
        )
      }

      if (template.status === 'core') {
        return Response.json(
          { success: false, message: 'Core collections cannot be reinstalled' },
          { status: 400 }
        )
      }

      const navigationSettings = await payload.findGlobal({ slug: 'navigation-settings', depth: 0 }).catch(() => null)
      const currentCollections = Array.isArray(navigationSettings?.collections)
        ? navigationSettings.collections
        : []
      const existingIndex = currentCollections.findIndex((item: any) => item?.slug === slug)

      let updatedCollections
      if (existingIndex >= 0) {
        updatedCollections = [...currentCollections]
        updatedCollections[existingIndex] = {
          ...updatedCollections[existingIndex],
          enabled: true,
          uninstalled: false,
        }
      } else {
        updatedCollections = [
          ...currentCollections,
          {
            slug,
            enabled: true,
            uninstalled: false,
          },
        ]
      }

      await payload.updateGlobal({
        slug: 'navigation-settings',
        data: {
          collections: updatedCollections,
        },
      })

      return Response.json({
        success: true,
        message: `Reinstalled ${template.name}`,
      })
    } catch (error) {
      payload.logger.error('Reinstall collection failed:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      return Response.json(
        { success: false, message: `Operation failed: ${errorMessage}` },
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
  getContentTypesEndpoint,
  createCustomCollectionEndpoint,
  addTemplateEndpoint,
  addBundleEndpoint,
  uninstallCollectionEndpoint,
  reinstallCollectionEndpoint,
]
