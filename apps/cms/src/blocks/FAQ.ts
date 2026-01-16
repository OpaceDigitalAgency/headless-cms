import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const faqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  imageURL: blockIcons.faq,
  imageAltText: 'FAQ block preview',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'items',
      type: 'array',
      label: 'FAQs',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}

export default faqBlock
