'use client'

import React, { useState, useEffect } from 'react'

interface VersionInfo {
  branch: string
  version: string
  database: string
  port: string
}

export const VersionDisplay: React.FC = () => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchVersionInfo = async () => {
      try {
        const response = await fetch('/api/admin/version')
        if (response.ok) {
          const data = await response.json()
          setVersionInfo(data)
        }
      } catch (error) {
        console.error('Failed to fetch version info:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVersionInfo()
  }, [])

  if (isLoading || !versionInfo) {
    return null
  }

  const getBranchColor = (branch: string) => {
    if (branch === 'main') return '#10b981'
    if (branch === 'development') return '#f59e0b'
    return '#6b7280'
  }

  return (
    <div 
      className="ra-version-display"
      title={`Branch: ${versionInfo.branch}\nVersion: ${versionInfo.version}\nDatabase: ${versionInfo.database}\nPort: ${versionInfo.port}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 12px',
        fontSize: '12px',
        fontWeight: '500',
        borderRadius: '4px',
        backgroundColor: 'var(--theme-elevation-100)',
        color: 'var(--theme-text)',
        marginRight: '12px',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: getBranchColor(versionInfo.branch),
        }}
      />
      <span>{versionInfo.version}</span>
      <span style={{ opacity: 0.6 }}>({versionInfo.branch})</span>
    </div>
  )
}

