import type { Endpoint } from 'payload'
import { getDefaultSectionForSlug } from '../lib/navigationConfig'

export const collectionManagerEndpoint: Endpoint = {
  path: '/admin/collection-manager',
  method: 'get',
  handler: async (req) => {
    try {
      const { payload } = req
      const collections = payload.config.collections.map((collection) => {
        const slug = collection.slug
        return {
          slug,
          label: collection.labels?.plural || slug,
          hidden: Boolean(collection.admin?.hidden),
          defaultSection: getDefaultSectionForSlug(slug),
        }
      })

      return Response.json({ collections })
    } catch (error) {
      console.error('Collection manager endpoint error:', error)
      return Response.json({ error: 'Failed to load collections' }, { status: 500 })
    }
  },
}
