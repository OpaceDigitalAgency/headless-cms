'use client'

import React, { useState, useEffect } from 'react'
import {
  allTemplates,
  type CollectionTemplate,
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

interface CustomCollection {
  id: string
  slug: string
  name: string
  singularLabel?: string
  pluralLabel?: string
  template?: string
  templateId?: string
  icon?: string
  description?: string
  hasArchive?: boolean
  archiveSlug?: string
  uninstalled?: boolean
}

export const SectionCollectionTemplates: React.FC<SectionCollectionTemplatesProps> = ({
  section,
  title,
  description,
}) => {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [seeding, setSeeding] = useState<string | null>(null)
  const [seedingItems, setSeedingItems] = useState<Set<string>>(new Set())
  const [seededItemsByCollection, setSeededItemsByCollection] = useState<Record<string, Set<string>>>({})
  const [installedSlugs, setInstalledSlugs] = useState<string[]>([])
  const [visibilitySettings, setVisibilitySettings] = useState<Record<string, boolean>>({})
  const [toggling, setToggling] = useState<string | null>(null)
  const [seedStatus, setSeedStatus] = useState<Record<string, { count: number; hasSeedData: boolean; hasSeedMedia: boolean }>>({})
  const [uninstalledSlugs, setUninstalledSlugs] = useState<string[]>([])
  const [uninstalling, setUninstalling] = useState<string | null>(null)
  const [reinstalling, setReinstalling] = useState<string | null>(null)
  const [contentTypes, setContentTypes] = useState<CustomCollection[]>([])
  const [customCollectionCounts, setCustomCollectionCounts] = useState<Record<string, number>>({})
  const [expandedSeedList, setExpandedSeedList] = useState<string | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [createMode, setCreateMode] = useState<'base' | 'template' | 'clone'>('base')
  const [createTemplateId, setCreateTemplateId] = useState<string | null>(null)
  const [createSourceContentTypeId, setCreateSourceContentTypeId] = useState<string | null>(null)
  const [createBaseTemplate, setCreateBaseTemplate] = useState('archive-item')
  const [createName, setCreateName] = useState('')
  const [createSlug, setCreateSlug] = useState('')
  const [createHasArchive, setCreateHasArchive] = useState(true)
  const [createSlugDirty, setCreateSlugDirty] = useState(false)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchInstalledCollections()
    fetchVisibilitySettings()
    fetchSeedStatus()
    fetchCollectionOverrides()
    fetchContentTypes()
  }, [])

  useEffect(() => {
    if (contentTypes.length) {
      fetchCustomCollectionCounts()
    } else {
      setCustomCollectionCounts({})
    }
  }, [contentTypes])

  const invalidateNavCache = () => {
    try {
      const channel = new BroadcastChannel('nav-cache-invalidate')
      channel.postMessage({ type: 'invalidate' })
      channel.close()
    } catch (error) {
      sessionStorage.removeItem('nav-data')
      sessionStorage.removeItem('nav-cache-time')
    }
  }

  const getSeedItemSlugs = (template: CollectionTemplate) =>
    (template.seedItems || []).map((item) => item.slug).filter(Boolean)

  const updateSeededItemsForKey = (key: string, slugs: string[]) => {
    setSeededItemsByCollection((prev) => ({
      ...prev,
      [key]: new Set(slugs),
    }))
  }

  const markSeededItemForKey = (key: string, slug: string) => {
    setSeededItemsByCollection((prev) => {
      const next = new Set(prev[key] || [])
      next.add(slug)
      return {
        ...prev,
        [key]: next,
      }
    })
  }

  const clearSeededItemsForKey = (key: string) => {
    setSeededItemsByCollection((prev) => ({
      ...prev,
      [key]: new Set(),
    }))
  }

  const fetchSeededItemsForKey = async (
    key: string,
    template: CollectionTemplate,
    options?: { contentTypeId?: string; collectionSlug?: string }
  ) => {
    const seedItemSlugs = getSeedItemSlugs(template)
    if (!seedItemSlugs.length) return

    const collectionSlug = options?.collectionSlug || template.defaultSlug
    const contentTypeId = options?.contentTypeId
    const seeded = new Set<string>()

    await Promise.all(
      seedItemSlugs.map(async (slug) => {
        try {
          const params = new URLSearchParams()
          params.set('where[slug][equals]', slug)
          params.set('limit', '1')
          params.set('depth', '0')
          if (contentTypeId) {
            params.set('where[contentType][equals]', contentTypeId)
          }
          const response = await fetch(`/api/${collectionSlug}?${params.toString()}`)
          if (!response.ok) return
          const data = await response.json()
          if (data?.totalDocs > 0) {
            seeded.add(slug)
          }
        } catch (error) {
          console.error('Failed to check seeded item:', error)
        }
      })
    )

    updateSeededItemsForKey(key, Array.from(seeded))
  }

  const toggleSeedList = (
    key: string,
    template: CollectionTemplate,
    options?: { contentTypeId?: string; collectionSlug?: string }
  ) => {
    const next = expandedSeedList === key ? null : key
    setExpandedSeedList(next)
    if (next) {
      void fetchSeededItemsForKey(key, template, options)
    }
  }

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

          ; (data.collections || []).forEach((collection: any) => {
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
        setContentTypes(
          docs.map((doc: any) => ({
            id: doc.id || doc._id,
            slug: doc.slug,
            name: doc.name,
            singularLabel: doc.singularLabel,
            pluralLabel: doc.pluralLabel,
            template: doc.template,
            templateId: doc.templateId,
            icon: doc.icon,
            description: doc.description,
            hasArchive: doc.hasArchive,
            archiveSlug: doc.archiveSlug,
            uninstalled: doc.uninstalled,
          }))
        )
      }
    } catch (error) {
      console.error('Failed to fetch content types:', error)
      setContentTypes([])
    }
  }

  const fetchCustomCollectionCounts = async () => {
    try {
      const updates: Record<string, number> = {}
      await Promise.all(
        contentTypes.map(async (contentType) => {
          const response = await fetch(`/api/custom-items?where[contentType][equals]=${contentType.id}&limit=0`)
          if (!response.ok) return
          const data = await response.json()
          updates[contentType.id] = data.totalDocs || 0
        })
      )

      setCustomCollectionCounts(updates)
    } catch (error) {
      console.error('Failed to fetch custom collection counts:', error)
    }
  }

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const resetCreateModal = () => {
    setCreateMode('base')
    setCreateTemplateId(null)
    setCreateSourceContentTypeId(null)
    setCreateBaseTemplate('archive-item')
    setCreateName('')
    setCreateSlug('')
    setCreateHasArchive(true)
    setCreateSlugDirty(false)
  }

  const openCreateModal = (options?: {
    mode?: 'base' | 'template' | 'clone'
    templateId?: string | null
    sourceContentTypeId?: string | null
    baseTemplate?: string
    name?: string
    slug?: string
    hasArchive?: boolean
  }) => {
    const baseTemplate = options?.baseTemplate || 'archive-item'
    const name = options?.name || ''
    const slug = options?.slug || ''

    setCreateMode(options?.mode || 'base')
    setCreateTemplateId(options?.templateId || null)
    setCreateSourceContentTypeId(options?.sourceContentTypeId || null)
    setCreateBaseTemplate(baseTemplate)
    setCreateName(name)
    setCreateSlug(slug)
    setCreateHasArchive(options?.hasArchive ?? true)
    setCreateSlugDirty(false)
    setCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setCreateModalOpen(false)
    resetCreateModal()
  }

  const handleCreateCustomCollection = async () => {
    const trimmedName = createName.trim()
    const derivedSlug = createSlug.trim() || slugify(trimmedName)

    if (!trimmedName) {
      setMessage({ type: 'error', text: 'Name is required to create a custom collection.' })
      return
    }

    if (!derivedSlug) {
      setMessage({ type: 'error', text: 'Slug is required to create a custom collection.' })
      return
    }

    setCreating(true)
    setMessage(null)

    const payload: Record<string, any> = {
      name: trimmedName,
      slug: derivedSlug,
      hasArchive: createHasArchive,
    }

    if (createMode === 'template' && createTemplateId) {
      payload.templateId = createTemplateId
    } else if (createMode === 'clone' && createSourceContentTypeId) {
      payload.sourceContentTypeId = createSourceContentTypeId
    } else {
      payload.baseTemplate = createBaseTemplate
    }

    try {
      const response = await fetch('/api/collection-templates/create-custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Created ${trimmedName}`,
        })
        closeCreateModal()
        fetchContentTypes()
        fetchInstalledCollections()
        fetchSeedStatus()
        invalidateNavCache()
      } else {
        throw new Error(data.message || 'Failed to create custom collection')
      }
    } catch (error) {
      console.error('Failed to create custom collection:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to create custom collection. Please try again.',
      })
    } finally {
      setCreating(false)
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
      const nextEnabled = !currentlyVisible

      let updatedCollections
      if (existingIndex >= 0) {
        // Update existing setting
        updatedCollections = [...currentCollections]
        updatedCollections[existingIndex] = {
          ...updatedCollections[existingIndex],
          enabled: nextEnabled,
          uninstalled: nextEnabled ? false : updatedCollections[existingIndex]?.uninstalled,
        }
      } else {
        // Add new setting
        updatedCollections = [
          ...currentCollections,
          {
            slug,
            enabled: nextEnabled,
            uninstalled: false,
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
        [slug]: nextEnabled,
      }))
      setMessage({
        type: 'success',
        text: `${slug} ${nextEnabled ? 'shown in' : 'hidden from'} navigation menu`,
      })

      // Broadcast cache invalidation to all tabs/windows
      invalidateNavCache()
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
        markSeededItemForKey(collectionSlug, itemSlug)
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
        const template = allTemplates.find((item) => item.defaultSlug === collectionSlug)
        if (template) {
          updateSeededItemsForKey(collectionSlug, getSeedItemSlugs(template))
        }
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

  const handleEnableContentType = (template: CollectionTemplate) => {
    openCreateModal({
      mode: 'template',
      templateId: template.id,
      baseTemplate: template.contentTypeTemplate?.template || 'archive-item',
      name: template.defaultPlural,
      slug: template.defaultSlug,
      hasArchive: template.contentTypeTemplate?.hasArchive ?? true,
    })
  }

  const handleSeedContentTypeData = async (template: CollectionTemplate, contentTypeId?: string) => {
    setSeeding(contentTypeId || template.defaultSlug)
    setMessage(null)
    const seededKey = contentTypeId ? `custom:${contentTypeId}` : template.defaultSlug

    try {
      const response = await fetch('/api/seed/content-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template.id,
          contentTypeId,
          action: 'seed',
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully seeded ${template.name}`,
        })
        fetchSeedStatus()
        fetchCustomCollectionCounts()
        updateSeededItemsForKey(seededKey, getSeedItemSlugs(template))
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

  const handleSeedContentTypeItem = async (template: CollectionTemplate, contentTypeId: string, itemSlug: string) => {
    setSeedingItems(prev => new Set([...prev, itemSlug]))
    setMessage(null)

    try {
      const response = await fetch('/api/seed/content-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template.id,
          contentTypeId,
          action: 'seed',
          itemSlug,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully seeded ${template.name}`,
        })
        fetchSeedStatus()
        fetchCustomCollectionCounts()
        markSeededItemForKey(`custom:${contentTypeId}`, itemSlug)
      } else {
        throw new Error(data.message || 'Failed to seed item')
      }
    } catch (error) {
      console.error('Failed to seed content type item:', error)
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

  const handleClearContentTypeSeedData = async (template: CollectionTemplate, contentTypeId?: string) => {
    setSeeding(contentTypeId || template.defaultSlug)
    setMessage(null)
    const seededKey = contentTypeId ? `custom:${contentTypeId}` : template.defaultSlug

    try {
      const response = await fetch('/api/seed/content-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: template.id,
          contentTypeId,
          action: 'clear',
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully cleared ${template.name}`,
        })
        fetchSeedStatus()
        fetchCustomCollectionCounts()
        clearSeededItemsForKey(seededKey)
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
        clearSeededItemsForKey(slug)
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
        invalidateNavCache()
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
        invalidateNavCache()
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

  const handleUninstallCustomCollection = async (contentType: CustomCollection) => {
    if (!contentType.id) {
      setMessage({
        type: 'error',
        text: 'Missing required field: id',
      })
      return
    }

    if (!window.confirm(`Uninstalling will delete all items in ${contentType.name}. Continue?`)) {
      return
    }

    setUninstalling(contentType.id)
    setMessage(null)

    try {
      const response = await fetch('/api/collection-templates/custom/uninstall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: contentType.id,
          slug: contentType.slug,
          deleteItems: true,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully uninstalled ${contentType.name}`,
        })
        fetchContentTypes()
        fetchCustomCollectionCounts()
        invalidateNavCache()
      } else {
        throw new Error(data.message || 'Failed to uninstall custom collection')
      }
    } catch (error) {
      console.error('Failed to uninstall custom collection:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to uninstall custom collection. Please try again.',
      })
    } finally {
      setUninstalling(null)
    }
  }

  const handleReinstallCustomCollection = async (contentType: CustomCollection) => {
    if (!contentType.id) {
      setMessage({
        type: 'error',
        text: 'Missing required field: id',
      })
      return
    }

    setReinstalling(contentType.id)
    setMessage(null)

    try {
      const response = await fetch('/api/collection-templates/custom/reinstall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: contentType.id, slug: contentType.slug }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: data.message || `Successfully reinstalled ${contentType.name}`,
        })
        fetchContentTypes()
        invalidateNavCache()
      } else {
        throw new Error(data.message || 'Failed to reinstall custom collection')
      }
    } catch (error) {
      console.error('Failed to reinstall custom collection:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to reinstall custom collection. Please try again.',
      })
    } finally {
      setReinstalling(null)
    }
  }

  const templateById = new Map(allTemplates.map((template) => [template.id, template]))

  // Filter templates by section
  const sectionTemplates = allTemplates.filter((template) => template.adminGroup === section)
  const contentTypeTemplates = sectionTemplates.filter((template) => template.contentTypeTemplate)
  const collectionTemplates = sectionTemplates.filter((template) => !template.contentTypeTemplate)

  const baseTemplateOptions = [
    { value: 'archive-item', label: 'Archive Items' },
    { value: 'event', label: 'Events' },
    { value: 'person', label: 'People' },
    { value: 'place', label: 'Places' },
    { value: 'product', label: 'Products' },
    { value: 'article', label: 'Article' },
  ]

  const cloneableBaseTemplates: Record<string, { baseTemplate: string; label: string }> = {
    'archive-items': { baseTemplate: 'archive-item', label: 'Archive Items' },
    events: { baseTemplate: 'event', label: 'Events' },
    people: { baseTemplate: 'person', label: 'People' },
    places: { baseTemplate: 'place', label: 'Places' },
  }

  const installedCustomCollections = contentTypes.filter((contentType) => !contentType.uninstalled)
  const uninstalledCustomCollections = contentTypes.filter((contentType) => contentType.uninstalled)

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
    const seedListKey = template.defaultSlug
    const isSeedListExpanded = expandedSeedList === seedListKey
    const seededItems = seededItemsByCollection[seedListKey] || new Set()

    return (
      <div
        key={template.id}
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '8px',
          padding: '20px',
          background: 'var(--theme-elevation-50)',
          position: 'relative',
        }}
      >
        {isSeedingThis && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            borderRadius: '8px',
            backdropFilter: 'blur(2px)',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin-collection 1s linear infinite',
              marginBottom: '12px',
            }} />
            <style>{`
              @keyframes spin-collection {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#3b82f6' }}>
              Seeding Sample Data...
            </div>
          </div>
        )}
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
            {!isUninstalled && (
              <SeedItemsList
                template={template}
                onSeedItem={(itemSlug) => handleSeedItem(template.defaultSlug, itemSlug)}
                onSeedAll={() => handleSeedAllItems(template.defaultSlug)}
                isSeeding={isSeedingThis}
                seedingItems={seedingItems}
                disabledItems={seededItems}
                expanded={isSeedListExpanded}
                onExpandedChange={(expanded) => {
                  setExpandedSeedList(expanded ? seedListKey : null)
                  if (expanded) {
                    void fetchSeededItemsForKey(seedListKey, template)
                  }
                }}
              />
            )}
          </div>
        )}

        {template.hasSeedData && (
          <div style={{ marginBottom: '12px' }}>
            <button
              onClick={() => toggleSeedList(seedListKey, template)}
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
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                transition: 'transform 0.2s ease',
                transform: isSeedListExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                ▼
              </span>
              {isSeedingThis ? 'Seeding...' : isUninstalled ? 'Reinstall to Seed' : `Seed sample ${template.defaultPlural?.toLowerCase() || 'items'}`}
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {section === 'Collections' && cloneableBaseTemplates[template.defaultSlug] && expandedSeedList === template.defaultSlug && (
            <button
              onClick={() => {
                const cloneConfig = cloneableBaseTemplates[template.defaultSlug]
                openCreateModal({
                  mode: 'base',
                  baseTemplate: cloneConfig.baseTemplate,
                  name: `${template.name} Copy`,
                })
              }}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: '1px solid var(--theme-elevation-200)',
                background: 'var(--theme-elevation-0)',
                color: '#2563eb',
                cursor: 'pointer',
              }}
            >
              Clone Collection
            </button>
          )}
          {section === 'Collections' && cloneableBaseTemplates[template.defaultSlug] && expandedSeedList !== template.defaultSlug && (
            <button
              onClick={() => {
                const cloneConfig = cloneableBaseTemplates[template.defaultSlug]
                openCreateModal({
                  mode: 'base',
                  baseTemplate: cloneConfig.baseTemplate,
                  name: `${template.name} Copy`,
                })
              }}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: '1px solid var(--theme-elevation-200)',
                background: 'var(--theme-elevation-0)',
                color: '#2563eb',
                cursor: 'pointer',
              }}
            >
              Clone Collection
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

  const renderCustomCollectionCard = (contentType: CustomCollection) => {
    const itemCount = customCollectionCounts[contentType.id] || 0
    const template = contentType.templateId ? templateById.get(contentType.templateId) : undefined
    const isSeedingThis = seeding === contentType.id
    const hasSeedData = Boolean(template?.hasSeedData)
    const isSeeded = itemCount > 0
    const seedListKey = `custom:${contentType.id}`
    const isSeedListExpanded = expandedSeedList === seedListKey
    const seededItems = seededItemsByCollection[seedListKey] || new Set()
    const navSlug = `custom:${contentType.slug}`
    const savedState = visibilitySettings[navSlug]
    const isVisible = savedState !== undefined ? savedState : true
    const isUninstallingThis = uninstalling === contentType.id
    const isReinstallingThis = reinstalling === contentType.id
    const isUninstalled = Boolean(contentType.uninstalled)

    return (
      <div
        key={contentType.id}
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '8px',
          padding: '20px',
          background: 'var(--theme-elevation-50)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#333' }}>
            {contentType.pluralLabel || contentType.name}
          </h4>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '4px',
                background: isUninstalled ? '#9ca3af' : '#10b981',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {isUninstalled ? 'Uninstalled' : 'Custom'}
            </span>
            {contentType.template && (
              <span
                style={{
                  fontSize: '11px',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: '#6366f1',
                  color: 'white',
                  fontWeight: 500,
                }}
              >
                {contentType.template}
              </span>
            )}
          </div>
        </div>

        <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px', lineHeight: '1.5' }}>
          {contentType.description || 'Custom collection managed from the Collections manager.'}
        </p>

        <div style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>
          <span style={{ fontWeight: 500 }}>Slug: </span>
          <code style={{ background: 'var(--theme-elevation-100)', padding: '2px 6px', borderRadius: '3px' }}>
            {contentType.slug}
          </code>
        </div>

        <div style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
          {itemCount} item{itemCount === 1 ? '' : 's'}
        </div>

        {hasSeedData && template && (
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              {isSeeded
                ? `Seeded (${itemCount} items)`
                : `Sample data available (${template.seedDataCount || 0} items)`}
            </div>
            {!isUninstalled && (
              <SeedItemsList
                template={template}
                onSeedItem={(itemSlug) => handleSeedContentTypeItem(template, contentType.id, itemSlug)}
                onSeedAll={() => handleSeedContentTypeData(template, contentType.id)}
                isSeeding={isSeedingThis}
                seedingItems={seedingItems}
                disabledItems={seededItems}
                expanded={isSeedListExpanded}
                onExpandedChange={(expanded) => {
                  setExpandedSeedList(expanded ? seedListKey : null)
                  if (expanded) {
                    void fetchSeededItemsForKey(seedListKey, template, {
                      contentTypeId: contentType.id,
                      collectionSlug: 'custom-items',
                    })
                  }
                }}
              />
            )}
          </div>
        )}

        {hasSeedData && template && (
          <div style={{ marginBottom: '12px' }}>
            <button
              onClick={() => toggleSeedList(seedListKey, template, { contentTypeId: contentType.id, collectionSlug: 'custom-items' })}
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
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                transition: 'transform 0.2s ease',
                transform: isSeedListExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                ▼
              </span>
              {isSeedingThis ? 'Seeding...' : isUninstalled ? 'Reinstall to Seed' : `Seed sample ${contentType.pluralLabel?.toLowerCase() || 'items'}`}
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a
            href={`/admin/collections/custom-items?where[contentType][equals]=${contentType.id}`}
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
              pointerEvents: isUninstalled ? 'none' : 'auto',
              opacity: isUninstalled ? 0.6 : 1,
            }}
          >
            View Items
          </a>
          <a
            href={`/admin/collections/content-types/${contentType.id}`}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '6px',
              border: '1px solid var(--theme-elevation-200)',
              background: 'var(--theme-elevation-0)',
              color: '#2563eb',
              textDecoration: 'none',
              display: 'inline-block',
              pointerEvents: isUninstalled ? 'none' : 'auto',
              opacity: isUninstalled ? 0.6 : 1,
            }}
          >
            Edit Definition
          </a>
          <button
            onClick={() =>
              openCreateModal({
                mode: 'clone',
                sourceContentTypeId: contentType.id,
                baseTemplate: contentType.template || 'archive-item',
                name: `${contentType.name} Copy`,
                hasArchive: contentType.hasArchive ?? true,
              })
            }
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '6px',
              border: '1px solid var(--theme-elevation-200)',
              background: 'var(--theme-elevation-0)',
              color: '#2563eb',
              cursor: 'pointer',
              opacity: isUninstalled ? 0.6 : 1,
            }}
            disabled={isUninstalled}
          >
            Clone
          </button>
          {!isUninstalled && (
            <button
              onClick={() => handleToggleVisibility(navSlug, isVisible)}
              disabled={toggling === navSlug}
              style={{
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '6px',
                border: '1px solid var(--theme-elevation-200)',
                background: 'var(--theme-elevation-0)',
                color: '#666',
                cursor: toggling === navSlug ? 'not-allowed' : 'pointer',
                opacity: toggling === navSlug ? 0.6 : 1,
              }}
            >
              {toggling === navSlug ? 'Updating...' : isVisible ? '🚫 Hide from Menu' : '👁️ Show in Menu'}
            </button>
          )}
          {!isUninstalled && (
            <button
              onClick={() => handleUninstallCustomCollection(contentType)}
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
          {isUninstalled && (
            <button
              onClick={() => handleReinstallCustomCollection(contentType)}
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
          {hasSeedData && template && isSeeded && (
            <button
              onClick={() => handleClearContentTypeSeedData(template, contentType.id)}
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
        </div>
      </div>
    )
  }

  const renderContentTypeCard = (template: CollectionTemplate) => {
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
          <span
            style={{
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: '4px',
              background: '#6366f1',
              color: 'white',
              fontWeight: 500,
            }}
          >
            Template
          </span>
        </div>

        <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px', lineHeight: '1.5' }}>
          {template.description}
        </p>

        <div style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>
          <span style={{ fontWeight: 500 }}>Suggested slug: </span>
          <code style={{ background: 'var(--theme-elevation-100)', padding: '2px 6px', borderRadius: '3px' }}>
            {template.defaultSlug}
          </code>
        </div>

        {template.hasSeedData && (
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
            Sample data available ({template.seedDataCount || 0} items)
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleEnableContentType(template)}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '6px',
              border: 'none',
              background: '#10b981',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Install Template
          </button>
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
            {coreTemplates.map((t) => renderTemplateCard(t))}
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
            {installedTemplates.map((t) => renderTemplateCard(t))}
          </div>
        </div>
      )}

      {section === 'Collections' && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: 0, color: '#333' }}>
              Custom Collections
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
            Create and manage custom collections from base templates. Items appear in the Collections menu immediately.
          </p>
          {installedCustomCollections.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  background: 'var(--theme-elevation-50)',
                  borderRadius: '8px',
                  border: '1px dashed var(--theme-elevation-200)',
                }}
              >
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                  Add a new custom collection from a base template.
                </p>
                <button
                  onClick={() => openCreateModal({ mode: 'base', baseTemplate: 'archive-item' })}
                  style={{
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: 'none',
                    background: '#10b981',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Add Custom Collection
                </button>
              </div>
              {installedCustomCollections.map(renderCustomCollectionCard)}
            </div>
          ) : (
            <div
              style={{
                padding: '32px',
                textAlign: 'center',
                background: 'var(--theme-elevation-50)',
                borderRadius: '8px',
                border: '1px dashed var(--theme-elevation-200)',
              }}
            >
              <p style={{ fontSize: '14px', color: '#666' }}>
                No custom collections yet. Create one to get started.
              </p>
              <button
                onClick={() => openCreateModal({ mode: 'base', baseTemplate: 'archive-item' })}
                style={{
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: '#10b981',
                  color: 'white',
                  cursor: 'pointer',
                  marginTop: '12px',
                }}
              >
                Add Custom Collection
              </button>
            </div>
          )}
        </div>
      )}

      {section === 'Collections' && contentTypeTemplates.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
            Available Templates
          </h3>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
            Optional add-ons you can install to create new custom collections.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {contentTypeTemplates.map(renderContentTypeCard)}
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
        uninstalledTemplates.length === 0 &&
        (section !== 'Collections'
          ? true
          : installedCustomCollections.length === 0 && contentTypeTemplates.length === 0) && (
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

      {createModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 20px 60px rgba(15, 23, 42, 0.2)',
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>Create Custom Collection</h3>
              <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#64748b' }}>
                Choose a base template, then refine fields in the definition editor.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <label style={{ display: 'grid', gap: '6px', fontSize: '13px', color: '#334155' }}>
                Name
                <input
                  type="text"
                  value={createName}
                  onChange={(event) => {
                    const nextName = event.target.value
                    setCreateName(nextName)
                    if (!createSlugDirty) {
                      setCreateSlug(slugify(nextName))
                    }
                  }}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5f5',
                    fontSize: '14px',
                  }}
                />
              </label>

              <label style={{ display: 'grid', gap: '6px', fontSize: '13px', color: '#334155' }}>
                Slug
                <input
                  type="text"
                  value={createSlug}
                  onChange={(event) => {
                    setCreateSlug(event.target.value)
                    setCreateSlugDirty(true)
                  }}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5f5',
                    fontSize: '14px',
                  }}
                />
              </label>

              <label style={{ display: 'grid', gap: '6px', fontSize: '13px', color: '#334155' }}>
                Base Template
                <select
                  value={createBaseTemplate}
                  disabled={createMode !== 'base'}
                  onChange={(event) => setCreateBaseTemplate(event.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5f5',
                    fontSize: '14px',
                    background: createMode !== 'base' ? '#f8fafc' : 'white',
                  }}
                >
                  {baseTemplateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                <input
                  type="checkbox"
                  checked={createHasArchive}
                  onChange={(event) => setCreateHasArchive(event.target.checked)}
                />
                Create archive page
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={closeCreateModal}
                style={{
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid #cbd5f5',
                  background: 'white',
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCustomCollection}
                disabled={creating}
                style={{
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: '#10b981',
                  color: 'white',
                  cursor: creating ? 'not-allowed' : 'pointer',
                  opacity: creating ? 0.7 : 1,
                }}
              >
                {creating ? 'Creating...' : 'Create Collection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
