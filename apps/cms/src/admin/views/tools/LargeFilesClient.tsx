'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { formatBytes, formatDateTime, toQueryString } from './toolUtils'

type LargeFileItem = {
  id: number | string
  filename: string
  filesize: number
  mimeType?: string | null
  updatedAt: string
  href: string
}

type LargeFilesResponse = {
  total: number
  minSize: number
  items: LargeFileItem[]
}

const LargeFilesClient: React.FC = () => {
  const [minSize, setMinSize] = useState(5)
  const [data, setData] = useState<LargeFilesResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLargeFiles = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const query = toQueryString({ minSize: minSize * 1024 * 1024 })
      const response = await fetch(`/api/admin/tools/large-files${query}`)
      if (!response.ok) {
        throw new Error('Failed to load large files')
      }
      const json = (await response.json()) as LargeFilesResponse
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [minSize])

  useEffect(() => {
    fetchLargeFiles()
  }, [fetchLargeFiles])

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Oversized media</h2>
          <p>Files larger than the chosen threshold.</p>
        </div>
        <button type="button" className="ra-tool-button" onClick={fetchLargeFiles}>
          Refresh
        </button>
      </div>

      <div className="ra-tool-filters">
        <label>
          Minimum size (MB)
          <input
            type="number"
            min={1}
            step={1}
            value={minSize}
            onChange={(event) => setMinSize(Number(event.target.value) || 1)}
          />
        </label>
        <button type="button" className="ra-tool-button ra-tool-button--secondary" onClick={fetchLargeFiles}>
          Apply
        </button>
      </div>

      {isLoading && <p className="ra-tool-muted">Loading files...</p>}
      {error && <p className="ra-tool-error">{error}</p>}

      {!isLoading && data && (
        <div className="ra-tool-table">
          <div className="ra-tool-table__row ra-tool-table__row--header">
            <span>Filename</span>
            <span>Size</span>
            <span>Type</span>
            <span>Updated</span>
            <span></span>
          </div>
          {data.items.map((item) => (
            <div key={String(item.id)} className="ra-tool-table__row">
              <span>{item.filename}</span>
              <span>{formatBytes(item.filesize)}</span>
              <span>{item.mimeType || 'N/A'}</span>
              <span>{formatDateTime(item.updatedAt)}</span>
              <span>
                <a className="ra-tool-link" href={item.href}>
                  Open
                </a>
              </span>
            </div>
          ))}
          {data.items.length === 0 && <p className="ra-tool-muted">No files above this size.</p>}
        </div>
      )}
    </section>
  )
}

export default LargeFilesClient
