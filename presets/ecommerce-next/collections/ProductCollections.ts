import type { CollectionConfig } from 'payload'
import { slugField } from '../../../../apps/cms/src/fields/slug'

/**
 * Product Collections
 * 
 * Curated collections of products (e.g., "Summer Sale", "New Arrivals", "Best Sellers").
 * Different from categories - collections are marketing-focused groupings.
 */
export const ProductCollections: CollectionConfig = {
  slug: 'product-collections',

  admin: {
    useAsTitle: 'name',
    group: 'Shop',
    defaultColumns: ['name', 'slug', 'featured', '_status', 'updatedAt'],
    description: 'Curated product collections for marketing and merchandising',
    preview: (doc) => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
      return `${baseUrl}/preview/collections/${doc.slug}`
    },
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        return `${baseUrl}/preview/collections/${data.slug}`
      },
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
    maxPerDoc: 15,
  },

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
                collection: 'product-collections',
                slug: doc.slug,
                tags: ['collection:product-collections', `product-collection:${doc.slug}`],
              }),
            })
            req.payload.logger.info(`Revalidated product collection: ${doc.slug}`)
          } catch (error) {
            req.payload.logger.error(`Failed to revalidate product collection: ${doc.slug}`)
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
      label: 'Collection Name',
    },
    slugField('name'),
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
              name: 'shortDescription',
              type: 'textarea',
              label: 'Short Description',
              admin: {
                description: 'Brief description for cards and listings',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Featured Image',
            },
            {
              name: 'bannerImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Banner Image',
              admin: {
                description: 'Wide image for collection page header',
              },
            },
          ],
        },
        {
          label: 'Products',
          fields: [
            {
              name: 'products',
              type: 'join',
              collection: 'products',
              on: 'collections',
              label: 'Products in Collection',
            },
            {
              name: 'featuredProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Featured Products',
              admin: {
                description: 'Select products to highlight in this collection',
              },
            },
          ],
        },
        {
          label: 'Display',
          fields: [
            {
              name: 'template',
              type: 'select',
              label: 'Display Template',
              defaultValue: 'list',
              options: [
                { label: 'List View', value: 'list' },
                { label: 'Grid View', value: 'grid' },
                { label: 'Gallery View', value: 'gallery' },
              ],
            },
            {
              name: 'displayOrder',
              type: 'number',
              label: 'Display Order',
              admin: {
                description: 'Lower numbers appear first',
              },
            },
            {
              name: 'color',
              type: 'text',
              label: 'Theme Color',
              admin: {
                description: 'Hex color code for collection branding (e.g., #3B82F6)',
              },
            },
          ],
        },
        {
          label: 'Promotion',
          fields: [
            {
              name: 'startDate',
              type: 'date',
              label: 'Start Date',
              admin: {
                description: 'When this collection becomes active',
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'endDate',
              type: 'date',
              label: 'End Date',
              admin: {
                description: 'When this collection expires (optional)',
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'discountPercentage',
              type: 'number',
              label: 'Collection Discount %',
              min: 0,
              max: 100,
              admin: {
                description: 'Apply a discount to all products in this collection',
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
      label: 'Featured Collection',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'showInNavigation',
      type: 'checkbox',
      label: 'Show in Navigation',
      admin: {
        position: 'sidebar',
      },
    },
  ],

  timestamps: true,
}

export default ProductCollections
