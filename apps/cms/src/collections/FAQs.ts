// @ts-nocheck
import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
    slug: 'faqs',

    admin: {
        useAsTitle: 'question',
        group: 'Content',
        defaultColumns: ['question', 'category', 'updatedAt'],
        description: 'Manage FAQ items that can be reused across pages',
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
            name: 'question',
            type: 'text',
            required: true,
            label: 'Question',
        },
        {
            name: 'answer',
            type: 'richText',
            required: true,
            label: 'Answer',
        },
        {
            name: 'category',
            type: 'text',
            label: 'Category',
            admin: {
                description: 'Categorize FAQs for better organization',
            },
        },
    ],
}
