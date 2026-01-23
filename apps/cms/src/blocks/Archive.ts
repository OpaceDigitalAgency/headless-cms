import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const archiveBlock: Block = {
  slug: 'archive',
  labels: {
    singular: 'Archive',
    plural: 'Archive Blocks',
  },
  imageURL: blockIcons.archive,
  imageAltText: 'Archive block preview',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'populateBy',
      type: 'select',
      label: 'Populate By',
      defaultValue: 'collection',
      options: [
        { label: 'Collection', value: 'collection' },
        { label: 'Selection', value: 'selection' },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      label: 'Collection',
      defaultValue: 'posts',
      options: [
        { label: 'Posts', value: 'posts' },
        { label: 'Pages', value: 'pages' },
        { label: 'Archive Items', value: 'archive-items' },
        { label: 'People', value: 'people' },
        { label: 'Places', value: 'places' },
        { label: 'Events', value: 'events' },
        { label: 'Services', value: 'services' },
        { label: 'Galleries', value: 'galleries' },
        { label: 'Testimonials', value: 'testimonials' },
        { label: 'FAQs', value: 'faqs' },
        { label: 'Custom Items', value: 'custom-items' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'collection',
      },
    },
    {
      name: 'contentType',
      type: 'relationship',
      relationTo: 'content-types',
      hasMany: false,
      label: 'Content Type',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.populateBy === 'collection' && siblingData?.relationTo === 'custom-items',
        description: 'Filter custom items by content type',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Filter by Categories',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.populateBy === 'collection' &&
          ['posts', 'archive-items', 'events', 'people', 'custom-items'].includes(siblingData?.relationTo),
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Filter by Tags',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.populateBy === 'collection' &&
          ['posts', 'archive-items', 'events', 'people', 'custom-items'].includes(siblingData?.relationTo),
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Limit',
      defaultValue: 6,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'collection',
      },
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      relationTo: ['posts', 'pages', 'archive-items', 'people', 'places', 'custom-items'],
      hasMany: true,
      label: 'Selected Documents',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'selection',
      },
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
        { label: 'Cards', value: 'cards' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        condition: (_, siblingData) => ['grid', 'cards'].includes(siblingData?.variant),
      },
    },
    {
      name: 'showImage',
      type: 'checkbox',
      label: 'Show Featured Image',
      defaultValue: true,
    },
    {
      name: 'showExcerpt',
      type: 'checkbox',
      label: 'Show Excerpt',
      defaultValue: true,
    },
    {
      name: 'showDate',
      type: 'checkbox',
      label: 'Show Date',
      defaultValue: true,
    },
    {
      name: 'showAuthor',
      type: 'checkbox',
      label: 'Show Author',
      defaultValue: false,
    },
    {
      name: 'link',
      type: 'group',
      label: 'View All Link',
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          label: 'Show View All Link',
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'View All',
          admin: {
            condition: (_, siblingData) => siblingData?.show,
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.show,
          },
        },
      ],
    },
  ],
}

export default archiveBlock
