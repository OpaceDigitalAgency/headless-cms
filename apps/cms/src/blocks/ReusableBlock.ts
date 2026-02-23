import type { Block } from 'payload'

export const reusableBlock: Block = {
    slug: 'reusableBlock',
    labels: {
        singular: 'Reusable Block',
        plural: 'Reusable Blocks',
    },
    fields: [
        {
            name: 'libraryItem',
            type: 'relationship',
            relationTo: 'global-blocks',
            required: true,
            label: 'Select Block from Library',
            admin: {
                description: 'Choose a pre-configured block from the Global Blocks library.',
            },
        },
    ],
}

export default reusableBlock
