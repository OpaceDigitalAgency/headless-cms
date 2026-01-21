import type { CollectionConfig } from 'payload'
import { getPreviewUrl } from '../utils/preview'
import { slugField } from '../fields/slug'
import { productTemplate } from '../collection-templates/templates/product'
import { isCollectionEnabled } from '../lib/collectionVisibility'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Shop',
    defaultColumns: ['title', '_status', 'updatedAt'],
    description: 'Products, services, or inventory items with pricing and variants',
    preview: (doc) => getPreviewUrl({ collection: 'products', slug: doc.slug }),
    livePreview: {
      url: ({ data }) => getPreviewUrl({ collection: 'products', slug: data?.slug }),
    },
  },

  versions: {
    drafts: {
      autosave: { interval: 300 },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },

  access: {
    read: async ({ req }) => {
      if (!(await isCollectionEnabled(req.payload, 'products'))) return false
      if (!req.user) return { _status: { equals: 'published' } }
      return true
    },
    create: async ({ req }) => (await isCollectionEnabled(req.payload, 'products')) && Boolean(req.user),
    update: async ({ req }) => (await isCollectionEnabled(req.payload, 'products')) && Boolean(req.user),
    delete: async ({ req }) => (await isCollectionEnabled(req.payload, 'products')) && req.user?.role === 'admin',
  },

  fields: productTemplate.fields,

  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (doc._status === 'published') {
          const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
          try {
            await fetch(`${revalidateUrl}/api/revalidate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                secret: process.env.REVALIDATION_SECRET,
                collection: 'products',
                slug: doc.slug,
              }),
            })
          } catch (error) {
            console.error('Failed to revalidate products:', error)
          }
        }
        return doc
      },
    ],
  },
}
