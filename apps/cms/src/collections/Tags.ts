import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Tags: CollectionConfig = {
  slug: 'tags',

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'postsCount', 'updatedAt'],
    description: 'Organize content with tags',
  },

  versions: {
    maxPerDoc: 10,
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        try {
          const result = await req.payload.count({
            collection: 'posts',
            where: {
              tags: {
                in: [doc.id],
              },
            },
          })
          return {
            ...doc,
            postsCount: result.totalDocs,
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
              tags: [`taxonomy:tag:${doc.slug}`, 'archive:posts'],
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
      name: 'postsCount',
      type: 'number',
      label: 'Assigned Posts',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],

  timestamps: true,
}
