import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const formBlock: Block = {
  slug: 'form',
  labels: {
    singular: 'Form',
    plural: 'Form Blocks',
  },
  imageURL: blockIcons.form,
  imageAltText: 'Form block preview',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Select Form',
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      label: 'Intro Content',
      admin: {
        condition: (_, siblingData) => siblingData?.enableIntro,
      },
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Form Style',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Card', value: 'card' },
        { label: 'Inline', value: 'inline' },
        { label: 'Full Width', value: 'fullWidth' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Muted', value: 'muted' },
        { label: 'Dark', value: 'dark' },
      ],
    },
  ],
}

export default formBlock
