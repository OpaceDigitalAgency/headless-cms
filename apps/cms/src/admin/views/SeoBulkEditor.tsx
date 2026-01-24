"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { formatDateTime } from './tools/toolUtils'

type SeoItem = {
  id: string
  type: string
  h1: string
  slug: string
  metaTitle: string | null
  metaDescription: string | null
  updatedAt: string | null
  lockVersion: number
}

type BulkResult = {
  id: string
  ok: boolean
  error?: string
  message?: string
  lockVersion?: number
  updatedAt?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  type?: string
}

const TITLE_LIMIT = 60
const DESC_LIMIT = 155

const normalizeEmpty = (value: string | null | undefined) => {
  if (value === null || value === undefined) return null
  const trimmed = value.trim()
  return trimmed.length === 0 ? null : trimmed
}

const getCollectionFromId = (id: string) => id.split(':')[0] || ''

const SeoBulkEditor: React.FC = () => {
  const [items, setItems] = useState<SeoItem[]>([])
  const [itemsById, setItemsById] = useState<Record<string, SeoItem>>({})
  const [types, setTypes] = useState<string[]>([])
  const [total, setTotal] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [missingTitle, setMissingTitle] = useState(false)
  const [missingDesc, setMissingDesc] = useState(false)
  const [showDirtyOnly, setShowDirtyOnly] = useState(false)
  const [sortBy, setSortBy] = useState('updatedAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [edited, setEdited] = useState<Record<string, Partial<SeoItem>>>({})
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [bulkSummary, setBulkSummary] = useState<{ ok: number; failed: BulkResult[] } | null>(null)

  const baseCollectionTypes = useMemo(
    () => new Set(['pages', 'posts', 'archive-items', 'people', 'places', 'events', 'products', 'custom-items', 'content-types']),
    []
  )

  const customTypeOptions = useMemo(
    () => types.filter((type) => !baseCollectionTypes.has(type)),
    [types, baseCollectionTypes]
  )

  const pushToast = useCallback((type: 'success' | 'error', message: string) => {
    setToast({ type, message })
    window.setTimeout(() => setToast(null), 4000)
  }, [])

  const isDirty = useCallback(
    (id: string) => {
      const baseline = itemsById[id]
      const draft = edited[id]
      if (!baseline || !draft) return Boolean(draft)

      const nextTitle = normalizeEmpty(draft.metaTitle ?? baseline.metaTitle)
      const nextDesc = normalizeEmpty(draft.metaDescription ?? baseline.metaDescription)
      const nextType = draft.type ?? baseline.type

      return (
        nextTitle !== normalizeEmpty(baseline.metaTitle)
        || nextDesc !== normalizeEmpty(baseline.metaDescription)
        || nextType !== baseline.type
      )
    },
    [edited, itemsById]
  )

  const dirtyIds = useMemo(
    () => Object.keys(edited).filter((id) => isDirty(id)),
    [edited, isDirty]
  )

  useEffect(() => {
    if (dirtyIds.length === 0) return undefined

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [dirtyIds.length])

  useEffect(() => {
    if (dirtyIds.length === 0) return undefined

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const link = target?.closest?.('a') as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (!href || href.startsWith('#')) return
      if (!window.confirm('You have unsaved changes. Leave this page?')) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [dirtyIds.length])

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setQuery(searchInput.trim())
    }, 300)
    return () => window.clearTimeout(handle)
  }, [searchInput])

  useEffect(() => {
    setPage(1)
  }, [query, typeFilter, missingTitle, missingDesc, pageSize])

  const fetchContent = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setBulkSummary(null)

    try {
      const url = new URL('/api/admin/seo/content', window.location.origin)
      if (query) url.searchParams.set('q', query)
      if (typeFilter) url.searchParams.set('type', typeFilter)
      if (missingTitle) url.searchParams.set('missingTitle', 'true')
      if (missingDesc) url.searchParams.set('missingDesc', 'true')
      url.searchParams.set('sortBy', sortBy)
      url.searchParams.set('sortDir', sortDir)
      url.searchParams.set('page', String(page))
      url.searchParams.set('pageSize', String(pageSize))

      const response = await fetch(url.toString())
      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Failed to load SEO content.')
      }

      const json = await response.json() as { items: SeoItem[]; total: number; types: string[] }
      setItems(json.items || [])
      setTotal(json.total || 0)
      setTypes(json.types || [])
      setItemsById((prev) => {
        const next = { ...prev }
        json.items.forEach((item) => {
          next[item.id] = item
        })
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [query, typeFilter, missingTitle, missingDesc, sortBy, sortDir, page, pageSize])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const updateDraft = useCallback(
    (id: string, updates: Partial<SeoItem>) => {
      setEdited((prev) => {
        const nextDraft = { ...(prev[id] || {}), ...updates }
        const baseline = itemsById[id]
        const nextTitle = normalizeEmpty(nextDraft.metaTitle ?? baseline?.metaTitle ?? null)
        const nextDesc = normalizeEmpty(nextDraft.metaDescription ?? baseline?.metaDescription ?? null)
        const nextType = nextDraft.type ?? baseline?.type
        const unchanged = baseline
          && nextTitle === normalizeEmpty(baseline.metaTitle)
          && nextDesc === normalizeEmpty(baseline.metaDescription)
          && nextType === baseline.type

        if (unchanged) {
          const { [id]: _removed, ...rest } = prev
          return rest
        }

        return { ...prev, [id]: nextDraft }
      })
    },
    [itemsById]
  )

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDir('asc')
    }
    setPage(1)
  }

  const saveRow = async (item: SeoItem) => {
    const draft = edited[item.id]
    if (!draft || !isDirty(item.id)) return

    setIsSaving(true)
    setRowErrors((prev) => ({ ...prev, [item.id]: '' }))

    try {
      const payload = {
        metaTitle: normalizeEmpty(draft.metaTitle ?? item.metaTitle),
        metaDescription: normalizeEmpty(draft.metaDescription ?? item.metaDescription),
        type: draft.type ?? item.type,
        lockVersion: item.lockVersion,
      }

      const response = await fetch(`/api/admin/seo/content/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const json = await response.json().catch(() => ({}))
        throw new Error(json?.message || 'Failed to save row.')
      }

      const json = await response.json()
      const updated = json?.item as SeoItem

      if (updated) {
        setItems((prev) => prev.map((row) => (row.id === item.id ? { ...row, ...updated } : row)))
        setItemsById((prev) => ({ ...prev, [item.id]: { ...prev[item.id], ...updated } }))
      }

      setEdited((prev) => {
        const { [item.id]: _removed, ...rest } = prev
        return rest
      })

      pushToast('success', 'Row saved.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setRowErrors((prev) => ({ ...prev, [item.id]: message }))
      pushToast('error', message)
    } finally {
      setIsSaving(false)
    }
  }

  const saveAll = async () => {
    if (dirtyIds.length === 0) return

    setIsSaving(true)
    setBulkSummary(null)
    setRowErrors({})

    const updates = dirtyIds
      .map((id) => {
        const baseline = itemsById[id]
        const draft = edited[id]
        if (!baseline || !draft) return null
        return {
          id,
          metaTitle: normalizeEmpty(draft.metaTitle ?? baseline.metaTitle),
          metaDescription: normalizeEmpty(draft.metaDescription ?? baseline.metaDescription),
          type: draft.type ?? baseline.type,
          lockVersion: baseline.lockVersion,
        }
      })
      .filter(Boolean)

    try {
      const response = await fetch('/api/admin/seo/content/bulk', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Bulk save failed.')
      }

      const json = await response.json() as { results: BulkResult[] }
      const results = json.results || []
      const okResults = results.filter((result) => result.ok)
      const failedResults = results.filter((result) => !result.ok)

      if (okResults.length > 0) {
        setItems((prev) =>
          prev.map((row) => {
            const updated = okResults.find((result) => result.id === row.id)
            if (!updated) return row
            return {
              ...row,
              metaTitle: updated.metaTitle ?? row.metaTitle,
              metaDescription: updated.metaDescription ?? row.metaDescription,
              type: updated.type ?? row.type,
              lockVersion: updated.lockVersion ?? row.lockVersion,
              updatedAt: updated.updatedAt ?? row.updatedAt,
            }
          })
        )
        setItemsById((prev) => {
          const next = { ...prev }
          okResults.forEach((result) => {
            const baseline = next[result.id]
            if (!baseline) return
            next[result.id] = {
              ...baseline,
              metaTitle: result.metaTitle ?? baseline.metaTitle,
              metaDescription: result.metaDescription ?? baseline.metaDescription,
              type: result.type ?? baseline.type,
              lockVersion: result.lockVersion ?? baseline.lockVersion,
              updatedAt: result.updatedAt ?? baseline.updatedAt,
            }
          })
          return next
        })
      }

      setEdited((prev) => {
        const next = { ...prev }
        okResults.forEach((result) => {
          delete next[result.id]
        })
        return next
      })

      if (failedResults.length > 0) {
        const failedMap: Record<string, string> = {}
        failedResults.forEach((result) => {
          failedMap[result.id] = result.message || 'Update failed.'
        })
        setRowErrors(failedMap)
      }

      setBulkSummary({ ok: okResults.length, failed: failedResults })
      if (failedResults.length > 0) {
        pushToast('error', `Saved ${okResults.length}, failed ${failedResults.length}.`)
      } else {
        pushToast('success', `Saved ${okResults.length} item${okResults.length === 1 ? '' : 's'}.`)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      pushToast('error', message)
    } finally {
      setIsSaving(false)
    }
  }

  const displayedItems = useMemo(() => {
    if (!showDirtyOnly) return items
    return items.filter((item) => isDirty(item.id))
  }, [items, isDirty, showDirtyOnly])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <section className="ra-seo-bulk">
      <div className="ra-seo-toolbar">
        <div className="ra-seo-toolbar__filters">
          <label>
            Search
            <input
              type="search"
              className="ra-seo-input"
              placeholder="Search titles, slugs, meta..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </label>
          <label>
            Type
            <select className="ra-seo-select" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="">All types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="ra-seo-checkbox">
            <input type="checkbox" checked={missingTitle} onChange={(event) => setMissingTitle(event.target.checked)} />
            Missing meta title
          </label>
          <label className="ra-seo-checkbox">
            <input type="checkbox" checked={missingDesc} onChange={(event) => setMissingDesc(event.target.checked)} />
            Missing meta description
          </label>
          <label className="ra-seo-checkbox">
            <input type="checkbox" checked={showDirtyOnly} onChange={(event) => setShowDirtyOnly(event.target.checked)} />
            Edited only
          </label>
        </div>
        <div className="ra-seo-toolbar__actions">
          <span className="ra-seo-changed">{dirtyIds.length} changed</span>
          <button
            type="button"
            className="ra-tool-button"
            disabled={dirtyIds.length === 0 || isSaving}
            onClick={saveAll}
          >
            {isSaving ? 'Saving...' : 'Save all'}
          </button>
        </div>
      </div>

      {toast && (
        <div className={`ra-seo-toast ra-seo-toast--${toast.type}`}>
          {toast.message}
        </div>
      )}

      {bulkSummary && (
        <div className="ra-seo-summary">
          <span>Saved {bulkSummary.ok}</span>
          {bulkSummary.failed.length > 0 && (
            <span>
              Failed {bulkSummary.failed.length}:{' '}
              {bulkSummary.failed.map((result) => `${result.id} (${result.message || 'error'})`).join(', ')}
            </span>
          )}
        </div>
      )}

      {error && <p className="ra-tool-error">{error}</p>}

      <div className="ra-seo-table">
        <div className="ra-seo-row ra-seo-row--header">
          <button type="button" onClick={() => handleSort('h1')}>
            H1 Title {sortBy === 'h1' && (sortDir === 'asc' ? '↑' : '↓')}
          </button>
          <button type="button" onClick={() => handleSort('slug')}>
            Slug {sortBy === 'slug' && (sortDir === 'asc' ? '↑' : '↓')}
          </button>
          <button type="button" onClick={() => handleSort('metaTitle')}>
            Meta Title {sortBy === 'metaTitle' && (sortDir === 'asc' ? '↑' : '↓')}
          </button>
          <button type="button" onClick={() => handleSort('metaDescription')}>
            Meta Description {sortBy === 'metaDescription' && (sortDir === 'asc' ? '↑' : '↓')}
          </button>
          <span>Type</span>
          <span></span>
        </div>

        {isLoading && (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="ra-seo-row ra-seo-row--skeleton">
              <div className="ra-seo-skeleton" />
              <div className="ra-seo-skeleton" />
              <div className="ra-seo-skeleton" />
              <div className="ra-seo-skeleton" />
              <div className="ra-seo-skeleton" />
              <div className="ra-seo-skeleton" />
            </div>
          ))
        )}

        {!isLoading && displayedItems.map((item) => {
          const draft = edited[item.id] || {}
          const metaTitle = draft.metaTitle ?? item.metaTitle ?? ''
          const metaDescription = draft.metaDescription ?? item.metaDescription ?? ''
          const typeValue = draft.type ?? item.type
          const titleCount = metaTitle?.length || 0
          const descCount = metaDescription?.length || 0
          const collection = getCollectionFromId(item.id)
          const canEditType = collection === 'custom-items'
          const typeOptions = canEditType
            ? Array.from(new Set([typeValue, ...customTypeOptions]))
            : [typeValue]
          const dirty = isDirty(item.id)

          return (
            <div key={item.id} className={`ra-seo-row${dirty ? ' is-dirty' : ''}`}>
              <div className="ra-seo-cell">
                <span>{item.h1}</span>
              </div>
              <div className="ra-seo-cell" title={item.updatedAt ? `Last updated: ${formatDateTime(item.updatedAt)}` : undefined}>
                <code>{item.slug}</code>
              </div>
              <div className="ra-seo-cell">
                <input
                  type="text"
                  className="ra-seo-input"
                  value={metaTitle || ''}
                  onChange={(event) => updateDraft(item.id, { metaTitle: event.target.value })}
                />
                <span className={`ra-seo-counter${titleCount > TITLE_LIMIT ? ' is-warning' : ''}`}>
                  {titleCount}/{TITLE_LIMIT}
                </span>
              </div>
              <div className="ra-seo-cell">
                <textarea
                  className="ra-seo-textarea"
                  rows={3}
                  value={metaDescription || ''}
                  onChange={(event) => updateDraft(item.id, { metaDescription: event.target.value })}
                />
                <span className={`ra-seo-counter${descCount > DESC_LIMIT ? ' is-warning' : ''}`}>
                  {descCount}/{DESC_LIMIT}
                </span>
              </div>
              <div className="ra-seo-cell">
                <select
                  className="ra-seo-select"
                  value={typeValue}
                  onChange={(event) => updateDraft(item.id, { type: event.target.value })}
                  disabled={!canEditType}
                >
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ra-seo-cell ra-seo-actions">
                <button
                  type="button"
                  className="ra-tool-button ra-tool-button--secondary"
                  disabled={!dirty || isSaving}
                  onClick={() => saveRow(item)}
                >
                  Save
                </button>
                {rowErrors[item.id] && <span className="ra-seo-error">{rowErrors[item.id]}</span>}
              </div>
            </div>
          )
        })}

        {!isLoading && displayedItems.length === 0 && (
          <p className="ra-tool-muted">No items match these filters.</p>
        )}
      </div>

      <div className="ra-seo-pagination">
        <div className="ra-seo-pagination__info">
          Page {page} of {totalPages} ({total} items)
        </div>
        <div className="ra-seo-pagination__controls">
          <button
            type="button"
            className="ra-tool-button ra-tool-button--secondary"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1 || isLoading}
          >
            Prev
          </button>
          <button
            type="button"
            className="ra-tool-button ra-tool-button--secondary"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages || isLoading}
          >
            Next
          </button>
          <label>
            Page size
            <select
              className="ra-seo-select"
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
            >
              {[25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  )
}

export default SeoBulkEditor
