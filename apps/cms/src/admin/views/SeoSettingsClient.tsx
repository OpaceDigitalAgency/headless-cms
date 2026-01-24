'use client'

import React, { useEffect, useState } from 'react'
import SeoBulkEditor from './SeoBulkEditor'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'templates', label: 'Templates' },
  { id: 'bulk', label: 'Bulk Update' },
  { id: 'advanced', label: 'Advanced' },
]

const SeoSettingsClient: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [authState, setAuthState] = useState<'loading' | 'admin' | 'forbidden'>('loading')

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch('/api/users/me')
        if (!response.ok) {
          setAuthState('forbidden')
          return
        }
        const json = await response.json()
        const role = json?.user?.role || json?.role
        setAuthState(role === 'admin' ? 'admin' : 'forbidden')
      } catch {
        setAuthState('forbidden')
      }
    }

    checkAccess()
  }, [])

  if (authState === 'forbidden') {
    return (
      <div className="ra-tool-error">
        You do not have permission to access SEO Settings.
      </div>
    )
  }

  if (authState === 'loading') {
    return <p className="ra-tool-muted">Checking permissions...</p>
  }

  return (
    <div className="ra-seo-settings__body">
      <nav className="ra-seo-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`ra-seo-tab${activeTab === tab.id ? ' is-active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="ra-seo-panel">
        {activeTab === 'overview' && (
          <div className="ra-seo-overview">
            <div className="ra-seo-card">
              <h2>Bulk SEO editing</h2>
              <p>Update meta titles, descriptions, and types across every indexable content item.</p>
              <button onClick={() => setActiveTab('bulk')} className="ra-tool-button">
                Go to Bulk Update
              </button>
            </div>
            <div className="ra-seo-card">
              <h2>Templates</h2>
              <p>Define global title and description patterns (coming soon).</p>
              <button onClick={() => setActiveTab('templates')} className="ra-tool-button ra-tool-button--secondary">
                View Templates
              </button>
            </div>
            <div className="ra-seo-card">
              <h2>Advanced defaults</h2>
              <p>Configure robots rules, noindex defaults, and future overrides.</p>
              <button onClick={() => setActiveTab('advanced')} className="ra-tool-button ra-tool-button--secondary">
                Open Advanced
              </button>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="ra-seo-placeholder">
            <h2>Templates</h2>
            <p>Placeholder for global title and description templates.</p>
          </div>
        )}

        {activeTab === 'bulk' && <SeoBulkEditor />}

        {activeTab === 'advanced' && (
          <div className="ra-seo-placeholder">
            <h2>Advanced</h2>
            <p>Placeholder for robots defaults, noindex rules, and overrides.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SeoSettingsClient
