import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Collections: CollectionConfig = {
  slug: 'museum-collections',

  admin: {
    useAsTitle: 'title',
    group: 'Museum',
    defaultColumns: ['title', 'parent', 'artifactCount', 'updatedAt'],
    description: 'Museum collections and galleries (hierarchical)',
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
      label: 'Collection Title',
    },
    slugField(),
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Short Description',
              admin: {
                description: 'Brief description for listings and cards',
              },
            },
            {
              name: 'curator',
              type: 'relationship',
              relationTo: 'users',
              label: 'Curator',
            },
          ],
        },
        {
          label: 'Hierarchy',
          fields: [
            {
              name: 'parent',
              type: 'relationship',
              relationTo: 'museum-collections',
              label: 'Parent Collection',
              filterOptions: ({ id }) => ({
                id: {
                  not_equals: id,
                },
              }),
              admin: {
                description: 'Select a parent collection for hierarchical organization',
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
                  relationTo: 'museum-collections',
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
        },
        {
          label: 'Artifacts',
          fields: [
            {
              name: 'artifacts',
              type: 'join',
              collection: 'artifacts',
              on: 'collections',
              label: 'Artifacts in Collection',
            },
            {
              name: 'featuredArtifacts',
              type: 'relationship',
              relationTo: 'artifacts',
              hasMany: true,
              label: 'Featured Artifacts',
              admin: {
                description: 'Select artifacts to highlight in this collection',
              },
            },
          ],
        },
        {
          label: 'Display',
          fields: [
            {
              name: 'displayOrder',
              type: 'number',
              label: 'Display Order',
              admin: {
                description: 'Lower numbers appear first',
              },
            },
            {
              name: 'template',
              type: 'select',
              label: 'Display Template',
              defaultValue: 'list',
              options: [
                { label: 'List View', value: 'list' },
                { label: 'Grid View', value: 'grid' },
                { label: 'Timeline View', value: 'timeline' },
                { label: 'Gallery View', value: 'gallery' },
              ],
            },
            {
              name: 'color',
              type: 'text',
              label: 'Theme Color',
              admin: {
                description: 'Hex color code for collection branding (e.g., #3B82F6)',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Collection',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'artifactCount',
      type: 'number',
      label: 'Artifact Count',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-calculated',
      },
      hooks: {
        beforeChange: [
          async ({ req, data }) => {
            // This would be calculated via a hook or virtual field
            // For now, return existing value
            return data?.artifactCount || 0
          },
        ],
      },
    },
  ],

  timestamps: true,
}
