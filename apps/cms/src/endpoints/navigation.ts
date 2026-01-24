// @ts-nocheck
import type { Endpoint } from 'payload'
import { getDefaultSectionForSlug, nestedCollections, sectionOrder } from '../lib/navigationConfig'
import { getCollectionOverrides, resolveCollectionEnabled } from '../lib/collectionVisibility'
import type { SectionId } from '../lib/navigationConfig'

/**
 * Navigation endpoint that dynamically builds navigation from Payload collections
 * This ensures the navigation always reflects the actual enabled collections
 */
export const navigationEndpoint: Endpoint = {
  path: '/admin/navigation',
  method: 'get',
  handler: async (req) => {
    try {
      const { payload } = req

      // Get all collections from the config
      const collections = payload.config.collections

      // Define icon mapping for collections (core collections only)
      const iconMap: Record<string, string> = {
        // Content
        pages: 'page',
        posts: 'post',

        // Taxonomy
        categories: 'category',
        tags: 'tags',

        // Media
        media: 'image',

        // Forms
        forms: 'form',
        'form-submissions': 'inbox',

        // Settings
        redirects: 'redirect',

        // Admin
        users: 'users',
      }

      const collectionOverrides = await getCollectionOverrides(payload)
      const overrideList = Array.from(collectionOverrides.values())
      const overridesBySlug = new Map(overrideList.map((item) => [item.slug, item]))
      const orderBySlug = new Map(overrideList.map((item, index) => [item.slug, index]))

      const navSettings: any = await payload.findGlobal({ slug: 'navigation-settings', depth: 0 }).catch(() => null)
      const rawGlobalOverrides = Array.isArray(navSettings?.globals) ? navSettings.globals : []
      const globalOverrides = rawGlobalOverrides
        .filter((item: any) => item && typeof item.slug === 'string')
        .map((item: any) => ({
          slug: item.slug,
          enabled: typeof item.enabled === 'boolean' ? item.enabled : true,
          label: typeof item.label === 'string' ? item.label : '',
        }))
      const globalOverridesBySlug = new Map(globalOverrides.map((item: any) => [item.slug, item]))
      const globalOrderBySlug = new Map(globalOverrides.map((item: any, index: number) => [item.slug, index]))

      // Build collection items map
      const collectionItems: Record<string, any> = {}
      const collectionSections: Record<string, SectionId> = {}
      const navHiddenSlugs = new Set<string>([])

      collections.forEach((collection) => {
        const slug = collection.slug

        // Skip hidden collections
        if (collection.admin?.hidden) return
        if (navHiddenSlugs.has(slug)) return

        const override = overridesBySlug.get(slug)
        if (!resolveCollectionEnabled(slug, overridesBySlug)) return

        const labelOverride = typeof override?.label === 'string' ? override.label.trim() : ''
        const label = labelOverride || collection.labels?.plural || collection.slug
        const overrideSection = override?.section as SectionId | undefined
        const section = overrideSection && sectionOrder.includes(overrideSection)
          ? overrideSection
          : getDefaultSectionForSlug(slug)

        collectionItems[slug] = {
          label,
          href: `/admin/collections/${slug}`,
          icon: iconMap[slug] || 'collection',
          slug,
          _order: orderBySlug.has(slug) ? orderBySlug.get(slug) : Number.MAX_SAFE_INTEGER,
        }
        collectionSections[slug] = section
      })

      // Build navigation sections
      const navSections: any[] = []

      // 1. Dashboard
      navSections.push({
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
        items: [
          { label: 'Overview', href: '/admin', icon: 'home', slug: 'dashboard' },
        ],
      })

      const sectionItemsMap: Record<SectionId, any[]> = {
        content: [],
        taxonomy: [],
        collections: [],
        shop: [],
        media: [],
        forms: [],
        settings: [],
        admin: [],
      }

      Object.entries(collectionItems).forEach(([slug, item]) => {
        const section = collectionSections[slug] || getDefaultSectionForSlug(slug)
        sectionItemsMap[section].push(item)
      })

      // Custom collections removed - main branch only has core collections

      const nestedChildrenBySection = new Map<SectionId, Set<string>>()
      sectionOrder.forEach((sectionId) => nestedChildrenBySection.set(sectionId, new Set()))
      Object.entries(nestedCollections).forEach(([parentSlug, childSlugs]) => {
        const parentSection = collectionSections[parentSlug]
        if (!parentSection) return
        const childSet = nestedChildrenBySection.get(parentSection)
        childSlugs.forEach((childSlug) => {
          if (collectionSections[childSlug] === parentSection) {
            childSet?.add(childSlug)
          }
        })
      })

      const buildSectionItems = (sectionId: SectionId) => {
        const items = sectionItemsMap[sectionId] || []
        const nestedChildren = nestedChildrenBySection.get(sectionId) || new Set<string>()
        const filtered = items.filter((item) => !nestedChildren.has(item.slug))

        filtered.forEach((item) => {
          const children = nestedCollections[item.slug]
          if (!children) return
          const nestedItems = children
            .map((childSlug) => collectionItems[childSlug])
            .filter(Boolean)
            .filter((child) => collectionSections[child.slug] === sectionId)
            .sort((a, b) => (a._order || 0) - (b._order || 0))

          if (nestedItems.length > 0) {
            item.items = nestedItems
          }
        })

        return filtered.sort((a, b) => {
          if (a._order !== b._order) return a._order - b._order
          return (a.label || '').localeCompare(b.label || '')
        })
      }

      const sectionMeta: Record<SectionId, { label: string; icon: string }> = {
        content: { label: 'Content', icon: 'content' },
        taxonomy: { label: 'Taxonomy', icon: 'tags' },
        collections: { label: 'Collections', icon: 'collection' },
        shop: { label: 'Shop', icon: 'collection' },
        media: { label: 'Media', icon: 'media' },
        forms: { label: 'Forms', icon: 'form' },
        settings: { label: 'Settings', icon: 'settings' },
        admin: { label: 'Admin', icon: 'admin' },
      }

      sectionOrder.forEach((sectionId) => {
        const items = buildSectionItems(sectionId)

        // Don't skip Settings section even if empty - we'll add globals to it later
        // Skip other empty sections (no collections enabled)
        if (items.length === 0 && sectionId !== 'settings') return

        // Manager links removed - custom admin views don't exist in clean main branch

        navSections.push({
          id: sectionId,
          label: sectionMeta[sectionId].label,
          icon: sectionMeta[sectionId].icon,
          items,
        })
      })

      const toolsSection = {
        id: 'tools',
        label: 'Tools',
        icon: 'tools',
        items: [
          { label: 'Tools', href: '/admin/tools', icon: 'tools', slug: 'tools' },
        ],
      }
      const settingsIndex = navSections.findIndex((section) => section.id === 'settings')
      if (settingsIndex >= 0) {
        navSections.splice(settingsIndex, 0, toolsSection)
      } else {
        navSections.push(toolsSection)
      }

      const settingsSection = navSections.find((section) => section.id === 'settings')
      if (settingsSection && req.user?.role === 'admin') {
        const seoItem = {
          label: 'SEO Settings',
          href: '/admin/seo',
          icon: 'search',
          slug: 'seo-settings',
          _order: -2,
        }
        const settingsIndex = settingsSection.items.findIndex((item) => item.slug === 'settings' || item.href === '/admin/globals/settings')
        if (settingsIndex >= 0) {
          settingsSection.items.splice(settingsIndex + 1, 0, seoItem)
        } else {
          settingsSection.items.push(seoItem)
        }
      }

      // Build globals list for search + navigation
      console.log('[Navigation] Building globals list')
      console.log('[Navigation] Total globals in config:', payload.config.globals.length)
      console.log('[Navigation] Global slugs:', payload.config.globals.map(g => g.slug))

      const globals = payload.config.globals.map((global, index) => {
        const override = globalOverridesBySlug.get(global.slug)
        const labelOverride = typeof override?.label === 'string' ? override.label.trim() : ''
        const label = labelOverride || global.label || global.slug
        const enabled = override?.enabled !== false

        return {
          label,
          href: `/admin/globals/${global.slug}`,
          slug: global.slug,
          _enabled: enabled,
          _order: globalOrderBySlug.has(global.slug) ? globalOrderBySlug.get(global.slug) : index,
        }
      })
      const globalSearchLinks = globals
        .filter((global) => global._enabled)
        .map((global) => ({
          label: global.label,
          href: global.href,
          slug: global.slug,
        }))

      const globalIconMap: Record<string, string> = {
        header: 'header',
        footer: 'footer',
        settings: 'gear',
        'navigation-settings': 'settings',
      }

      const globalNavItems = globals
        .filter((global) => global._enabled)
        .sort((a, b) => (a._order || 0) - (b._order || 0))
        .map((global) => ({
          label: global.label,
          href: global.href,
          icon: globalIconMap[global.slug] || 'settings',
          slug: global.slug,
          _order: Number.MAX_SAFE_INTEGER,
        }))

      console.log('[Navigation] Global nav items:', globalNavItems.length)
      console.log('[Navigation] Global nav items:', globalNavItems.map(g => ({ slug: g.slug, label: g.label })))

      if (globalNavItems.length > 0) {
        const settingsSection = navSections.find((section) => section.id === 'settings')
        console.log('[Navigation] Settings section exists:', !!settingsSection)
        console.log('[Navigation] Settings section items before adding globals:', settingsSection?.items?.length || 0)

        if (settingsSection) {
          settingsSection.items.push(...globalNavItems)
          console.log('[Navigation] Settings section items after adding globals:', settingsSection.items.length)
        } else {
          navSections.push({
            id: 'settings',
            label: sectionMeta.settings.label,
            icon: sectionMeta.settings.icon,
            items: globalNavItems,
          })
          console.log('[Navigation] Created new settings section with globals')
        }
      }

      // Build collection search config
      const collectionSearchConfig = collections
        .filter((collection) => !collection.admin?.hidden)
        .filter((collection) => {
          const override = overridesBySlug.get(collection.slug)
          return override?.enabled !== false
        })
        .map((collection) => {
          // Determine the title field
          let titleField = 'title'
          if (collection.slug === 'people' || collection.slug === 'places') {
            titleField = 'name'
          } else if (collection.slug === 'media') {
            titleField = 'filename'
          } else if (collection.slug === 'users') {
            titleField = 'email'
          } else if (collection.slug === 'redirects') {
            titleField = 'from'
          } else if (collection.slug === 'content-types') {
            titleField = 'name'
          }

          const override = overridesBySlug.get(collection.slug)
          const labelOverride = typeof override?.label === 'string' ? override.label.trim() : ''
          const label = labelOverride || collection.labels?.plural || collection.slug

          return {
            slug: collection.slug,
            label,
            titleField,
          }
        })

      // Get custom links from navigation-settings global
      let customLinks: Array<{ label: string; url: string; insertPosition?: string; position?: 'start' | 'end' }> = []
      if (navSettings && Array.isArray(navSettings.customLinks)) {
        customLinks = navSettings.customLinks.filter((link: any) =>
          link && typeof link.label === 'string' && typeof link.url === 'string'
        )
      }

      // Remove Settings section if it's empty (no collections and no globals)
      const settingsSectionIndex = navSections.findIndex(s => s.id === 'settings')
      if (settingsSectionIndex >= 0 && navSections[settingsSectionIndex].items.length === 0) {
        console.log('[Navigation] Removing empty Settings section')
        navSections.splice(settingsSectionIndex, 1)
      }

      console.log('[Navigation] Final nav sections:', navSections.map(s => ({ id: s.id, itemCount: s.items.length })))

      return Response.json({
        navSections,
        globals: globalSearchLinks,
        collectionSearchConfig,
        customLinks,
      })
    } catch (error) {
      console.error('Navigation endpoint error:', error)
      return Response.json(
        { error: 'Failed to build navigation' },
        { status: 500 }
      )
    }
  },
}
