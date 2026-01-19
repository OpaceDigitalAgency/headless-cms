'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useField } from '@payloadcms/ui'
import type { SectionId } from '../lib/navigationConfig'
import { sectionLabels, sectionOrder } from '../lib/navigationConfig'

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
    return {
      slug,
      enabled: savedItem?.enabled ?? !collection?.hidden ?? true,
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
  const initializedRef = useRef(false)

  const collectionsBySlug = useMemo(() => {
    const map = new Map<string, CollectionInfo>()
    collections.forEach((collection) => map.set(collection.slug, collection))
    return map
  }, [collections])

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/admin/collection-manager')
        if (response.ok) {
          const data = await response.json()
          setCollections(Array.isArray(data.collections) ? data.collections : [])
        }
      } catch (error) {
        console.error('Failed to load collections for manager:', error)
        setCollections([])
      }
    }

    fetchCollections()
  }, [])

  useEffect(() => {
    if (initializedRef.current) return
    if (!collections.length) {
      setIsLoading(false)
      initializedRef.current = true
      return
    }
    const saved = Array.isArray(value) ? value : []
    const normalized = normalizeSettings(collections, saved)
    setItems(normalized)
    setIsLoading(false)
    initializedRef.current = true
  }, [collections, value])

  useEffect(() => {
    if (!initializedRef.current) return
    setValue(items)
  }, [items, setValue])

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
    const normalized = normalizeSettings(collections, [])
    setItems(normalized)
  }

  return (
    <div className="ra-collection-manager">
      <div className="ra-collection-manager__header">
        <div>
          <div className="field-label">{label || 'Collection Navigation'}</div>
          <div className="field-description">
            Toggle visibility, choose sections, and reorder collections in the admin navigation.
          </div>
        </div>
        <button type="button" className="ra-collection-manager__reset" onClick={resetToDefaults}>
          Reset to defaults
        </button>
      </div>

      {isLoading ? (
        <div className="ra-collection-manager__loading">Loading collections...</div>
      ) : items.length === 0 ? (
        <div className="ra-collection-manager__loading">No collections available.</div>
      ) : (
        <div className="ra-collection-manager__list">
          {items.map((item, index) => {
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
            )}
          )}
        </div>
      )}
    </div>
  )
}

export default CollectionManagerField
