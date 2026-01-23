import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const featuresBlock: Block = {
  slug: 'features',
  labels: {
    singular: 'Features',
    plural: 'Features',
  },
  imageURL: blockIcons.features,
  imageAltText: 'Features block preview',
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
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
      admin: {
        description: 'Layout structure (works with any skin)',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Feature Items',
      minRows: 1,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (optional)',
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Image (optional)',
        },
      ],
    },
  ],
}

export default featuresBlock
