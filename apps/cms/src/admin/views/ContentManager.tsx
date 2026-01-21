import React from 'react'
import { DefaultTemplate, type DefaultTemplateProps } from '@payloadcms/next/templates'
import type { VisibleEntities } from 'payload'
import { SectionCollectionTemplates } from '../../components/SectionCollectionTemplates'

/**
 * Content Manager View
 *
 * Dedicated page for managing content collections - Pages, Posts, Custom Content Types.
 * Shows collections with seed/hide/view options.
 */
type ContentManagerProps = Omit<DefaultTemplateProps, 'children' | 'visibleEntities'> & {
  initPageResult?: {
    visibleEntities?: VisibleEntities
  }
}

export const ContentManager: React.FC<ContentManagerProps> = (props) => {
  const { initPageResult, ...templateProps } = props
  const visibleEntities = initPageResult?.visibleEntities

  const contentManagerContent = (
    <div className="ra-content-manager-view" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: '#333' }}>
          Content
        </h1>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Manage your content collections including pages and posts.
        </p>
      </div>

      <SectionCollectionTemplates section="Content" />
    </div>
  )

  if (!visibleEntities) {
    return contentManagerContent
  }

  return (
    <DefaultTemplate {...templateProps} visibleEntities={visibleEntities}>
      {contentManagerContent}
    </DefaultTemplate>
  )
}

export default ContentManager
