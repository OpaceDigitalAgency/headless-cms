'use client'

import React, { useState, useEffect } from 'react'
import {
  allTemplates,
  type CollectionTemplate,
  type CollectionStatus,
} from '../collection-templates'
import { SeedItemsList } from './SeedItemsList'

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
  const [seedingItems, setSeedingItems] = useState<Set<string>>(new Set())
  const [installedSlugs, setInstalledSlugs] = useState<string[]>([])
  const [visibilitySettings, setVisibilitySettings] = useState<Record<string, boolean>>({})
  const [toggling, setToggling] = useState<string | null>(null)
  const [seedStatus, setSeedStatus] = useState<Record<string, { count: number; hasSeedData: boolean; hasSeedMedia: boolean }>>({})
  const [uninstalledSlugs, setUninstalledSlugs] = useState<string[]>([])
  const [uninstalling, setUninstalling] = useState<string | null>(null)
  const [reinstalling, setReinstalling] = useState<string | null>(null)
  const [contentTypes, setContentTypes] = useState<Array<{ id: string; slug: string }>>([])
  const [enabling, setEnabling] = useState<string | null>(null)
  const [expandedSeedList, setExpandedSeedList] = useState<string | null>(null)

  useEffect(() => {
    fetchInstalledCollections()
    fetchVisibilitySettings()
    fetchSeedStatus()
    fetchCollectionOverrides()
    fetchContentTypes()
  }, [])

  useEffect(() => {
    if (contentTypes.length) {
      fetchContentTypeSeedStatus()
    }
  }, [contentTypes])

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
      // Fetch from navigation-settings global to get the actual saved state
      const response = await fetch('/api/globals/navigation-settings')
      if (response.ok) {
        const data = await response.json()
        const settings: Record<string, boolean> = {}

        // Extract enabled state from saved collections
        const collections = Array.isArray(data.collections) ? data.collections : []
        collections.forEach((item: any) => {
          if (item.slug && typeof item.enabled === 'boolean') {
            settings[item.slug] = item.enabled
          }
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

  const fetchContentTypes = async () => {
    try {
      const response = await fetch('/api/collection-templates/content-types')
      if (response.ok) {
        const data = await response.json()
        const docs = Array.isArray(data?.docs) ? data.docs : []
        setContentTypes(docs.map((doc: any) => ({ id: doc.id, slug: doc.slug })))
      }
    } catch (error) {
      console.error('Failed to fetch content types:', error)
      setContentTypes([])
    }
  }

  const fetchContentTypeSeedStatus = async () => {
    const contentTypeTemplates = allTemplates.filter((template) => template.contentTypeTemplate)
    if (!contentTypeTemplates.length) return

    try {
      const updates: Record<string, { count: number; hasSeedData: boolean; hasSeedMedia: boolean }> = {}
      await Promise.all(
        contentTypeTemplates.map(async (template) => {
          const contentType = contentTypes.find((type) => type.slug === template.defaultSlug)
          if (!contentType) return

          const response = await fetch(`/api/custom-items?where[contentType][equals]=${contentType.id}&limit=0`)
          if (!response.ok) return
          const data = await response.json()
          updates[template.defaultSlug] = {
            count: data.totalDocs || 0,
            hasSeedData: template.hasSeedData,
            hasSeedMedia: false,
          }
        })
      )

      if (Object.keys(updates).length > 0) {
        setSeedStatus((prev) => ({ ...prev, ...updates }))
      }
    } catch (error) {
      console.error('Failed to fetch content type seed status:', error)
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

  const handleSeedItem = async (collectionSlug: string, itemSlug: string) => {
    setSeedingItems(prev => new Set([...prev, itemSlug]))
    setMessage(null)

    try {
      const response = await fetch('/api/seed/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionSlug,
          itemSlug,
          includeMedia: false,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully seeded ${itemSlug}`,
        })
        fetchSeedStatus()
      } else {
        throw new Error(data.message || 'Failed to seed item')
      }
    } catch (error) {
      console.error('Failed to seed item:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to seed item. Please try again.',
      })
    } finally {
      setSeedingItems(prev => {
        const updated = new Set(prev)
        updated.delete(itemSlug)
        return updated
      })
    }
  }

  const handleSeedAllItems = async (collectionSlug: string) => {
    setSeeding(collectionSlug)
    setMessage(null)

    try {
      const response = await fetch('/api/seed/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'seed',
          slug: collectionSlug,
          includeMedia: false,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully seeded all items in ${collectionSlug}`,
        })
        fetchInstalledCollections()
        fetchSeedStatus()
      } else {
        throw new Error(data.message || 'Failed to seed all items')
      }
    } catch (error) {
      console.error('Failed to seed all items:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to seed all items. Please try again.',
      })
    } finally {
      setSeeding(null)
    }
  }

  const handleEnableContentType = async (template: CollectionTemplate) => {
    setEnabling(template.id)
    setMessage(null)

    try {
      const response = await fetch('/api/collection-templates/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template.id,
          customName: template.defaultPlural,
          slug: template.defaultSlug,
          singular: template.defaultSingular,
          plural: template.defaultPlural,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Enabled ${template.name}`,
        })
        fetchContentTypes()
        fetchInstalledCollections()
        fetchSeedStatus()
      } else {
        throw new Error(data.message || 'Failed to enable content type')
      }
    } catch (error) {
      console.error('Failed to enable content type:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to enable content type. Please try again.',
      })
    } finally {
      setEnabling(null)
    }
  }

  const handleSeedContentTypeData = async (template: CollectionTemplate) => {
    setSeeding(template.defaultSlug)
    setMessage(null)

    try {
      const response = await fetch('/api/seed/content-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template.id,
          action: 'seed',
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully seeded ${template.name}`,
        })
        fetchContentTypeSeedStatus()
      } else {
        throw new Error(data.message || 'Failed to seed content type')
      }
    } catch (error) {
      console.error('Failed to seed content type:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to seed content type. Please try again.',
      })
    } finally {
      setSeeding(null)
    }
  }

  const handleClearContentTypeSeedData = async (template: CollectionTemplate) => {
    setSeeding(template.defaultSlug)
    setMessage(null)

    try {
      const response = await fetch('/api/seed/content-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template.id,
          action: 'clear',
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully cleared ${template.name}`,
        })
        fetchContentTypeSeedStatus()
      } else {
        throw new Error(data.message || 'Failed to clear content type seed data')
      }
    } catch (error) {
      console.error('Failed to clear content type seed data:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to clear seed data. Please try again.',
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

  const handleReinstallCollection = async (slug: string) => {
    setReinstalling(slug)
    setMessage(null)

    try {
      const response = await fetch('/api/collection-templates/reinstall', {
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
          text: data.message || `Successfully reinstalled ${slug}`,
        })
        fetchInstalledCollections()
        fetchSeedStatus()
        fetchCollectionOverrides()
      } else {
        throw new Error(data.message || 'Failed to reinstall collection')
      }
    } catch (error) {
      console.error('Failed to reinstall collection:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to reinstall collection. Please try again.',
      })
    } finally {
      setReinstalling(null)
    }
  }

  const contentTypeBySlug = new Map(contentTypes.map((type) => [type.slug, type]))

  // Filter templates by section
  const sectionTemplates = allTemplates.filter((template) => template.adminGroup === section)
  const contentTypeTemplates = sectionTemplates.filter((template) => template.contentTypeTemplate)
  const collectionTemplates = sectionTemplates.filter((template) => !template.contentTypeTemplate)

  // Categorize templates
  const coreTemplates = collectionTemplates.filter((t) => t.status === 'core')
  const installedTemplates = collectionTemplates.filter(
    (t) =>
      t.status !== 'core' &&
      (t.status === 'installed' || installedSlugs.includes(t.defaultSlug)) &&
      !uninstalledSlugs.includes(t.defaultSlug)
  )
  const uninstalledTemplates = collectionTemplates.filter(
    (t) => t.status !== 'core' && uninstalledSlugs.includes(t.defaultSlug)
  )

  const enabledContentTypeTemplates = contentTypeTemplates.filter((template) =>
    contentTypeBySlug.has(template.defaultSlug)
  )
  const availableContentTypeTemplates = contentTypeTemplates.filter((template) =>
    !contentTypeBySlug.has(template.defaultSlug)
  )

  const renderTemplateCard = (template: CollectionTemplate, options?: { uninstalled?: boolean }) => {
    const isUninstalled = options?.uninstalled === true
    const isCore = template.status === 'core'
    const isInstalled = installedSlugs.includes(template.defaultSlug)
    // Check actual saved state from navigation-settings global
    // undefined = not explicitly set (use default: true for installed collections)
    // true = explicitly enabled
    // false = explicitly disabled
    const savedState = visibilitySettings[template.defaultSlug]
    const isVisible = savedState !== undefined ? savedState : isInstalled
    const isTogglingThis = toggling === template.defaultSlug
    const isSeedingThis = seeding === template.defaultSlug
    const isUninstallingThis = uninstalling === template.defaultSlug
    const isReinstallingThis = reinstalling === template.defaultSlug
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
                background: isCore ? '#3b82f6' : isUninstalled ? '#9ca3af' : '#10b981',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {isCore ? 'Core' : isUninstalled ? 'Uninstalled' : 'Installed'}
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
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              {hasSeedData
                ? isSeeded
                  ? `Seeded (${seededCount} items)`
                  : `Sample data available (${template.seedDataCount || 0} items)`
                : 'Seed data not configured'}
            </div>
            {!isSeeded && (
              <SeedItemsList
                template={template}
                onSeedItem={(itemSlug) => handleSeedItem(template.defaultSlug, itemSlug)}
                onSeedAll={() => handleSeedAllItems(template.defaultSlug)}
                isSeeding={isSeedingThis}
                seedingItems={seedingItems}
                expanded={expandedSeedList === template.defaultSlug}
                onExpandedChange={(expanded) => setExpandedSeedList(expanded ? template.defaultSlug : null)}
              />
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {template.hasSeedData && !isSeeded && (
            <button
              onClick={() => setExpandedSeedList(expandedSeedList === template.defaultSlug ? null : template.defaultSlug)}
              disabled={isSeedingThis || isUninstalled}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: 'none',
                background: isUninstalled ? '#cbd5f5' : '#3b82f6',
                color: isUninstalled ? '#475569' : 'white',
                cursor: isSeedingThis || isUninstalled ? 'not-allowed' : 'pointer',
                opacity: isSeedingThis || isUninstalled ? 0.6 : 1,
              }}
            >
              {isSeedingThis ? 'Seeding...' : isUninstalled ? 'Reinstall to Seed' : `Seed sample ${template.defaultPlural?.toLowerCase() || 'items'}`}
            </button>
          )}

          {template.hasSeedData && isSeeded && (
            <button
              onClick={() => handleClearSeedData(template.defaultSlug)}
              disabled={isSeedingThis || isUninstalled}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: '1px solid #fca5a5',
                background: '#fee2e2',
                color: '#991b1b',
                cursor: isSeedingThis || isUninstalled ? 'not-allowed' : 'pointer',
                opacity: isSeedingThis || isUninstalled ? 0.6 : 1,
              }}
            >
              {isSeedingThis ? 'Clearing...' : 'Clear Seed Data'}
            </button>
          )}

          {!isCore && !isUninstalled && (
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

          {!isCore && isInstalled && !isUninstalled && (
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

          {!isCore && isUninstalled && (
            <button
              onClick={() => handleReinstallCollection(template.defaultSlug)}
              disabled={isReinstallingThis}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: '1px solid #86efac',
                background: '#dcfce7',
                color: '#166534',
                cursor: isReinstallingThis ? 'not-allowed' : 'pointer',
                opacity: isReinstallingThis ? 0.6 : 1,
              }}
            >
              {isReinstallingThis ? 'Reinstalling...' : 'Reinstall'}
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

  const renderContentTypeCard = (template: CollectionTemplate) => {
    const contentType = contentTypeBySlug.get(template.defaultSlug)
    const isEnabled = Boolean(contentType)
    const isEnablingThis = enabling === template.id
    const isSeedingThis = seeding === template.defaultSlug
    const status = seedStatus[template.defaultSlug]
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
                background: isEnabled ? '#10b981' : '#9ca3af',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {isEnabled ? 'Enabled' : 'Available'}
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

        {template.hasSeedData && isEnabled && (
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
            {isSeeded
              ? `Seeded (${seededCount} items)`
              : `Sample data available (${template.seedDataCount || 0} items)`}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {!isEnabled && (
            <button
              onClick={() => handleEnableContentType(template)}
              disabled={isEnablingThis}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: 'none',
                background: '#10b981',
                color: 'white',
                cursor: isEnablingThis ? 'not-allowed' : 'pointer',
                opacity: isEnablingThis ? 0.6 : 1,
              }}
            >
              {isEnablingThis ? 'Enabling...' : 'Enable'}
            </button>
          )}

          {template.hasSeedData && isEnabled && (
            <button
              onClick={() => handleSeedContentTypeData(template)}
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

          {template.hasSeedData && isEnabled && isSeeded && (
            <button
              onClick={() => handleClearContentTypeSeedData(template)}
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

          {isEnabled && contentType && (
            <a
              href={`/admin/collections/content-types/${contentType.id}`}
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
              View Content Type
            </a>
          )}
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

      {enabledContentTypeTemplates.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
            Enabled Content Types
          </h3>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
            Custom content types enabled from templates. Seed data is optional.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {enabledContentTypeTemplates.map(renderContentTypeCard)}
          </div>
        </div>
      )}

      {availableContentTypeTemplates.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
            Available Content Types
          </h3>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
            Optional content types based on Archive Items. Enable what you need and seed sample data.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {availableContentTypeTemplates.map(renderContentTypeCard)}
          </div>
        </div>
      )}

      {uninstalledTemplates.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
            Uninstalled Collections
          </h3>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
            These collections were uninstalled. Reinstall to restore access and seed sample data.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {uninstalledTemplates.map((template) => renderTemplateCard(template, { uninstalled: true }))}
          </div>
        </div>
      )}

      {coreTemplates.length === 0 &&
        installedTemplates.length === 0 &&
        enabledContentTypeTemplates.length === 0 &&
        availableContentTypeTemplates.length === 0 && (
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
