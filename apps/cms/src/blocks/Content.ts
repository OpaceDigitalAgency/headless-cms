import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const contentBlock: Block = {
  slug: 'content',
  labels: {
    singular: 'Content',
    plural: 'Content Blocks',
  },
  imageURL: blockIcons.content,
  imageAltText: 'Content block preview',
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'size',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'One Third', value: 'oneThird' },
            { label: 'Half', value: 'half' },
            { label: 'Two Thirds', value: 'twoThirds' },
            { label: 'Full Width', value: 'full' },
          ],
        },
        {
          name: 'richText',
          type: 'richText',
          label: 'Content',
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
              name: 'label',
              type: 'text',
            },
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
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light Gray', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
    },
    {
      name: 'paddingTop',
      type: 'select',
      label: 'Padding Top',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      name: 'paddingBottom',
      type: 'select',
      label: 'Padding Bottom',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
  ],
}

export default contentBlock
