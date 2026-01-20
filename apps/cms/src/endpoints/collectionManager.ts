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

      const collections = payload.config.collections.map((collection) => {
        const slug = collection.slug
        const item = {
          slug,
          label: collection.labels?.plural || slug,
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
