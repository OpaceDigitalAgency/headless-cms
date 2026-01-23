import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
        useAsTitle: 'id',
        defaultColumns: ['id', 'status', 'total', 'createdAt'],
        group: 'Ecommerce',
    },
    access: {
        read: ({ req: { user } }) => {
            if (user?.role === 'admin') return true
            if (user) return { orderedBy: { equals: user.id } }
            return false
        },
        create: () => true, // Allow anyone to create an order (e.g. guest checkout)
        update: ({ req: { user } }) => user?.role === 'admin', // Only admins update/fulfill orders
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'status',
            type: 'select',
            defaultValue: 'pending',
            required: true,
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Processing', value: 'processing' },
                { label: 'Shipped', value: 'shipped' },
                { label: 'Delivered', value: 'delivered' },
                { label: 'Cancelled', value: 'cancelled' },
            ],
        },
        {
            name: 'orderedBy',
            type: 'relationship',
            relationTo: 'users',
            required: false, // Optional for guest checkout
        },
        {
            name: 'total',
            type: 'number',
            required: true,
            min: 0,
        },
        {
            name: 'items',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                    required: true,
                },
                {
                    name: 'price',
                    type: 'number',
                    min: 0,
                    required: true,
                },
                {
                    name: 'quantity',
                    type: 'number',
                    min: 1,
                    required: true,
                },
            ],
        },
        {
            name: 'details',
            type: 'group',
            fields: [
                {
                    name: 'fullname',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'email',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'address',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'stripePaymentIntentID',
                    type: 'text',
                    admin: {
                        readOnly: true,
                    },
                },
            ],
        },
    ],
}
