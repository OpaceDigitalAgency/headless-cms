'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { formatDateTime } from './toolUtils'

type FormSummary = {
  id: number | string
  title: string
  updatedAt: string
  submissionCount: number
  href: string
}

type SummaryResponse = {
  total: number
  items: FormSummary[]
}

const FormsClient: React.FC = () => {
  const [data, setData] = useState<SummaryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSummary = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/tools/forms-summary')
      if (!response.ok) {
        throw new Error('Failed to load forms summary')
      }
      const json = (await response.json()) as SummaryResponse
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSummary()
  }, [fetchSummary])

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Forms overview</h2>
          <p>Submission counts are calculated live from form submissions.</p>
        </div>
        <button type="button" className="ra-tool-button" onClick={fetchSummary}>
          Refresh
        </button>
      </div>

      {isLoading && <p className="ra-tool-muted">Loading forms...</p>}
      {error && <p className="ra-tool-error">{error}</p>}

      {!isLoading && data && (
        <div className="ra-tool-table">
          <div className="ra-tool-table__row ra-tool-table__row--header">
            <span>Form</span>
            <span>Submissions</span>
            <span>Updated</span>
            <span></span>
          </div>
          {data.items.map((form) => (
            <div key={String(form.id)} className="ra-tool-table__row">
              <span>{form.title}</span>
              <span>{form.submissionCount}</span>
              <span>{formatDateTime(form.updatedAt)}</span>
              <span className="ra-tool-row-actions">
                <a className="ra-tool-link" href={form.href}>
                  Open
                </a>
                <a className="ra-tool-link" href={`/admin/tools/form-submissions?form=${form.id}`}>
                  View submissions
                </a>
              </span>
            </div>
          ))}
          {data.items.length === 0 && <p className="ra-tool-muted">No forms found.</p>}
        </div>
      )}
    </section>
  )
}

export default FormsClient
