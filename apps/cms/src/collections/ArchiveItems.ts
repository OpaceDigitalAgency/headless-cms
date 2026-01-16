import type { CollectionConfig } from 'payload'
import { getPreviewUrl } from '../utils/preview'
import { archiveItemTemplate } from '../collection-templates/templates/archive-item'

export const ArchiveItems: CollectionConfig = {
  slug: 'archive-items',
  labels: {
    singular: 'Archive Item',
    plural: 'Archive Items',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Archive',
    defaultColumns: ['title', '_status', 'updatedAt'],
    description: 'Museum artifacts, gallery pieces, portfolio items, or collectibles',
    preview: (doc) => getPreviewUrl({ collection: 'archive-items', slug: doc.slug }),
    livePreview: {
      url: ({ data }) => getPreviewUrl({ collection: 'archive-items', slug: data?.slug }),
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
    read: ({ req: { user } }) => {
      if (!user) return { _status: { equals: 'published' } }
      return true
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  fields: archiveItemTemplate.fields,

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
                collection: 'archive-items',
                slug: doc.slug,
              }),
            })
          } catch (error) {
            console.error('Failed to revalidate archive-items:', error)
          }
        }
        return doc
      },
    ],
  },
}

