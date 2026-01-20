'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { formatDateTime } from './toolUtils'

type SearchSummary = {
  total: number
  latestUpdatedAt?: string | null
  searchCollections: string[]
  reindexEndpoint: string
}

const SearchIndexClient: React.FC = () => {
  const [summary, setSummary] = useState<SearchSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isReindexing, setIsReindexing] = useState(false)

  const fetchSummary = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/tools/search-index-summary')
      if (!response.ok) {
        throw new Error('Failed to load search index summary')
      }
      const json = (await response.json()) as SearchSummary
      setSummary(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSummary()
  }, [fetchSummary])

  const handleReindex = async () => {
    if (!summary) return
    setIsReindexing(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(summary.reindexEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collections: summary.searchCollections }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Failed to reindex search')
      }

      const json = await response.json()
      setMessage(json?.message || 'Reindex started')
      fetchSummary()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsReindexing(false)
    }
  }

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Search index status</h2>
          <p>Monitor index size and last update.</p>
        </div>
        <button type="button" className="ra-tool-button" onClick={fetchSummary}>
          Refresh
        </button>
      </div>

      {isLoading && <p className="ra-tool-muted">Loading search index...</p>}
      {error && <p className="ra-tool-error">{error}</p>}
      {message && <p className="ra-tool-success">{message}</p>}

      {!isLoading && summary && (
        <div className="ra-tool-grid">
          <div className="ra-tool-stat">
            <span className="ra-tool-stat__label">Indexed Documents</span>
            <span className="ra-tool-stat__value">{summary.total}</span>
          </div>
          <div className="ra-tool-stat">
            <span className="ra-tool-stat__label">Last Updated</span>
            <span className="ra-tool-stat__value">{formatDateTime(summary.latestUpdatedAt || undefined)}</span>
          </div>
          <div className="ra-tool-stat">
            <span className="ra-tool-stat__label">Collections</span>
            <span className="ra-tool-stat__value">{summary.searchCollections.join(', ')}</span>
          </div>
        </div>
      )}

      <div className="ra-tool-actions">
        <button type="button" className="ra-tool-button" onClick={handleReindex} disabled={isReindexing}>
          {isReindexing ? 'Reindexing...' : 'Reindex search'}
        </button>
      </div>
    </section>
  )
}

export default SearchIndexClient
