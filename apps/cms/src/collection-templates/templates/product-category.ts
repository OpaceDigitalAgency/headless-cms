/**
 * Product Category Collection Template
 *
 * Hierarchical categories for organising products.
 */

import type { CollectionTemplate } from '../types'
import { slugField, featuredImageField } from '../shared-fields'

export const productCategoryTemplate: CollectionTemplate = {
  id: 'product-category',
  name: 'Product Category',
  description: 'Hierarchical taxonomy for organising products',
  category: 'commerce',
  icon: 'category',
  defaultSlug: 'product-categories',
  defaultSingular: 'Product Category',
  defaultPlural: 'Product Categories',
  adminGroup: 'Shop',
  status: 'installed',
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 5,
  seedItems: [
    {
      title: 'Electronics',
      slug: 'electronics',
      excerpt: 'Gadgets, devices, and tech accessories.',
      content: 'Headphones, speakers, smart devices, and more.',
      status: 'published',
    },
    {
      title: 'Clothing',
      slug: 'clothing',
      excerpt: 'Apparel and fashion items.',
      content: 'Essentials, seasonal wear, and accessories.',
      status: 'published',
    },
    {
      title: 'Home & Garden',
      slug: 'home-garden',
      excerpt: 'Furniture, decor, and outdoor items.',
      content: 'Home office, lounge, and garden essentials.',
      status: 'published',
    },
  ],

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Category Name',
      required: true,
    },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    featuredImageField,
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
}

export default productCategoryTemplate
