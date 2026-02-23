import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
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
import { contactFormBlock } from '../blocks/ContactForm'
import { socialLinksBlock } from '../blocks/SocialLinks'
import { videoFeatureBlock } from '../blocks/VideoFeature'
import { reusableBlock } from '../blocks/ReusableBlock'
import { getPreviewUrl } from '../utils/preview'
import { revalidatePage } from '../lib/revalidate'
import { fixBlockRelationshipPaths } from './hooks/fixBlockRelationshipPaths'

export const Pages: CollectionConfig = {
  slug: 'pages',

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'template', '_status', 'updatedAt', 'preview'],
    description: 'Build and manage all website pages using a drag-and-drop block builder. Each page is composed of content blocks (Hero, CTA, Features, FAQ, etc.). Supports drafts, scheduled publishing, version history, and real-time Live Preview.',
    preview: (doc) => getPreviewUrl({ collection: 'pages', slug: doc.slug as string }),
    livePreview: {
      url: ({ data }) => getPreviewUrl({ collection: 'pages', slug: data?.slug }),
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
      // Published pages are public
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

  // Hooks for revalidation - direct calls since we're in the same Next.js app
  hooks: {
    beforeChange: [
      fixBlockRelationshipPaths, // Auto-fix relationship paths when blocks are reordered
      async ({ data }) => {
        // Transform absolute URLs to relative URLs for environment portability (Localhost URL Trap fix)
        if (data.content && Array.isArray(data.content)) {
          const { transformBlockUrls } = await import('../lib/transformBlockUrls')
          data.content = transformBlockUrls(data.content)
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        try {
          if (doc._status === 'published') {
            req.payload.logger.info(`Validating page: ${doc.slug}`)
            await revalidatePage(doc.slug, previousDoc?.slug)
            req.payload.logger.info(`Revalidated page: ${doc.slug}`)
          }
        } catch (error) {
          req.payload.logger.error(`Error revalidating page ${doc?.slug}: ${error instanceof Error ? error.message : String(error)}`)
          // Don't throw — save still succeeds even if revalidation fails
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
          label: 'Hero',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Page Title',
            },
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  defaultValue: 'standard',
                  options: [
                    { label: 'Standard', value: 'standard' },
                    { label: 'Minimal', value: 'minimal' },
                    { label: 'Full Screen', value: 'fullscreen' },
                    { label: 'None', value: 'none' },
                  ],
                },
                {
                  name: 'heading',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type !== 'none',
                  },
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type !== 'none',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    condition: (_, siblingData) => ['standard', 'fullscreen'].includes(siblingData?.type),
                  },
                },
                {
                  name: 'links',
                  type: 'array',
                  maxRows: 3,
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                    },
                    {
                      name: 'page',
                      type: 'relationship',
                      relationTo: 'pages',
                    },
                    {
                      name: 'variant',
                      type: 'select',
                      defaultValue: 'primary',
                      options: [
                        { label: 'Primary', value: 'primary' },
                        { label: 'Secondary', value: 'secondary' },
                      ],
                    },
                    {
                      name: 'newTab',
                      type: 'checkbox',
                      label: 'Open in new tab',
                    },
                  ],
                  admin: {
                    condition: (_, siblingData) => siblingData?.type !== 'none',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'blocks',
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
                contactFormBlock,
                socialLinksBlock,
                videoFeatureBlock,
                reusableBlock,
                spacerBlock,
                htmlBlock,
              ],
            },
          ],
        },
      ],
    },
    slugField('title', ''),
    {
      name: 'template',
      type: 'text',
      required: true,
      defaultValue: 'default',
      admin: {
        position: 'sidebar',
        components: {
          Field: '/components/TemplateGallery',
        },
        custom: {
          collectionSlug: 'pages',
          targetField: 'content', // Populates the 'content' blocks field
          heroField: 'hero',      // Populates the 'hero' group field
        },
        description: 'Select a template to auto-fill content.',
      },
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
    },
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Cell: '/components/PreviewButtonCells/PagesPreviewCell',
        },
        condition: () => false, // Hide from form, only show in list
      },
    },
  ],
}
