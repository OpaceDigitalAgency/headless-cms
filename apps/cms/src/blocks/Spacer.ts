import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const spacerBlock: Block = {
  slug: 'spacer',
  labels: {
    singular: 'Spacer / Divider',
    plural: 'Spacers',
  },
  imageURL: blockIcons.spacer,
  imageAltText: 'Spacer block preview',
  fields: [
    {
      name: 'style',
      type: 'select',
      label: 'Style',
      defaultValue: 'space',
      options: [
        { label: 'Space Only', value: 'space' },
        { label: 'Divider Line', value: 'divider' },
      ],
    },
    {
      name: 'size',
      type: 'select',
      label: 'Size',
      defaultValue: 'md',
      options: [
        { label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    {
      name: 'lineStyle',
      type: 'select',
      label: 'Line Style',
      defaultValue: 'solid',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'divider',
      },
    },
  ],
}

export default spacerBlock
