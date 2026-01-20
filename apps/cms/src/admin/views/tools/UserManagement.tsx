import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import UserManagementClient from './UserManagementClient'

export const UserManagement: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="User Management"
    description="Manage user roles and access."
  >
    <UserManagementClient />
  </ToolPageLayout>
)

export default UserManagement
