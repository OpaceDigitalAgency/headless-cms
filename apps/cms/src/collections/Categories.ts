import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'parent'],
    description: 'Organize content with categories',
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    slugField(),
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Parent Category',
      filterOptions: ({ id }) => ({
        id: {
          not_equals: id,
        },
      }),
      admin: {
        description: 'Select a parent category for hierarchical organization',
      },
    },
    // Virtual field populated by nested-docs plugin
    {
      name: 'breadcrumbs',
      type: 'array',
      admin: {
        readOnly: true,
        hidden: true,
      },
      fields: [
        {
          name: 'doc',
          type: 'relationship',
          relationTo: 'categories',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
  ],

  timestamps: true,
}
