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

export const Posts: CollectionConfig = {
  slug: 'posts',

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'author', 'categories', '_status', 'publishedAt', 'preview'],
    description: 'Create and manage blog posts with flexible content sections',
    preview: (doc) => getPreviewUrl({ collection: 'posts', slug: doc.slug }),
    livePreview: {
      url: ({ data }) => getPreviewUrl({ collection: 'posts', slug: data?.slug }),
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
          const revalidateTags = ['posts', `posts:${doc.slug}`, 'archive:posts']
          const resolveSlug = async (value: any, collection: 'categories' | 'tags') => {
            if (!value) return null
            if (typeof value === 'object' && 'slug' in value) {
              return value.slug as string
            }
            if (typeof value === 'string' || typeof value === 'number') {
              try {
                const result = await req.payload.findByID({ collection, id: value })
                return result?.slug || null
              } catch {
                return null
              }
            }
            return null
          }
          try {
            if (Array.isArray(doc.categories)) {
              for (const category of doc.categories) {
                const slug = await resolveSlug(category, 'categories')
                if (slug) revalidateTags.push(`taxonomy:category:${slug}`)
              }
            }
            if (Array.isArray(doc.tags)) {
              for (const tag of doc.tags) {
                const slug = await resolveSlug(tag, 'tags')
                if (slug) revalidateTags.push(`taxonomy:tag:${slug}`)
              }
            }
            await fetch(`${revalidateUrl}/api/revalidate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                secret: process.env.REVALIDATION_SECRET,
                collection: 'posts',
                slug: doc.slug,
                tags: revalidateTags,
              }),
            })
            req.payload.logger.info(`Revalidated post: ${doc.slug}`)
          } catch (error) {
            req.payload.logger.error(`Failed to revalidate post: ${doc.slug}`)
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
      label: 'Post Title',
    },
    slugField('title', '/blog'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
              label: 'Excerpt',
              admin: {
                description: 'Brief summary for listings and SEO',
              },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Main Content',
              required: true,
            },
          ],
        },
        {
          label: 'Content Sections',
          description: 'Add flexible content blocks like galleries, CTAs, and more',
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
                description: 'Add and arrange content sections below the main content',
              },
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
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              label: 'Related Posts',
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
      name: 'template',
      type: 'select',
      label: 'Post Template',
      defaultValue: 'article',
      options: [
        { label: 'Standard Article', value: 'article' },
        { label: 'Feature Story', value: 'feature' },
        { label: 'News Brief', value: 'brief' },
        { label: 'Long Form', value: 'longform' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Select the display template',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            // Set publishedAt when first published
            if (siblingData._status === 'published' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Post',
      admin: {
        position: 'sidebar',
        description: 'Show in featured sections',
      },
    },
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Cell: '/components/PreviewButtonCell',
        },
        condition: () => false, // Hide from form, only show in list
      },
    },
  ],
}
