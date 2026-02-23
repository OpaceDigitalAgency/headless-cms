'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Custom List Header for Custom Items Collection
 * 
 * Dynamically updates the page title based on the contentType filter.
 * When viewing a specific custom collection (e.g., Services), shows that collection's name
 * instead of "Custom Items".
 */
export const CustomItemsListHeader: React.FC = () => {
  const searchParams = useSearchParams()
  const [contentTypeName, setContentTypeName] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const contentTypeId = searchParams?.get('where[contentType][equals]')
    
    if (!contentTypeId) {
      setContentTypeName(null)
      return
    }

    // Fetch the content type name
    setLoading(true)
    fetch(`/api/content-types/${contentTypeId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.pluralLabel) {
          setContentTypeName(data.pluralLabel)
        } else if (data && data.name) {
          setContentTypeName(data.name)
        }
      })
      .catch(err => {
        console.error('Failed to fetch content type:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [searchParams])

  // Only render if we have a content type filter
  if (!contentTypeName) {
    return null
  }

  return (
    <div style={{
      marginBottom: '24px',
      padding: '16px 24px',
      background: 'var(--theme-elevation-50)',
      borderRadius: '8px',
      border: '1px solid var(--theme-elevation-200)',
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: 700,
        margin: 0,
        color: 'var(--theme-text)',
      }}>
        {loading ? 'Loading...' : contentTypeName}
      </h1>
      <p style={{
        fontSize: '14px',
        color: 'var(--theme-elevation-600)',
        margin: '8px 0 0 0',
      }}>
        Items in this custom collection
      </p>
    </div>
  )
}

export default CustomItemsListHeader

