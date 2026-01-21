import React from 'react'
import { DefaultTemplate, type DefaultTemplateProps } from '@payloadcms/next/templates'
import type { VisibleEntities } from 'payload'
import { SectionCollectionTemplates } from '../../components/SectionCollectionTemplates'

/**
 * Collections Management View
 *
 * Dedicated page for managing collections in the Collections section
 * (Archive Items, Events, People, Places).
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
          Manage core and custom collections including archive items, events, people, and places.
        </p>
      </div>

      <SectionCollectionTemplates section="Collections" />
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
