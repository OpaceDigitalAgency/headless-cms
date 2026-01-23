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
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Layout',
      defaultValue: 'accordion',
      options: [
        { label: 'Accordion', value: 'accordion' },
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
