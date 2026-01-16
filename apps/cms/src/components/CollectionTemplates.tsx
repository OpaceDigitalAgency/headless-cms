'use client'

import React, { useState, useEffect } from 'react'
import {
  allTemplates,
  TEMPLATE_CATEGORIES,
  COLLECTION_BUNDLES,
  type CollectionTemplate,
  type TemplateCategory,
  type BundleId,
} from '../collection-templates'
import {
  FileTextIcon,
  EditIcon,
  ArtifactIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  ShoppingCartIcon,
  ImageIcon,
  PackageIcon,
  type IconProps
} from '../admin/icons'

// Map emoji icons to SVG icon components
const getIconComponent = (iconString: string): React.FC<IconProps> => {
  const iconMap: Record<string, React.FC<IconProps>> = {
    '📝': EditIcon,
    '🏛️': ArtifactIcon,
    '🛒': ShoppingCartIcon,
    '👤': UserIcon,
    '📍': MapPinIcon,
    '📅': CalendarIcon,
    '🎬': ImageIcon,
    '📦': PackageIcon,
  }
  return iconMap[iconString] || EditIcon
}

/**
 * Collection Templates Browser
 *
 * Allows users to browse, preview, and add collection templates to their CMS.
 * Similar to WordPress plugin/theme browser.
 */
