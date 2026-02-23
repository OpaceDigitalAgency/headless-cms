// @ts-nocheck
import type { CollectionConfig } from 'payload'

export const LogoCloud: CollectionConfig = {
    slug: 'logo-clouds',
    admin: {
        useAsTitle: 'label',
        group: 'Collections',
        defaultColumns: ['label', 'media', 'updatedAt'],
        description: 'Manage logos for the trust badges / logo cloud that can be reused across pages',
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'label',
            type: 'text',
            label: 'Brand Name',
            required: true,
        },
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Logo Image',
        },
        {
            name: 'url',
            type: 'text',
            label: 'Link (optional)',
        },
    ],
    timestamps: true,
}

export default LogoCloud
