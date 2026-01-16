import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const htmlBlock: Block = {
  slug: 'html',
  labels: {
    singular: 'Custom HTML',
    plural: 'Custom HTML',
  },
  imageURL: blockIcons.html,
  imageAltText: 'HTML block preview',
  fields: [
    {
      name: 'html',
      type: 'textarea',
      required: true,
      label: 'HTML Markup',
      admin: {
        description: 'Use trusted HTML only. This will be rendered as-is on the site.',
      },
    },
  ],
}

export default htmlBlock
