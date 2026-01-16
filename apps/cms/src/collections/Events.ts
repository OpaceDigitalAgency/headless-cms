import type { CollectionConfig } from 'payload'
import { getPreviewUrl } from '../utils/preview'
import { eventTemplate } from '../collection-templates/templates/event'

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
    preview: (doc) => getPreviewUrl({ collection: 'events', slug: doc.slug }),
    livePreview: {
      url: ({ data }) => getPreviewUrl({ collection: 'events', slug: data?.slug }),
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

  fields: eventTemplate.fields,

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
                collection: 'events',
                slug: doc.slug,
              }),
            })
          } catch (error) {
            console.error('Failed to revalidate events:', error)
          }
        }
        return doc
      },
    ],
  },
}

