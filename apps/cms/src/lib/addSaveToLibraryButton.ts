// @ts-nocheck
import type { Block } from 'payload'

/**
 * Add "Save to Library" button to a block
 * 
 * Wraps a block's fields with a UI component that shows a save button
 */
export function addSaveToLibraryButton(block: Block): Block {
    return {
        ...block,
        fields: [
            ...block.fields,
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
}
