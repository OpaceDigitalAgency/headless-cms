import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const heroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  imageURL: blockIcons.hero,
  imageAltText: 'Hero block preview',
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Visual Variant',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Agency', value: 'agency' },
        { label: 'Retro', value: 'retro' },
      ],
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Full Screen', value: 'fullscreen' },
        { label: 'Split', value: 'split' },
        { label: 'Video Background', value: 'video' },
      ],
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow / Badge Text',
      admin: {
        description: 'Optional badge label displayed above the heading.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        condition: (_, siblingData) => ['standard', 'fullscreen', 'split'].includes(siblingData?.type),
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'video',
        description: 'YouTube or Vimeo URL',
      },
    },
    {
      name: 'overlay',
      type: 'select',
      label: 'Overlay',
      defaultValue: 'dark',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Gradient', value: 'gradient' },
      ],
      admin: {
        condition: (_, siblingData) => ['standard', 'fullscreen', 'video'].includes(siblingData?.type),
      },
    },
    {
      name: 'textAlign',
      type: 'select',
      label: 'Text Alignment',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'links',
      type: 'array',
      label: 'Call to Action Buttons',
      maxRows: 3,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Or select a page',
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
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

export default heroBlock
