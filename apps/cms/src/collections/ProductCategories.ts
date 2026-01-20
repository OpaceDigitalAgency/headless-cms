import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { isCollectionEnabled } from '../lib/collectionVisibility'

/**
 * Product Categories Collection
 * 
 * Hierarchical categories for organising products.
 * Supports nested categories with breadcrumbs.
 */
export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',

  admin: {
    useAsTitle: 'name',
    group: 'Shop',
    defaultColumns: ['name', 'slug', 'parent', 'updatedAt'],
    description: 'Organise products into categories',
  },

  // Enable versions (without drafts for taxonomy items)
  versions: {
    maxPerDoc: 10,
  },

  access: {
    read: async ({ req }) => (await isCollectionEnabled(req.payload, 'product-categories')),
    create: async ({ req }) => (await isCollectionEnabled(req.payload, 'product-categories')) && Boolean(req.user),
    update: async ({ req }) => (await isCollectionEnabled(req.payload, 'product-categories')) && Boolean(req.user),
    delete: async ({ req }) => (await isCollectionEnabled(req.payload, 'product-categories')) && req.user?.role === 'admin',
  },

  // Hooks for revalidation
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const revalidateUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
        try {
          await fetch(`${revalidateUrl}/api/revalidate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              secret: process.env.REVALIDATION_SECRET,
              collection: 'product-categories',
              slug: doc.slug,
              tags: ['taxonomy:product-category', `product-category:${doc.slug}`, 'archive:products'],
            }),
          })
          req.payload.logger.info(`Revalidated product category: ${doc.slug}`)
        } catch (error) {
          req.payload.logger.error(`Failed to revalidate product category: ${doc.slug}`)
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
      label: 'Category Name',
    },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'product-categories',
      label: 'Parent Category',
      filterOptions: ({ id }) => ({
        id: {
          not_equals: id,
        },
      }),
      admin: {
        description: 'Select a parent category for hierarchical organisation',
      },
    },
    // Virtual field for breadcrumbs
    {
      name: 'breadcrumbs',
      type: 'array',
      admin: {
        readOnly: true,
        hidden: true,
      },
      fields: [
        {
          name: 'doc',
          type: 'relationship',
          relationTo: 'product-categories',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
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
  ],

  timestamps: true,
}

export default ProductCategories
