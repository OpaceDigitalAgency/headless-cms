// @ts-nocheck
import type { CollectionConfig } from 'payload'
import { allBlocks } from '../blocks'

export const GlobalBlocks: CollectionConfig = {
    slug: 'global-blocks',
    admin: {
        useAsTitle: 'title',
        group: 'Collections',
        defaultColumns: ['title', 'blockName', 'updatedAt'],
        description: 'Blocks that the frontend renders automatically and consistently across the site — for example a Newsletter CTA that always appears at the bottom of every page, or a site-wide Notice banner. Unlike Block Library entries (which editors insert onto specific pages), Global Blocks are rendered by the layout wrapper unconditionally. Only add a record here if it should appear site-wide without an editor placing it on each page individually.',
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
