import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import FormSubmissionsClient from './FormSubmissionsClient'

export const FormSubmissions: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="Form Submissions"
    description="Review form submissions, filter by form, and export CSV."
  >
    <FormSubmissionsClient />
  </ToolPageLayout>
)

export default FormSubmissions
