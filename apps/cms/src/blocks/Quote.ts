import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const quoteBlock: Block = {
  slug: 'quote',
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
  imageURL: blockIcons.quote,
  imageAltText: 'Quote block preview',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Quote Text',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Role or Title',
    },
    {
      name: 'align',
      type: 'select',
      label: 'Text Alignment',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'simple',
      options: [
        { label: 'Simple', value: 'simple' },
        { label: 'Card', value: 'card' },
        { label: 'Large', value: 'large' },
      ],
      admin: {
        description: 'Layout structure (works with any skin)',
      },
    },
  ],
}

export default quoteBlock
