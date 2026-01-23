'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'
import { PAGE_TEMPLATES, POST_TEMPLATES, PRODUCT_TEMPLATES, type TemplateDefinition } from '../templates'
import {
    FileTextIcon,
    ArtifactIcon, // Was LayoutIcon
    UserIcon,
    ArchiveIcon,
    ShoppingBagIcon,
    ImageIcon,
    BoxIcon,      // Was BriefcaseIcon
    ZapIcon,      // Was BellIcon
    type IconProps
} from '../admin/icons'

// Map characters to icons
const getIconComponent = (iconName: string): React.FC<IconProps> => {
    const iconMap: Record<string, React.FC<IconProps>> = {
        'layout': ArtifactIcon,
        'file-text': FileTextIcon,
        'user': UserIcon,
        'archive': ArchiveIcon,
        'shopping-bag': ShoppingBagIcon,
        'image': ImageIcon,
        'briefcase': BoxIcon,
        'bell': ZapIcon,
    }
    return iconMap[iconName] || FileTextIcon
}

interface TemplateGalleryProps {
    path: string
    field: {
        label?: string
        admin?: {
            description?: string
            custom?: {
                collectionSlug?: 'pages' | 'posts' | 'products'
                targetField?: string
                heroField?: string
            }
        }
    }
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ path, field }) => {
    const { value, setValue } = useField<string>({ path })

    const custom = field?.admin?.custom || {}
    const collectionSlug = custom.collectionSlug || 'pages'
    const targetField = custom.targetField || 'content'
    const heroField = custom.heroField || 'hero'

    // Get other fields to populate
    const { setValue: setContent } = useField<any[]>({ path: targetField })
    const { setValue: setHero } = useField<any>({ path: heroField })

    // Select templates based on collection
    const templates = collectionSlug === 'pages'
        ? PAGE_TEMPLATES
        : collectionSlug === 'products'
            ? PRODUCT_TEMPLATES
            : POST_TEMPLATES

    const handleSelect = (template: TemplateDefinition) => {
        if (value === template.value) return // Already selected

        // Confirm if switching templates might overwrite data
        // In a real app we might check if targetField has data. 
        // For now, we'll assume the user knows what they are doing if they explicitly click a new template.
        if (value && !window.confirm(`Switching to "${template.label}" will replace your current content. Continue?`)) {
            return
        }

        // Update template field
        setValue(template.value)

        // Populate Content
        if (template.defaultContent && setContent) {
            setContent(template.defaultContent)
        }

        // Populate Hero (only for Pages usually)
        if (template.defaultHero && setHero) {
            setHero(template.defaultHero)
        }
    }

    return (
        <div className="template-gallery">
            <div style={{ marginBottom: '10px', color: '#666' }}>
                Select a template to auto-populate content structure.
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '12px'
            }}>
                {templates.map((template) => {
                    const Icon = getIconComponent(template.thumbnail)
                    const isSelected = value === template.value

                    return (
                        <div
                            key={template.value}
                            onClick={() => handleSelect(template)}
                            style={{
                                border: isSelected ? '2px solid #0070f3' : '1px solid #e0e0e0',
                                borderRadius: '8px',
                                padding: '12px',
                                cursor: 'pointer',
                                backgroundColor: isSelected ? '#f0f7ff' : 'white',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                opacity: isSelected ? 1 : 0.8
                            }}
                            title={template.description}
                        >
                            <div style={{ marginBottom: '8px', color: isSelected ? '#0070f3' : '#666' }}>
                                <Icon size={24} />
                            </div>
                            <div style={{ fontWeight: 500, fontSize: '13px', marginBottom: '4px' }}>
                                {template.label}
                            </div>
                        </div>
                    )
                })}
            </div>

            {value && (
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#888', fontStyle: 'italic' }}>
                    Current: {templates.find(t => t.value === value)?.description}
                </div>
            )}
        </div>
    )
}

export default TemplateGallery
