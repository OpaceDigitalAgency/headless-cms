'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import SeoBulkEditor from './SeoBulkEditor'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'templates', label: 'Templates' },
  { id: 'bulk', label: 'Bulk Update' },
  { id: 'advanced', label: 'Advanced' },
]

const resolveActiveTab = (pathname: string) => {
  const parts = pathname.split('/').filter(Boolean)
  const last = parts[parts.length - 1]
  if (last === 'seo') return 'overview'
  if (tabs.some((tab) => tab.id === last)) return last
  return 'overview'
}

const SeoSettingsClient: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const activeTab = useMemo(() => resolveActiveTab(pathname || ''), [pathname])
  const [authState, setAuthState] = useState<'loading' | 'admin' | 'forbidden'>('loading')

  useEffect(() => {
    if (pathname === '/admin/seo' || pathname === '/admin/seo/') {
      router.replace('/admin/seo/overview')
    }
  }, [pathname, router])

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
          <Link
            key={tab.id}
            href={`/admin/seo/${tab.id}`}
            className={`ra-seo-tab${activeTab === tab.id ? ' is-active' : ''}`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="ra-seo-panel">
        {activeTab === 'overview' && (
          <div className="ra-seo-overview">
            <div className="ra-seo-card">
              <h2>Bulk SEO editing</h2>
              <p>Update meta titles, descriptions, and types across every indexable content item.</p>
              <Link href="/admin/seo/bulk" className="ra-tool-button">
                Go to Bulk Update
              </Link>
            </div>
            <div className="ra-seo-card">
              <h2>Templates</h2>
              <p>Define global title and description patterns (coming soon).</p>
              <Link href="/admin/seo/templates" className="ra-tool-button ra-tool-button--secondary">
                View Templates
              </Link>
            </div>
            <div className="ra-seo-card">
              <h2>Advanced defaults</h2>
              <p>Configure robots rules, noindex defaults, and future overrides.</p>
              <Link href="/admin/seo/advanced" className="ra-tool-button ra-tool-button--secondary">
                Open Advanced
              </Link>
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
