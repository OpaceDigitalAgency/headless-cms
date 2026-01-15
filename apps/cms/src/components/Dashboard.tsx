'use client'

import React, { useState } from 'react'
import { SeedDataManager } from './SeedDataManager'
import { CollectionTemplates } from './CollectionTemplates'

/**
 * Custom Dashboard Component
 * 
 * Extends the default Payload dashboard with additional functionality
 * including collection templates browser and sample data management.
 */
export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'seed'>('overview')

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

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0',
        marginBottom: '24px',
        borderBottom: '1px solid var(--theme-elevation-200)',
      }}>
        <TabButton 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </TabButton>
        <TabButton 
          active={activeTab === 'templates'} 
          onClick={() => setActiveTab('templates')}
        >
          📦 Collection Templates
        </TabButton>
        <TabButton 
          active={activeTab === 'seed'} 
          onClick={() => setActiveTab('seed')}
        >
          🌱 Sample Data
        </TabButton>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Getting Started Section */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--theme-elevation-50)',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid var(--theme-elevation-100)',
          }}>
            <h2 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 600 }}>
              👋 Welcome to Your CMS
            </h2>
            <p style={{ margin: '0 0 16px 0', color: 'var(--theme-elevation-800)' }}>
              This is a flexible headless CMS. Here's how to get started:
            </p>
            <ol style={{ margin: 0, paddingLeft: '20px', color: 'var(--theme-elevation-800)' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Add Content Types</strong> - Go to "Collection Templates" to add blog posts, products, archive items, etc.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Preview with Sample Data</strong> - Use "Sample Data" to see how your content will look.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Create Your Content</strong> - Delete sample data and add your own content.
              </li>
              <li>
                <strong>Customize</strong> - Each content type supports categories, tags, and flexible content blocks.
              </li>
            </ol>
          </div>

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
        </>
      )}

      {/* Collection Templates Tab */}
      {activeTab === 'templates' && (
        <CollectionTemplates />
      )}

      {/* Sample Data Tab */}
      {activeTab === 'seed' && (
        <SeedDataManager />
      )}
    </div>
  )
}

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 20px',
      border: 'none',
      borderBottom: active ? '2px solid var(--theme-success-500)' : '2px solid transparent',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: active ? 600 : 400,
      color: active ? 'var(--theme-text)' : 'var(--theme-elevation-600)',
      transition: 'all 0.2s ease',
    }}
  >
    {children}
  </button>
)

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
