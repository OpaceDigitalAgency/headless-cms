import type { CollectionConfig } from 'payload'
import { getPreviewUrl } from '../utils/preview'
import { archiveItemTemplate } from '../collection-templates/templates/archive-item'
import { isCollectionEnabled } from '../lib/collectionVisibility'
import { revalidateArchiveItem } from '../lib/revalidate'

export const ArchiveItems: CollectionConfig = {
  slug: 'archive-items',
  labels: {
    singular: 'Archive Item',
    plural: 'Archive Items',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Archive',
    defaultColumns: ['title', '_status', 'updatedAt', 'preview'],
    description: 'Archive items such as gallery pieces, portfolio items, or collectibles',
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
    read: async ({ req }) => {
      if (!(await isCollectionEnabled(req.payload, 'archive-items'))) return false
      if (!req.user) return { _status: { equals: 'published' } }
      return true
    },
    create: async ({ req }) => (await isCollectionEnabled(req.payload, 'archive-items')) && Boolean(req.user),
    update: async ({ req }) => (await isCollectionEnabled(req.payload, 'archive-items')) && Boolean(req.user),
    delete: async ({ req }) => (await isCollectionEnabled(req.payload, 'archive-items')) && req.user?.role === 'admin',
  },

  fields: archiveItemTemplate.fields,

  // Hooks for revalidation - direct calls since we're in the same Next.js app
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        if (doc._status === 'published') {
          // Direct revalidation - no webhook needed
          revalidateArchiveItem(doc.slug, previousDoc?.slug)
          req.payload.logger.info(`Revalidated archive item: ${doc.slug}`)
        }
        return doc
      },
    ],
  },
}
