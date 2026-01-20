import React from 'react'
import { DefaultTemplate, type DefaultTemplateProps } from '@payloadcms/next/templates'
import type { VisibleEntities } from 'payload'
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
type CollectionsProps = Omit<DefaultTemplateProps, 'children' | 'visibleEntities'> & {
  initPageResult?: {
    visibleEntities?: VisibleEntities
  }
}

export const Collections: React.FC<CollectionsProps> = (props) => {
  const { initPageResult, ...templateProps } = props
  const visibleEntities = initPageResult?.visibleEntities

  const collectionsContent = (
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

  if (!visibleEntities) {
    return collectionsContent
  }

  return (
    <DefaultTemplate {...templateProps} visibleEntities={visibleEntities}>
      {collectionsContent}
    </DefaultTemplate>
  )
}

export default Collections

