import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { getPreviewUrl } from '../utils/preview'
import { isCollectionEnabled } from '../lib/collectionVisibility'
import { revalidatePerson } from '../lib/revalidate'

// Import all blocks for flexible content
import { heroBlock } from '../blocks/Hero'
import { contentBlock } from '../blocks/Content'
import { mediaBlock } from '../blocks/Media'
import { ctaBlock } from '../blocks/CallToAction'
import { archiveBlock } from '../blocks/Archive'
import { formBlock } from '../blocks/Form'
import { quoteBlock } from '../blocks/Quote'
import { featuresBlock } from '../blocks/Features'
import { statsBlock } from '../blocks/Stats'
import { logoCloudBlock } from '../blocks/LogoCloud'
import { testimonialsBlock } from '../blocks/Testimonials'
import { faqBlock } from '../blocks/FAQ'
import { pricingBlock } from '../blocks/Pricing'
import { teamBlock } from '../blocks/Team'
import { embedBlock } from '../blocks/Embed'
import { spacerBlock } from '../blocks/Spacer'
import { htmlBlock } from '../blocks/HTML'
import { galleryBlock } from '../blocks/Gallery'
import { gridBlock } from '../blocks/Grid'
import { timelineBlock } from '../blocks/Timeline'

export const People: CollectionConfig = {
  slug: 'people',
  labels: {
    singular: 'Person',
    plural: 'People',
  },

  admin: {
    useAsTitle: 'name',
    group: 'Collections',
    defaultColumns: ['name', 'role', 'categories', '_status', 'updatedAt', 'preview'],
    description: 'Historical figures, artists, team members, and notable people',
    preview: (doc) => getPreviewUrl({ collection: 'people', slug: doc.slug }),
    livePreview: {
      url: ({ data }) => getPreviewUrl({ collection: 'people', slug: data?.slug }),
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
    read: async ({ req }) => {
      if (!(await isCollectionEnabled(req.payload, 'people'))) return false
      if (!req.user) {
        return {
          _status: {
            equals: 'published',
          },
        }
      }
      return true
    },
    create: async ({ req }) => (await isCollectionEnabled(req.payload, 'people')) && Boolean(req.user),
    update: async ({ req }) => (await isCollectionEnabled(req.payload, 'people')) && Boolean(req.user),
    delete: async ({ req }) => (await isCollectionEnabled(req.payload, 'people')) && req.user?.role === 'admin',
  },

  // Hooks for revalidation - direct calls since we're in the same Next.js app
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        if (doc._status === 'published') {
          // Direct revalidation - no webhook needed
          revalidatePerson(doc.slug, previousDoc?.slug)
          req.payload.logger.info(`Revalidated person: ${doc.slug}`)
        }
        return doc
      },
    ],
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Biography',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Full Name',
            },
            {
              name: 'portrait',
              type: 'upload',
              relationTo: 'media',
              label: 'Portrait',
            },
            {
              name: 'shortBio',
              type: 'textarea',
              label: 'Short Biography',
              admin: {
                description: 'Brief description for listings and SEO',
              },
            },
            {
              name: 'biography',
              type: 'richText',
              label: 'Full Biography',
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
                { label: 'Team Member', value: 'team' },
                { label: 'Contributor', value: 'contributor' },
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
          label: 'Contact',
          description: 'For living people or team members',
          fields: [
            {
              name: 'email',
              type: 'email',
              label: 'Email',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Phone',
            },
            {
              name: 'website',
              type: 'text',
              label: 'Website',
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Links',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter/X', value: 'twitter' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'Other', value: 'other' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'relatedItems',
              type: 'join',
              collection: 'archive-items',
              on: 'creators',
              label: 'Related Items',
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              label: 'Categories',
              admin: {
                description: 'Select one or more categories',
              },
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags',
              hasMany: true,
              label: 'Tags',
              admin: {
                description: 'Add tags for filtering and search',
              },
            },
          ],
        },
        {
          label: 'Content Sections',
          description: 'Add flexible content blocks',
          fields: [
            {
              name: 'contentBlocks',
              type: 'blocks',
              label: 'Additional Sections',
              blocks: [
                heroBlock,
                contentBlock,
                mediaBlock,
                ctaBlock,
                quoteBlock,
                featuresBlock,
                statsBlock,
                logoCloudBlock,
                testimonialsBlock,
                faqBlock,
                pricingBlock,
                teamBlock,
                embedBlock,
                archiveBlock,
                formBlock,
                galleryBlock,
                gridBlock,
                timelineBlock,
                spacerBlock,
                htmlBlock,
              ],
              admin: {
                description: 'Add and arrange content sections',
              },
            },
          ],
        },
      ],
    },
    slugField('name'),
    {
      name: 'template',
      type: 'select',
      label: 'Display Template',
      defaultValue: 'profile',
      options: [
        { label: 'Profile Page', value: 'profile' },
        { label: 'Team Card', value: 'card' },
        { label: 'Biography', value: 'biography' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Select the display template',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Person',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Cell: '/components/PreviewButtonCells/PeoplePreviewCell',
        },
        condition: () => false, // Hide from form, only show in list
      },
    },
  ],

  timestamps: true,
}
