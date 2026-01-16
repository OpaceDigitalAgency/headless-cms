import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const testimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  imageURL: blockIcons.testimonials,
  imageAltText: 'Testimonials block preview',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role or Title',
        },
        {
          name: 'company',
          type: 'text',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Avatar (optional)',
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          admin: {
            step: 1,
          },
        },
      ],
    },
  ],
}

export default testimonialsBlock
