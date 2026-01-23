import type { CollectionConfig } from 'payload'

export const ProductReviews: CollectionConfig = {
    slug: 'product-reviews',
    admin: {
        useAsTitle: 'id',
        defaultColumns: ['product', 'rating', 'createdAt'],
        group: 'Ecommerce',
    },
    access: {
        read: () => true,
        create: () => true, // Allow anyone to review (moderation needed in real app)
        update: ({ req: { user } }) => user?.role === 'admin',
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
            required: true,
        },
        {
            name: 'rating',
            type: 'number',
            required: true,
            min: 1,
            max: 5,
        },
        {
            name: 'review',
            type: 'textarea',
            required: true,
        },
        {
            name: 'author',
            type: 'text',
            required: true,
            label: 'Author Name',
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'pending',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Approved', value: 'approved' },
                { label: 'Rejected', value: 'rejected' },
            ],
            access: {
                update: ({ req: { user } }) => user?.role === 'admin',
            },
        },
    ],
}
