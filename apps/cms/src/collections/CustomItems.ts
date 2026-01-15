import type { CollectionConfig } from 'payload'
import { 
  Hero, 
  Content, 
  Media as MediaBlock, 
  CTA, 
  Gallery, 
  Grid, 
  Timeline, 
  Archive, 
  Form 
} from '../blocks'

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
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
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
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
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
              blocks: [Hero, Content, MediaBlock, CTA, Gallery, Grid, Timeline, Archive, Form],
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
              type: 'array',
              admin: {
                description: 'Add tags for filtering',
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    description: 'Override the default title tag',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'Meta description for search engines',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Social sharing image',
                  },
                },
              ],
            },
          ],
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
  },
}

export default CustomItems
