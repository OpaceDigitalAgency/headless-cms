import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import MediaLibraryClient from './MediaLibraryClient'

export const MediaLibrary: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="Media Library"
    description="Browse media with metadata checks and quick access."
  >
    <MediaLibraryClient />
  </ToolPageLayout>
)

export default MediaLibrary
