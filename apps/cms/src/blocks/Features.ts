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
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Feature Items',
      minRows: 1,
      fields: [
        {
          name: 'title',
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
