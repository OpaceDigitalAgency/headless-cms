import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const People: CollectionConfig = {
  slug: 'people',

  admin: {
    useAsTitle: 'name',
    group: 'Museum',
    defaultColumns: ['name', 'role', 'birthDate', '_status', 'updatedAt'],
    description: 'Historical figures, artists, and notable people',
    preview: (doc) => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
      return `${baseUrl}/preview/people/${doc.slug}`
    },
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        return `${baseUrl}/preview/people/${data.slug}`
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
                collection: 'people',
                slug: doc.slug,
              }),
            })
            req.payload.logger.info(`Revalidated person: ${doc.slug}`)
          } catch (error) {
            req.payload.logger.error(`Failed to revalidate person: ${doc.slug}`)
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
      label: 'Full Name',
    },
    slugField('name'),
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Biography',
          fields: [
            {
              name: 'biography',
              type: 'richText',
              label: 'Biography',
            },
            {
              name: 'shortBio',
              type: 'textarea',
              label: 'Short Biography',
              admin: {
                description: 'Brief description for listings',
              },
            },
          ],
        },
        {
          label: 'Dates & Places',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'birthDate',
                  type: 'text',
                  label: 'Birth Date',
                  admin: {
                    description: 'e.g., "1452" or "circa 1450"',
                    width: '50%',
                  },
                },
                {
                  name: 'deathDate',
                  type: 'text',
                  label: 'Death Date',
                  admin: {
                    description: 'Leave empty if still living',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'birthPlace',
              type: 'relationship',
              relationTo: 'places',
              label: 'Birth Place',
            },
            {
              name: 'deathPlace',
              type: 'relationship',
              relationTo: 'places',
              label: 'Death Place',
            },
            {
              name: 'nationality',
              type: 'text',
              label: 'Nationality',
            },
          ],
        },
        {
          label: 'Career',
          fields: [
            {
              name: 'role',
              type: 'select',
              hasMany: true,
              label: 'Roles',
              options: [
                { label: 'Artist', value: 'artist' },
                { label: 'Sculptor', value: 'sculptor' },
                { label: 'Architect', value: 'architect' },
                { label: 'Craftsman', value: 'craftsman' },
                { label: 'Patron', value: 'patron' },
                { label: 'Collector', value: 'collector' },
                { label: 'Ruler', value: 'ruler' },
                { label: 'Scholar', value: 'scholar' },
                { label: 'Other', value: 'other' },
              ],
            },
            {
              name: 'movements',
              type: 'array',
              label: 'Artistic Movements',
              fields: [
                {
                  name: 'movement',
                  type: 'text',
                },
              ],
            },
            {
              name: 'influences',
              type: 'relationship',
              relationTo: 'people',
              hasMany: true,
              label: 'Influenced By',
              filterOptions: ({ id }) => ({
                id: {
                  not_equals: id,
                },
              }),
            },
            {
              name: 'influenced',
              type: 'relationship',
              relationTo: 'people',
              hasMany: true,
              label: 'Influenced',
              filterOptions: ({ id }) => ({
                id: {
                  not_equals: id,
                },
              }),
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
              on: 'people',
              label: 'Related Artifacts',
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
      label: 'Featured Person',
      admin: {
        position: 'sidebar',
      },
    },
  ],

  timestamps: true,
}
