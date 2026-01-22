// @ts-nocheck
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useField } from '@payloadcms/ui'
import type { SectionId } from '../lib/navigationConfig'
import { isDefaultEnabled, sectionLabels, sectionOrder } from '../lib/navigationConfig'

type ManagerType = 'collections' | 'globals' | 'combined'

interface CollectionInfo {
  slug: string
  label: string
  hidden: boolean
  defaultSection: SectionId
  defaultEnabled?: boolean
}

interface CollectionSetting {
  slug: string
  enabled: boolean
  section: SectionId
  label?: string
  uninstalled?: boolean
}

interface NavigationItem extends CollectionSetting {
  kind: 'collection' | 'global'
}

interface CollectionManagerFieldProps {
  path: string
  label?: string
  custom?: {
    managerType?: ManagerType
    globalsPath?: string
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
  managerType: Exclude<ManagerType, 'combined'>
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
          : typeof collection?.defaultEnabled === 'boolean'
            ? collection.defaultEnabled
            : isDefaultEnabled(slug)
      const fallbackSection = managerType === 'globals' ? 'settings' : 'content'
      return {
        slug,
        enabled: savedItem?.enabled ?? defaultEnabled,
        section: managerType === 'globals' ? 'settings' : savedItem?.section || collection?.defaultSection || fallbackSection,
        label: savedItem?.label || '',
        uninstalled: savedItem?.uninstalled,
      }
    })
}

