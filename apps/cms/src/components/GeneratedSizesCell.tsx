'use client'

import React from 'react'

const GeneratedSizesCell = (props: any) => {
  const { cellData, rowData } = props

  // cellData contains the string from the afterRead hook
  if (!cellData || cellData === 'None') {
    return <span style={{ color: '#999' }}>None</span>
  }

  // Parse the comma-separated string
  const sizeNames = cellData.split(', ').filter(Boolean)

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
      {sizeNames.slice(0, 5).map((size: string) => (
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
      {sizeNames.length > 5 && (
        <span style={{
          fontSize: '11px',
          color: '#666',
          marginLeft: '4px'
        }}>
          +{sizeNames.length - 5} more
        </span>
      )}
      <span style={{
        fontSize: '11px',
        color: '#666',
        marginLeft: '4px'
      }}>
        ({sizeNames.length} total)
      </span>
    </div>
  )
}

export default GeneratedSizesCell