export const CollectionTemplates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all' | 'bundles'>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<CollectionTemplate | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [installedCollections, setInstalledCollections] = useState<string[]>([])

  // Load installed collections on mount
  useEffect(() => {
    fetchInstalledCollections()
  }, [])

  const fetchInstalledCollections = async () => {
    try {
      const response = await fetch('/api/collection-templates/installed')
      if (response.ok) {
        const data = await response.json()
        setInstalledCollections(data.slugs || [])
      }
    } catch (error) {
      console.error('Failed to fetch installed collections:', error)
    }
  }

  const filteredTemplates = selectedCategory === 'all' 
    ? allTemplates 
    : selectedCategory === 'bundles'
    ? []
    : allTemplates.filter(t => t.category === selectedCategory)

  const handleSelectTemplate = (template: CollectionTemplate) => {
    setSelectedTemplate(template)
    setCustomName(template.defaultPlural)
    setCustomSlug(template.defaultSlug)
  }

  const handleAddTemplate = async () => {
    if (!selectedTemplate || !customName || !customSlug) return

    setIsAdding(true)
    setMessage(null)

    try {
      const response = await fetch('/api/collection-templates/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          customName,
          slug: customSlug,
          singular: customName.replace(/s$/, ''), // Simple singularization
          plural: customName,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: `Successfully added "${customName}" collection!` })
        setShowAddModal(false)
        setSelectedTemplate(null)
        fetchInstalledCollections()
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to add collection' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add collection. Please try again.' })
    } finally {
      setIsAdding(false)
    }
  }

  const handleAddBundle = async (bundleId: BundleId) => {
    const bundle = COLLECTION_BUNDLES[bundleId]
    if (!bundle) return

    setIsAdding(true)
    setMessage(null)

    try {
      const response = await fetch('/api/collection-templates/add-bundle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bundleId }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: `Successfully added "${bundle.name}" bundle!` })
        fetchInstalledCollections()
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to add bundle' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add bundle. Please try again.' })
    } finally {
      setIsAdding(false)
    }
  }

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 600 }}>
        Collection Templates
      </h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Add new content types to your CMS. Each template can be customized with your own name.
      </p>

      {/* Message */}
      {message && (
        <div style={{
          padding: '12px 16px',
          marginBottom: '20px',
          borderRadius: '4px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
        }}>
          {message.text}
        </div>
      )}

      {/* Category Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '10px',
      }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: selectedCategory === 'all' ? '#0070f3' : '#f0f0f0',
            color: selectedCategory === 'all' ? 'white' : '#333',
            fontWeight: selectedCategory === 'all' ? 600 : 400,
          }}
        >
          All Templates
        </button>
        <button
          onClick={() => setSelectedCategory('bundles')}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: selectedCategory === 'bundles' ? '#0070f3' : '#f0f0f0',
            color: selectedCategory === 'bundles' ? 'white' : '#333',
            fontWeight: selectedCategory === 'bundles' ? 600 : 400,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <PackageIcon size={16} /> Bundles
        </button>
        {Object.entries(TEMPLATE_CATEGORIES).map(([key, { label, icon }]) => {
          const IconComponent = getIconComponent(icon)
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as TemplateCategory)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: selectedCategory === key ? '#0070f3' : '#f0f0f0',
                color: selectedCategory === key ? 'white' : '#333',
                fontWeight: selectedCategory === key ? 600 : 400,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <IconComponent size={16} /> {label}
            </button>
          )
        })}
      </div>

      {/* Bundles View */}
      {selectedCategory === 'bundles' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {Object.entries(COLLECTION_BUNDLES).map(([id, bundle]) => {
            const IconComponent = getIconComponent(bundle.icon)
            return (
              <div
                key={id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: 'white',
                }}
              >
                <div style={{ marginBottom: '10px' }}><IconComponent size={32} /></div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{bundle.name}</h3>
              <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
                {bundle.description}
              </p>
              <p style={{ margin: '0 0 16px 0', color: '#888', fontSize: '12px' }}>
                Includes: {bundle.templates.join(', ')}
              </p>
              <button
                onClick={() => handleAddBundle(id as BundleId)}
                disabled={isAdding}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isAdding ? 'not-allowed' : 'pointer',
                  opacity: isAdding ? 0.6 : 1,
                  width: '100%',
                }}
              >
                {isAdding ? 'Adding...' : 'Add Bundle'}
              </button>
            </div>
          )
          })}
        </div>
      )}

      {/* Templates Grid */}
      {selectedCategory !== 'bundles' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filteredTemplates.map((template) => {
            const isInstalled = installedCollections.includes(template.defaultSlug)
            const IconComponent = getIconComponent(template.icon)
            return (
              <div
                key={template.id}
                style={{
                  border: selectedTemplate?.id === template.id ? '2px solid #0070f3' : '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '20px',
                  cursor: 'pointer',
                  backgroundColor: isInstalled ? '#f8f9fa' : 'white',
                  opacity: isInstalled ? 0.7 : 1,
                }}
                onClick={() => !isInstalled && handleSelectTemplate(template)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ marginBottom: '10px' }}><IconComponent size={32} /></div>
                  {isInstalled && (
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      borderRadius: '4px',
                    }}>
                      Installed
                    </span>
                  )}
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{template.name}</h3>
                <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
                  {template.description}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                  }}>
                    {TEMPLATE_CATEGORIES[template.category].label}
                  </span>
                  {template.hasSeedData && (
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      borderRadius: '4px',
                    }}>
                      Sample Data
                    </span>
                  )}
                  {template.hasSeedMedia && (
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      backgroundColor: '#fff3e0',
                      color: '#f57c00',
                      borderRadius: '4px',
                    }}>
                      Sample Images
                    </span>
                  )}
                </div>
                {!isInstalled && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectTemplate(template)
                      setShowAddModal(true)
                    }}
                    style={{
                      marginTop: '16px',
                      padding: '8px 16px',
                      backgroundColor: '#0070f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    Add to CMS
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && selectedTemplate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
          }}>
            <h3 style={{ margin: '0 0 8px 0' }}>
              Add {selectedTemplate.name} Collection
            </h3>
            <p style={{ margin: '0 0 20px 0', color: '#666' }}>
              Customize the name for your new collection. For example, rename "Archive Item" to "Classic Cars" or "Vintage Watches".
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
                Collection Name (Plural)
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => {
                  setCustomName(e.target.value)
                  setCustomSlug(slugify(e.target.value))
                }}
                placeholder="e.g., Classic Cars, Vintage Watches"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
                URL Slug
              </label>
              <input
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(slugify(e.target.value))}
                placeholder="e.g., classic-cars"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#888' }}>
                This will be used in URLs: /api/{customSlug}
              </p>
            </div>

            <div style={{ 
              padding: '12px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px',
              marginBottom: '20px',
            }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                <strong>What you'll get:</strong>
              </p>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '13px', color: '#666' }}>
                <li>Full content management for "{customName}"</li>
                <li>Categories and tags support</li>
                <li>Flexible content blocks (Hero, Gallery, etc.)</li>
                <li>SEO fields and meta data</li>
                <li>Version history and drafts</li>
                {selectedTemplate.hasSeedData && (
                  <li>Optional sample data ({selectedTemplate.seedDataCount} items)</li>
                )}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setSelectedTemplate(null)
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddTemplate}
                disabled={isAdding || !customName || !customSlug}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isAdding ? 'not-allowed' : 'pointer',
                  opacity: isAdding || !customName || !customSlug ? 0.6 : 1,
                }}
              >
                {isAdding ? 'Adding...' : 'Add Collection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollectionTemplates
