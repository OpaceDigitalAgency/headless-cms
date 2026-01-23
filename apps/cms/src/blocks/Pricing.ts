import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const pricingBlock: Block = {
  slug: 'pricing',
  labels: {
    singular: 'Pricing',
    plural: 'Pricing',
  },
  imageURL: blockIcons.pricing,
  imageAltText: 'Pricing block preview',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'cards',
      options: [
        { label: 'Cards', value: 'cards' },
        { label: 'Table', value: 'table' },
        { label: 'Comparison', value: 'comparison' },
      ],
      admin: {
        description: 'Layout structure (works with any skin)',
      },
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Plans',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
        {
          name: 'period',
          type: 'text',
          label: 'Billing Period',
          defaultValue: 'per month',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'links',
          type: 'array',
          label: 'Buttons',
          maxRows: 1,
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
                { label: 'Outline', value: 'outline' },
              ],
            },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Plan',
        },
      ],
    },
  ],
}

export default pricingBlock
