import type { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
    slug: 'locations',

    admin: {
        useAsTitle: 'location_name',
        group: 'Content',
        defaultColumns: ['location_name', 'location_slug', 'qa_score', 'status', 'updatedAt'],
        description: 'Location pages data (managed via JSON import - do not edit manually)',
        preview: (doc) => {
            if (doc?.location_slug) {
                return `${process.env.NEXT_PUBLIC_SERVER_URL}/new-boiler-installation/${doc.location_slug}`
            }
            return ''
        },
    },

    // Access control
    access: {
        read: () => true, // Public read access for Next.js frontend
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
        delete: ({ req: { user } }) => user?.role === 'admin',
    },

    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'location_name',
                            type: 'text',
                            required: true,
                            label: 'Location Name',
                            admin: {
                                description: 'e.g., "Glasgow", "Edinburgh"',
                            },
                        },
                        {
                            name: 'location_slug',
                            type: 'text',
                            required: true,
                            unique: true,
                            label: 'URL Slug',
                            admin: {
                                description: 'e.g., "glasgow", "edinburgh" - used in URL path',
                            },
                        },
                        {
                            name: 'h1',
                            type: 'text',
                            required: true,
                            label: 'H1 Heading',
                            admin: {
                                description: 'Pre-written H1 following SEO rules',
                            },
                        },
                        {
                            name: 'intro_copy',
                            type: 'richText',
                            label: 'Intro Copy',
                            admin: {
                                description: 'Location-specific introduction paragraph',
                            },
                        },
                        {
                            name: 'extra_copy',
                            type: 'richText',
                            label: 'Extra Copy',
                            admin: {
                                description: 'Additional location-specific content sections',
                            },
                        },
                        {
                            name: 'faqs',
                            type: 'array',
                            label: 'Location FAQs',
                            admin: {
                                description: 'Location-specific frequently asked questions',
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
                            ],
                        },
                        {
                            name: 'nearby_locations',
                            type: 'array',
                            label: 'Nearby Locations',
                            admin: {
                                description: 'List of nearby location names for internal linking',
                            },
                            fields: [
                                {
                                    name: 'name',
                                    type: 'text',
                                    required: true,
                                    label: 'Location Name',
                                },
                            ],
                        },
                    ],
                },
                // SEO Tab will be injected here automatically by the plugin
            ],
        },
        {
            name: 'qa_score',
            type: 'number',
            label: 'QA Score',
            admin: {
                description: 'Quality score from data generation',
                position: 'sidebar',
            },
        },
        {
            name: 'status',
            type: 'text',
            label: 'Status',
            admin: {
                description: 'Status flag from JSON data',
                position: 'sidebar',
            },
        },
        {
            name: 'canonical_path',
            type: 'text',
            label: 'Canonical Path',
            admin: {
                description: 'Full canonical URL path (e.g., "/glasgow")',
                position: 'sidebar',
            },
        },
    ],
}
