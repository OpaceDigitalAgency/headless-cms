'use client'

import React, { useMemo } from 'react'
import { useListInfo } from '@payloadcms/ui'
import { getPreviewUrl } from '../utils/preview'

interface PreviewButtonCellProps {
  rowData: any
  cellData?: any
}

/**
 * Preview Button Cell Component
 *
 * Renders a preview button in table rows that opens the preview in a new tab.
 * Used across all collections (pages, posts, custom items, etc.)
 */
const PreviewButtonCell: React.FC<PreviewButtonCellProps> = ({ rowData, cellData }) => {
  const { collection } = useListInfo()

  if (!rowData?.slug) {
    return (
      <span style={{ color: '#999', fontSize: '13px' }}>
        —
      </span>
    )
  }

  // Handle custom items with content type
  let previewSlug = rowData.slug
  if (collection?.slug === 'custom-items' && rowData.contentType) {
    const contentType = rowData.contentType
    const typeSlug = typeof contentType === 'object' && contentType.archiveSlug
      ? contentType.archiveSlug.replace(/^\/?items\//, '')
      : typeof contentType === 'object' && contentType.slug
        ? contentType.slug
        : contentType
    previewSlug = `${typeSlug}/${rowData.slug}`
  }

  const previewUrl = useMemo(() =>
    getPreviewUrl({ collection: collection?.slug || '', slug: previewSlug }),
    [collection?.slug, previewSlug]
  )

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(previewUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handlePreview}
      style={{
        padding: '6px 12px',
        fontSize: '13px',
        fontWeight: 500,
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0051cc'
        ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0070f3'
        ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
      }}
    >
      Preview
    </button>
  )
}

export default PreviewButtonCell

