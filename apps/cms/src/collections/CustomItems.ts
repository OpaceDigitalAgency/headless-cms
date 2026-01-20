import type { CollectionConfig } from 'payload'
import {
  heroBlock,
  contentBlock,
  mediaBlock as MediaBlock,
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
  galleryBlock,
  gridBlock,
  timelineBlock,
  archiveBlock,
  formBlock,
  spacerBlock,
  htmlBlock,
} from '../blocks'
import { getPreviewUrl } from '../utils/preview'
import { isCollectionEnabled } from '../lib/collectionVisibility'

/**
 * Custom Items Collection
 * 
 * A flexible collection that stores items of ANY user-defined content type.
 * Works like WordPress's wp_posts table with post_type field.
 * 
 * Key features:
 * - Items are filtered by contentType in the admin
 * - Each item has standard fields (title, slug, content, media)
 * - Custom fields are stored as JSON and rendered dynamically
 * - Full blocks support for rich content
 * - Version control and drafts
 */
export const CustomItems: CollectionConfig = {
  slug: 'custom-items',
  labels: {
    singular: 'Custom Item',
    plural: 'Custom Items',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'contentType', 'status', 'updatedAt'],
    description: 'Items belonging to your custom content types',
    listSearchableFields: ['title', 'slug'],
    preview: (doc) => {
      // Build preview URL with content type
      if (doc.contentType && typeof doc.contentType === 'object' && doc.contentType.slug) {
        const typeSlug = doc.contentType.archiveSlug
          ? doc.contentType.archiveSlug.replace(/^\/?items\//, '')
          : doc.contentType.slug
        return getPreviewUrl({ collection: 'custom-items', slug: `${typeSlug}/${doc.slug}` })
      }
      return getPreviewUrl({ collection: 'custom-items', slug: doc.slug })
    },
    livePreview: {
      url: ({ data }) => {
        // Don't show preview until we have both contentType and slug
        if (!data?.slug || !data?.contentType) {
          return null // This disables the preview panel
        }

        // Build live preview URL with content type
        if (typeof data.contentType === 'object' && data.contentType.slug) {
          const typeSlug = data.contentType.archiveSlug
            ? data.contentType.archiveSlug.replace(/^\/?items\//, '')
            : data.contentType.slug
          return getPreviewUrl({ collection: 'custom-items', slug: `${typeSlug}/${data.slug}` })
        }

        // Fallback to draft API route if contentType is just an ID
        return getPreviewUrl({ collection: 'custom-items', slug: data.slug })
      },
    },
  },
  access: {
    read: async ({ req }) => {
      if (!(await isCollectionEnabled(req.payload, 'custom-items'))) return false
      if (!req.user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      return true
    },
    create: async ({ req }) => (await isCollectionEnabled(req.payload, 'custom-items')) && Boolean(req.user),
    update: async ({ req }) => (await isCollectionEnabled(req.payload, 'custom-items')) && Boolean(req.user),
    delete: async ({ req }) => (await isCollectionEnabled(req.payload, 'custom-items')) && Boolean(req.user),
  },
  versions: {
    drafts: {
      autosave: {
        interval: 300, // 5 minutes
      },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
  indexes: [
    {
      fields: ['slug', 'contentType'],
      unique: true,
    },
  ],
  fields: [
    // Content Type Reference
    {
      name: 'contentType',
      type: 'relationship',
      relationTo: 'content-types',
      required: true,
      hasMany: false,
      admin: {
        description: 'The type of content this item belongs to',
        position: 'sidebar',
      },
    },
    // Standard Fields Tab
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Enter a title for this item...',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              admin: {
                description: 'URL-friendly identifier',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.title) {
                      return data.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '')
                    }
                    return value
                  },
                ],
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              admin: {
                description: 'Brief summary for listings and SEO',
              },
            },
            {
              name: 'content',
              type: 'richText',
              admin: {
                description: 'Main content body',
              },
            },
            // Flexible blocks for rich layouts
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [
                heroBlock,
                contentBlock,
                MediaBlock,
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
                galleryBlock,
                gridBlock,
                timelineBlock,
                archiveBlock,
                formBlock,
                spacerBlock,
                htmlBlock,
              ],
              admin: {
                description: 'Add content sections',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Main image for listings and social sharing',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              admin: {
                description: 'Additional images',
              },
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
          label: 'Custom Fields',
          description: 'Fields specific to this content type',
          fields: [
            {
              name: 'customData',
              type: 'json',
              admin: {
                description: 'Custom field values are stored here and rendered based on the content type definition',
                components: {
                  Field: '/components/CustomDataField',
                },
              },
            },
          ],
        },
        {
          label: 'Taxonomy',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              admin: {
                description: 'Categorize this item',
              },
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags',
              hasMany: true,
              admin: {
                description: 'Add tags for filtering',
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
    // Sidebar fields
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Publication date',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, operation, originalDoc, req }) => {
        // Enforce slug uniqueness per contentType
        if (data?.slug && data?.contentType) {
          const existing = await req.payload.find({
            collection: 'custom-items',
            where: {
              slug: { equals: data.slug },
              contentType: { equals: data.contentType },
              ...(operation === 'update' && originalDoc?.id ? { id: { not_equals: originalDoc.id } } : {}),
            },
            limit: 1,
            depth: 0,
          })
          if (existing.totalDocs > 0) {
            throw new Error(`Slug "${data.slug}" is already used for this content type`)
          }
        }

        // Validate custom fields against content type definition
        // Only validate on publish, not on draft autosaves
        const isPublishing = data?._status === 'published' || (operation === 'update' && originalDoc?._status === 'published' && data?._status !== 'draft')

        if (data?.contentType && isPublishing) {
          try {
            const contentTypeId = typeof data.contentType === 'string' ? data.contentType : data.contentType?.id

            if (!contentTypeId) {
              // Skip validation if no content type ID
              return data
            }

            const contentType = await req.payload.findByID({
              collection: 'content-types',
              id: contentTypeId,
              depth: 0,
            })

            if (!contentType) {
              // Skip validation if content type not found
              return data
            }

            const definitions = contentType?.customFields || []
            const customData = data.customData || {}

            for (const fieldDef of definitions) {
              const { name, type, required } = fieldDef
              const value = customData?.[name]

              if (required && (value === undefined || value === null || value === '')) {
                throw new Error(`Custom field "${name}" is required for publishing`)
              }

              if (value !== undefined && value !== null) {
                switch (type) {
                  case 'number':
                    if (typeof value !== 'number') throw new Error(`Custom field "${name}" must be a number`)
                    break
                  case 'checkbox':
                    if (typeof value !== 'boolean') throw new Error(`Custom field "${name}" must be a boolean`)
                    break
                  case 'date':
                    if (isNaN(Date.parse(String(value)))) throw new Error(`Custom field "${name}" must be a valid date`)
                    break
                  default:
                    if (typeof value !== 'string') throw new Error(`Custom field "${name}" must be a string`)
                }
              }
            }
          } catch (e) {
            // Log the error for debugging
            req.payload.logger.error(`Custom field validation error: ${e instanceof Error ? e.message : 'Unknown error'}`)
            if (e instanceof Error) throw e
            throw new Error('Invalid custom field data')
          }
        }

        return data
      },
    ],
    beforeChange: [
      ({ data, req }) => {
        // Auto-set author on create
        if (!data.author && req.user) {
          data.author = req.user.id
        }
        // Auto-set publishedAt when publishing
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        if (doc.status === 'published') {
          const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
          let contentTypeSlug: string | undefined
          if (typeof doc.contentType === 'object' && doc.contentType?.slug) {
            contentTypeSlug = doc.contentType.archiveSlug
              ? doc.contentType.archiveSlug.replace(/^\/?items\//, '')
              : doc.contentType.slug
          } else if (doc.contentType) {
            try {
              const contentType = await req.payload.findByID({
                collection: 'content-types',
                id: doc.contentType as string,
                depth: 0,
              })
              contentTypeSlug = contentType?.archiveSlug
                ? contentType.archiveSlug.replace(/^\/?items\//, '')
                : contentType?.slug
            } catch {
              contentTypeSlug = undefined
            }
          }
          try {
            await fetch(`${revalidateUrl}/api/revalidate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                secret: process.env.REVALIDATION_SECRET,
                collection: 'custom-items',
                slug: doc.slug,
                contentTypeSlug,
              }),
            })
            req.payload.logger.info(`Revalidated custom item: ${doc.slug}`)
          } catch (error) {
            req.payload.logger.error(`Failed to revalidate custom item: ${doc.slug}`)
          }
        }
        return doc
      },
    ],
  },
}

export default CustomItems
