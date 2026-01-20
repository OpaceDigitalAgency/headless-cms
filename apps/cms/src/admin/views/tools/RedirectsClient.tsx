'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { formatDateTime } from './toolUtils'

type RedirectDoc = {
  id: number | string
  from: string
  to?: {
    type?: string
    url?: string
  }
  updatedAt: string
}

type RedirectResponse = {
  docs: RedirectDoc[]
  totalDocs: number
}

const RedirectsClient: React.FC = () => {
  const [redirects, setRedirects] = useState<RedirectDoc[]>([])
  const [totalDocs, setTotalDocs] = useState(0)
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const fetchRedirects = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/redirects?limit=50&sort=-updatedAt')
      if (!response.ok) {
        throw new Error('Failed to load redirects')
      }
      const json = (await response.json()) as RedirectResponse
      setRedirects(json.docs || [])
      setTotalDocs(json.totalDocs || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRedirects()
  }, [fetchRedirects])

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!fromValue || !toValue) {
      setError('Both from and to URLs are required.')
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch('/api/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: fromValue,
          to: {
            type: 'custom',
            url: toValue,
          },
        }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Failed to create redirect')
      }

      setFromValue('')
      setToValue('')
      fetchRedirects()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Redirects</h2>
          <p>Total redirects: {totalDocs}</p>
        </div>
        <button type="button" className="ra-tool-button" onClick={fetchRedirects}>
          Refresh
        </button>
      </div>

      <form className="ra-tool-form" onSubmit={handleCreate}>
        <label>
          From URL
          <input type="text" value={fromValue} onChange={(event) => setFromValue(event.target.value)} />
        </label>
        <label>
          To URL
          <input type="text" value={toValue} onChange={(event) => setToValue(event.target.value)} />
        </label>
        <button type="submit" className="ra-tool-button" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Create redirect'}
        </button>
      </form>

      {isLoading && <p className="ra-tool-muted">Loading redirects...</p>}
      {error && <p className="ra-tool-error">{error}</p>}

      {!isLoading && (
        <div className="ra-tool-table">
          <div className="ra-tool-table__row ra-tool-table__row--header">
            <span>From</span>
            <span>To</span>
            <span>Updated</span>
            <span></span>
          </div>
          {redirects.map((redirect) => (
            <div key={String(redirect.id)} className="ra-tool-table__row">
              <span>{redirect.from}</span>
              <span>{redirect.to?.url || 'N/A'}</span>
              <span>{formatDateTime(redirect.updatedAt)}</span>
              <span>
                <a className="ra-tool-link" href={`/admin/collections/redirects/${redirect.id}`}>
                  Open
                </a>
              </span>
            </div>
          ))}
          {redirects.length === 0 && <p className="ra-tool-muted">No redirects found.</p>}
        </div>
      )}
    </section>
  )
}

export default RedirectsClient
