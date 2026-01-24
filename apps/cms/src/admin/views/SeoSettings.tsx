import React from 'react'
import { DefaultTemplate, type DefaultTemplateProps } from '@payloadcms/next/templates'
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

  const content = <SeoSettingsClient />

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
