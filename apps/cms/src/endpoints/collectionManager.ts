import type { Endpoint } from 'payload'
import { getDefaultSectionForSlug } from '../lib/navigationConfig'

export const collectionManagerEndpoint: Endpoint = {
  path: '/admin/collection-manager',
  method: 'get',
  handler: async (req) => {
    try {
      const { payload } = req
      console.log('Collection manager endpoint called')
      console.log('Total collections in config:', payload.config.collections.length)

      // Filter out Payload's internal collections and auto-generated collections
      const internalCollections = new Set([
        // Payload core internal collections
        'payload-preferences',
        'payload-migrations',
        'payload-locked-documents',
        'payload-jobs',
        'payload-kvs',
        // Plugin-generated collections that shouldn't be in nav settings
        'search-results', // from @payloadcms/plugin-search (auto-generated, not user-facing)
      ])

      const collections = payload.config.collections
        .filter((collection) => !internalCollections.has(collection.slug))
        .map((collection) => {
          const slug = collection.slug
          const item = {
            slug,
            label: collection.labels?.plural || collection.labels?.singular || slug,
            hidden: Boolean(collection.admin?.hidden),
            defaultSection: getDefaultSectionForSlug(slug),
          }
          console.log(`Collection: ${slug}`, item)
          return item
        })

      console.log('Returning collections:', collections.length)
      return Response.json({ collections })
    } catch (error) {
      console.error('Collection manager endpoint error:', error)
      return Response.json({ error: `Failed to load collections: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 })
    }
  },
}
