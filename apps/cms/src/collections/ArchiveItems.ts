import type { CollectionConfig } from 'payload'
import { getPreviewUrl } from '../utils/preview'
import { archiveItemTemplate } from '../collection-templates/templates/archive-item'
import { isCollectionEnabled } from '../lib/collectionVisibility'

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

  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (doc._status === 'published') {
          const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
          const revalidateTags = ['archive-items', `archive-items:${doc.slug}`, 'archive:archive-items']

          // Helper function to resolve category/tag slugs
          const resolveSlug = async (value: any, collection: 'categories' | 'tags') => {
            if (!value) return null
            if (typeof value === 'object' && 'slug' in value) {
              return value.slug as string
            }
            if (typeof value === 'string' || typeof value === 'number') {
              try {
                const result = await req.payload.findByID({ collection, id: value })
                return result?.slug || null
              } catch {
                return null
              }
            }
            return null
          }

          try {
            // Add category tags
            if (Array.isArray(doc.categories)) {
              for (const category of doc.categories) {
                const slug = await resolveSlug(category, 'categories')
                if (slug) revalidateTags.push(`taxonomy:category:${slug}`)
              }
            }

            // Add tag tags
            if (Array.isArray(doc.tags)) {
              for (const tag of doc.tags) {
                const slug = await resolveSlug(tag, 'tags')
                if (slug) revalidateTags.push(`taxonomy:tag:${slug}`)
              }
            }

            await fetch(`${revalidateUrl}/api/revalidate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                secret: process.env.REVALIDATION_SECRET,
                collection: 'archive-items',
                slug: doc.slug,
                tags: revalidateTags,
              }),
            })
            req.payload.logger.info(`Revalidated archive item: ${doc.slug}`)
          } catch (error) {
            req.payload.logger.error(`Failed to revalidate archive item: ${doc.slug}`)
          }
        }
        return doc
      },
    ],
  },
}
