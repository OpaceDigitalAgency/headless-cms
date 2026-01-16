'use client'

import React from 'react'

interface GeneratedSizesCellProps {
  data?: {
    sizes?: Record<string, { filename?: string }>
  }
}

export const GeneratedSizesCell: React.FC<GeneratedSizesCellProps> = ({ data }) => {
  if (!data?.sizes || typeof data.sizes !== 'object') {
    return <span style={{ color: '#999' }}>None</span>
  }

  const sizeNames = Object.keys(data.sizes).filter(key => data.sizes[key]?.filename)
  
  if (sizeNames.length === 0) {
    return <span style={{ color: '#999' }}>None</span>
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '4px',
      maxWidth: '300px'
    }}>
      {sizeNames.map((size, index) => (
        <span
          key={size}
          style={{
            fontSize: '11px',
            padding: '2px 6px',
            backgroundColor: '#f0f0f0',
            borderRadius: '3px',
            color: '#333',
            whiteSpace: 'nowrap'
          }}
        >
          {size}
        </span>
      ))}
      <span style={{ 
        fontSize: '11px', 
        color: '#666',
        marginLeft: '4px'
      }}>
        ({sizeNames.length} sizes)
      </span>
    </div>
  )
}

export default GeneratedSizesCell

