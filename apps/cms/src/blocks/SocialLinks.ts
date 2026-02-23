import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const socialLinksBlock: Block = {
    slug: 'socialLinks',
    labels: {
        singular: 'Social Links',
        plural: 'Social Links',
    },
    imageURL: blockIcons.grid,
    imageAltText: 'Social media links block preview',
    fields: [
        {
            name: 'heading',
            type: 'text',
            label: 'Heading',
            defaultValue: 'Connect With Us',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            admin: {
                description: 'Optional description text to display above the social links',
            },
        },
        {
            name: 'variant',
            type: 'select',
            label: 'Display Style',
            defaultValue: 'horizontal',
            options: [
                { label: 'Horizontal (Row)', value: 'horizontal' },
                { label: 'Grid (2 Columns)', value: 'grid' },
                { label: 'Large Icons', value: 'large' },
            ],
        },
        {
            name: 'showLabels',
            type: 'checkbox',
            label: 'Show Platform Names',
            defaultValue: false,
            admin: {
                description: 'Display platform names alongside icons',
            },
        },
        {
            name: 'useGlobalLinks',
            type: 'checkbox',
            label: 'Use Global Social Links',
            defaultValue: true,
            admin: {
                description: 'Use social links from Footer global. Uncheck to define custom links below.',
            },
        },
        {
            name: 'customLinks',
            type: 'array',
            label: 'Custom Social Links',
            admin: {
                condition: (_, siblingData) => !siblingData?.useGlobalLinks,
                description: 'Define custom social links for this block only',
            },
            fields: [
                {
                    name: 'platform',
                    type: 'select',
                    required: true,
                    options: [
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'Twitter/X', value: 'twitter' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'TikTok', value: 'tiktok' },
                        { label: 'GitHub', value: 'github' },
                        { label: 'Discord', value: 'discord' },
                    ],
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}

export default socialLinksBlock
