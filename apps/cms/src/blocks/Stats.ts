import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const statsBlock: Block = {
  slug: 'stats',
  labels: {
    singular: 'Stats',
    plural: 'Stats',
  },
  imageURL: blockIcons.stats,
  imageAltText: 'Stats block preview',
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
        { label: 'List', value: 'list' },
        { label: 'Cards', value: 'cards' },
      ],
      admin: {
        description: 'Layout structure (works with any skin)',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Stats',
      minRows: 1,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}

export default statsBlock
