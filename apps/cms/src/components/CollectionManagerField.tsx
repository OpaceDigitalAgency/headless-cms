'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useField } from '@payloadcms/ui'
import type { SectionId } from '../lib/navigationConfig'
import { isDefaultEnabled, sectionLabels, sectionOrder } from '../lib/navigationConfig'

type ManagerType = 'collections' | 'globals'

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
  custom?: {
    managerType?: ManagerType
  }
  field?: {
    admin?: {
      custom?: {
        managerType?: ManagerType
      }
    }
  }
}

const normalizeSettings = (
  collections: CollectionInfo[],
  saved: CollectionSetting[],
  managerType: ManagerType
): CollectionSetting[] => {
  const filteredSaved = managerType === 'collections'
    ? saved.filter((item) => {
        const internalCollectionPrefixes = ['payload-', 'search-results']
        const isInternal = internalCollectionPrefixes.some(prefix => item.slug.startsWith(prefix)) || item.slug === 'search-results'
        if (isInternal) {
          console.log('[normalizeSettings] Filtering out internal collection from saved settings:', item.slug)
        }
        return !isInternal
      })
    : saved

  const savedMap = new Map(filteredSaved.map((item) => [item.slug, item]))
  const orderedSlugs = filteredSaved.map((item) => item.slug)
  const missing = collections.filter((item) => !savedMap.has(item.slug)).map((item) => item.slug)
  const mergedOrder = [...orderedSlugs, ...missing]

  // Only include collections that actually exist in the collections list
  const validCollectionSlugs = new Set(collections.map(c => c.slug))

  return mergedOrder
    .filter((slug) => {
      const isValid = validCollectionSlugs.has(slug)
      if (!isValid) {
        console.log('[normalizeSettings] Skipping collection not in valid list:', slug)
      }
      return isValid
    })
    .map((slug) => {
      const collection = collections.find((item) => item.slug === slug)
      const savedItem = savedMap.get(slug)
      const defaultEnabled = managerType === 'globals'
        ? true
        : collection?.hidden
          ? false
          : isDefaultEnabled(slug)
      const fallbackSection = managerType === 'globals' ? 'settings' : 'content'
      return {
        slug,
        enabled: savedItem?.enabled ?? defaultEnabled,
        section: savedItem?.section || collection?.defaultSection || fallbackSection,
        label: savedItem?.label || '',
      }
    })
}

export const CollectionManagerField: React.FC<CollectionManagerFieldProps> = ({ path, label, custom, field }) => {
  const managerType = custom?.managerType || field?.admin?.custom?.managerType || 'collections'
  const managerLabel = managerType === 'globals' ? 'globals' : 'collections'
  const managerTitle = managerType === 'globals' ? 'global links' : 'collections'
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
        // Add cache-busting parameter to ensure fresh data
        const cacheBuster = Date.now()
        const response = await fetch(`/api/admin/collection-manager?t=${cacheBuster}&type=${managerType}`, {
          credentials: 'include',
          cache: 'no-store', // Disable caching
        })
        if (response.ok) {
          const data = await response.json()
          const responseItems = Array.isArray(data.items) ? data.items : data.collections
          console.log('[CollectionManagerField] API response:', data)
          console.log(`[CollectionManagerField] ${managerLabel} received:`, responseItems?.map((c: CollectionInfo) => c.slug))
          console.log(`[CollectionManagerField] ${managerLabel} count:`, responseItems?.length)

          // Additional validation - filter out any internal collections that might have slipped through
          const filteredItems = Array.isArray(responseItems)
            ? responseItems.filter((c: CollectionInfo) => {
                if (managerType !== 'collections') return true
                const isInternal = c.slug.startsWith('payload-') || c.slug === 'search-results'
                if (isInternal) {
                  console.warn('[CollectionManagerField] Filtering out internal collection that slipped through:', c.slug)
                }
                return !isInternal
              })
            : []

          console.log(`[CollectionManagerField] Final ${managerLabel} after client-side filter:`, filteredItems.map((c: CollectionInfo) => c.slug))
          setCollections(filteredItems)
        } else {
          const payloadError = await response.json().catch(() => null)
          const message = payloadError?.error || `Failed to load ${managerLabel} (status ${response.status})`
          console.error('[CollectionManagerField] API error:', message, response.status)
          setErrorMessage(message)
          setCollections([])
        }
      } catch (error) {
        console.error('[CollectionManagerField] Fetch error:', error)
        setCollections([])
        setErrorMessage(`Failed to load ${managerLabel}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    fetchCollections()
  }, [managerType, managerLabel])

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
    const normalized = normalizeSettings(collections, saved, managerType)
    console.log('[CollectionManagerField] Normalized items count:', normalized.length)
    setItems(normalized)
    setIsLoading(false)
    initializedRef.current = true
  }, [collections, value, managerType])

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

  // Listen for successful save and reload page to update navigation
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Listen for Payload's document update event
    const handleDocumentUpdate = (event: CustomEvent) => {
      console.log('[CollectionManagerField] Document update event:', event.detail)
      // Check if this is the navigation-settings global
      if (event.detail?.global === 'navigation-settings' || event.detail?.collection === 'navigation-settings') {
        console.log('[CollectionManagerField] Navigation settings saved, reloading page...')
        // Wait a bit for the save to complete, then reload
        setTimeout(() => {
          sessionStorage.removeItem('nav-data')
          sessionStorage.removeItem('nav-cache-time')
          window.location.reload()
        }, 500)
      }
    }

    // Listen for Payload's custom events
    window.addEventListener('payload:document-updated', handleDocumentUpdate as EventListener)

    // Also listen for clicks on the Save button as a fallback
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Check if this is a Save button in the navigation-settings page
      if (
        (target.textContent?.includes('Save') || target.getAttribute('aria-label')?.includes('Save')) &&
        window.location.pathname.includes('navigation-settings')
      ) {
        console.log('[CollectionManagerField] Save button clicked, will reload after save...')
        // Set a flag and check for changes
        setTimeout(() => {
          sessionStorage.removeItem('nav-data')
          sessionStorage.removeItem('nav-cache-time')
          window.location.reload()
        }, 1500)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('payload:document-updated', handleDocumentUpdate as EventListener)
      document.removeEventListener('click', handleClick)
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
    if (window.confirm(`Are you sure you want to reset all ${managerTitle} to their default settings?`)) {
      const normalized = normalizeSettings(collections, [], managerType)
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
            {managerType === 'globals'
              ? 'Reorder and rename global settings links in the admin navigation. Click "Save" below to persist changes, then refresh the page to see updates in the menu.'
              : 'Toggle visibility, choose sections, and reorder collections in the admin navigation. Click "Save" below to persist changes, then refresh the page to see updates in the menu.'}
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
        <div className="ra-collection-manager__loading">Loading {managerLabel}...</div>
      ) : errorMessage ? (
        <div className="ra-collection-manager__loading">{errorMessage}</div>
      ) : items.length === 0 ? (
        <div className="ra-collection-manager__loading">No {managerLabel} available.</div>
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
                    const labelOverride = item.label?.trim()
                    const displayLabel = labelOverride || collection?.label || item.slug
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
                  <span>{displayLabel}</span>
                </label>

                <div className="ra-collection-manager__slug">{item.slug}</div>

                {managerType === 'collections' ? (
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
                ) : (
                  <div className="ra-collection-manager__select" aria-hidden="true" />
                )}

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
