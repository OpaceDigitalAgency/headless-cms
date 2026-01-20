import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { isCollectionEnabled } from '../lib/collectionVisibility'
import { getPreviewUrl } from '../utils/preview'

export const Tags: CollectionConfig = {
  slug: 'tags',

  admin: {
    useAsTitle: 'title',
    group: 'Taxonomy',
    defaultColumns: ['title', 'slug', 'totalCount', 'updatedAt'],
    description: 'Flat tags shared across Posts, Archive Items, Events, People, and Custom Items',
    preview: (doc) => getPreviewUrl({ collection: 'tags', slug: doc.slug }),
    livePreview: {
      url: ({ data }) => {
        if (!data?.slug) return null
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        return `${baseUrl}/tags/${data.slug}`
      },
    },
  },

  versions: {
    maxPerDoc: 10,
  },

  access: {
    read: async ({ req }) => (await isCollectionEnabled(req.payload, 'tags')),
    create: async ({ req }) => (await isCollectionEnabled(req.payload, 'tags')) && Boolean(req.user),
    update: async ({ req }) => (await isCollectionEnabled(req.payload, 'tags')) && Boolean(req.user),
    delete: async ({ req }) => (await isCollectionEnabled(req.payload, 'tags')) && req.user?.role === 'admin',
  },

  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        try {
          // Count usage across all collections that use tags
          const [postsCount, archiveItemsCount, eventsCount, peopleCount, customItemsCount] = await Promise.all([
            req.payload.count({
              collection: 'posts',
              where: { tags: { in: [doc.id] } },
            }),
            req.payload.count({
              collection: 'archive-items',
              where: { tags: { in: [doc.id] } },
            }),
            req.payload.count({
              collection: 'events',
              where: { tags: { in: [doc.id] } },
            }),
            req.payload.count({
              collection: 'people',
              where: { tags: { in: [doc.id] } },
            }),
            req.payload.count({
              collection: 'custom-items',
              where: { tags: { in: [doc.id] } },
            }),
          ])

          const totalCount =
            postsCount.totalDocs +
            archiveItemsCount.totalDocs +
            eventsCount.totalDocs +
            peopleCount.totalDocs +
            customItemsCount.totalDocs

          return {
            ...doc,
            postsCount: postsCount.totalDocs,
            archiveItemsCount: archiveItemsCount.totalDocs,
            eventsCount: eventsCount.totalDocs,
            peopleCount: peopleCount.totalDocs,
            customItemsCount: customItemsCount.totalDocs,
            totalCount,
          }
        } catch {
          return doc
        }
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        try {
          await fetch(`${revalidateUrl}/api/revalidate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              secret: process.env.REVALIDATION_SECRET,
              collection: 'tags',
              slug: doc.slug,
              // Invalidate all archive pages that might use this tag
              tags: [
                `taxonomy:tag:${doc.slug}`,
                'archive:posts',
                'archive:archive-items',
                'archive:events',
                'archive:people',
                'archive:custom-items',
              ],
            }),
          })
          req.payload.logger.info(`Revalidated tag: ${doc.slug}`)
        } catch (error) {
          req.payload.logger.error(`Failed to revalidate tag: ${doc.slug}`)
        }
        return doc
      },
    ],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tag Name',
    },
    slugField(),
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'totalCount',
      type: 'number',
      label: 'Total Items',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Total items across all collections',
      },
    },
    {
      name: 'postsCount',
      type: 'number',
      label: 'Posts',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'archiveItemsCount',
      type: 'number',
      label: 'Archive Items',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'eventsCount',
      type: 'number',
      label: 'Events',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'peopleCount',
      type: 'number',
      label: 'People',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'customItemsCount',
      type: 'number',
      label: 'Custom Items',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],

  timestamps: true,
}
