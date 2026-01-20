'use client'

import React, { useState, useEffect } from 'react'
import {
  allTemplates,
  type CollectionTemplate,
  type CollectionStatus,
} from '../collection-templates'

/**
 * Section-Specific Collection Templates Interface
 *
 * Shows collections filtered by admin group (section).
 * Used for Content, Collections, Shop, Taxonomy manager pages.
 */
interface SectionCollectionTemplatesProps {
  /** Filter collections by admin group */
  section: 'Content' | 'Collections' | 'Shop' | 'Taxonomy'
  /** Optional title override */
  title?: string
  /** Optional description override */
  description?: string
}

export const SectionCollectionTemplates: React.FC<SectionCollectionTemplatesProps> = ({
  section,
  title,
  description,
}) => {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [seeding, setSeeding] = useState<string | null>(null)
  const [installedSlugs, setInstalledSlugs] = useState<string[]>([])
  const [visibilitySettings, setVisibilitySettings] = useState<Record<string, boolean>>({})
  const [toggling, setToggling] = useState<string | null>(null)
  const [seedStatus, setSeedStatus] = useState<Record<string, { count: number; hasSeedData: boolean; hasSeedMedia: boolean }>>({})
  const [uninstalledSlugs, setUninstalledSlugs] = useState<string[]>([])
  const [uninstalling, setUninstalling] = useState<string | null>(null)

  useEffect(() => {
    fetchInstalledCollections()
    fetchVisibilitySettings()
    fetchSeedStatus()
    fetchCollectionOverrides()
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

  const fetchSeedStatus = async () => {
    try {
      const response = await fetch('/api/seed/collections')
      if (response.ok) {
        const data = await response.json()
        const status: Record<string, { count: number; hasSeedData: boolean; hasSeedMedia: boolean }> = {}

        ;(data.collections || []).forEach((collection: any) => {
          if (collection?.slug) {
            status[collection.slug] = {
              count: collection.count || 0,
              hasSeedData: Boolean(collection.hasSeedData),
              hasSeedMedia: Boolean(collection.hasSeedMedia),
            }
          }
        })

        setSeedStatus(status)
      }
    } catch (error) {
      console.error('Failed to fetch seed status:', error)
    }
  }

  const fetchCollectionOverrides = async () => {
    try {
      const response = await fetch('/api/globals/navigation-settings')
      if (response.ok) {
        const data = await response.json()
        const overrides = Array.isArray(data?.collections) ? data.collections : []
        const uninstalled = overrides
          .filter((item: any) => item?.uninstalled === true && typeof item?.slug === 'string')
          .map((item: any) => item.slug)

        setUninstalledSlugs(uninstalled)
      }
    } catch (error) {
      console.error('Failed to fetch collection overrides:', error)
    }
  }

  const handleToggleVisibility = async (slug: string, currentlyVisible: boolean) => {
    setToggling(slug)
    setMessage(null)

    try {
      // Get current navigation settings
      const navResponse = await fetch('/api/globals/navigation-settings')
      if (!navResponse.ok) {
        throw new Error('Failed to fetch navigation settings')
      }
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

      // Update navigation settings using POST method (Payload globals use POST for updates)
      const updateResponse = await fetch('/api/globals/navigation-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collections: updatedCollections,
        }),
      })

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to update navigation settings')
      }

      // Update local state
      setVisibilitySettings((prev) => ({
        ...prev,
        [slug]: !currentlyVisible,
      }))
      setMessage({
        type: 'success',
        text: `${slug} ${!currentlyVisible ? 'shown in' : 'hidden from'} navigation menu`,
      })

      // Broadcast cache invalidation to all tabs/windows
      try {
        const channel = new BroadcastChannel('nav-cache-invalidate')
        channel.postMessage({ type: 'invalidate' })
        channel.close()
      } catch (error) {
        // BroadcastChannel not supported, fallback to clearing cache
        sessionStorage.removeItem('nav-data')
        sessionStorage.removeItem('nav-cache-time')
      }
    } catch (error) {
      console.error('Failed to toggle visibility:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to update visibility. Please try again.',
      })
    } finally {
      setToggling(null)
    }
  }



  const handleSeedData = async (slug: string) => {
    setSeeding(slug)
    setMessage(null)

    try {
      const response = await fetch('/api/seed/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'seed',
          slug,
          includeMedia: false,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully seeded ${slug} with sample data`,
        })
        // Refresh installed collections and seed status to update counts
        fetchInstalledCollections()
        fetchSeedStatus()
      } else {
        throw new Error(data.message || 'Failed to seed data')
      }
    } catch (error) {
      console.error('Failed to seed data:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to seed data. Please try again.',
      })
    } finally {
      setSeeding(null)
    }
  }

  const handleClearSeedData = async (slug: string) => {
    setSeeding(slug)
    setMessage(null)

    try {
      const response = await fetch('/api/seed/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'clear',
          slug,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully cleared ${slug}`,
        })
        fetchInstalledCollections()
        fetchSeedStatus()
      } else {
        throw new Error(data.message || 'Failed to clear seed data')
      }
    } catch (error) {
      console.error('Failed to clear seed data:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to clear seed data. Please try again.',
      })
    } finally {
      setSeeding(null)
    }
  }

  const handleUninstallCollection = async (slug: string) => {
    if (!window.confirm('Uninstalling will delete all items and hide this collection from navigation. Continue?')) {
      return
    }

    setUninstalling(slug)
    setMessage(null)

    try {
      const response = await fetch('/api/collection-templates/uninstall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully uninstalled ${slug}`,
        })
        fetchInstalledCollections()
        fetchSeedStatus()
        fetchCollectionOverrides()
      } else {
        throw new Error(data.message || 'Failed to uninstall collection')
      }
    } catch (error) {
      console.error('Failed to uninstall collection:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to uninstall collection. Please try again.',
      })
    } finally {
      setUninstalling(null)
    }
  }

  // Filter templates by section
  const sectionTemplates = allTemplates.filter((template) => template.adminGroup === section)

  // Categorize templates
  const coreTemplates = sectionTemplates.filter((t) => t.status === 'core')
  const installedTemplates = sectionTemplates.filter(
    (t) =>
      t.status !== 'core' &&
      (t.status === 'installed' || installedSlugs.includes(t.defaultSlug)) &&
      !uninstalledSlugs.includes(t.defaultSlug)
  )

  const renderTemplateCard = (template: CollectionTemplate) => {
    const isCore = template.status === 'core'
    const isInstalled = installedSlugs.includes(template.defaultSlug)
    const isVisible = visibilitySettings[template.defaultSlug] !== false
    const isTogglingThis = toggling === template.defaultSlug
    const isSeedingThis = seeding === template.defaultSlug
    const isUninstallingThis = uninstalling === template.defaultSlug
    const status = seedStatus[template.defaultSlug]
    const hasSeedData = template.hasSeedData && status?.hasSeedData !== false
    const seededCount = status?.count || 0
    const isSeeded = seededCount > 0

    return (
      <div
        key={template.id}
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '8px',
          padding: '20px',
          background: 'var(--theme-elevation-50)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#333' }}>
            {template.name}
          </h4>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '4px',
                background: isCore ? '#3b82f6' : '#10b981',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {isCore ? 'Core' : 'Installed'}
            </span>
            <span
              style={{
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '4px',
                background: isVisible ? '#10b981' : '#6b7280',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {isVisible ? '👁️ Visible' : '🚫 Hidden'}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px', lineHeight: '1.5' }}>
          {template.description}
        </p>

        <div style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>
          <span style={{ fontWeight: 500 }}>Slug: </span>
          <code style={{ background: 'var(--theme-elevation-100)', padding: '2px 6px', borderRadius: '3px' }}>
            {template.defaultSlug}
          </code>
        </div>

        {template.hasSeedData && (
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
            {hasSeedData
              ? isSeeded
                ? `Seeded (${seededCount} items)`
                : `Sample data available (${template.seedDataCount || 0} items)`
              : 'Seed data not configured'}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {template.hasSeedData && (
            <button
              onClick={() => handleSeedData(template.defaultSlug)}
              disabled={isSeedingThis}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: 'none',
                background: '#3b82f6',
                color: 'white',
                cursor: isSeedingThis ? 'not-allowed' : 'pointer',
                opacity: isSeedingThis ? 0.6 : 1,
              }}
            >
              {isSeedingThis ? 'Seeding...' : 'Seed Data'}
            </button>
          )}

          {template.hasSeedData && isSeeded && (
            <button
              onClick={() => handleClearSeedData(template.defaultSlug)}
              disabled={isSeedingThis}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: '1px solid #fca5a5',
                background: '#fee2e2',
                color: '#991b1b',
                cursor: isSeedingThis ? 'not-allowed' : 'pointer',
                opacity: isSeedingThis ? 0.6 : 1,
              }}
            >
              {isSeedingThis ? 'Clearing...' : 'Clear Seed Data'}
            </button>
          )}

          {!isCore && (
            <button
              onClick={() => handleToggleVisibility(template.defaultSlug, isVisible)}
              disabled={isTogglingThis}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: '1px solid var(--theme-elevation-200)',
                background: 'var(--theme-elevation-0)',
                color: '#666',
                cursor: isTogglingThis ? 'not-allowed' : 'pointer',
                opacity: isTogglingThis ? 0.6 : 1,
              }}
            >
              {isTogglingThis ? 'Updating...' : isVisible ? '🚫 Hide from Menu' : '👁️ Show in Menu'}
            </button>
          )}

          {!isCore && isInstalled && (
            <button
              onClick={() => handleUninstallCollection(template.defaultSlug)}
              disabled={isUninstallingThis}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: '1px solid #f87171',
                background: '#fee2e2',
                color: '#b91c1c',
                cursor: isUninstallingThis ? 'not-allowed' : 'pointer',
                opacity: isUninstallingThis ? 0.6 : 1,
              }}
            >
              {isUninstallingThis ? 'Uninstalling...' : 'Uninstall'}
            </button>
          )}

          <a
            href={`/admin/collections/${template.defaultSlug}`}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '6px',
              border: '1px solid var(--theme-elevation-200)',
              background: 'var(--theme-elevation-0)',
              color: '#3b82f6',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            View Collection
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="ra-section-collections">
      {message && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            background: message.type === 'success' ? '#d1fae5' : '#fee2e2',
            color: message.type === 'success' ? '#065f46' : '#991b1b',
            fontSize: '14px',
          }}
        >
          {message.text}
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
          {description ||
            `Manage your ${section.toLowerCase()} collections. Enable or disable collections to show or hide them in the navigation menu. Seed collections with sample data to get started quickly.`}
        </p>
      </div>

      {coreTemplates.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
            Core Collections
          </h3>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
            These collections are always enabled and visible in the navigation menu.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {coreTemplates.map(renderTemplateCard)}
          </div>
        </div>
      )}

      {installedTemplates.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
            Installed Collections
          </h3>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
            These collections are currently active. You can enable/disable them in the navigation menu and seed them with sample data.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {installedTemplates.map(renderTemplateCard)}
          </div>
        </div>
      )}

      {coreTemplates.length === 0 && installedTemplates.length === 0 && (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            background: 'var(--theme-elevation-50)',
            borderRadius: '8px',
            border: '1px dashed var(--theme-elevation-200)',
          }}
        >
          <p style={{ fontSize: '14px', color: '#666' }}>
            No collections found in the {section} section.
          </p>
        </div>
      )}
    </div>
  )
}
