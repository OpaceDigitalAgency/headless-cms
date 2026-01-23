import type { CollectionConfig } from 'payload'

export const Carts: CollectionConfig = {
    slug: 'carts',
    admin: {
        useAsTitle: 'id',
        group: 'Ecommerce',
    },
    access: {
        read: ({ req: { user } }) => {
            if (user?.role === 'admin') return true
            if (user) return { user: { equals: user.id } }
            return true // Need to allow anonymous read for guest carts (usually handled by cookies/tokens in real app)
        },
        create: () => true,
        update: ({ req: { user } }) => {
            if (user?.role === 'admin') return true
            if (user) return { user: { equals: user.id } }
            return true
        },
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: false,
        },
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                    required: true,
                },
                {
                    name: 'quantity',
                    type: 'number',
                    min: 1,
                    required: true,
                    defaultValue: 1,
                },
            ],
        },
    ],
}
