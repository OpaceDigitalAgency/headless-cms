import type { GlobalConfig } from 'payload'
import { allBlocks } from '../blocks'

/**
 * Block Template Builder Global
 * 
 * A workspace for creating block templates visually before saving to Block Library.
 * Users can add blocks, edit them with full visual UI, then export to Block Library.
 */
export const BlockTemplateBuilder: GlobalConfig = {
    slug: 'block-template-builder',
    label: 'Block Template Builder',

    admin: {
        group: 'Content Management',
        description: 'Create block templates visually, then save them to Block Library for reuse across pages.',
    },

    access: {
        read: () => true,
        update: ({ req: { user } }) => !!user,
    },

    fields: [
        {
            type: 'ui',
            name: 'instructions',
            admin: {
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
            name: 'templates',
            type: 'blocks',
            label: 'Block Templates',
            blocks: allBlocks,
            admin: {
                description: 'Add blocks here and edit them visually. When ready, use the "Save to Library" button below.',
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
