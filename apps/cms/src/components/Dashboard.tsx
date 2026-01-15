'use client'

import React from 'react'
import { SeedDataManager } from './SeedDataManager'

/**
 * Custom Dashboard Component
 * 
 * Extends the default Payload dashboard with additional functionality
 * including sample data management with preset selection.
 */
export const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ 
        margin: '0 0 24px 0', 
        fontSize: '24px',
        fontWeight: 600,
        color: 'var(--theme-text)',
      }}>
        Dashboard
      </h1>
      
      {/* Sample Data Management Section */}
      <SeedDataManager />
      
      {/* Quick Links */}
      <h2 style={{
        margin: '0 0 16px 0',
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--theme-text)',
      }}>
        Quick Links
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}>
        <DashboardCard
          title="Pages"
          description="Manage website pages"
          href="/admin/collections/pages"
          icon="📄"
        />
        <DashboardCard
          title="Posts"
          description="Blog posts and articles"
          href="/admin/collections/posts"
          icon="📝"
        />
        <DashboardCard
          title="Media"
          description="Images and files"
          href="/admin/collections/media"
          icon="🖼️"
        />
        <DashboardCard
          title="Artifacts"
          description="Museum collection items"
          href="/admin/collections/artifacts"
          icon="🏺"
        />
        <DashboardCard
          title="People"
          description="Historical figures"
          href="/admin/collections/people"
          icon="👤"
        />
        <DashboardCard
          title="Places"
          description="Geographic locations"
          href="/admin/collections/places"
          icon="📍"
        />
        <DashboardCard
          title="Settings"
          description="Site configuration"
          href="/admin/globals/settings"
          icon="⚙️"
        />
        <DashboardCard
          title="Users"
          description="Manage admin users"
          href="/admin/collections/users"
          icon="👥"
        />
      </div>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  description: string
  href: string
  icon: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, href, icon }) => {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        padding: '20px',
        backgroundColor: 'var(--theme-elevation-50)',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        border: '1px solid transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--theme-elevation-100)'
        e.currentTarget.style.borderColor = 'var(--theme-elevation-200)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--theme-elevation-50)'
        e.currentTarget.style.borderColor = 'transparent'
      }}
    >
      <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
      <h3 style={{ 
        margin: '0 0 4px 0', 
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--theme-text)',
      }}>
        {title}
      </h3>
      <p style={{ 
        margin: 0, 
        fontSize: '13px',
        color: 'var(--theme-elevation-800)',
      }}>
        {description}
      </p>
    </a>
  )
}

export default Dashboard
