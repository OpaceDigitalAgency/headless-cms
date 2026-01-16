'use client'

import React, { useState, useEffect } from 'react'
import {
  FileTextIcon,
  EditIcon,
  ArtifactIcon,
  UserIcon,
  MapPinIcon,
  TagIcon,
  FolderIcon,
  SettingsIcon,
  TrashIcon,
  type IconProps
} from '../admin/icons'

/**
 * Collection seed status
 */
interface CollectionSeedStatus {
  slug: string
  label: string
  count: number
  hasSeedData: boolean
  hasSeedMedia: boolean
  Icon: React.FC<IconProps>
}

/**
 * Preset metadata type
 */
interface PresetInfo {
  id: string
  name: string
  description: string
  collections: string[]
  hasSeedData: boolean
  hasSampleMedia: boolean
}

/**
 * Seed Data Manager Component
 * 
 * Provides context-aware seed data management:
 * - Per-collection seed/clear/reseed buttons
 * - Preset-based bulk seeding
 * - Optional media download
 * 
 * All options are OPTIONAL - users only click if desired.
 * Users can preview with sample data, then delete when ready to add their own.
 */
export const SeedDataManager: React.FC = () => {
  const [activeView, setActiveView] = useState<'collections' | 'presets'>('collections')
  const [collections, setCollections] = useState<CollectionSeedStatus[]>([])
  const [presets, setPresets] = useState<PresetInfo[]>([])
  const [selectedPreset, setSelectedPreset] = useState<string>('museum-next')
  const [loading, setLoading] = useState(true)
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)
  const [includeMedia, setIncludeMedia] = useState<Record<string, boolean>>({})

  // Fetch data on mount
  useEffect(() => {
    fetchCollectionStatus()
    fetchPresets()
  }, [])

  const getIconForCollection = (slug: string): React.FC<IconProps> => {
    const iconMap: Record<string, React.FC<IconProps>> = {
      'pages': FileTextIcon,
      'posts': EditIcon,
      'categories': TagIcon,
      'tags': TagIcon,
      'artifacts': ArtifactIcon,
      'people': UserIcon,
      'places': MapPinIcon,
      'museum-collections': FolderIcon,
      'content-types': FolderIcon,
      'custom-items': FolderIcon,
      'products': FolderIcon,
      'product-categories': TagIcon,
      'product-collections': FolderIcon,
    }
    return iconMap[slug] || FileTextIcon
  }

  const fetchCollectionStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/seed/collections')
      if (response.ok) {
        const data = await response.json()
        // Map the API response to include Icon components
        const collectionsWithIcons = (data.collections || []).map((c: any) => ({
          ...c,
          Icon: getIconForCollection(c.slug)
        }))
        setCollections(collectionsWithIcons.length > 0 ? collectionsWithIcons : getDefaultCollections())
        // Initialize media preferences
        const mediaPrefs: Record<string, boolean> = {}
        collectionsWithIcons.forEach((c: CollectionSeedStatus) => {
          if (c.hasSeedMedia) {
            mediaPrefs[c.slug] = true
          }
        })
        setIncludeMedia(mediaPrefs)
      } else {
        setCollections(getDefaultCollections())
      }
    } catch (error) {
      console.error('Failed to fetch collection status:', error)
      setCollections(getDefaultCollections())
    } finally {
      setLoading(false)
    }
  }

  const fetchPresets = async () => {
    try {
      const response = await fetch('/api/seed/presets')
      if (response.ok) {
        const data = await response.json()
        setPresets(data.presets || getDefaultPresets())
      } else {
        setPresets(getDefaultPresets())
      }
    } catch (error) {
      setPresets(getDefaultPresets())
    }
  }

  const getDefaultCollections = (): CollectionSeedStatus[] => [
    { slug: 'pages', label: 'Pages', count: 0, hasSeedData: true, hasSeedMedia: false, Icon: FileTextIcon },
    { slug: 'posts', label: 'Posts', count: 0, hasSeedData: true, hasSeedMedia: false, Icon: EditIcon },
    { slug: 'categories', label: 'Categories', count: 0, hasSeedData: true, hasSeedMedia: false, Icon: TagIcon },
    { slug: 'tags', label: 'Tags', count: 0, hasSeedData: false, hasSeedMedia: false, Icon: TagIcon },
    { slug: 'artifacts', label: 'Artifacts', count: 0, hasSeedData: true, hasSeedMedia: true, Icon: ArtifactIcon },
    { slug: 'people', label: 'People', count: 0, hasSeedData: true, hasSeedMedia: true, Icon: UserIcon },
    { slug: 'places', label: 'Places', count: 0, hasSeedData: true, hasSeedMedia: true, Icon: MapPinIcon },
    { slug: 'museum-collections', label: 'Collections', count: 0, hasSeedData: true, hasSeedMedia: false, Icon: FolderIcon },
  ]

  const getDefaultPresets = (): PresetInfo[] => [
    {
      id: 'blog-astro',
      name: 'Blog',
      description: 'A blog site with posts, categories, and pages',
      collections: ['pages', 'posts', 'categories'],
      hasSeedData: true,
      hasSampleMedia: false,
    },
    {
      id: 'brochure-astro',
      name: 'Brochure',
      description: 'A marketing/brochure website with landing pages',
      collections: ['pages'],
      hasSeedData: true,
      hasSampleMedia: false,
    },
    {
      id: 'museum-next',
      name: 'Museum/Archive',
      description: 'A museum/archive site with artifacts, people, and places',
      collections: ['pages', 'posts', 'categories', 'artifacts', 'people', 'places', 'museum-collections'],
      hasSeedData: true,
      hasSampleMedia: true,
    },
    {
      id: 'ecommerce-next',
      name: 'Ecommerce',
      description: 'An ecommerce catalog with products and collections',
      collections: ['pages', 'products', 'product-categories', 'product-collections'],
      hasSeedData: true,
      hasSampleMedia: true,
    },
  ]

  const handleSeedCollection = async (slug: string, action: 'seed' | 'clear' | 'reseed') => {
    setActionInProgress(`${slug}-${action}`)
    setMessage(null)

    try {
      const response = await fetch('/api/seed/collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          action,
          includeMedia: includeMedia[slug] || false,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        const actionText = action === 'seed' ? 'seeded' : action === 'clear' ? 'cleared' : 're-seeded'
        setMessage({ 
          type: 'success', 
          text: `Successfully ${actionText} ${slug}! ${data.itemsAffected ? `(${data.itemsAffected} items)` : ''}` 
        })
        fetchCollectionStatus()
      } else {
        setMessage({ type: 'error', text: data.message || `Failed to ${action} collection` })
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Failed to ${action} collection. Please try again.` })
    } finally {
      setActionInProgress(null)
    }
  }

  const handlePresetAction = async (action: 'seed' | 'clear' | 'reseed') => {
    if (!selectedPreset) {
      setMessage({ type: 'error', text: 'Please select a preset first' })
      return
    }

    if (action === 'clear' || action === 'reseed') {
      const confirmed = window.confirm(
        action === 'clear' 
          ? 'This will permanently delete all sample data. Are you sure?'
          : 'This will clear existing sample data and re-seed. Are you sure?'
      )
      if (!confirmed) return
    }

    setActionInProgress(`preset-${action}`)
    setMessage({ type: 'info', text: `${action === 'seed' ? 'Seeding' : action === 'clear' ? 'Clearing' : 'Re-seeding'} sample data...` })

    const preset = presets.find(p => p.id === selectedPreset)

    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          preset: selectedPreset,
          includeMedia: preset?.hasSampleMedia ? includeMedia['preset'] : false,
          clearExisting: action === 'reseed',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || `Successfully ${action}ed sample data!` })
        fetchCollectionStatus()
      } else {
        setMessage({ type: 'error', text: data.message || `Failed to ${action} data` })
      }
    } catch (error) {
      setMessage({ type: 'error', text: `An error occurred while ${action}ing data` })
    } finally {
      setActionInProgress(null)
    }
  }

  const handleCreateShowcase = async () => {
    setActionInProgress('pages-showcase')
    setMessage({ type: 'info', text: 'Creating Blocks Showcase page...' })

    try {
      const response = await fetch('/api/seed/showcase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Blocks Showcase page created.' })
        fetchCollectionStatus()
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to create Blocks Showcase page.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create Blocks Showcase page. Please try again.' })
    } finally {
      setActionInProgress(null)
    }
  }

  const hasAnyData = collections.some(c => c.count > 0)
  const selectedPresetInfo = presets.find(p => p.id === selectedPreset)

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        Loading collection status...
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{
        margin: '0 0 8px 0',
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--theme-text)',
      }}>
        Sample Data Manager
      </h2>
      <p style={{ margin: '0 0 16px 0', color: 'var(--theme-elevation-600)', fontSize: '14px' }}>
        Preview your site with sample data, then delete it when you're ready to add your own content.
      </p>

      {/* View Toggle */}
      <div style={{
        display: 'flex',
        gap: '0',
        marginBottom: '20px',
        borderBottom: '1px solid var(--theme-elevation-200)',
      }}>
        <button
          onClick={() => setActiveView('collections')}
          style={{
            padding: '10px 16px',
            border: 'none',
            borderBottom: activeView === 'collections' ? '2px solid var(--theme-success-500)' : '2px solid transparent',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: activeView === 'collections' ? 600 : 400,
            color: activeView === 'collections' ? 'var(--theme-text)' : 'var(--theme-elevation-600)',
          }}
        >
          Per Collection
        </button>
        <button
          onClick={() => setActiveView('presets')}
          style={{
            padding: '10px 16px',
            border: 'none',
            borderBottom: activeView === 'presets' ? '2px solid var(--theme-success-500)' : '2px solid transparent',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: activeView === 'presets' ? 600 : 400,
            color: activeView === 'presets' ? 'var(--theme-text)' : 'var(--theme-elevation-600)',
          }}
        >
          By Preset
        </button>
      </div>

      {/* Message */}
      {message && (
        <div style={{
          padding: '12px 16px',
          marginBottom: '16px',
          borderRadius: '4px',
          backgroundColor: message.type === 'success' ? '#d4edda' : message.type === 'error' ? '#f8d7da' : '#cce5ff',
          color: message.type === 'success' ? '#155724' : message.type === 'error' ? '#721c24' : '#004085',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : message.type === 'error' ? '#f5c6cb' : '#b8daff'}`,
        }}>
          {message.text}
        </div>
      )}

      {/* Per Collection View */}
      {activeView === 'collections' && (
        <>
          {/* Bulk Actions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px',
            padding: '16px',
            backgroundColor: 'var(--theme-elevation-50)',
            borderRadius: '8px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <span style={{ fontWeight: 500, color: 'var(--theme-text)' }}>Bulk Actions:</span>
            <button
              onClick={() => handlePresetAction('seed')}
              disabled={actionInProgress !== null}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: actionInProgress ? 'not-allowed' : 'pointer',
                opacity: actionInProgress ? 0.6 : 1,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <SettingsIcon size={14} /> {actionInProgress === 'preset-seed' ? 'Seeding...' : 'Seed All'}
            </button>
            {hasAnyData && (
              <button
                onClick={() => handlePresetAction('clear')}
                disabled={actionInProgress !== null}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: actionInProgress ? 'not-allowed' : 'pointer',
                  opacity: actionInProgress ? 0.6 : 1,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <TrashIcon size={14} /> {actionInProgress === 'preset-clear' ? 'Clearing...' : 'Clear All'}
              </button>
            )}
          </div>

          {/* Per-Collection Controls */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}>
            {collections.filter(c => c.hasSeedData).map((collection) => (
              <CollectionSeedCard
                key={collection.slug}
                collection={collection}
                includeMedia={includeMedia[collection.slug] || false}
                onIncludeMediaChange={(value) => setIncludeMedia(prev => ({ ...prev, [collection.slug]: value }))}
                onSeed={() => handleSeedCollection(collection.slug, 'seed')}
                onClear={() => handleSeedCollection(collection.slug, 'clear')}
                onReseed={() => handleSeedCollection(collection.slug, 'reseed')}
                onCreateShowcase={collection.slug === 'pages' ? handleCreateShowcase : undefined}
                actionInProgress={actionInProgress}
              />
            ))}
          </div>
        </>
      )}

      {/* Preset View */}
      {activeView === 'presets' && (
        <div style={{
          backgroundColor: 'var(--theme-elevation-50)',
          borderRadius: '8px',
          padding: '20px',
        }}>
          {/* Preset Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--theme-text)',
            }}>
              Select Preset
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value)}
              disabled={actionInProgress !== null}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                borderRadius: '6px',
                border: '1px solid var(--theme-elevation-200)',
                backgroundColor: 'var(--theme-input-bg)',
                color: 'var(--theme-text)',
                cursor: actionInProgress ? 'not-allowed' : 'pointer',
              }}
            >
              {presets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          {/* Preset Description */}
          {selectedPresetInfo && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'var(--theme-elevation-100)',
              borderRadius: '6px',
              marginBottom: '20px',
            }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--theme-text)' }}>
                {selectedPresetInfo.description}
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--theme-elevation-700)' }}>
                <strong>Collections:</strong> {selectedPresetInfo.collections.join(', ')}
              </p>
            </div>
          )}

          {/* Include Media Option */}
          {selectedPresetInfo?.hasSampleMedia && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: actionInProgress ? 'not-allowed' : 'pointer',
              }}>
                <input
                  type="checkbox"
                  checked={includeMedia['preset'] || false}
                  onChange={(e) => setIncludeMedia(prev => ({ ...prev, preset: e.target.checked }))}
                  disabled={actionInProgress !== null}
                  style={{ width: '18px', height: '18px', cursor: actionInProgress ? 'not-allowed' : 'pointer' }}
                />
                <span style={{ fontSize: '14px', color: 'var(--theme-text)' }}>
                  Include sample images (downloads from Unsplash)
                </span>
              </label>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button
              onClick={() => handlePresetAction('seed')}
              disabled={actionInProgress !== null}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#28a745',
                color: 'white',
                cursor: actionInProgress ? 'not-allowed' : 'pointer',
                opacity: actionInProgress ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <SettingsIcon size={16} /> {actionInProgress === 'preset-seed' ? 'Processing...' : 'Seed Sample Data'}
            </button>

            {hasAnyData && (
              <>
                <button
                  onClick={() => handlePresetAction('reseed')}
                  disabled={actionInProgress !== null}
                  style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '6px',
                    border: '1px solid var(--theme-elevation-300)',
                    backgroundColor: 'var(--theme-elevation-100)',
                    color: 'var(--theme-text)',
                    cursor: actionInProgress ? 'not-allowed' : 'pointer',
                    opacity: actionInProgress ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <SettingsIcon size={16} /> Re-seed Sample Data
                </button>
                <button
                  onClick={() => handlePresetAction('clear')}
                  disabled={actionInProgress !== null}
                  style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '6px',
                    border: '1px solid rgba(220, 53, 69, 0.3)',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    color: '#dc3545',
                    cursor: actionInProgress ? 'not-allowed' : 'pointer',
                    opacity: actionInProgress ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <TrashIcon size={16} /> Delete Sample Data
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Help Text */}
      <p style={{
        margin: '16px 0 0 0',
        fontSize: '12px',
        color: 'var(--theme-elevation-600)',
      }}>
        <strong>Tip:</strong> Use sample data to preview how your site will look, then delete it and add your own content.
      </p>
    </div>
  )
}

