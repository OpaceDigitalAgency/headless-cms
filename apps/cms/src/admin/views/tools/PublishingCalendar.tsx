import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import PublishingCalendarClient from './PublishingCalendarClient'

export const PublishingCalendar: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="Publishing Calendar"
    description="Upcoming scheduled or published content with a defined publish date."
  >
    <PublishingCalendarClient />
  </ToolPageLayout>
)

export default PublishingCalendar
