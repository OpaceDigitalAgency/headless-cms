'use client'

import React from 'react'

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

const FileSizeCell = (props: any) => {
  const { cellData } = props

  if (!cellData || typeof cellData !== 'number') {
    return <span style={{ color: '#999' }}>—</span>
  }

  return (
    <span style={{
      fontSize: '13px',
      color: '#333'
    }}>
      {formatFileSize(cellData)}
    </span>
  )
}

export default FileSizeCell

