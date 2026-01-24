'use client'

import React, { useEffect, useState } from 'react'
import { Gutter } from '@payloadcms/ui'
import SeoBulkEditor from './SeoBulkEditor'
import SeoTemplatesTab from './SeoTemplatesTab'
import SeoAdvancedTab from './SeoAdvancedTab'

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
      <Gutter>
        <div style={{ padding: '2rem 0', color: 'var(--theme-error-500)' }}>
          You do not have permission to access SEO Settings.
        </div>
      </Gutter>
    )
  }

  if (authState === 'loading') {
    return (
      <Gutter>
        <div style={{ padding: '2rem 0', color: 'var(--theme-elevation-500)' }}>
          Loading...
        </div>
      </Gutter>
    )
  }

  return (
    <Gutter>
      <div className="tabs-field">
        <div className="tabs-field__tabs-wrap">
          <div className="tabs-field__tabs">
            <button
              type="button"
              className={`tabs-field__tab-button${activeTab === 'overview' ? ' tabs-field__tab-button--active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              type="button"
              className={`tabs-field__tab-button${activeTab === 'templates' ? ' tabs-field__tab-button--active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              Templates
            </button>
            <button
              type="button"
              className={`tabs-field__tab-button${activeTab === 'bulk' ? ' tabs-field__tab-button--active' : ''}`}
              onClick={() => setActiveTab('bulk')}
            >
              Bulk Update
            </button>
            <button
              type="button"
              className={`tabs-field__tab-button${activeTab === 'advanced' ? ' tabs-field__tab-button--active' : ''}`}
              onClick={() => setActiveTab('advanced')}
            >
              Advanced
            </button>
          </div>
        </div>

        <div className="tabs-field__content-wrap">
          {activeTab === 'overview' && (
            <div className="tabs-field__tab" style={{ display: 'block', padding: '2rem 0' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Bulk SEO Editing</h3>
                <p style={{ marginBottom: '1rem', color: 'var(--theme-elevation-500)', fontSize: '0.875rem' }}>
                  Update meta titles, descriptions, and types across every indexable content item.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('bulk')}
                  className="btn btn--style-primary btn--size-medium"
                >
                  Go to Bulk Update
                </button>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Templates</h3>
                <p style={{ marginBottom: '1rem', color: 'var(--theme-elevation-500)', fontSize: '0.875rem' }}>
                  Define global title and description patterns (coming soon).
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('templates')}
                  className="btn btn--style-secondary btn--size-medium"
                >
                  View Templates
                </button>
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Advanced Defaults</h3>
                <p style={{ marginBottom: '1rem', color: 'var(--theme-elevation-500)', fontSize: '0.875rem' }}>
                  Configure robots rules, noindex defaults, and future overrides.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('advanced')}
                  className="btn btn--style-secondary btn--size-medium"
                >
                  Open Advanced
                </button>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="tabs-field__tab" style={{ display: 'block' }}>
              <SeoTemplatesTab />
            </div>
          )}

          {activeTab === 'bulk' && (
            <div className="tabs-field__tab" style={{ display: 'block', padding: '2rem 0' }}>
              <SeoBulkEditor />
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="tabs-field__tab" style={{ display: 'block' }}>
              <SeoAdvancedTab />
            </div>
          )}
        </div>
      </div>
    </Gutter>
  )
}

export default SeoSettingsClient
