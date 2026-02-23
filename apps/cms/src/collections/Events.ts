import type { CollectionConfig } from 'payload'
import { withLivePreview } from '../utils/livePreviewConfig'
import { eventTemplate } from '../collection-templates/templates/event'
import { isCollectionEnabled } from '../lib/collectionVisibility'
import { revalidateEvent } from '../lib/revalidate'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'startDate', '_status', 'updatedAt', 'preview'],
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

  fields: eventTemplate.fields || [],

  // Hooks for revalidation - direct calls since we're in the same Next.js app
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        if (doc._status === 'published') {
          // Direct revalidation - no webhook needed
          revalidateEvent(doc.slug, previousDoc?.slug)
          req.payload.logger.info(`Revalidated event: ${doc.slug}`)
        }
        return doc
      },
    ],
  },
}
