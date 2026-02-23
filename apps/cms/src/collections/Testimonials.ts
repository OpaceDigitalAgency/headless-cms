// @ts-nocheck
import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
    slug: 'testimonials',

    admin: {
        useAsTitle: 'name',
        group: 'Collections',
        defaultColumns: ['name', 'company', 'rating', 'updatedAt'],
        description: 'Manage testimonial items that can be reused across pages',
    },

    // Access control
    access: {
        read: () => true, // Public read access
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => user?.role === 'admin',
    },

    fields: [
        {
            name: 'quote',
            type: 'textarea',
            required: true,
            label: 'Quote',
        },
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Name',
        },
        {
            name: 'role',
            type: 'text',
            label: 'Role or Title',
        },
        {
            name: 'location',
            type: 'text',
            label: 'Location (Town/City)',
        },
        {
            name: 'company',
            type: 'text',
            label: 'Company',
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
            label: 'Rating',
            admin: {
                step: 1,
            },
        },
    ],
}
