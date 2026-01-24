import React from 'react'
import { DefaultTemplate, type DefaultTemplateProps } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import type { VisibleEntities } from 'payload'
import SeoSettingsClient from './SeoSettingsClient'

type SeoSettingsProps = Omit<DefaultTemplateProps, 'children'> & {
  initPageResult?: {
    visibleEntities?: VisibleEntities
  }
}

export const SeoSettings: React.FC<SeoSettingsProps> = (props) => {
  const { initPageResult, visibleEntities: propsVisibleEntities, ...templateProps } = props
  const visibleEntities = initPageResult?.visibleEntities ?? propsVisibleEntities

  const content = (
    <Gutter className="ra-seo-settings">
      <div className="ra-seo-settings__header">
        <h1>SEO Settings</h1>
        <p>Manage SEO templates, bulk metadata updates, and advanced defaults.</p>
      </div>
      <SeoSettingsClient />
    </Gutter>
  )

  if (!visibleEntities) {
    return content
  }

  return (
    <DefaultTemplate {...templateProps} visibleEntities={visibleEntities}>
      {content}
    </DefaultTemplate>
  )
}

export default SeoSettings
