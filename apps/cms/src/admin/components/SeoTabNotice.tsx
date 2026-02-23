'use client'

import React from 'react'

const SeoTabNotice: React.FC = () => {
  return (
    <div
      style={{
        margin: '1.5rem 0',
        padding: '1.25rem 1.5rem',
        background: 'linear-gradient(135deg, var(--theme-elevation-50) 0%, var(--theme-elevation-0) 100%)',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 'var(--border-radius-lg)',
        borderLeft: '4px solid var(--theme-success-500)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--theme-success-600)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <strong style={{ fontSize: '0.9375rem', color: 'var(--theme-elevation-900)' }}>
          SEO settings are managed separately
        </strong>
      </div>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--theme-elevation-600)', lineHeight: 1.6 }}>
        Meta titles, descriptions, robots rules, and bulk updates are all managed via the dedicated{' '}
        <strong>SEO Settings</strong> page — not here. This tab simply stores the underlying data.
      </p>
      <a
        href="/admin/seo"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--theme-success-600)',
          color: '#fff',
          borderRadius: 'var(--border-radius-md)',
          fontSize: '0.875rem',
          fontWeight: 600,
          textDecoration: 'none',
          width: 'fit-content',
          transition: 'background 0.15s ease',
        }}
        onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--theme-success-700)' }}
        onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--theme-success-600)' }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        Go to SEO Settings
      </a>
    </div>
  )
}

export default SeoTabNotice
