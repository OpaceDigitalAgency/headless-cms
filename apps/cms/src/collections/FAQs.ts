// @ts-nocheck
import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
    slug: 'faqs',

    admin: {
        useAsTitle: 'question',
        group: 'Content',
        defaultColumns: ['question', 'category', 'updatedAt'],
        description: 'A centralised library of question/answer pairs. FAQs are standalone records here, and the FAQ block on any page or post can pull from this collection. Manage all your frequently asked questions in one place rather than re-entering them on every page. Use the Category field to group related questions (e.g. "Pricing", "Technical", "Delivery").',
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
