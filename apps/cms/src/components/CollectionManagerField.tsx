'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useField } from '@payloadcms/ui'
import type { SectionId } from '../lib/navigationConfig'
import { isDefaultEnabled, sectionLabels, sectionOrder } from '../lib/navigationConfig'

interface CollectionInfo {
  slug: string
  label: string
  hidden: boolean
  defaultSection: SectionId
}

interface CollectionSetting {
  slug: string
  enabled: boolean
  section: SectionId
  label?: string
}

interface CollectionManagerFieldProps {
  path: string
  label?: string
}

const normalizeSettings = (
  collections: CollectionInfo[],
  saved: CollectionSetting[]
): CollectionSetting[] => {
  const savedMap = new Map(saved.map((item) => [item.slug, item]))
  const orderedSlugs = saved.map((item) => item.slug)
  const missing = collections.filter((item) => !savedMap.has(item.slug)).map((item) => item.slug)
  const mergedOrder = [...orderedSlugs, ...missing]

  return mergedOrder.map((slug) => {
    const collection = collections.find((item) => item.slug === slug)
    const savedItem = savedMap.get(slug)
    const defaultEnabled = collection?.hidden ? false : isDefaultEnabled(slug)
    return {
      slug,
      enabled: savedItem?.enabled ?? defaultEnabled,
      section: savedItem?.section || collection?.defaultSection || 'content',
      label: savedItem?.label || '',
    }
  })
}

