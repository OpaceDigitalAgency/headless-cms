import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const logoCloudBlock: Block = {
  slug: 'logoCloud',
  labels: {
    singular: 'Logo Cloud',
    plural: 'Logo Cloud',
  },
  imageURL: blockIcons.logos,
  imageAltText: 'Logo cloud block preview',
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
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Ticker', value: 'ticker' },
      ],
      admin: {
        description: 'Layout structure (works with any skin)',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Logos',
      minRows: 1,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo Image',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Alt Text / Brand Name',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link (optional)',
        },
      ],
    },
  ],
}

export default logoCloudBlock