export const CollectionManagerField: React.FC<CollectionManagerFieldProps> = ({ path, label, custom, field }) => {
  const managerType = custom?.managerType || field?.admin?.custom?.managerType || 'collections'
  const globalsPath = custom?.globalsPath || 'globals'
  const isCombined = managerType === 'combined'
  const managerLabel = managerType === 'globals' ? 'globals' : managerType === 'combined' ? 'navigation items' : 'collections'
  const managerTitle = managerType === 'globals' ? 'global links' : managerType === 'combined' ? 'navigation items' : 'collections'
  const { value, setValue } = useField<CollectionSetting[]>({ path })
  const { value: globalsValue, setValue: setGlobalsValue } = useField<CollectionSetting[]>({ path: globalsPath })
  const [collections, setCollections] = useState<CollectionInfo[]>([])
  const [globals, setGlobals] = useState<CollectionInfo[]>([])
  const [items, setItems] = useState<NavigationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const initializedRef = useRef(false)

  const itemsBySlug = useMemo(() => {
    const map = new Map<string, CollectionInfo>()
    collections.forEach((collection) => map.set(collection.slug, collection))
    globals.forEach((global) => map.set(global.slug, global))
    return map
  }, [collections, globals])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setErrorMessage(null)
        // Add cache-busting parameter to ensure fresh data
        const cacheBuster = Date.now()
        const fetchList = async (type: 'collections' | 'globals') => {
          const response = await fetch(`/api/admin/collection-manager?t=${cacheBuster}&type=${type}`, {
            credentials: 'include',
            cache: 'no-store',
          })
          if (!response.ok) {
            const payloadError = await response.json().catch(() => null)
            const message = payloadError?.error || `Failed to load ${type} (status ${response.status})`
            throw new Error(message)
          }
          const data = await response.json()
          const responseItems = Array.isArray(data.items) ? data.items : data.collections
          return Array.isArray(responseItems) ? responseItems : []
        }

        if (isCombined) {
          const [collectionItems, globalItems] = await Promise.all([
            fetchList('collections'),
            fetchList('globals'),
          ])

          const filteredCollections = collectionItems.filter((c: CollectionInfo) => {
            const isInternal = c.slug.startsWith('payload-') || c.slug === 'search-results'
            if (isInternal) {
              console.warn('[CollectionManagerField] Filtering out internal collection that slipped through:', c.slug)
            }
            return !isInternal
          })

          setCollections(filteredCollections)
          setGlobals(globalItems)
        } else {
          const type = managerType === 'globals' ? 'globals' : 'collections'
          const responseItems = await fetchList(type)
          const filteredItems = responseItems.filter((c: CollectionInfo) => {
            if (type !== 'collections') return true
            const isInternal = c.slug.startsWith('payload-') || c.slug === 'search-results'
            if (isInternal) {
              console.warn('[CollectionManagerField] Filtering out internal collection that slipped through:', c.slug)
            }
            return !isInternal
          })
          if (type === 'globals') {
            setGlobals(filteredItems)
            setCollections([])
          } else {
            setCollections(filteredItems)
            setGlobals([])
          }
        }
        setHasLoaded(true)
      } catch (error) {
        console.error('[CollectionManagerField] Fetch error:', error)
        setCollections([])
        setGlobals([])
        setErrorMessage(`Failed to load ${managerLabel}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        setHasLoaded(true)
      }
    }

    fetchItems()
  }, [managerType, managerLabel, isCombined])

  useEffect(() => {
    console.log('[CollectionManagerField] Initializing with:', {
      collectionsCount: collections.length,
      globalsCount: globals.length,
      valueType: typeof value,
      valueLength: Array.isArray(value) ? value.length : 'N/A',
      alreadyInitialized: initializedRef.current
    })

    // Don't initialize until we have collections from the API
    if (!hasLoaded) {
      console.log('[CollectionManagerField] Waiting for navigation items to load...')
      return
    }

    // Only initialize once we have collections
    if (initializedRef.current) {
      console.log('[CollectionManagerField] Already initialized, skipping')
      return
    }

    // If value is null/undefined/empty, treat as first-time setup
    const savedCollections = Array.isArray(value) && value.length > 0 ? value : []
    const savedGlobals = Array.isArray(globalsValue) && globalsValue.length > 0 ? globalsValue : []
    console.log('[CollectionManagerField] Saved settings count:', savedCollections.length)

    if (isCombined) {
      const normalizedCollections = normalizeSettings(collections, savedCollections, 'collections')
      const normalizedGlobals = normalizeSettings(globals, savedGlobals, 'globals')
      const mergedItems: NavigationItem[] = [
        ...normalizedCollections.map((item) => ({ ...item, kind: 'collection' as const })),
        ...normalizedGlobals.map((item) => ({ ...item, kind: 'global' as const, section: 'settings' as SectionId })),
      ]
      console.log('[CollectionManagerField] Normalized items count:', mergedItems.length)
      setItems(mergedItems)
    } else {
      const type = managerType === 'globals' ? 'globals' : 'collections'
      const normalized = normalizeSettings(
        type === 'globals' ? globals : collections,
        type === 'globals' ? savedGlobals : savedCollections,
        type
      )
      console.log('[CollectionManagerField] Normalized items count:', normalized.length)
      setItems(normalized.map((item) => ({
        ...item,
        kind: type === 'globals' ? 'global' : 'collection',
      })))
    }
    setIsLoading(false)
    initializedRef.current = true
  }, [collections, globals, value, globalsValue, managerType, isCombined, hasLoaded])

  useEffect(() => {
    if (!initializedRef.current) return
    const stripKind = (item: NavigationItem): CollectionSetting => ({
      slug: item.slug,
      enabled: item.enabled,
      section: item.section,
      label: item.label,
      uninstalled: item.uninstalled,
    })

    if (isCombined) {
      const collectionItems = items.filter((item) => item.kind === 'collection').map(stripKind)
      const globalItems = items.filter((item) => item.kind === 'global').map(stripKind)
      setValue(collectionItems)
      setGlobalsValue(globalItems)
    } else {
      setValue(items.map(stripKind))
    }

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
  }, [items, setValue, setGlobalsValue, isCombined])

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

    return () => {
      window.removeEventListener('payload:document-updated', handleDocumentUpdate as EventListener)
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
      if (isCombined) {
        const source = next[from]
        const target = next[to]
        if (source?.kind !== target?.kind) return prev
      }
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  const resetToDefaults = () => {
    if (window.confirm(`Are you sure you want to reset all ${managerTitle} to their default settings?`)) {
      if (isCombined) {
        const normalizedCollections = normalizeSettings(collections, [], 'collections')
        const normalizedGlobals = normalizeSettings(globals, [], 'globals')
        const mergedItems: NavigationItem[] = [
          ...normalizedCollections.map((item) => ({ ...item, kind: 'collection' as const })),
          ...normalizedGlobals.map((item) => ({ ...item, kind: 'global' as const, section: 'settings' as SectionId })),
        ]
        setItems(mergedItems)
      } else {
        const type = managerType === 'globals' ? 'globals' : 'collections'
        const normalized = normalizeSettings(
          type === 'globals' ? globals : collections,
          [],
          type
        )
        const itemsWithKind: NavigationItem[] = normalized.map((item) => ({
          ...item,
          kind: type === 'globals' ? ('global' as const) : ('collection' as const),
        }))
        setItems(itemsWithKind)
      }
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
              ? 'Reorder and rename global settings links in the admin navigation. Click "Save" below to persist changes.'
              : managerType === 'combined'
                ? 'Manage collections and global settings links in the left navigation. Globals always live in the Settings section. Click "Save" below to persist changes.'
                : 'Toggle visibility, choose sections, and reorder collections in the admin navigation. Click "Save" below to persist changes.'}
            <div>Use "Refresh Navigation" to update the left menu without leaving the page.</div>
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
                    const collection = itemsBySlug.get(item.slug)
                    const labelOverride = item.label?.trim()
                    const displayLabel = labelOverride || collection?.label || item.slug
                    const labelPlaceholder = item.kind === 'global' ? 'Menu label (optional)' : 'Navigation label (optional)'
                    const showSectionSelect = item.kind === 'collection'
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
                    onChange={(event) => {
                      const nextEnabled = event.target.checked
                      updateItem(index, { enabled: nextEnabled, uninstalled: nextEnabled ? false : item.uninstalled })
                    }}
                  />
                  <span>{displayLabel}</span>
                </label>

                <div className="ra-collection-manager__slug">{item.slug}</div>

                {showSectionSelect ? (
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
                  <select className="ra-collection-manager__select" value="settings" disabled aria-label="Settings section">
                    <option value="settings">{sectionLabels.settings}</option>
                  </select>
                )}

                <input
                  className="ra-collection-manager__input"
                  type="text"
                  placeholder={labelPlaceholder}
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
