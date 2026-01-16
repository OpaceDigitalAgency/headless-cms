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
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
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
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA Label',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'CTA URL',
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
