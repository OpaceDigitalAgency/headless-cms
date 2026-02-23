'use client'

import React, { useState } from 'react'
import { useFormFields, Button, toast } from '@payloadcms/ui'

/**
 * Export Template to Library Button
 * 
 * Exports the template to Block Library
 */
export const ExportTemplatesButton: React.FC = () => {
    const [isExporting, setIsExporting] = useState(false)

    // Get template data from the form
    const formData = useFormFields(([fields]) => ({
        name: fields?.name?.value as string,
        templates: fields?.templates?.value as any[],
    }))

    const handleExport = async () => {
        const { name, templates } = formData

        if (!templates || templates.length === 0) {
            toast.error('Please add a block first!')
            return
        }

        if (!name) {
            toast.error('Please enter a template name!')
            return
        }

        setIsExporting(true)

        try {
            // Get the first (and only) block
            const template = templates[0]
            const { blockType, id, blockName, ...blockData } = template

            if (!blockType) {
                toast.error('Block type not found')
                setIsExporting(false)
                return
            }

            const response = await fetch('/api/save-block-to-library', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    blockType,
                    blockData,
                    name,
                    description: `Created in Block Template Builder on ${new Date().toLocaleDateString()}`,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to save template')
            }

            const result = await response.json()

            toast.success(`✅ Saved "${name}" to Block Library!`)

            // Open the new block in a new tab
            setTimeout(() => {
                window.open(`/admin/collections/block-library/${result.doc.id}`, '_blank')
            }, 500)

            // Ask if user wants to create another
            setTimeout(() => {
                if (confirm('Template saved! Create another template?')) {
                    window.location.href = '/admin/collections/block-template-builder/create'
                } else {
                    window.location.href = '/admin/collections/block-library'
                }
            }, 1000)

        } catch (error: any) {
            console.error('Error exporting template:', error)
            toast.error(`Failed to export: ${error.message}`)
        } finally {
            setIsExporting(false)
        }
    }

    if (!formData.templates || formData.templates.length === 0) {
        return (
            <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: '#f3f4f6',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                textAlign: 'center',
                color: '#6b7280'
            }}>
                <p style={{ margin: 0 }}>
                    👆 Add a block above to get started
                </p>
            </div>
        )
    }

    return (
        <div style={{
            marginTop: '1.5rem',
            padding: '1.5rem',
            background: '#f0fdf4',
            border: '2px solid #86efac',
            borderRadius: '8px',
            textAlign: 'center'
        }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#166534', fontSize: '1.125rem' }}>
                Ready to Save?
            </h3>
            <p style={{ margin: '0 0 1rem 0', color: '#166534', fontSize: '0.875rem' }}>
                This template will be saved to Block Library as "<strong>{formData.name || 'Untitled'}</strong>"
            </p>
            <Button
                onClick={handleExport}
                disabled={isExporting || !formData.name}
                buttonStyle="primary"
                size="large"
            >
                {isExporting ? '📦 Saving...' : '📚 Export to Block Library'}
            </Button>
            <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.75rem', color: '#166534' }}>
                After saving, you can use this template in automation scripts
            </p>
        </div>
    )
}

export default ExportTemplatesButton
