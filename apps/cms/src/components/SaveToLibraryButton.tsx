'use client'

import React, { useState } from 'react'
import { useFormFields, Button, toast } from '@payloadcms/ui'

/**
 * Save to Library Button
 * 
 * Adds a "Save to Library" button to page blocks that exports
 * the block configuration to the Block Library collection.
 */
export const SaveToLibraryButton: React.FC<{
    blockIndex: number
    collectionSlug: string
}> = ({ blockIndex, collectionSlug }) => {
    const [isSaving, setIsSaving] = useState(false)

    // Get the block data from the form
    const blockData = useFormFields(([fields]) => {
        const content = fields?.content?.value as any[]
        return content?.[blockIndex]
    })

    const handleSaveToLibrary = async () => {
        if (!blockData) {
            toast.error('No block data found')
            return
        }

        setIsSaving(true)

        try {
            const { blockType, id, blockName, ...cleanBlockData } = blockData

            if (!blockType) {
                toast.error('Block type not found')
                setIsSaving(false)
                return
            }

            // Generate a name for the block
            const timestamp = new Date().toISOString().split('T')[0]
            const name = blockName || `${blockType} - ${timestamp}`

            // Save to Block Library
            const response = await fetch('/api/block-library', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    blockType,
                    blockData: cleanBlockData,
                    description: `Saved from ${collectionSlug} on ${timestamp}`,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to save to library')
            }

            const result = await response.json()

            toast.success(`✅ Saved to Block Library as "${name}"`)

            // Open the new block in a new tab
            window.open(`/admin/collections/block-library/${result.doc.id}`, '_blank')

        } catch (error) {
            console.error('Error saving to library:', error)
            toast.error('Failed to save to Block Library')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <Button
                onClick={handleSaveToLibrary}
                disabled={isSaving}
                buttonStyle="secondary"
                size="small"
            >
                {isSaving ? '💾 Saving...' : '📚 Save to Block Library'}
            </Button>
            <p style={{
                margin: '0.5rem 0 0 0',
                fontSize: '0.75rem',
                color: '#6b7280'
            }}>
                Save this block configuration to Block Library for reuse across pages
            </p>
        </div>
    )
}

export default SaveToLibraryButton
