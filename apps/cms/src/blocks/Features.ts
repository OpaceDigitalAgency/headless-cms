import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const featuresBlock: Block = {
  slug: 'features',
  labels: {
    singular: 'Features',
    plural: 'Features',
  },
  imageURL: blockIcons.features,
  imageAltText: 'Features block preview',
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
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            // Back-compat: older seed/templates used `subheading`
            if (value) return value
            if (siblingData && typeof siblingData === 'object' && 'subheading' in siblingData) {
              const subheading = (siblingData as any).subheading
              if (typeof subheading === 'string' && subheading.trim()) return subheading
            }
            return value
          },
        ],
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
      ],
      admin: {
        description: 'Layout structure (works with any skin)',
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            // Back-compat: older seed/templates used `layout`
            if (value) return value
            if (siblingData && typeof siblingData === 'object' && 'layout' in siblingData) {
              const layout = (siblingData as any).layout
              if (layout === 'grid' || layout === 'list') return layout
            }
            return value
          },
        ],
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Feature Items',
      minRows: 1,
      hooks: {
        beforeValidate: [
          ({ value }) => {
            // Back-compat: older seed/templates used `title` instead of `heading`
            if (!Array.isArray(value)) return value
            return value.map((row) => {
              if (!row || typeof row !== 'object') return row
              const heading = (row as any).heading ?? (row as any).title
              const next = { ...(row as any), heading }
              delete (next as any).title
              return next
            })
          },
        ],
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (optional)',
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Image (optional)',
        },
      ],
    },
  ],
}

export default featuresBlock
