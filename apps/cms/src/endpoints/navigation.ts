import type { Endpoint } from 'payload'

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

    // Define section order and metadata
    const sectionOrder = ['Content', 'Taxonomy', 'Collections', 'Shop', 'Media', 'Forms', 'Settings', 'Admin']
    const sectionIcons: Record<string, string> = {
      Content: 'content',
      Taxonomy: 'tags',
      Collections: 'collection',
      Shop: 'shopping-bag',
      Media: 'media',
      Forms: 'form',
      Settings: 'settings',
      Admin: 'admin',
    }

    // Define which collections should be nested under their parent
    const nestedCollections: Record<string, string[]> = {
      products: ['product-categories', 'product-collections'],
    }

    // Define taxonomy collections (shared across content types)
    const taxonomySlugs = ['categories', 'tags']

    // Define shop collections (ecommerce-specific)
    const shopSlugs = ['products', 'product-categories', 'product-collections']

    // Define which collections belong to Collections section (not Content)
    const collectionsSectionSlugs = [
      'archive-items',
      'people',
      'places',
      'events',
      'products',
      'product-categories',
      'product-collections',
      'museum-collections', // TODO: Rename to 'galleries' in future
    ]

    // Build collection items map
    const collectionItems: Record<string, any> = {}

    collections.forEach((collection) => {
      const slug = collection.slug

      // Skip hidden collections
      if (collection.admin?.hidden) return

      collectionItems[slug] = {
        label: collection.labels?.plural || collection.slug,
        href: `/admin/collections/${slug}`,
        icon: iconMap[slug] || 'collection',
        slug,
      }
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

    // 2. Content Section (Pages, Posts, Archive Items, Events, People)
    const contentItems: any[] = []

    // Add all collections that are NOT in Collections, Shop, or Taxonomy sections
    Object.entries(collectionItems).forEach(([slug, item]) => {
      // Skip if it's in Collections, Shop, or Taxonomy sections
      if (collectionsSectionSlugs.includes(slug) || shopSlugs.includes(slug) || taxonomySlugs.includes(slug)) return

      // Skip if it's a nested item (will be added under parent)
      const isNested = Object.values(nestedCollections).some(nested => nested.includes(slug))
      if (isNested) return

      contentItems.push(item)
    })

    if (contentItems.length > 0) {
      navSections.push({
        id: 'content',
        label: 'Content',
        icon: 'content',
        items: contentItems,
      })
    }

    // 3. Taxonomy Section (Categories, Tags - shared across content types)
    const taxonomyItems: any[] = []

    taxonomySlugs.forEach(slug => {
      if (collectionItems[slug]) {
        taxonomyItems.push(collectionItems[slug])
      }
    })

    if (taxonomyItems.length > 0) {
      navSections.push({
        id: 'taxonomy',
        label: 'Taxonomy',
        icon: 'tags',
        items: taxonomyItems,
      })
    }

    // 3. Collections Section (direct links, no section labels)
    const collectionsItems: any[] = []

    // Add all collections that belong to Collections section
    collectionsSectionSlugs.forEach(slug => {
      if (!collectionItems[slug]) return

      // Skip if it's a nested item (will be added under parent)
      const isNested = Object.values(nestedCollections).some(nested => nested.includes(slug))
      if (isNested) return

      const item = { ...collectionItems[slug] }

      // Check if this item has nested children
      const children = nestedCollections[slug]
      if (children) {
        const nestedItems: any[] = []
        children.forEach(childSlug => {
          if (collectionItems[childSlug]) {
            nestedItems.push(collectionItems[childSlug])
          }
        })

        if (nestedItems.length > 0) {
          item.items = nestedItems
        }
      }

      collectionsItems.push(item)
    })

    if (collectionsItems.length > 0) {
      navSections.push({
        id: 'collections',
        label: 'Collections',
        icon: 'collection',
        items: collectionsItems,
      })
    }

    // 4. Media Section
    if (collectionItems['media']) {
      navSections.push({
        id: 'media',
        label: 'Media',
        icon: 'media',
        items: [collectionItems['media']],
      })
    }

    // 5. Forms Section
    const formsItems: any[] = []
    if (collectionItems['forms']) formsItems.push(collectionItems['forms'])
    if (collectionItems['form-submissions']) formsItems.push(collectionItems['form-submissions'])

    if (formsItems.length > 0) {
      navSections.push({
        id: 'forms',
        label: 'Forms',
        icon: 'form',
        items: formsItems,
      })
    }

    // 6. Settings Section
    const settingsItems: any[] = []
    if (collectionItems['redirects']) settingsItems.push(collectionItems['redirects'])

    if (settingsItems.length > 0) {
      navSections.push({
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        items: settingsItems,
      })
    }

    // 7. Admin Section
    const adminItems: any[] = []
    if (collectionItems['users']) adminItems.push(collectionItems['users'])

    if (adminItems.length > 0) {
      navSections.push({
        id: 'admin',
        label: 'Admin',
        icon: 'admin',
        items: adminItems,
      })
    }

    // Build globals list for search
    const globals = payload.config.globals.map((global) => ({
      label: global.label || global.slug,
      href: `/admin/globals/${global.slug}`,
      slug: global.slug,
    }))

    // Build collection search config
    const collectionSearchConfig = collections
      .filter((collection) => !collection.admin?.hidden)
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

        return {
          slug: collection.slug,
          label: collection.labels?.plural || collection.slug,
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

