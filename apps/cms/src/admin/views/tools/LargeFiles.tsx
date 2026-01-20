import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import LargeFilesClient from './LargeFilesClient'

export const LargeFiles: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="Large Files"
    description="Identify oversized media for optimization."
  >
    <LargeFilesClient />
  </ToolPageLayout>
)

export default LargeFiles
