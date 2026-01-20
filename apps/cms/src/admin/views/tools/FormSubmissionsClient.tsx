'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { formatDateTime, toQueryString } from './toolUtils'

type Form = {
  id: number | string
  title?: string
}

type Submission = {
  id: number | string
  form: number | string
  createdAt: string
  submissionData?: Array<{ field: string; value: string }>
}

type FormsResponse = {
  docs: Form[]
}

type SubmissionsResponse = {
  docs: Submission[]
  totalDocs: number
}

const FormSubmissionsClient: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([])
  const [selectedForm, setSelectedForm] = useState('')
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [totalDocs, setTotalDocs] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const formMap = useMemo(() => {
    const map = new Map<string, string>()
    forms.forEach((form) => map.set(String(form.id), form.title || `Form ${form.id}`))
    return map
  }, [forms])

  const fetchForms = useCallback(async () => {
    const response = await fetch('/api/forms?limit=200')
    if (!response.ok) {
      throw new Error('Failed to load forms')
    }
    const json = (await response.json()) as FormsResponse
    setForms(json.docs || [])
  }, [])

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      await fetchForms()
      const query = toQueryString({
        limit: 50,
        sort: '-createdAt',
        ...(selectedForm ? { 'where[form][equals]': selectedForm } : {}),
      })
      const response = await fetch(`/api/form-submissions${query}`)
      if (!response.ok) {
        throw new Error('Failed to load submissions')
      }
      const json = (await response.json()) as SubmissionsResponse
      setSubmissions(json.docs || [])
      setTotalDocs(json.totalDocs || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [fetchForms, selectedForm])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const form = params.get('form')
    if (form) {
      setSelectedForm(form)
    }
  }, [])

  const handleExport = () => {
    const query = toQueryString({ form: selectedForm || undefined })
    window.location.href = `/api/admin/tools/form-submissions-export${query}`
  }

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Submissions</h2>
          <p>Total submissions: {totalDocs}</p>
        </div>
        <div className="ra-tool-card__actions">
          <button type="button" className="ra-tool-button" onClick={fetchSubmissions}>
            Refresh
          </button>
          <button type="button" className="ra-tool-button ra-tool-button--secondary" onClick={handleExport}>
            Export CSV
          </button>
        </div>
      </div>

      <div className="ra-tool-filters">
        <label>
          Form
          <select value={selectedForm} onChange={(event) => setSelectedForm(event.target.value)}>
            <option value="">All forms</option>
            {forms.map((form) => (
              <option key={String(form.id)} value={String(form.id)}>
                {form.title || `Form ${form.id}`}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="ra-tool-button ra-tool-button--secondary" onClick={fetchSubmissions}>
          Apply
        </button>
      </div>

      {isLoading && <p className="ra-tool-muted">Loading submissions...</p>}
      {error && <p className="ra-tool-error">{error}</p>}

      {!isLoading && (
        <div className="ra-tool-table">
          <div className="ra-tool-table__row ra-tool-table__row--header">
            <span>Form</span>
            <span>Submitted</span>
            <span>Summary</span>
            <span></span>
          </div>
          {submissions.map((submission) => (
            <div key={String(submission.id)} className="ra-tool-table__row">
              <span>{formMap.get(String(submission.form)) || submission.form}</span>
              <span>{formatDateTime(submission.createdAt)}</span>
              <span>
                {(submission.submissionData || [])
                  .slice(0, 2)
                  .map((item) => `${item.field}: ${item.value}`)
                  .join(' - ') || 'No data'}
              </span>
              <span>
                <a className="ra-tool-link" href={`/admin/collections/form-submissions/${submission.id}`}>
                  Open
                </a>
              </span>
            </div>
          ))}
          {submissions.length === 0 && <p className="ra-tool-muted">No submissions found.</p>}
        </div>
      )}
    </section>
  )
}

export default FormSubmissionsClient
