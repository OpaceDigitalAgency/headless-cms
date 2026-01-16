import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const embedBlock: Block = {
  slug: 'embed',
  labels: {
    singular: 'Embed',
    plural: 'Embeds',
  },
  imageURL: blockIcons.embed,
  imageAltText: 'Embed block preview',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Embed URL',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
        { label: '1:1', value: '1:1' },
        { label: '21:9', value: '21:9' },
      ],
    },
  ],
}

export default embedBlock
