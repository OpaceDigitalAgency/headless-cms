import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const mediaBlock: Block = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media Blocks',
  },
  imageURL: blockIcons.media,
  imageAltText: 'Media block preview',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Media',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
    {
      name: 'size',
      type: 'select',
      label: 'Size',
      defaultValue: 'default',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'large' },
        { label: 'Full Width', value: 'fullWidth' },
      ],
    },
    {
      name: 'position',
      type: 'select',
      label: 'Position',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Enable Link',
    },
    {
      name: 'link',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.enableLink,
      },
      fields: [
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
        },
      ],
    },
  ],
}

export default mediaBlock
