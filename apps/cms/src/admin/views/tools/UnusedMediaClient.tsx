'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { formatBytes, formatDateTime } from './toolUtils'

type UnusedMediaItem = {
  id: number | string
  filename: string
  alt?: string | null
  filesize?: number | null
  mimeType?: string | null
  updatedAt: string
  href: string
}

type UnusedMediaResponse = {
  total: number
  items: UnusedMediaItem[]
}

const UnusedMediaClient: React.FC = () => {
  const [data, setData] = useState<UnusedMediaResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUnused = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/tools/media-usage')
      if (!response.ok) {
        throw new Error('Failed to load unused media')
      }
      const json = (await response.json()) as UnusedMediaResponse
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUnused()
  }, [fetchUnused])

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Unused media</h2>
          <p>Media not linked to any content or global.</p>
        </div>
        <button type="button" className="ra-tool-button" onClick={fetchUnused}>
          Rescan
        </button>
      </div>

      {isLoading && <p className="ra-tool-muted">Scanning media usage…</p>}
      {error && <p className="ra-tool-error">{error}</p>}

      {!isLoading && data && (
        <div className="ra-tool-table">
          <div className="ra-tool-table__row ra-tool-table__row--header">
            <span>Filename</span>
            <span>Alt text</span>
            <span>Size</span>
            <span>Updated</span>
            <span></span>
          </div>
          {data.items.map((item) => (
            <div key={String(item.id)} className="ra-tool-table__row">
              <span>{item.filename}</span>
              <span>{item.alt || <span className="ra-tool-pill ra-tool-pill--warning">Missing</span>}</span>
              <span>{formatBytes(item.filesize)}</span>
              <span>{formatDateTime(item.updatedAt)}</span>
              <span>
                <a className="ra-tool-link" href={item.href}>
                  Open
                </a>
              </span>
            </div>
          ))}
          {data.items.length === 0 && <p className="ra-tool-muted">No unused media detected.</p>}
        </div>
      )}
    </section>
  )
}

export default UnusedMediaClient
