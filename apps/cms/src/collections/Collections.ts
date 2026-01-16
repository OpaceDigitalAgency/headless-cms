import type { CollectionConfig } from 'payload'
import { getPreviewUrl } from '../utils/preview'
import { slugField } from '../fields/slug'

export const Collections: CollectionConfig = {
  slug: 'museum-collections',

  admin: {
    useAsTitle: 'title',
    group: 'Museum',
    defaultColumns: ['title', 'parent', 'artifactCount', '_status', 'updatedAt'],
    description: 'Museum collections and galleries (hierarchical)',
    preview: (doc) => getPreviewUrl({ collection: 'collections', slug: doc.slug }),
    livePreview: {
      url: ({ data }) => getPreviewUrl({ collection: 'collections', slug: data?.slug }),
    },
  },

  // Enable versions and drafts
  versions: {
    drafts: {
      autosave: {
        interval: 300, // 5 minutes
      },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },

  // Access control
  access: {
    read: ({ req: { user } }) => {
      // Published items are public
      if (!user) {
        return {
          _status: {
            equals: 'published',
          },
        }
      }
      // Logged in users can see all
      return true
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  // Hooks for revalidation
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
                collection: 'museum-collections',
                slug: doc.slug,
              }),
            })
            req.payload.logger.info(`Revalidated collection: ${doc.slug}`)
          } catch (error) {
            req.payload.logger.error(`Failed to revalidate collection: ${doc.slug}`)
          }
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
      label: 'Collection Title',
    },
    slugField(),
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Short Description',
              admin: {
                description: 'Brief description for listings and cards',
              },
            },
            {
              name: 'curator',
              type: 'relationship',
              relationTo: 'users',
              label: 'Curator',
            },
          ],
        },
        {
          label: 'Hierarchy',
          fields: [
          ],
        },
        {
          label: 'Artifacts',
          fields: [
            {
              name: 'artifacts',
              type: 'join',
              collection: 'artifacts',
              on: 'collections',
              label: 'Artifacts in Collection',
            },
            {
              name: 'featuredArtifacts',
              type: 'relationship',
              relationTo: 'artifacts',
              hasMany: true,
              label: 'Featured Artifacts',
              admin: {
                description: 'Select artifacts to highlight in this collection',
              },
            },
          ],
        },
        {
          label: 'Display',
          fields: [
            {
              name: 'displayOrder',
              type: 'number',
              label: 'Display Order',
              admin: {
                description: 'Lower numbers appear first',
              },
            },
            {
              name: 'template',
              type: 'select',
              label: 'Display Template',
              defaultValue: 'list',
              options: [
                { label: 'List View', value: 'list' },
                { label: 'Grid View', value: 'grid' },
                { label: 'Timeline View', value: 'timeline' },
                { label: 'Gallery View', value: 'gallery' },
              ],
            },
            {
              name: 'color',
              type: 'text',
              label: 'Theme Color',
              admin: {
                description: 'Hex color code for collection branding (e.g., #3B82F6)',
              },
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Collection',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'artifactCount',
      type: 'number',
      label: 'Artifact Count',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-calculated',
      },
      hooks: {
        beforeChange: [
          async ({ req, data }) => {
            // This would be calculated via a hook or virtual field
            // For now, return existing value
            return data?.artifactCount || 0
          },
        ],
      },
    },
  ],

  timestamps: true,
}
