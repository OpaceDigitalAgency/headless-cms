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
      name: 'logos',
      type: 'array',
      label: 'Logos',
      minRows: 1,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Alt Text',
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
