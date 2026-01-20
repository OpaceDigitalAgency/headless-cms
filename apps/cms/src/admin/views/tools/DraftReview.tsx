import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import DraftReviewClient from './DraftReviewClient'

export const DraftReview: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="Draft Review"
    description="Review draft content across all draft-enabled collections."
  >
    <DraftReviewClient />
  </ToolPageLayout>
)

export default DraftReview
