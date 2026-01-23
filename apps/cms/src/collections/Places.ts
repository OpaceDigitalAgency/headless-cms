import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { getPreviewUrl } from '../utils/preview'
import { isCollectionEnabled } from '../lib/collectionVisibility'
import { revalidatePlace } from '../lib/revalidate'

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

export const Places: CollectionConfig = {
  slug: 'places',
  labels: {
    singular: 'Place',
    plural: 'Places',
  },

  admin: {
    useAsTitle: 'name',
    group: 'Collections',
    defaultColumns: ['name', 'placeType', 'categories', '_status', 'updatedAt', 'preview'],
    description: 'Geographic locations, venues, and historical sites',
    preview: (doc) => getPreviewUrl({ collection: 'places', slug: doc.slug as string }),
    livePreview: {
      url: ({ data }) => getPreviewUrl({ collection: 'places', slug: data?.slug }),
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
      if (!(await isCollectionEnabled(req.payload, 'places'))) return false
      if (!req.user) {
        return {
          _status: {
            equals: 'published',
          },
        }
      }
      return true
    },
    create: async ({ req }) => (await isCollectionEnabled(req.payload, 'places')) && Boolean(req.user),
    update: async ({ req }) => (await isCollectionEnabled(req.payload, 'places')) && Boolean(req.user),
    delete: async ({ req }) => (await isCollectionEnabled(req.payload, 'places')) && req.user?.role === 'admin',
  },

  // Hooks for revalidation - direct calls since we're in the same Next.js app
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        if (doc._status === 'published') {
          // Direct revalidation - no webhook needed
          revalidatePlace(doc.slug, previousDoc?.slug)
          req.payload.logger.info(`Revalidated place: ${doc.slug}`)
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
          label: 'Details',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Place Name',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Featured Image',
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Short Description',
              admin: {
                description: 'Brief summary for listings and SEO',
              },
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Full Description',
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
            // Note: 'point' field type requires PostGIS extension
            // Temporarily disabled for Railway deployment
            // {
            //   name: 'location',
            //   type: 'point',
            //   label: 'Geographic Coordinates',
            // },
            {
              name: 'address',
              type: 'group',
              label: 'Address',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  label: 'Street Address',
                },
                {
                  name: 'street2',
                  type: 'text',
                  label: 'Address Line 2',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'city',
                      type: 'text',
                    },
                    {
                      name: 'region',
                      type: 'text',
                      label: 'State/Region',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'postalCode',
                      type: 'text',
                    },
                    {
                      name: 'country',
                      type: 'text',
                    },
                  ],
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
          label: 'Contact',
          description: 'For venues, stores, and attractions',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Phone',
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
            },
            {
              name: 'website',
              type: 'text',
              label: 'Website',
            },
            {
              name: 'hours',
              type: 'array',
              label: 'Opening Hours',
              fields: [
                {
                  name: 'day',
                  type: 'select',
                  options: [
                    { label: 'Monday', value: 'monday' },
                    { label: 'Tuesday', value: 'tuesday' },
                    { label: 'Wednesday', value: 'wednesday' },
                    { label: 'Thursday', value: 'thursday' },
                    { label: 'Friday', value: 'friday' },
                    { label: 'Saturday', value: 'saturday' },
                    { label: 'Sunday', value: 'sunday' },
                  ],
                },
                { name: 'open', type: 'text', label: 'Open' },
                { name: 'close', type: 'text', label: 'Close' },
                { name: 'closed', type: 'checkbox', label: 'Closed' },
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
              on: 'origins',
              label: 'Related Items',
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
      defaultValue: 'location',
      options: [
        { label: 'Location Page', value: 'location' },
        { label: 'Map View', value: 'map' },
        { label: 'Directory Card', value: 'card' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Select the display template',
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
        { label: 'Venue', value: 'venue' },
        { label: 'Store', value: 'store' },
        { label: 'Museum', value: 'museum' },
        { label: 'Archaeological Site', value: 'archaeological' },
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
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Cell: '/components/PreviewButtonCells/PlacesPreviewCell',
        },
        condition: () => false, // Hide from form, only show in list
      },
    },
  ],

  timestamps: true,
}
