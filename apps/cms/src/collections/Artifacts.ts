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

export const Artifacts: CollectionConfig = {
  slug: 'artifacts',

  admin: {
    useAsTitle: 'title',
    group: 'Museum',
    defaultColumns: ['title', 'collections', 'categories', '_status', 'updatedAt'],
    description: 'Museum artifacts and archive items with flexible content sections',
    preview: (doc) => getPreviewUrl({ collection: 'artifacts', slug: doc.slug }),
    livePreview: {
      url: ({ data }) => getPreviewUrl({ collection: 'artifacts', slug: data?.slug }),
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
        { label: 'Gallery View', value: 'gallery' },
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
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Featured Image',
            },
            {
              name: 'excerpt',
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
                      type: 'text',
                      label: 'Height',
                    },
                    {
                      name: 'width',
                      type: 'text',
                      label: 'Width',
                    },
                    {
                      name: 'depth',
                      type: 'text',
                      label: 'Depth',
                    },
                  ],
                },
                {
                  name: 'weight',
                  type: 'text',
                  label: 'Weight',
                },
              ],
            },
            {
              name: 'materials',
              type: 'textarea',
              label: 'Materials',
            },
            {
              name: 'condition',
              type: 'text',
              label: 'Condition',
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
          description: 'Add flexible content blocks like galleries, timelines, and more',
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
