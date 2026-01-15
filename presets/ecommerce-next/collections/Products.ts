import type { CollectionConfig } from 'payload'
import { slugField } from '../../../../apps/cms/src/fields/slug'

/**
 * Products Collection
 * 
 * Core collection for ecommerce preset. Supports:
 * - Product variants (size, color, etc.)
 * - Inventory tracking
 * - Pricing with sale prices
 * - SEO optimization
 * - Category and collection relationships
 */
export const Products: CollectionConfig = {
  slug: 'products',

  admin: {
    useAsTitle: 'name',
    group: 'Shop',
    defaultColumns: ['name', 'sku', 'price', 'inStock', '_status', 'updatedAt'],
    description: 'Manage your product catalog',
    preview: (doc) => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
      return `${baseUrl}/preview/products/${doc.slug}`
    },
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        return `${baseUrl}/preview/products/${data.slug}`
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
                collection: 'products',
                slug: doc.slug,
                tags: ['collection:products', `product:${doc.id}`, 'archive:products'],
              }),
            })
            req.payload.logger.info(`Revalidated product: ${doc.slug}`)
          } catch (error) {
            req.payload.logger.error(`Failed to revalidate product: ${doc.slug}`)
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
      label: 'Product Name',
    },
    slugField('name'),
    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
      label: 'SKU',
      admin: {
        description: 'Stock Keeping Unit - unique product identifier',
      },
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
                description: 'Brief description for product cards and listings',
              },
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Full Description',
            },
            {
              name: 'features',
              type: 'array',
              label: 'Key Features',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'specifications',
              type: 'array',
              label: 'Specifications',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
              ],
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
              required: true,
              label: 'Featured Image',
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Product Gallery',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Alt Text',
                },
              ],
            },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  label: 'Price',
                  min: 0,
                  admin: {
                    description: 'Regular price',
                    width: '50%',
                  },
                },
                {
                  name: 'salePrice',
                  type: 'number',
                  label: 'Sale Price',
                  min: 0,
                  admin: {
                    description: 'Leave empty if not on sale',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'currency',
              type: 'select',
              defaultValue: 'USD',
              options: [
                { label: 'USD ($)', value: 'USD' },
                { label: 'EUR (€)', value: 'EUR' },
                { label: 'GBP (£)', value: 'GBP' },
              ],
            },
            {
              name: 'taxable',
              type: 'checkbox',
              defaultValue: true,
              label: 'Taxable',
            },
          ],
        },
        {
          label: 'Inventory',
          fields: [
            {
              name: 'trackInventory',
              type: 'checkbox',
              defaultValue: true,
              label: 'Track Inventory',
            },
            {
              name: 'quantity',
              type: 'number',
              label: 'Quantity in Stock',
              min: 0,
              defaultValue: 0,
              admin: {
                condition: (data) => data?.trackInventory,
              },
            },
            {
              name: 'lowStockThreshold',
              type: 'number',
              label: 'Low Stock Threshold',
              min: 0,
              defaultValue: 5,
              admin: {
                condition: (data) => data?.trackInventory,
                description: 'Alert when stock falls below this number',
              },
            },
            {
              name: 'inStock',
              type: 'checkbox',
              defaultValue: true,
              label: 'In Stock',
              admin: {
                description: 'Override for products without inventory tracking',
              },
            },
          ],
        },
        {
          label: 'Variants',
          fields: [
            {
              name: 'hasVariants',
              type: 'checkbox',
              label: 'This product has variants',
            },
            {
              name: 'variants',
              type: 'array',
              label: 'Product Variants',
              admin: {
                condition: (data) => data?.hasVariants,
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Variant Name',
                  admin: {
                    description: 'e.g., "Small / Blue"',
                  },
                },
                {
                  name: 'sku',
                  type: 'text',
                  required: true,
                  label: 'Variant SKU',
                },
                {
                  name: 'price',
                  type: 'number',
                  label: 'Price Override',
                  admin: {
                    description: 'Leave empty to use base price',
                  },
                },
                {
                  name: 'quantity',
                  type: 'number',
                  label: 'Quantity',
                  min: 0,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Variant Image',
                },
              ],
            },
          ],
        },
        {
          label: 'Organization',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'product-categories',
              hasMany: true,
              label: 'Categories',
            },
            {
              name: 'collections',
              type: 'relationship',
              relationTo: 'product-collections',
              hasMany: true,
              label: 'Collections',
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tags',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                },
              ],
            },
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Related Products',
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
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Product',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'newArrival',
      type: 'checkbox',
      label: 'New Arrival',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'bestSeller',
      type: 'checkbox',
      label: 'Best Seller',
      admin: {
        position: 'sidebar',
      },
    },
  ],

  timestamps: true,
}

export default Products
