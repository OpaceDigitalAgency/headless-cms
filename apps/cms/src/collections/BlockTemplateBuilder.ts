// @ts-nocheck
import type { CollectionConfig } from 'payload'
import { allBlocks } from '../blocks'

/**
 * Block Template Builder Collection
 * 
 * A workspace for creating block templates visually before saving to Block Library.
 * Users can add blocks, edit them with full visual UI, then export to Block Library.
 */
export const BlockTemplateBuilder: CollectionConfig = {
    slug: 'block-template-builder',
    labels: {
        singular: 'Block Template',
        plural: 'Block Template Builder',
    },

    admin: {
        group: 'Content Management',
        description: 'Create block templates visually, then export to Block Library for reuse across pages.',
        useAsTitle: 'name',
        defaultColumns: ['name', 'updatedAt'],
    },

    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },

    fields: [
        {
            type: 'ui',
            name: 'instructions',
            admin: {
                position: 'sidebar',
                components: {
                    Field: {
                        path: '@/components/BlockTemplateBuilderInstructions',
                        clientProps: {},
                        serverProps: {},
                    },
                },
            },
        },
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Template Name',
            admin: {
                description: 'Give this template a descriptive name (e.g., "Homepage Logo Cloud", "FAQ Section")',
            },
        },
        {
            name: 'templates',
            type: 'blocks',
            label: 'Block Templates',
            blocks: allBlocks,
            minRows: 1,
            maxRows: 1,
            admin: {
                description: 'Add ONE block and edit it visually. When ready, use the "Export to Block Library" button below.',
                initCollapsed: false,
            },
        },
        {
            type: 'ui',
            name: 'exportButton',
            admin: {
                components: {
                    Field: {
                        path: '@/components/ExportTemplatesButton',
                        clientProps: {},
                        serverProps: {},
                    },
                },
            },
        },
    ],
}
