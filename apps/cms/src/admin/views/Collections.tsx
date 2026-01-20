import React from 'react'
import { UnifiedCollectionTemplates } from '../../components/UnifiedCollectionTemplates'

/**
 * Collections Management View
 * 
 * Dedicated page for managing all collections - enabling/disabling them,
 * seeding sample data, and viewing collection templates.
 * 
 * This view reuses the UnifiedCollectionTemplates component from the Dashboard
 * to avoid code duplication.
 */
export const Collections: React.FC = () => {
  return (
    <div className="ra-collections-view" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: '#333' }}>
          Collections
        </h1>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Manage your content collections. Enable or disable collections to show or hide them in the navigation menu. 
          Seed collections with sample data to get started quickly.
        </p>
      </div>
      
      <UnifiedCollectionTemplates />
    </div>
  )
}

