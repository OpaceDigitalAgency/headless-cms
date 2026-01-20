import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import RedirectsClient from './RedirectsClient'

export const Redirects: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="Redirects"
    description="Create and review redirects."
  >
    <RedirectsClient />
  </ToolPageLayout>
)

export default Redirects
