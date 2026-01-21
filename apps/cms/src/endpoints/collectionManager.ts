import type { Endpoint } from 'payload'
import { getDefaultSectionForSlug } from '../lib/navigationConfig'

export const collectionManagerEndpoint: Endpoint = {
  path: '/admin/collection-manager',
  method: 'get',
  handler: async (req) => {
    try {
      const { payload } = req
      const url = new URL(req.url, 'http://localhost')
      const managerType = url.searchParams.get('type') || 'collections'

      if (managerType === 'globals') {
        const globals = payload.config.globals.map((global) => ({
          slug: global.slug,
          label: global.label || global.slug,
          hidden: false,
          defaultSection: 'settings',
        }))

        return Response.json({ items: globals })
      }

      console.log('\n========================================')
      console.log('[CollectionManager] Endpoint called at', new Date().toISOString())
      console.log('[CollectionManager] Total collections in config:', payload.config.collections.length)

      // Filter out Payload's internal collections and auto-generated collections
      const internalCollections = new Set([
        // Payload core internal collections
        'payload-preferences',
        'payload-migrations',
        'payload-locked-documents',
        'payload-jobs',
        'payload-kv', // Note: it's 'payload-kv' not 'payload-kvs'
        // Plugin-generated collections that shouldn't be in nav settings
        'search-results', // from @payloadcms/plugin-search (auto-generated, not user-facing)
        // Internal dynamic collections (managed via custom collection manager)
        'custom-items',
        'content-types',
      ])

      // Log all collection slugs before filtering
      const allSlugs = payload.config.collections.map(c => c.slug)
      console.log('[CollectionManager] All collection slugs:', allSlugs)
      console.log('[CollectionManager] Internal collections to filter:', Array.from(internalCollections))

      // Check which internal collections are present
      const foundInternalCollections = allSlugs.filter(slug => internalCollections.has(slug))
      console.log('[CollectionManager] Found internal collections to filter:', foundInternalCollections)

      const collections = payload.config.collections
        .filter((collection) => {
          const isInternal = internalCollections.has(collection.slug)
          if (isInternal) {
            console.log(`[CollectionManager] ❌ Filtering out internal collection: ${collection.slug}`)
          }
          return !isInternal
        })
        .map((collection) => {
          const slug = collection.slug
          const item = {
            slug,
            label: collection.labels?.plural || collection.labels?.singular || slug,
            hidden: Boolean(collection.admin?.hidden),
            defaultSection: getDefaultSectionForSlug(slug),
          }
          console.log(`[CollectionManager] ✅ Including collection: ${slug}`)
          return item
        })

      const contentTypes = await payload.find({
        collection: 'content-types',
        limit: 200,
        depth: 0,
        overrideAccess: true,
      }).catch(() => null)

      const customCollectionItems = Array.isArray(contentTypes?.docs)
        ? contentTypes.docs
            .filter((doc: any) => !doc?.uninstalled)
            .map((doc: any) => ({
              slug: `custom:${doc.slug}`,
              label: doc.pluralLabel || doc.name || doc.slug,
              hidden: false,
              defaultSection: 'collections',
              defaultEnabled: true,
            }))
        : []

      const combinedCollections = [...collections, ...customCollectionItems]

      console.log('[CollectionManager] Final collections count:', combinedCollections.length)
      console.log('[CollectionManager] Final collection slugs:', combinedCollections.map(c => c.slug))
      console.log('[CollectionManager] Response ready to send')
      console.log('========================================\n')

      return Response.json({ items: combinedCollections })
    } catch (error) {
      console.error('[CollectionManager] Endpoint error:', error)
      return Response.json({ error: `Failed to load navigation items: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 })
    }
  },
}
