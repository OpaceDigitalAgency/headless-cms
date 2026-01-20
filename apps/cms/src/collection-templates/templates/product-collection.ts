/**
 * Product Collection Template
 *
 * Curated groupings of products for merchandising.
 */

import type { CollectionTemplate } from '../types'
import { slugField, featuredField, seoTabFields } from '../shared-fields'

export const productCollectionTemplate: CollectionTemplate = {
  id: 'product-collection',
  name: 'Product Collection',
  description: 'Curated product groupings like seasonal or featured ranges',
  category: 'commerce',
  icon: 'collection',
  defaultSlug: 'product-collections',
  defaultSingular: 'Product Collection',
  defaultPlural: 'Product Collections',
  adminGroup: 'Shop',
  status: 'installed',
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 3,

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Collection Name',
      required: true,
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
                description: 'Hex colour code for collection branding (e.g., #3B82F6)',
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
          fields: seoTabFields,
        },
      ],
    },
    featuredField,
    {
      name: 'showInNavigation',
      type: 'checkbox',
      label: 'Show in Navigation',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default productCollectionTemplate
