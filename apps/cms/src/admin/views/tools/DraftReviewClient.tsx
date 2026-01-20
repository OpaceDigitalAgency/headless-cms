'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { formatDateTime } from './toolUtils'

type DraftItem = {
  id: number | string
  title: string
  collection: string
  collectionLabel: string
  updatedAt: string
  href: string
}

type DraftResponse = {
  total: number
  items: DraftItem[]
}

const DraftReviewClient: React.FC = () => {
  const [data, setData] = useState<DraftResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDrafts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/tools/drafts')
      if (!response.ok) {
        throw new Error('Failed to load drafts')
      }
      const json = (await response.json()) as DraftResponse
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDrafts()
  }, [fetchDrafts])

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Drafts</h2>
          <p>All draft items sorted by most recently updated.</p>
        </div>
        <button type="button" className="ra-tool-button" onClick={fetchDrafts}>
          Refresh
        </button>
      </div>

      {isLoading && <p className="ra-tool-muted">Loading drafts…</p>}
      {error && <p className="ra-tool-error">{error}</p>}

      {!isLoading && data && (
        <div className="ra-tool-table">
          <div className="ra-tool-table__row ra-tool-table__row--header">
            <span>Title</span>
            <span>Collection</span>
            <span>Updated</span>
            <span></span>
          </div>
          {data.items.map((item) => (
            <div key={`${item.collection}-${item.id}`} className="ra-tool-table__row">
              <span>{item.title}</span>
              <span>{item.collectionLabel}</span>
              <span>{formatDateTime(item.updatedAt)}</span>
              <span>
                <a className="ra-tool-link" href={item.href}>
                  Open
                </a>
              </span>
            </div>
          ))}
          {data.items.length === 0 && <p className="ra-tool-muted">No drafts found.</p>}
        </div>
      )}
    </section>
  )
}

export default DraftReviewClient
