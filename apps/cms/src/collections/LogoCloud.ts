// @ts-nocheck
import type { CollectionConfig } from 'payload'

export const LogoCloud: CollectionConfig = {
    slug: 'logo-clouds',
    admin: {
        useAsTitle: 'label',
        group: 'Collections',
        defaultColumns: ['label', 'media', 'updatedAt'],
        description: 'A library of partner, client, sponsor, or accreditation logos. Each record stores a brand name, logo image, and optional link URL. The Logo Cloud block on any page queries this collection to render a trust-badge strip or logo grid. Manage all logos in one place — adding or removing a logo here updates every Logo Cloud block across the site.',
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
