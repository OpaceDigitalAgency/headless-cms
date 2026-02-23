// @ts-nocheck
import type { CollectionConfig } from 'payload'
import { transformBlockLibraryItem } from '../lib/transformBlockUrls'

export const BlockLibrary: CollectionConfig = {
    slug: 'block-library',

    admin: {
        useAsTitle: 'name',
        group: 'Content Management',
        description: 'Reusable block instances that can be shared across multiple pages',
        defaultColumns: ['name', 'blockType', 'updatedAt'],
    },

    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },

    hooks: {
        beforeChange: [
            ({ data }) => {
                // Transform absolute URLs to relative URLs for environment portability
                if (data.blockData) {
                    const transformed = transformBlockLibraryItem({
                        blockType: data.blockType,
                        blockData: data.blockData,
                        name: data.name,
                        description: data.description,
                    })
                    data.blockData = transformed.blockData
                }
                return data
            },
        ],
    },

    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Block Instance Name',
            admin: {
                description: 'Give this block a descriptive name (e.g., "Main CTA Bar", "Homepage Logo Cloud")',
            },
        },
        {
            name: 'blockType',
            type: 'select',
            required: true,
            label: 'Block Type',
            options: [
                { label: 'Hero', value: 'hero' },
                { label: 'Call to Action', value: 'cta' },
                { label: 'Features', value: 'features' },
                { label: 'Content', value: 'content' },
                { label: 'Logo Cloud', value: 'logoCloud' },
                { label: 'FAQ', value: 'faq' },
                { label: 'Testimonials', value: 'testimonials' },
                { label: 'Grid', value: 'grid' },
                { label: 'Video Feature', value: 'videoFeature' },
                { label: 'Custom HTML', value: 'html' },
                { label: 'Archive', value: 'archive' },
                { label: 'Form', value: 'form' },
                { label: 'Embed', value: 'embed' },
                { label: 'Pricing', value: 'pricing' },
                { label: 'Quote', value: 'quote' },
                { label: 'Stats', value: 'stats' },
                { label: 'Team', value: 'team' },
                { label: 'Timeline', value: 'timeline' },
                { label: 'Gallery', value: 'gallery' },
                { label: 'Spacer', value: 'spacer' },
                { label: 'Media', value: 'media' },
            ],
            admin: {
                description: 'Select the type of block you want to create',
            },
        },
        {
            name: 'blockData',
            type: 'json',
            required: true,
            label: 'Block Configuration',
            admin: {
                description: 'Edit the block configuration as JSON. Tip: Edit blocks visually on a page first, then use "Save to Library" button.',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            admin: {
                description: 'Optional description of what this block is used for and where it appears',
            },
        },
    ],
}
