// @ts-nocheck
import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const postsBlock: Block = {
    slug: 'posts',
    labels: {
        singular: 'Posts',
        plural: 'Posts',
    },
    imageURL: blockIcons.content,
    imageAltText: 'Posts block preview',
    fields: [
        {
            name: 'heading',
            type: 'text',
            label: 'Heading',
            defaultValue: 'Latest Blog Posts',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            admin: {
                condition: (_, siblingData) => !siblingData?.useGlobal,
            },
        },
        {
            name: 'limit',
            type: 'number',
            label: 'Number of Posts to Display',
            defaultValue: 10,
            min: 1,
            max: 50,
            admin: {
                description: 'How many blog posts to show',
                condition: (_, siblingData) => !siblingData?.useGlobal,
            },
        },
        {
            name: 'layout',
            type: 'select',
            label: 'Layout Style',
            defaultValue: 'grid',
            options: [
                { label: 'Grid (Cards)', value: 'grid' },
                { label: 'List', value: 'list' },
                { label: 'Featured + Grid', value: 'featured' },
            ],
            admin: {
                description: 'How to display the blog posts',
                condition: (_, siblingData) => !siblingData?.useGlobal,
            },
        },
        {
            name: 'showExcerpt',
            type: 'checkbox',
            label: 'Show Excerpt',
            defaultValue: true,
            admin: {
                condition: (_, siblingData) => !siblingData?.useGlobal,
            },
        },
        {
            name: 'showFeaturedImage',
            type: 'checkbox',
            label: 'Show Featured Image',
            defaultValue: true,
            admin: {
                condition: (_, siblingData) => !siblingData?.useGlobal,
            },
        },
        {
            name: 'showDate',
            type: 'checkbox',
            label: 'Show Publish Date',
            defaultValue: true,
            admin: {
                condition: (_, siblingData) => !siblingData?.useGlobal,
            },
        },
        {
            name: 'showAuthor',
            type: 'checkbox',
            label: 'Show Author',
            defaultValue: false,
            admin: {
                condition: (_, siblingData) => !siblingData?.useGlobal,
            },
        },
        {
            type: 'ui',
            name: 'saveToLibraryButton',
            admin: {
                components: {
                    Field: {
                        path: '@/components/SaveBlockToLibraryButton',
                        clientProps: {},
                        serverProps: {},
                    },
                },
            },
        },
    ],
}

export default postsBlock