export const CollectionManagerField: React.FC<CollectionManagerFieldProps> = ({ path, label }) => {
  const { value, setValue } = useField<CollectionSetting[]>({ path })
  const [collections, setCollections] = useState<CollectionInfo[]>([])
  const [items, setItems] = useState<CollectionSetting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const initializedRef = useRef(false)

  const collectionsBySlug = useMemo(() => {
    const map = new Map<string, CollectionInfo>()
    collections.forEach((collection) => map.set(collection.slug, collection))
    return map
  }, [collections])

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setErrorMessage(null)
        // Try the correct endpoint path
        const response = await fetch('/api/admin/collection-manager', {
          credentials: 'include',
        })
        if (response.ok) {
          const data = await response.json()
          console.log('[CollectionManagerField] API response:', data)
          console.log('[CollectionManagerField] Collections count:', data.collections?.length)
          setCollections(Array.isArray(data.collections) ? data.collections : [])
        } else {
          const payloadError = await response.json().catch(() => null)
          const message = payloadError?.error || `Failed to load collections (status ${response.status})`
          console.error('[CollectionManagerField] API error:', message, response.status)
          setErrorMessage(message)
          setCollections([])
        }
      } catch (error) {
        console.error('[CollectionManagerField] Fetch error:', error)
        setCollections([])
        setErrorMessage(`Failed to load collections: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    fetchCollections()
  }, [])

  useEffect(() => {
    console.log('[CollectionManagerField] Initializing with:', {
      collectionsCount: collections.length,
      valueType: typeof value,
      valueLength: Array.isArray(value) ? value.length : 'N/A',
      alreadyInitialized: initializedRef.current
    })

    // Don't initialize until we have collections from the API
    if (!collections.length) {
      console.log('[CollectionManagerField] Waiting for collections to load...')
      return
    }

    // Only initialize once we have collections
    if (initializedRef.current) {
      console.log('[CollectionManagerField] Already initialized, skipping')
      return
    }

    // If value is null/undefined/empty, treat as first-time setup
    const saved = Array.isArray(value) && value.length > 0 ? value : []
    console.log('[CollectionManagerField] Saved settings count:', saved.length)
    const normalized = normalizeSettings(collections, saved)
    console.log('[CollectionManagerField] Normalized items count:', normalized.length)
    setItems(normalized)
    setIsLoading(false)
    initializedRef.current = true
  }, [collections, value])

  useEffect(() => {
    if (!initializedRef.current) return
    setValue(items)

    // Clear cache when items change (after initialization)
    // This ensures navigation updates immediately when user makes changes
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('nav-data')
      sessionStorage.removeItem('nav-cache-time')

      // Broadcast to other tabs
      try {
        const channel = new BroadcastChannel('nav-cache-invalidate')
        channel.postMessage({ type: 'invalidate' })
        channel.close()
      } catch (e) {
        // BroadcastChannel not supported
      }
    }
  }, [items, setValue])

  // Listen for form submission and reload page to update navigation
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement
      // Check if this is the navigation-settings form
      if (form && form.action && form.action.includes('navigation-settings')) {
        // Wait for the save to complete, then reload
        setTimeout(() => {
          sessionStorage.removeItem('nav-data')
          sessionStorage.removeItem('nav-cache-time')
          window.location.reload()
        }, 1000)
      }
    }

    // Listen for form submissions
    document.addEventListener('submit', handleFormSubmit)

    return () => {
      document.removeEventListener('submit', handleFormSubmit)
    }
  }, [])

  const updateItem = (index: number, updates: Partial<CollectionSetting>) => {
    setItems((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], ...updates }
      return next
    })
  }

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return
    setItems((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all collections to their default settings?')) {
      const normalized = normalizeSettings(collections, [])
      setItems(normalized)
    }
  }

  const clearNavigationCache = async () => {
    if (typeof window !== 'undefined') {
      try {
        // Clear session storage
        sessionStorage.removeItem('nav-data')
        sessionStorage.removeItem('nav-cache-time')

        // Broadcast cache invalidation to all tabs/windows
        try {
          const channel = new BroadcastChannel('nav-cache-invalidate')
          channel.postMessage({ type: 'invalidate' })
          channel.close()
        } catch (e) {
          // BroadcastChannel not supported, will reload instead
        }

        // Reload the page to reflect changes
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } catch (error) {
        console.error('Error clearing cache:', error)
        window.location.reload()
      }
    }
  }

  // Group items by section
  const itemsBySection = useMemo(() => {
    const grouped = new Map<SectionId, CollectionSetting[]>()

    // Initialize all sections
    sectionOrder.forEach(sectionId => {
      grouped.set(sectionId, [])
    })

    // Group items by their section
    items.forEach(item => {
      const section = item.section || 'content'
      const sectionItems = grouped.get(section) || []
      sectionItems.push(item)
      grouped.set(section, sectionItems)
    })

    return grouped
  }, [items])

  return (
    <div className="ra-collection-manager">
      <div className="ra-collection-manager__header">
        <div>
          <div className="field-label">{label || 'Collection Navigation'}</div>
          <div className="field-description">
            Toggle visibility, choose sections, and reorder collections in the admin navigation.
            Click "Save" below to persist changes, then refresh the page to see updates in the menu.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" className="ra-collection-manager__reset" onClick={clearNavigationCache}>
            🔄 Refresh Navigation
          </button>
          <button type="button" className="ra-collection-manager__reset" onClick={resetToDefaults}>
            ↻ Reset to Defaults
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="ra-collection-manager__loading">Loading collections...</div>
      ) : errorMessage ? (
        <div className="ra-collection-manager__loading">{errorMessage}</div>
      ) : items.length === 0 ? (
        <div className="ra-collection-manager__loading">No collections available.</div>
      ) : (
        <div className="ra-collection-manager__sections">
          {sectionOrder.map(sectionId => {
            const sectionItems = itemsBySection.get(sectionId) || []
            if (sectionItems.length === 0) return null

            return (
              <div key={sectionId} className="ra-collection-manager__section-group">
                <div className="ra-collection-manager__section-header">
                  {sectionLabels[sectionId]}
                </div>
                <div className="ra-collection-manager__list">
                  {sectionItems.map((item) => {
                    const index = items.indexOf(item)
            const collection = collectionsBySlug.get(item.slug)
            return (
              <div key={item.slug} className="ra-collection-manager__row">
                <div className="ra-collection-manager__move">
                  <button
                    type="button"
                    className="ra-collection-manager__move-btn"
                    onClick={() => moveItem(index, index - 1)}
                    disabled={index === 0}
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="ra-collection-manager__move-btn"
                    onClick={() => moveItem(index, index + 1)}
                    disabled={index === items.length - 1}
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                </div>

                <label className="ra-collection-manager__toggle">
                  <input
                    type="checkbox"
                    checked={Boolean(item.enabled)}
                    onChange={(event) => updateItem(index, { enabled: event.target.checked })}
                  />
                  <span>{collection?.label || item.slug}</span>
                </label>

                <div className="ra-collection-manager__slug">{item.slug}</div>

                <select
                  className="ra-collection-manager__select"
                  value={item.section}
                  onChange={(event) => updateItem(index, { section: event.target.value as SectionId })}
                >
                  {sectionOrder.map((sectionId) => (
                    <option key={sectionId} value={sectionId}>
                      {sectionLabels[sectionId]}
                    </option>
                  ))}
                </select>

                <input
                  className="ra-collection-manager__input"
                  type="text"
                  placeholder="Label override"
                  value={item.label || ''}
                  onChange={(event) => updateItem(index, { label: event.target.value })}
                />
              </div>
            )
          })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CollectionManagerField
