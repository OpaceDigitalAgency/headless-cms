'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { formatDateTime, formatBytes, toQueryString } from './toolUtils'

type MediaDoc = {
  id: number | string
  filename: string
  alt?: string | null
  filesize?: number | null
  mimeType?: string | null
  updatedAt: string
}

type MediaResponse = {
  docs: MediaDoc[]
  totalDocs: number
}

const MediaLibraryClient: React.FC = () => {
  const [query, setQuery] = useState('')
  const [media, setMedia] = useState<MediaDoc[]>([])
  const [totalDocs, setTotalDocs] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMedia = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const queryString = toQueryString({
        limit: 50,
        sort: '-createdAt',
        ...(query ? { 'where[filename][like]': query } : {}),
      })
      const response = await fetch(`/api/media${queryString}`)
      if (!response.ok) {
        throw new Error('Failed to load media')
      }
      const json = (await response.json()) as MediaResponse
      setMedia(json.docs || [])
      setTotalDocs(json.totalDocs || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Media items</h2>
          <p>Total media items: {totalDocs}</p>
        </div>
        <button type="button" className="ra-tool-button" onClick={fetchMedia}>
          Refresh
        </button>
      </div>

      <div className="ra-tool-filters">
        <label>
          Search filename
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Start typing a filename"
          />
        </label>
        <button type="button" className="ra-tool-button ra-tool-button--secondary" onClick={fetchMedia}>
          Apply
        </button>
      </div>

      {isLoading && <p className="ra-tool-muted">Loading media…</p>}
      {error && <p className="ra-tool-error">{error}</p>}

      {!isLoading && (
        <div className="ra-tool-table">
          <div className="ra-tool-table__row ra-tool-table__row--header">
            <span>Filename</span>
            <span>Alt text</span>
            <span>Size</span>
            <span>Updated</span>
            <span></span>
          </div>
          {media.map((item) => (
            <div key={String(item.id)} className="ra-tool-table__row">
              <span>{item.filename}</span>
              <span>{item.alt || <span className="ra-tool-pill ra-tool-pill--warning">Missing</span>}</span>
              <span>{formatBytes(item.filesize)}</span>
              <span>{formatDateTime(item.updatedAt)}</span>
              <span>
                <a className="ra-tool-link" href={`/admin/collections/media/${item.id}`}>
                  Open
                </a>
              </span>
            </div>
          ))}
          {media.length === 0 && <p className="ra-tool-muted">No media found.</p>}
        </div>
      )}
    </section>
  )
}

export default MediaLibraryClient
