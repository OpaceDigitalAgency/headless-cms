import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { getPreviewUrl } from '../utils/preview'

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

  admin: {
    useAsTitle: (doc) => doc?.name || 'Untitled Place',
    group: 'Museum',
    defaultColumns: ['name', 'placeType', 'categories', '_status', 'updatedAt'],
    description: 'Geographic locations, venues, and historical sites',
    preview: (doc) => getPreviewUrl({ collection: 'places', slug: doc.slug }),
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
          description: 'For venues, stores, and museums',
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
              type: 'array',
              label: 'Tags',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                },
              ],
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
        {
          label: 'SEO',
          name: 'meta',
          fields: [],
        },
      ],
    },
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
  ],

  timestamps: true,
}
