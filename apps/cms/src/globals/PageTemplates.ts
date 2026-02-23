// @ts-nocheck
import type { GlobalConfig } from 'payload'
import { logoCloudBlock } from '../blocks/LogoCloud'
import { videoFeatureBlock } from '../blocks/VideoFeature'
import { testimonialsBlock } from '../blocks/Testimonials'
import { faqBlock } from '../blocks/FAQ'
import { ctaBlock } from '../blocks/CallToAction'
import { contentBlock } from '../blocks/Content'
import { revalidateSettings } from '../lib/revalidate'

export const PageTemplates: GlobalConfig = {
    slug: 'page-templates',
    label: 'Page Templates',

    admin: {
        group: 'Site',
        description: 'Reusable blocks that can be shared across multiple pages',
    },

    access: {
        read: () => true,
        update: ({ req: { user } }) => user?.role === 'admin',
    },

    hooks: {
        afterChange: [
            async ({ doc, req }) => {
                // Revalidate all pages when templates change
                revalidateSettings()
                req.payload.logger.info('Revalidated page templates global')
                return doc
            },
        ],
    },

    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'OBC Templates',
                    description: 'Reusable blocks for OBC pages',
                    fields: [
                        {
                            name: 'obcLogoCloud',
                            type: 'blocks',
                            label: 'Logo Cloud / Trust Badges',
                            blocks: [logoCloudBlock],
                            maxRows: 1,
                            admin: {
                                description: 'Shared logo cloud block for all OBC pages',
                            },
                        },
                        {
                            name: 'obcVideo',
                            type: 'blocks',
                            label: 'Video Block',
                            blocks: [videoFeatureBlock],
                            maxRows: 1,
                            admin: {
                                description: 'Shared video block for all OBC pages',
                            },
                        },
                        {
                            name: 'obcTestimonials',
                            type: 'blocks',
                            label: 'What Customers Say',
                            blocks: [testimonialsBlock],
                            maxRows: 1,
                            admin: {
                                description: 'Shared testimonials block for all OBC pages',
                            },
                        },
                        {
                            name: 'obcScotlandBlock',
                            type: 'blocks',
                            label: 'Boiler Installation & Replacement Across Scotland',
                            blocks: [contentBlock],
                            maxRows: 1,
                            admin: {
                                description: 'Shared Scotland coverage block for all OBC pages',
                            },
                        },
                        {
                            name: 'obcFaqs',
                            type: 'blocks',
                            label: 'Common Questions',
                            blocks: [faqBlock],
                            maxRows: 1,
                            admin: {
                                description: 'Shared FAQ block for all OBC pages',
                            },
                        },
                        {
                            name: 'obcCta',
                            type: 'blocks',
                            label: 'CTA Strip',
                            blocks: [ctaBlock],
                            maxRows: 1,
                            admin: {
                                description: 'Shared CTA block for all OBC pages',
                            },
                        },
                    ],
                },
                {
                    label: 'General Templates',
                    description: 'Reusable blocks for other page types',
                    fields: [
                        {
                            name: 'generalBlocks',
                            type: 'blocks',
                            label: 'General Reusable Blocks',
                            blocks: [
                                logoCloudBlock,
                                videoFeatureBlock,
                                testimonialsBlock,
                                faqBlock,
                                ctaBlock,
                                contentBlock,
                            ],
                            admin: {
                                description: 'Create reusable blocks for any page type',
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

export default PageTemplates
