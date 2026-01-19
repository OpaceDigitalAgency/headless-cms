import type { Endpoint } from 'payload'
import { getDefaultSectionForSlug, nestedCollections, sectionOrder } from '../lib/navigationConfig'
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

    // Define icon mapping for collections
    const iconMap: Record<string, string> = {
      // Content
      pages: 'page',
      posts: 'post',
      categories: 'category',
      tags: 'tags',

      // Collections
      'archive-items': 'artifact',
      people: 'person',
      places: 'place',
      events: 'post',
      products: 'collection',
      'product-categories': 'category',
      'product-collections': 'collection',
      'museum-collections': 'collection',
      artifacts: 'artifact',
      'custom-items': 'customItem',
      'content-types': 'contentType',

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

    const navigationSettings = await payload.findGlobal({ slug: 'navigation-settings', depth: 0 }).catch(() => null)
    const collectionOverrides = Array.isArray(navigationSettings?.collections) ? navigationSettings.collections : []
    const overridesBySlug = new Map(collectionOverrides.map((item: any) => [item.slug, item]))
    const orderBySlug = new Map(collectionOverrides.map((item: any, index: number) => [item.slug, index]))

    // Build collection items map
    const collectionItems: Record<string, any> = {}
    const collectionSections: Record<string, SectionId> = {}

    collections.forEach((collection) => {
      const slug = collection.slug

      // Skip hidden collections
      if (collection.admin?.hidden) return

      const override = overridesBySlug.get(slug)
      if (override?.enabled === false) return

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
        { label: 'Tools', href: '/admin/tools', icon: 'tools', slug: 'tools' },
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
      if (items.length === 0) return
      navSections.push({
        id: sectionId,
        label: sectionMeta[sectionId].label,
        icon: sectionMeta[sectionId].icon,
        items,
      })
    })

    // Build globals list for search
    const globals = payload.config.globals.map((global) => ({
      label: global.label || global.slug,
      href: `/admin/globals/${global.slug}`,
      slug: global.slug,
    }))

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

      return Response.json({
        navSections,
        globals,
        collectionSearchConfig,
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
