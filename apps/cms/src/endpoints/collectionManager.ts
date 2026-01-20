import type { Endpoint } from 'payload'
import { getDefaultSectionForSlug } from '../lib/navigationConfig'

export const collectionManagerEndpoint: Endpoint = {
  path: '/admin/collection-manager',
  method: 'get',
  handler: async (req) => {
    try {
      const { payload } = req
      console.log('[CollectionManager] Endpoint called')
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
      ])

      // Log all collection slugs before filtering
      console.log('[CollectionManager] All collection slugs:', payload.config.collections.map(c => c.slug))
      console.log('[CollectionManager] Internal collections to filter:', Array.from(internalCollections))

      const collections = payload.config.collections
        .filter((collection) => {
          const isInternal = internalCollections.has(collection.slug)
          if (isInternal) {
            console.log(`[CollectionManager] Filtering out internal collection: ${collection.slug}`)
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
          console.log(`[CollectionManager] Including collection: ${slug}`, item)
          return item
        })

      console.log('[CollectionManager] Returning collections count:', collections.length)
      console.log('[CollectionManager] Returning collection slugs:', collections.map(c => c.slug))
      return Response.json({ collections })
    } catch (error) {
      console.error('[CollectionManager] Endpoint error:', error)
      return Response.json({ error: `Failed to load collections: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 })
    }
  },
}
