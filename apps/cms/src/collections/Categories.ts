import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'parent', 'updatedAt'],
    description: 'Organize content with categories',
  },

  // Enable versions (without drafts for taxonomy items)
  versions: {
    maxPerDoc: 10,
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  // Hooks for revalidation
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        try {
          await fetch(`${revalidateUrl}/api/revalidate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              secret: process.env.REVALIDATION_SECRET,
              collection: 'categories',
              slug: doc.slug,
              // Also invalidate archive pages
              tags: [`taxonomy:category:${doc.slug}`, 'archive:posts'],
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
    slugField(),
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
  ],

  timestamps: true,
}
