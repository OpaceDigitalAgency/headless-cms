import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Artifacts: CollectionConfig = {
  slug: 'artifacts',

  admin: {
    useAsTitle: 'title',
    group: 'Museum',
    defaultColumns: ['title', 'collections', 'people', '_status', 'updatedAt'],
    description: 'Museum artifacts and objects',
    preview: (doc) => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
      return `${baseUrl}/preview/artifacts/${doc.slug}`
    },
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        return `${baseUrl}/preview/artifacts/${data.slug}`
      },
    },
  },

  // Enable versions and drafts
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },

  // Access control
  access: {
    read: ({ req: { user } }) => {
      if (!user) {
        return {
          _status: {
            equals: 'published',
          },
        }
      }
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
                collection: 'artifacts',
                slug: doc.slug,
              }),
            })
            req.payload.logger.info(`Revalidated artifact: ${doc.slug}`)
          } catch (error) {
            req.payload.logger.error(`Failed to revalidate artifact: ${doc.slug}`)
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
      label: 'Artifact Title',
    },
    slugField(),
    {
      name: 'template',
      type: 'select',
      required: true,
      defaultValue: 'detail',
      options: [
        { label: 'Detail View', value: 'detail' },
        { label: 'Timeline View', value: 'timeline' },
        { label: 'Gallery View', value: 'list' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Select the display template',
      },
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
              name: 'media',
              type: 'array',
              label: 'Media Gallery',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
            {
              name: 'dimensions',
              type: 'group',
              label: 'Dimensions',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'height',
                      type: 'number',
                      label: 'Height (cm)',
                    },
                    {
                      name: 'width',
                      type: 'number',
                      label: 'Width (cm)',
                    },
                    {
                      name: 'depth',
                      type: 'number',
                      label: 'Depth (cm)',
                    },
                  ],
                },
                {
                  name: 'weight',
                  type: 'number',
                  label: 'Weight (kg)',
                },
              ],
            },
            {
              name: 'materials',
              type: 'array',
              label: 'Materials',
              fields: [
                {
                  name: 'material',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Provenance',
          fields: [
            {
              name: 'dateCreated',
              type: 'text',
              label: 'Date Created',
              admin: {
                description: 'e.g., "circa 1500 BCE" or "1920-1925"',
              },
            },
            {
              name: 'dateAcquired',
              type: 'date',
              label: 'Date Acquired',
            },
            {
              name: 'provenance',
              type: 'richText',
              label: 'Provenance History',
            },
            {
              name: 'accessionNumber',
              type: 'text',
              label: 'Accession Number',
              unique: true,
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'people',
              type: 'relationship',
              relationTo: 'people',
              hasMany: true,
              label: 'Related People',
              admin: {
                description: 'Artists, creators, previous owners, etc.',
              },
            },
            {
              name: 'places',
              type: 'relationship',
              relationTo: 'places',
              hasMany: true,
              label: 'Related Places',
              admin: {
                description: 'Origin, discovery location, etc.',
              },
            },
            {
              name: 'collections',
              type: 'relationship',
              relationTo: 'museum-collections',
              hasMany: true,
              label: 'Collections',
              admin: {
                description: 'Museum collections this artifact belongs to',
              },
            },
            {
              name: 'relatedArtifacts',
              type: 'relationship',
              relationTo: 'artifacts',
              hasMany: true,
              label: 'Related Artifacts',
              filterOptions: ({ id }) => ({
                id: {
                  not_equals: id,
                },
              }),
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
      label: 'Featured Artifact',
      admin: {
        position: 'sidebar',
        description: 'Show on homepage and featured sections',
      },
    },
    {
      name: 'onDisplay',
      type: 'checkbox',
      label: 'Currently on Display',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'gallery',
      type: 'text',
      label: 'Gallery Location',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.onDisplay,
      },
    },
  ],
}
