import React from 'react'
import { DefaultTemplate, type DefaultTemplateProps } from '@payloadcms/next/templates'
import type { VisibleEntities } from 'payload'
import { SectionCollectionTemplates } from '../../components/SectionCollectionTemplates'

/**
 * Taxonomy Manager View
 *
 * Dedicated page for managing taxonomy collections - Categories, Tags.
 * Shows collections with seed/hide/view options.
 */
type TaxonomyManagerProps = Omit<DefaultTemplateProps, 'children' | 'visibleEntities'> & {
  initPageResult?: {
    visibleEntities?: VisibleEntities
  }
}

export const TaxonomyManager: React.FC<TaxonomyManagerProps> = (props) => {
  const { initPageResult, ...templateProps } = props
  const visibleEntities = initPageResult?.visibleEntities

  const taxonomyManagerContent = (
    <div className="ra-taxonomy-manager-view" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: '#333' }}>
          Taxonomy
        </h1>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Manage your taxonomy collections including categories and tags.
        </p>
      </div>

      <SectionCollectionTemplates section="Taxonomy" />
    </div>
  )

  if (!visibleEntities) {
    return taxonomyManagerContent
  }

  return (
    <DefaultTemplate {...templateProps} visibleEntities={visibleEntities}>
      {taxonomyManagerContent}
    </DefaultTemplate>
  )
}

export default TaxonomyManager

