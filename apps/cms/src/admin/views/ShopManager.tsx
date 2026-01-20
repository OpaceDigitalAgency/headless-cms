import React from 'react'
import { DefaultTemplate, type DefaultTemplateProps } from '@payloadcms/next/templates'
import type { VisibleEntities } from 'payload'
import { SectionCollectionTemplates } from '../../components/SectionCollectionTemplates'

/**
 * Shop Manager View
 *
 * Dedicated page for managing shop collections - Products, Product Categories, etc.
 * Shows collections with seed/hide/view options.
 */
type ShopManagerProps = Omit<DefaultTemplateProps, 'children' | 'visibleEntities'> & {
  initPageResult?: {
    visibleEntities?: VisibleEntities
  }
}

export const ShopManager: React.FC<ShopManagerProps> = (props) => {
  const { initPageResult, ...templateProps } = props
  const visibleEntities = initPageResult?.visibleEntities

  const shopManagerContent = (
    <div className="ra-shop-manager-view" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: '#333' }}>
          Shop
        </h1>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Manage your shop collections including products, categories, and inventory.
        </p>
      </div>

      <SectionCollectionTemplates section="Shop" />
    </div>
  )

  if (!visibleEntities) {
    return shopManagerContent
  }

  return (
    <DefaultTemplate {...templateProps} visibleEntities={visibleEntities}>
      {shopManagerContent}
    </DefaultTemplate>
  )
}

export default ShopManager

