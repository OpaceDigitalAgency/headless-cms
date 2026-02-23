'use client'

import React, { useState } from 'react'
import { Button, toast, useField, useForm } from '@payloadcms/ui'

/**
 * Save Block to Library Button
 * 
 * Appears at the bottom of each block in the content array.
 * Allows users to save the current block configuration to Block Library.
 */
export const SaveBlockToLibraryButton: React.FC = () => {
    const [isSaving, setIsSaving] = useState(false)

    // Get the field path and form data
    const { path } = useField()
    const { getData } = useForm()

    const handleSave = async () => {
        // Get all form data
        const formData = getData()

        console.log('Form data:', formData)
        console.log('Field path:', path)

        // Extract block index from path (e.g., "content.0.saveToLibraryButton" -> 0)
        const pathParts = path.split('.')
        const blockIndex = parseInt(pathParts[pathParts.length - 2])

        console.log('Block index:', blockIndex)

        // Get content array
        const content = formData?.content

        if (!content || !Array.isArray(content)) {
            toast.error('No content blocks found')
            console.error('Content is not an array:', content)
            return
        }

        console.log('Content array:', content)

        // Get the specific block
        const blockData = content[blockIndex]

        if (!blockData) {
            toast.error(`No block found at index ${blockIndex}`)
            console.error('Block not found at index:', blockIndex)
            return
        }

        console.log('Block data:', blockData)

        setIsSaving(true)

        try {
            const { blockType, id: blockId, blockName, saveToLibraryButton, ...cleanData } = blockData

            if (!blockType) {
                toast.error('Block type not found')
                console.error('No blockType in block data')
                setIsSaving(false)
                return
            }

            // Prompt for name
            const defaultName = `${blockType} - ${new Date().toISOString().split('T')[0]}`
            const name = prompt('Enter a name for this block template:', defaultName)

            if (!name) {
                setIsSaving(false)
                return
            }

            console.log('Saving to library:', { blockType, cleanData, name })

            const response = await fetch('/api/save-block-to-library', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    blockType,
                    blockData: cleanData,
                    name,
                    description: `Saved from page on ${new Date().toLocaleDateString()}`,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to save')
            }

            const result = await response.json()
            console.log('Save result:', result)

            toast.success(`✅ Saved "${name}" to Block Library!`)

            // Open in new tab
            setTimeout(() => {
                window.open(`/admin/collections/block-library/${result.doc.id}`, '_blank')
            }, 500)

        } catch (error: any) {
            console.error('Error saving to library:', error)
            toast.error(`Failed: ${error.message}`)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e5e7eb'
        }}>
            <Button
                onClick={handleSave}
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
                Save this block's configuration to Block Library for reuse across pages
            </p>
        </div>
    )
}

export default SaveBlockToLibraryButton
