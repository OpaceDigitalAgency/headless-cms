'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { formatDateTime, toQueryString } from './toolUtils'

type CalendarItem = {
  id: number | string
  title: string
  collection: string
  collectionLabel: string
  publishedAt: string
  status: string
  href: string
}

type CalendarResponse = {
  total: number
  items: CalendarItem[]
  start: string
  end: string
}

const getDefaultRange = () => {
  const start = new Date()
  const end = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) }
}

const PublishingCalendarClient: React.FC = () => {
  const defaults = getDefaultRange()
  const [startDate, setStartDate] = useState(defaults.start)
  const [endDate, setEndDate] = useState(defaults.end)
  const [data, setData] = useState<CalendarResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCalendar = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const query = toQueryString({ start: startDate, end: endDate })
      const response = await fetch(`/api/admin/tools/publishing-calendar${query}`)
      if (!response.ok) {
        throw new Error('Failed to load publishing calendar')
      }
      const json = (await response.json()) as CalendarResponse
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [startDate, endDate])

  useEffect(() => {
    fetchCalendar()
  }, [fetchCalendar])

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Schedule</h2>
          <p>Shows items with publish dates inside the selected window.</p>
        </div>
        <button type="button" className="ra-tool-button" onClick={fetchCalendar}>
          Refresh
        </button>
      </div>

      <div className="ra-tool-filters">
        <label>
          Start
          <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        </label>
        <label>
          End
          <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </label>
        <button type="button" className="ra-tool-button ra-tool-button--secondary" onClick={fetchCalendar}>
          Apply
        </button>
      </div>

      {isLoading && <p className="ra-tool-muted">Loading scheduled items...</p>}
      {error && <p className="ra-tool-error">{error}</p>}

      {!isLoading && data && (
        <div className="ra-tool-table">
          <div className="ra-tool-table__row ra-tool-table__row--header">
            <span>Title</span>
            <span>Collection</span>
            <span>Publish Date</span>
            <span>Status</span>
            <span></span>
          </div>
          {data.items.map((item) => (
            <div key={`${item.collection}-${item.id}`} className="ra-tool-table__row">
              <span>{item.title}</span>
              <span>{item.collectionLabel}</span>
              <span>{formatDateTime(item.publishedAt)}</span>
              <span className={`ra-tool-pill ra-tool-pill--${item.status}`}>{item.status}</span>
              <span>
                <a className="ra-tool-link" href={item.href}>
                  Open
                </a>
              </span>
            </div>
          ))}
          {data.items.length === 0 && <p className="ra-tool-muted">No items scheduled for this range.</p>}
        </div>
      )}
    </section>
  )
}

export default PublishingCalendarClient
