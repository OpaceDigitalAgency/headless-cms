import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Places: CollectionConfig = {
  slug: 'places',

  admin: {
    useAsTitle: 'name',
    group: 'Museum',
    defaultColumns: ['name', 'country', '_status', 'updatedAt'],
    description: 'Geographic locations and historical sites',
    preview: (doc) => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
      return `${baseUrl}/preview/places/${doc.slug}`
    },
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        return `${baseUrl}/preview/places/${data.slug}`
      },
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
                collection: 'places',
                slug: doc.slug,
              }),
            })
            req.payload.logger.info(`Revalidated place: ${doc.slug}`)
          } catch (error) {
            req.payload.logger.error(`Failed to revalidate place: ${doc.slug}`)
          }
        }
        return doc
      },
    ],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Place Name',
    },
    slugField('name'),
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
              name: 'historicalSignificance',
              type: 'richText',
              label: 'Historical Significance',
            },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              name: 'location',
              type: 'point',
              label: 'Geographic Coordinates',
            },
            {
              name: 'address',
              type: 'group',
              label: 'Address',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                },
                {
                  name: 'city',
                  type: 'text',
                },
                {
                  name: 'region',
                  type: 'text',
                  label: 'State/Region',
                },
                {
                  name: 'country',
                  type: 'text',
                },
                {
                  name: 'postalCode',
                  type: 'text',
                },
              ],
            },
            {
              name: 'historicalNames',
              type: 'array',
              label: 'Historical Names',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'period',
                  type: 'text',
                  admin: {
                    description: 'e.g., "Ancient", "Medieval", "1500-1800"',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'relatedArtifacts',
              type: 'join',
              collection: 'artifacts',
              on: 'places',
              label: 'Related Artifacts',
            },
            {
              name: 'relatedPeople',
              type: 'join',
              collection: 'people',
              on: 'birthPlace',
              label: 'People Born Here',
            },
            {
              name: 'relatedPlaces',
              type: 'relationship',
              relationTo: 'places',
              hasMany: true,
              label: 'Related Places',
              filterOptions: ({ id }) => ({
                id: {
                  not_equals: id,
                },
              }),
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              label: 'Image Gallery',
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
      name: 'country',
      type: 'text',
      label: 'Country',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'placeType',
      type: 'select',
      label: 'Place Type',
      options: [
        { label: 'City', value: 'city' },
        { label: 'Region', value: 'region' },
        { label: 'Country', value: 'country' },
        { label: 'Archaeological Site', value: 'archaeological' },
        { label: 'Museum', value: 'museum' },
        { label: 'Historical Site', value: 'historical' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Place',
      admin: {
        position: 'sidebar',
      },
    },
  ],

  timestamps: true,
}
