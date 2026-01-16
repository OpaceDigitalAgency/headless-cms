'use client'

import React from 'react'

interface FileSizeCellProps {
  data?: {
    filesize?: number
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export const FileSizeCell: React.FC<FileSizeCellProps> = ({ data }) => {
  if (!data?.filesize) {
    return <span style={{ color: '#999' }}>—</span>
  }

  return (
    <span style={{ 
      fontSize: '13px',
      color: '#333'
    }}>
      {formatFileSize(data.filesize)}
    </span>
  )
}

export default FileSizeCell

