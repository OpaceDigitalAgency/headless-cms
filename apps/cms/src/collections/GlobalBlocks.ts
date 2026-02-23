import type { CollectionConfig } from 'payload'
import { allBlocks } from '../blocks'

export const GlobalBlocks: CollectionConfig = {
    slug: 'global-blocks',
    admin: {
        useAsTitle: 'title',
        group: 'Collections',
        defaultColumns: ['title', 'blockName', 'updatedAt'],
        description: 'Shared block library for "edit once, update everywhere" content units.',
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
            label: 'Admin Label',
            admin: {
                description: 'Internal reference name (e.g., "Homepage Offers Grid")',
            },
        },
        {
            name: 'block',
            type: 'blocks',
            required: true,
            maxRows: 1,
            blocks: allBlocks,
            label: 'Block Content',
        },
    ],
    timestamps: true,
}

export default GlobalBlocks
