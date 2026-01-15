/**
 * Product Collection Template
 * 
 * A product catalog template suitable for:
 * - Ecommerce stores
 * - Service catalogs
 * - Inventory management
 * - Stock control systems
 */

import type { CollectionTemplate } from '../types'
import {
  titleField,
  slugField,
  featuredImageField,
  excerptField,
  contentBlocksField,
  categoriesField,
  tagsField,
  featuredField,
  templateField,
  seoTabFields,
  richContentField,
  mediaGalleryField,
} from '../shared-fields'

export const productTemplate: CollectionTemplate = {
  id: 'product',
  name: 'Product',
  description: 'Products, services, or inventory items with pricing and variants',
  category: 'commerce',
  icon: '🛒',
  defaultSlug: 'products',
  defaultSingular: 'Product',
  defaultPlural: 'Products',
  adminGroup: 'Shop',
  hasSeedData: true,
  hasSeedMedia: true,
  seedDataCount: 12,
  
  fields: [
    titleField('Product Name'),
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            featuredImageField,
            excerptField('Short Description'),
            richContentField('Full Description'),
            mediaGalleryField,
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
                  label: 'Price',
                  required: true,
                  min: 0,
                  admin: {
                    description: 'Regular price',
                  },
                },
                {
                  name: 'salePrice',
                  type: 'number',
                  label: 'Sale Price',
                  min: 0,
                  admin: {
                    description: 'Optional discounted price',
                  },
                },
              ],
            },
            {
              name: 'currency',
              type: 'select',
              label: 'Currency',
              defaultValue: 'GBP',
              options: [
                { label: 'GBP (£)', value: 'GBP' },
                { label: 'USD ($)', value: 'USD' },
                { label: 'EUR (€)', value: 'EUR' },
              ],
            },
            {
              name: 'taxable',
              type: 'checkbox',
              label: 'Taxable',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Inventory',
          fields: [
            {
              name: 'sku',
              type: 'text',
              label: 'SKU',
              unique: true,
              admin: {
                description: 'Stock Keeping Unit',
              },
            },
            {
              name: 'barcode',
              type: 'text',
              label: 'Barcode',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'stockQuantity',
                  type: 'number',
                  label: 'Stock Quantity',
                  min: 0,
                  defaultValue: 0,
                },
                {
                  name: 'lowStockThreshold',
                  type: 'number',
                  label: 'Low Stock Alert',
                  min: 0,
                  defaultValue: 5,
                },
              ],
            },
            {
              name: 'trackInventory',
              type: 'checkbox',
              label: 'Track Inventory',
              defaultValue: true,
            },
            {
              name: 'allowBackorder',
              type: 'checkbox',
              label: 'Allow Backorders',
              defaultValue: false,
            },
          ],
        },
        {
          label: 'Variants',
          fields: [
            {
              name: 'variants',
              type: 'array',
              label: 'Product Variants',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Variant Name',
                  required: true,
                },
                {
                  name: 'sku',
                  type: 'text',
                  label: 'Variant SKU',
                },
                {
                  name: 'price',
                  type: 'number',
                  label: 'Price Override',
                },
                {
                  name: 'stockQuantity',
                  type: 'number',
                  label: 'Stock',
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
          label: 'Shipping',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'weight', type: 'number', label: 'Weight (kg)', min: 0 },
                { name: 'length', type: 'number', label: 'Length (cm)', min: 0 },
                { name: 'width', type: 'number', label: 'Width (cm)', min: 0 },
                { name: 'height', type: 'number', label: 'Height (cm)', min: 0 },
              ],
            },
            {
              name: 'shippingClass',
              type: 'select',
              label: 'Shipping Class',
              options: [
                { label: 'Standard', value: 'standard' },
                { label: 'Express', value: 'express' },
                { label: 'Freight', value: 'freight' },
                { label: 'Digital', value: 'digital' },
              ],
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            categoriesField,
            tagsField,
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Related Products',
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
            },
          ],
        },
        {
          label: 'Content Sections',
          fields: [
            contentBlocksField,
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
      name: 'status',
      type: 'select',
      label: 'Product Status',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Draft', value: 'draft' },
        { label: 'Archived', value: 'archived' },
        { label: 'Out of Stock', value: 'out-of-stock' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    templateField([
      { label: 'Standard Product', value: 'standard' },
      { label: 'Featured Product', value: 'featured' },
      { label: 'Quick View', value: 'quick' },
    ]),
  ],
}

export default productTemplate