interface CollectionSeedCardProps {
  collection: CollectionSeedStatus
  includeMedia: boolean
  onIncludeMediaChange: (value: boolean) => void
  onSeed: () => void
  onClear: () => void
  onReseed: () => void
  onCreateShowcase?: () => void
  actionInProgress: string | null
}

const CollectionSeedCard: React.FC<CollectionSeedCardProps> = ({
  collection,
  includeMedia,
  onIncludeMediaChange,
  onSeed,
  onClear,
  onReseed,
  onCreateShowcase,
  actionInProgress,
}) => {
  const { slug, label, count, hasSeedMedia, Icon: IconComponent } = collection
  const hasData = count > 0
  const isProcessing = actionInProgress?.startsWith(slug)
  const isShowcaseAction = slug === 'pages' && Boolean(onCreateShowcase)

  return (
    <div style={{
      border: '1px solid var(--theme-elevation-200)',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: 'var(--theme-elevation-0)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <IconComponent size={20} className="ra-seed-card-icon" />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{label}</h3>
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--theme-elevation-600)' }}>
            {hasData ? `${count} items` : 'No data'}
          </p>
        </div>
        <span style={{
          fontSize: '11px',
          padding: '2px 8px',
          backgroundColor: hasData ? '#d4edda' : '#f8f9fa',
          color: hasData ? '#155724' : '#6c757d',
          borderRadius: '4px',
        }}>
          {hasData ? 'Has Data' : 'Empty'}
        </span>
      </div>

      {/* Media option */}
      {hasSeedMedia && (
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          fontSize: '13px',
          color: 'var(--theme-elevation-800)',
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={includeMedia}
            onChange={(e) => onIncludeMediaChange(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          Include sample images
        </label>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {!hasData && (
          <button
            onClick={onSeed}
            disabled={isProcessing}
            style={{
              padding: '6px 12px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.6 : 1,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <SettingsIcon size={12} /> {actionInProgress === `${slug}-seed` ? 'Seeding...' : 'Seed'}
          </button>
        )}
        {hasData && (
          <>
            <button
              onClick={onReseed}
              disabled={isProcessing}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ffc107',
                color: '#212529',
                border: 'none',
                borderRadius: '4px',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing ? 0.6 : 1,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <SettingsIcon size={12} /> {actionInProgress === `${slug}-reseed` ? 'Re-seeding...' : 'Re-seed'}
            </button>
            <button
              onClick={onClear}
              disabled={isProcessing}
              style={{
                padding: '6px 12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing ? 0.6 : 1,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <TrashIcon size={12} /> {actionInProgress === `${slug}-clear` ? 'Clearing...' : 'Delete'}
            </button>
          </>
        )}
        {isShowcaseAction && (
          <button
            onClick={onCreateShowcase}
            disabled={isProcessing}
            style={{
              padding: '6px 12px',
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.6 : 1,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <SettingsIcon size={12} /> {actionInProgress === 'pages-showcase' ? 'Creating...' : 'Create Blocks Showcase'}
          </button>
        )}
      </div>
    </div>
  )
}

export default SeedDataManager
