import React from 'react'
import { DefaultTemplate, type DefaultTemplateProps } from '@payloadcms/next/templates'
import type { VisibleEntities } from 'payload'

export type ToolViewProps = Omit<DefaultTemplateProps, 'children'> & {
  initPageResult?: {
    visibleEntities?: VisibleEntities
  }
}

type ToolPageLayoutProps = ToolViewProps & {
  title: string
  description?: string
  children: React.ReactNode
}

export const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({
  title,
  description,
  children,
  initPageResult,
  visibleEntities: propsVisibleEntities,
  ...templateProps
}) => {
  const visibleEntities = initPageResult?.visibleEntities ?? propsVisibleEntities
  const content = (
    <div className="ra-tool-page">
      <div className="ra-tool-page__header">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <div className="ra-tool-page__content">{children}</div>
    </div>
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

export default ToolPageLayout
