import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

/**
 * Timeline Block
 * 
 * Displays events or milestones in a chronological timeline format.
 * Supports vertical and horizontal layouts with various styling options.
 */
export const timelineBlock: Block = {
  slug: 'timeline',
  labels: {
    singular: 'Timeline',
    plural: 'Timelines',
  },
  imageURL: blockIcons.timeline,
  imageAltText: 'Timeline block preview',
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
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'vertical',
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Vertical Alternating', value: 'alternating' },
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Compact', value: 'compact' },
      ],
      admin: {
        description: 'Choose the timeline layout style',
      },
    },
    {
      name: 'lineStyle',
      type: 'select',
      defaultValue: 'solid',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
    {
      name: 'markerStyle',
      type: 'select',
      defaultValue: 'circle',
      options: [
        { label: 'Circle', value: 'circle' },
        { label: 'Diamond', value: 'diamond' },
        { label: 'Square', value: 'square' },
        { label: 'Icon', value: 'icon' },
        { label: 'Number', value: 'number' },
        { label: 'Image', value: 'image' },
      ],
    },
    {
      name: 'events',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Timeline Events',
      fields: [
        {
          name: 'date',
          type: 'text',
          required: true,
          label: 'Date/Period',
          admin: {
            description: 'e.g., "2024", "Jan 2024", "1500 BCE", "Renaissance Period"',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Event Title',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Event Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Event Image',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name',
          admin: {
            description: 'Lucide icon name (used when marker style is "icon")',
            condition: (_, __, { siblingData }) => siblingData?.markerStyle === 'icon',
          },
        },
        {
          name: 'color',
          type: 'text',
          label: 'Marker Color',
          admin: {
            description: 'Hex color code (e.g., #3B82F6) or leave empty for default',
          },
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link (optional)',
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
              name: 'archiveItem',
              type: 'relationship',
              relationTo: 'archive-items',
              label: 'Or link to archive item',
            },
            {
              name: 'person',
              type: 'relationship',
              relationTo: 'people',
              label: 'Or link to person',
            },
            {
              name: 'label',
              type: 'text',
              label: 'Link Label',
              defaultValue: 'Learn More',
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
            },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Event',
          admin: {
            description: 'Highlight this event with special styling',
          },
        },
      ],
    },
    {
      name: 'showConnectors',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Connecting Lines',
    },
    {
      name: 'showDates',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Dates',
    },
    {
      name: 'animateOnScroll',
      type: 'checkbox',
      defaultValue: true,
      label: 'Animate on Scroll',
      admin: {
        description: 'Reveal events as user scrolls',
      },
    },
    {
      name: 'sortOrder',
      type: 'select',
      defaultValue: 'chronological',
      options: [
        { label: 'Chronological (Oldest First)', value: 'chronological' },
        { label: 'Reverse (Newest First)', value: 'reverse' },
        { label: 'Manual (As Entered)', value: 'manual' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'transparent',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Primary', value: 'primary' },
      ],
    },
  ],
}

export default timelineBlock
