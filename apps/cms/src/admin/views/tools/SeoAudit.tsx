import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import SeoAuditClient from './SeoAuditClient'

export const SeoAudit: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="SEO Audit"
    description="Find content missing meta titles or descriptions."
  >
    <SeoAuditClient />
  </ToolPageLayout>
)

export default SeoAudit
