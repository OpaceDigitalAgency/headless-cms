'use client'

import React, { useCallback, useEffect, useState } from 'react'

type SeoAuditItem = {
  id: number | string
  title: string
  collection: string
  collectionLabel: string
  missingTitle: boolean
  missingDescription: boolean
  href: string
}

type SeoAuditResponse = {
  total: number
  items: SeoAuditItem[]
}

const SeoAuditClient: React.FC = () => {
  const [data, setData] = useState<SeoAuditResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAudit = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/tools/seo-audit')
      if (!response.ok) {
        throw new Error('Failed to load SEO audit results')
      }
      const json = (await response.json()) as SeoAuditResponse
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAudit()
  }, [fetchAudit])

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Missing metadata</h2>
          <p>Highlights content missing meta titles or descriptions.</p>
        </div>
        <button type="button" className="ra-tool-button" onClick={fetchAudit}>
          Refresh
        </button>
      </div>

      {isLoading && <p className="ra-tool-muted">Loading audit…</p>}
      {error && <p className="ra-tool-error">{error}</p>}

      {!isLoading && data && (
        <div className="ra-tool-table">
          <div className="ra-tool-table__row ra-tool-table__row--header">
            <span>Title</span>
            <span>Collection</span>
            <span>Issues</span>
            <span></span>
          </div>
          {data.items.map((item) => (
            <div key={`${item.collection}-${item.id}`} className="ra-tool-table__row">
              <span>{item.title}</span>
              <span>{item.collectionLabel}</span>
              <span>
                {item.missingTitle && <span className="ra-tool-pill ra-tool-pill--warning">Missing title</span>}
                {item.missingDescription && (
                  <span className="ra-tool-pill ra-tool-pill--warning">Missing description</span>
                )}
              </span>
              <span>
                <a className="ra-tool-link" href={item.href}>
                  Open
                </a>
              </span>
            </div>
          ))}
          {data.items.length === 0 && <p className="ra-tool-muted">All checked items have titles and descriptions.</p>}
        </div>
      )}
    </section>
  )
}

export default SeoAuditClient
