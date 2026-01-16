import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

/**
 * Grid Block
 * 
 * Flexible grid layout for displaying cards, features, or any repeated content.
 * Supports various card styles and responsive column configurations.
 */
export const gridBlock: Block = {
  slug: 'grid',
  labels: {
    singular: 'Grid',
    plural: 'Grids',
  },
  imageURL: blockIcons.grid,
  imageAltText: 'Grid block preview',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'style',
      type: 'select',
      required: true,
      defaultValue: 'cards',
      options: [
        { label: 'Cards', value: 'cards' },
        { label: 'Features', value: 'features' },
        { label: 'Icons', value: 'icons' },
        { label: 'Stats', value: 'stats' },
        { label: 'Team', value: 'team' },
        { label: 'Testimonials', value: 'testimonials' },
        { label: 'Logos', value: 'logos' },
      ],
      admin: {
        description: 'Choose the visual style of grid items',
      },
    },
    {
      name: 'columns',
      type: 'select',
      required: true,
      defaultValue: '3',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
        { label: '5 Columns', value: '5' },
        { label: '6 Columns', value: '6' },
      ],
      admin: {
        description: 'Number of columns on desktop',
      },
    },
    {
      name: 'gap',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description: 'Text alignment within grid items',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Grid Items',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          admin: {
            condition: (_, __, { siblingData }) => 
              !['stats', 'icons'].includes(siblingData?.style),
          },
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name',
          admin: {
            description: 'Lucide icon name (e.g., "star", "heart", "check")',
            condition: (_, __, { siblingData }) => 
              ['features', 'icons', 'stats'].includes(siblingData?.style),
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          admin: {
            condition: (_, __, { siblingData }) => 
              ['team', 'testimonials'].includes(siblingData?.style),
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'stat',
          type: 'text',
          label: 'Stat Value',
          admin: {
            description: 'e.g., "99%", "10K+", "$1M"',
            condition: (_, __, { siblingData }) => siblingData?.style === 'stats',
          },
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
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
              name: 'label',
              type: 'text',
              label: 'Link Label',
              admin: {
                description: 'e.g., "Learn More", "Read More"',
              },
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
      name: 'showBorder',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Card Border',
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'cards',
      },
    },
    {
      name: 'showShadow',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Card Shadow',
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'cards',
      },
    },
    {
      name: 'hoverEffect',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Lift', value: 'lift' },
        { label: 'Scale', value: 'scale' },
        { label: 'Glow', value: 'glow' },
      ],
      admin: {
        description: 'Effect when hovering over items',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          label: 'Show CTA Button',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          admin: {
            condition: (_, siblingData) => siblingData?.show,
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            condition: (_, siblingData) => siblingData?.show,
          },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Or select a page',
          admin: {
            condition: (_, siblingData) => siblingData?.show,
          },
        },
      ],
    },
  ],
}

export default gridBlock
