import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import UnusedMediaClient from './UnusedMediaClient'

export const UnusedMedia: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="Unused Media"
    description="Find media items not referenced by any collection or global."
  >
    <UnusedMediaClient />
  </ToolPageLayout>
)

export default UnusedMedia
