'use client'

import React, { useState, useEffect } from 'react'
import {
  allTemplates,
  type CollectionTemplate,
  type CollectionStatus,
} from '../collection-templates'

/**
 * Unified Collection Templates Interface
 * 
 * Shows all collections in one place with their status:
 * - Core Collections (always on, cannot be disabled)
 * - Installed Collections (can be disabled, seeded, or deleted)
 * - Available Templates (can be added)
 */
export const UnifiedCollectionTemplates: React.FC = () => {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [seeding, setSeeding] = useState<string | null>(null)
  const [installedSlugs, setInstalledSlugs] = useState<string[]>([])
  const [visibilitySettings, setVisibilitySettings] = useState<Record<string, boolean>>({})
  const [toggling, setToggling] = useState<string | null>(null)

  useEffect(() => {
    fetchInstalledCollections()
    fetchVisibilitySettings()
  }, [])

  const fetchInstalledCollections = async () => {
    try {
      const response = await fetch('/api/collection-templates/installed')
      if (response.ok) {
        const data = await response.json()
        setInstalledSlugs(data.slugs || [])
      }
    } catch (error) {
      console.error('Failed to fetch installed collections:', error)
    }
  }

  const fetchVisibilitySettings = async () => {
    try {
      const response = await fetch('/api/admin/navigation')
      if (response.ok) {
        const data = await response.json()
        const settings: Record<string, boolean> = {}

        // Extract visibility from navigation sections
        data.navSections?.forEach((section: any) => {
          section.items?.forEach((item: any) => {
            if (item.slug) {
              settings[item.slug] = true
            }
            if (item.items) {
              item.items.forEach((nestedItem: any) => {
                if (nestedItem.slug) {
                  settings[nestedItem.slug] = true
                }
              })
            }
          })
        })

        setVisibilitySettings(settings)
      }
    } catch (error) {
      console.error('Failed to fetch visibility settings:', error)
    }
  }

  const handleToggleVisibility = async (slug: string, currentlyVisible: boolean) => {
    setToggling(slug)
    setMessage(null)

    try {
      // Get current navigation settings
      const navResponse = await fetch('/api/globals/navigation-settings')
      const navData = await navResponse.json()

      const currentCollections = Array.isArray(navData.collections) ? navData.collections : []

      // Find or create the collection setting
      const existingIndex = currentCollections.findIndex((c: any) => c.slug === slug)

      let updatedCollections
      if (existingIndex >= 0) {
        // Update existing setting
        updatedCollections = [...currentCollections]
        updatedCollections[existingIndex] = {
          ...updatedCollections[existingIndex],
          enabled: !currentlyVisible,
        }
      } else {
        // Add new setting
        updatedCollections = [
          ...currentCollections,
          {
            slug,
            enabled: !currentlyVisible,
          },
        ]
      }

      // Save updated settings
      const updateResponse = await fetch('/api/globals/navigation-settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collections: updatedCollections,
        }),
      })

      if (updateResponse.ok) {
        setMessage({
          type: 'success',
          text: `${slug} ${currentlyVisible ? 'hidden from' : 'shown in'} navigation. Refresh the page to see changes.`
        })

        // Update local state
        setVisibilitySettings(prev => ({
          ...prev,
          [slug]: !currentlyVisible,
        }))

        // Clear navigation cache
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('nav-data')
          sessionStorage.removeItem('nav-cache-time')
        }
      } else {
        setMessage({ type: 'error', text: 'Failed to update visibility settings' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update visibility. Please try again.' })
    } finally {
      setToggling(null)
    }
  }

  const handleSeedData = async (template: CollectionTemplate) => {
    setSeeding(template.defaultSlug)
    setMessage(null)

    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection: template.defaultSlug,
          includeMedia: template.hasSeedMedia,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: `Successfully seeded ${template.name}!` })
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to seed data' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to seed data. Please try again.' })
    } finally {
      setSeeding(null)
    }
  }

  // Group templates by status
  const coreTemplates = allTemplates.filter(t => t.status === 'core')
  const installedTemplates = allTemplates.filter(t => t.status === 'installed')
  const availableTemplates = allTemplates.filter(t => t.status === 'available')

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 600 }}>
        Collection Templates
      </h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Manage your content collections. Enable/disable collections to show or hide them in the navigation menu.
        Seed collections with sample data to get started quickly. Core collections (Pages, Posts) are always available.
      </p>

      {/* Message */}
      {message && (
        <div style={{
          padding: '12px 16px',
          marginBottom: '20px',
          borderRadius: '6px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
        }}>
          {message.text}
        </div>
      )}

      {/* Core Collections */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#333' }}>
          Core Collections
        </h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          These collections are always enabled and visible in the navigation menu.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {coreTemplates.map(template => (
            <CollectionCard
              key={template.id}
              template={template}
              status="core"
              onSeed={handleSeedData}
              isSeeding={seeding === template.defaultSlug}
              isVisible={visibilitySettings[template.defaultSlug] !== false}
              onToggleVisibility={handleToggleVisibility}
              isToggling={toggling === template.defaultSlug}
            />
          ))}
        </div>
      </section>

      {/* Installed Collections */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#333' }}>
          Installed Collections
        </h3>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          These collections are currently active. You can enable/disable them in the navigation menu and seed them with sample data.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {installedTemplates.map(template => (
            <CollectionCard
              key={template.id}
              template={template}
              status="installed"
              onSeed={handleSeedData}
              isSeeding={seeding === template.defaultSlug}
              isVisible={visibilitySettings[template.defaultSlug] !== false}
              onToggleVisibility={handleToggleVisibility}
              isToggling={toggling === template.defaultSlug}
            />
          ))}
        </div>
      </section>

      {/* Available Templates */}
      {availableTemplates.length > 0 && (
        <section>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#333' }}>
            Available Templates
          </h3>
          <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
            These templates can be added to your CMS.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {availableTemplates.map(template => (
              <CollectionCard
                key={template.id}
                template={template}
                status="available"
                onSeed={handleSeedData}
                isSeeding={false}
                isVisible={false}
                onToggleVisibility={handleToggleVisibility}
                isToggling={false}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

/**
 * Collection Card Component
 */
interface CollectionCardProps {
  template: CollectionTemplate
  status: CollectionStatus
  onSeed: (template: CollectionTemplate) => void
  isSeeding: boolean
  isVisible: boolean
  onToggleVisibility: (slug: string, currentlyVisible: boolean) => void
  isToggling: boolean
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  template,
  status,
  onSeed,
  isSeeding,
  isVisible,
  onToggleVisibility,
  isToggling,
}) => {
  const statusColors = {
    core: { bg: '#e3f2fd', border: '#2196f3', text: '#1565c0' },
    installed: { bg: '#e8f5e9', border: '#4caf50', text: '#2e7d32' },
    available: { bg: '#f5f5f5', border: '#9e9e9e', text: '#616161' },
  }

  const colors = statusColors[status]

  return (
    <div style={{
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#fff',
      transition: 'box-shadow 0.2s',
      opacity: isVisible ? 1 : 0.6,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
            {template.name}
          </h4>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: colors.bg,
              color: colors.text,
            }}>
              {status === 'core' ? 'Core' : status === 'installed' ? 'Installed' : 'Available'}
            </span>
            {status !== 'available' && (
              <span style={{
                display: 'inline-block',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 500,
                backgroundColor: isVisible ? '#e8f5e9' : '#fff3e0',
                color: isVisible ? '#2e7d32' : '#f57c00',
              }}>
                {isVisible ? '👁️ Visible' : '🚫 Hidden'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px', lineHeight: '1.5' }}>
        {template.description}
      </p>

      {/* Metadata */}
      <div style={{ fontSize: '12px', color: '#999', marginBottom: '12px' }}>
        <div>Slug: <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>{template.defaultSlug}</code></div>
        {template.hasSeedData && (
          <div style={{ marginTop: '4px' }}>
            Sample data available ({template.seedDataCount} items)
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {status !== 'available' && template.hasSeedData && (
          <button
            onClick={() => onSeed(template)}
            disabled={isSeeding}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '4px',
              border: '1px solid #2196f3',
              backgroundColor: '#2196f3',
              color: '#fff',
              cursor: isSeeding ? 'not-allowed' : 'pointer',
              opacity: isSeeding ? 0.6 : 1,
            }}
          >
            {isSeeding ? 'Seeding...' : 'Seed Data'}
          </button>
        )}

        {status === 'installed' && (
          <button
            onClick={() => onToggleVisibility(template.defaultSlug, isVisible)}
            disabled={isToggling}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '4px',
              border: `1px solid ${isVisible ? '#f57c00' : '#4caf50'}`,
              backgroundColor: 'transparent',
              color: isVisible ? '#f57c00' : '#4caf50',
              cursor: isToggling ? 'not-allowed' : 'pointer',
              opacity: isToggling ? 0.6 : 1,
            }}
          >
            {isToggling ? 'Updating...' : isVisible ? '🚫 Hide from Menu' : '👁️ Show in Menu'}
          </button>
        )}

        {status !== 'available' && (
          <a
            href={`/admin/collections/${template.defaultSlug}`}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '4px',
              border: '1px solid #9e9e9e',
              backgroundColor: 'transparent',
              color: '#616161',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            View Collection
          </a>
        )}
      </div>
    </div>
  )
}

