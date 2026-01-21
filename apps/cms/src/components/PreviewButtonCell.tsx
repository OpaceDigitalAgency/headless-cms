'use client'

import React, { useMemo } from 'react'
import { getPreviewUrl } from '../utils/preview'

interface PreviewButtonCellProps {
  rowData: any
  cellData?: any
}

/**
 * Factory function to create a preview button cell component for a specific collection
 * This is needed because Payload CMS cell components don't have access to collection context
 */
export const createPreviewButtonCell = (collectionSlug: string) => {
  const PreviewButtonCell: React.FC<PreviewButtonCellProps> = ({ rowData, cellData }) => {
    if (!rowData?.slug) {
      return (
        <span style={{ color: '#999', fontSize: '13px' }}>
          —
        </span>
      )
    }

    // Handle custom items with content type
    let previewSlug = rowData.slug
    if (collectionSlug === 'custom-items' && rowData.contentType) {
      const contentType = rowData.contentType
      const typeSlug = typeof contentType === 'object' && contentType.archiveSlug
        ? contentType.archiveSlug.replace(/^\/?items\//, '')
        : typeof contentType === 'object' && contentType.slug
          ? contentType.slug
          : contentType
      previewSlug = `${typeSlug}/${rowData.slug}`
    }

    const previewUrl = useMemo(() =>
      getPreviewUrl({ collection: collectionSlug, slug: previewSlug }),
      [previewSlug]
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

  return PreviewButtonCell
}

export default createPreviewButtonCell('pages')

