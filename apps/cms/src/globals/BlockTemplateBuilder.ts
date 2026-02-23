// @ts-nocheck
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
        description: 'A visual workspace for building block templates before saving them to the Block Library. Add blocks here, edit them with the full block editor UI, then click the "Save to Library" button to save each finished block to the Block Library where editors can insert it onto any page. Think of this as a drafting area that does not affect the public site — nothing added here is published automatically.',
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
