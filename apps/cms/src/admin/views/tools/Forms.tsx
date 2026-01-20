import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import FormsClient from './FormsClient'

export const Forms: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="Forms"
    description="Manage forms and monitor submission volume."
  >
    <FormsClient />
  </ToolPageLayout>
)

export default Forms
