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
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
    },
    {
      name: 'stats',
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
