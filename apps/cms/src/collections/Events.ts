import type { CollectionConfig } from 'payload'
import { withLivePreview } from '../utils/livePreviewConfig'
import { eventTemplate } from '../collection-templates/templates/event'
import { isCollectionEnabled } from '../lib/collectionVisibility'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'startDate', '_status', 'updatedAt'],
    description: 'Events, exhibitions, workshops, or performances with dates and venues',
    ...withLivePreview('events'),
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
      if (!(await isCollectionEnabled(req.payload, 'events'))) return false
      if (!req.user) return { _status: { equals: 'published' } }
      return true
    },
    create: async ({ req }) => (await isCollectionEnabled(req.payload, 'events')) && Boolean(req.user),
    update: async ({ req }) => (await isCollectionEnabled(req.payload, 'events')) && Boolean(req.user),
    delete: async ({ req }) => (await isCollectionEnabled(req.payload, 'events')) && req.user?.role === 'admin',
  },

  fields: eventTemplate.fields,

  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (doc._status === 'published') {
          const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
          const revalidateTags = ['events', `events:${doc.slug}`, 'archive:events']

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
                collection: 'events',
                slug: doc.slug,
                tags: revalidateTags,
              }),
            })
            req.payload.logger.info(`Revalidated event: ${doc.slug}`)
          } catch (error) {
            req.payload.logger.error(`Failed to revalidate event: ${doc.slug}`)
          }
        }
        return doc
      },
    ],
  },
}
