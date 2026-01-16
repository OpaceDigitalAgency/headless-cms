import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const teamBlock: Block = {
  slug: 'team',
  labels: {
    singular: 'Team',
    plural: 'Team',
  },
  imageURL: blockIcons.team,
  imageAltText: 'Team block preview',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'members',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'bio',
          type: 'textarea',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'socials',
          type: 'array',
          label: 'Social Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export default teamBlock
