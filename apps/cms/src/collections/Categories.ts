import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { isCollectionEnabled } from '../lib/collectionVisibility'
import { getPreviewUrl } from '../utils/preview'

export const Categories: CollectionConfig = {
  slug: 'categories',

  admin: {
    useAsTitle: 'title',
    group: 'Taxonomy',
    defaultColumns: ['title', 'slug', 'parent', 'totalCount', 'updatedAt'],
    description: 'Hierarchical categories shared across Posts, Archive Items, Events, People, and Custom Items',
    preview: (doc) => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      return `${baseUrl}/categories/${doc.slug}`
    },
    livePreview: {
      url: ({ data }) => {
        if (!data?.slug) return null
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        return `${baseUrl}/categories/${data.slug}`
      },
    },
  },

  // Enable versions (without drafts for taxonomy items)
  versions: {
    maxPerDoc: 10,
  },

  access: {
    read: async ({ req }) => (await isCollectionEnabled(req.payload, 'categories')),
    create: async ({ req }) => (await isCollectionEnabled(req.payload, 'categories')) && Boolean(req.user),
    update: async ({ req }) => (await isCollectionEnabled(req.payload, 'categories')) && Boolean(req.user),
    delete: async ({ req }) => (await isCollectionEnabled(req.payload, 'categories')) && req.user?.role === 'admin',
  },

  // Hooks for revalidation and counting
  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        try {
          // Count usage across all collections that use categories
          const [postsCount, archiveItemsCount, eventsCount, peopleCount, customItemsCount] = await Promise.all([
            req.payload.count({
              collection: 'posts',
              where: { categories: { in: [doc.id] } },
            }),
            req.payload.count({
              collection: 'archive-items',
              where: { categories: { in: [doc.id] } },
            }),
            req.payload.count({
              collection: 'events',
              where: { categories: { in: [doc.id] } },
            }),
            req.payload.count({
              collection: 'people',
              where: { categories: { in: [doc.id] } },
            }),
            req.payload.count({
              collection: 'custom-items',
              where: { categories: { in: [doc.id] } },
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
        const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        try {
          await fetch(`${revalidateUrl}/api/revalidate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              secret: process.env.REVALIDATION_SECRET,
              collection: 'categories',
              slug: doc.slug,
              // Invalidate all archive pages that might use this category
              tags: [
                `taxonomy:category:${doc.slug}`,
                'archive:posts',
                'archive:archive-items',
                'archive:events',
                'archive:people',
                'archive:custom-items',
              ],
            }),
          })
          req.payload.logger.info(`Revalidated category: ${doc.slug}`)
        } catch (error) {
          req.payload.logger.error(`Failed to revalidate category: ${doc.slug}`)
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
      label: 'Category Name',
    },
    slugField('title', '/categories'),
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Parent Category',
      admin: {
        description: 'Optional: Select a parent category to create a hierarchy',
      },
      filterOptions: ({ id }) => ({
        id: { not_equals: id },
      }),
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
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
