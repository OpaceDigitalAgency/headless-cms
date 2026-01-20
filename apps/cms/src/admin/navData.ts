/**
 * Navigation Data Configuration
 *
 * Defines the structure of the admin navigation including sections,
 * items, icons, and routing. Used by TwoPanelNav component.
 */

export interface NavItem {
  label: string
  href: string
  icon: string
  /** Optional badge count */
  badge?: number
  /** Optional nested items (for hierarchical navigation) */
  items?: NavItem[]
  /** Optional slug for identification */
  slug?: string
}

export interface NavSection {
  id: string
  label: string
  icon: string
  items: NavItem[]
}

/**
 * Main navigation sections
 */
export const navSections: NavSection[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    items: [
      { label: 'Overview', href: '/admin', icon: 'home' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    icon: 'content',
    items: [
      { label: 'Pages', href: '/admin/collections/pages', icon: 'page' },
      { label: 'Posts', href: '/admin/collections/posts', icon: 'post' },
      { label: 'Events', href: '/admin/collections/events', icon: 'post' },
      { label: 'Archive Items', href: '/admin/collections/archive-items', icon: 'archive' },
      { label: 'Categories', href: '/admin/collections/categories', icon: 'category' },
      { label: 'Tags', href: '/admin/collections/tags', icon: 'tags' },
      { label: 'Custom Items', href: '/admin/collections/custom-items', icon: 'customItem' },
      { label: 'Content Types', href: '/admin/collections/content-types', icon: 'contentType' },
    ],
  },
  {
    id: 'collections',
    label: 'Collections',
    icon: 'collection',
    items: [
      { label: 'People', href: '/admin/collections/people', icon: 'person' },
      { label: 'Places', href: '/admin/collections/places', icon: 'place' },
    ],
  },
  {
    id: 'shop',
    label: 'Shop',
    icon: 'collection',
    items: [
      { label: 'Products', href: '/admin/collections/products', icon: 'collection' },
      { label: 'Product Categories', href: '/admin/collections/product-categories', icon: 'category' },
      { label: 'Product Collections', href: '/admin/collections/product-collections', icon: 'collection' },
    ],
  },
  {
    id: 'media',
    label: 'Media',
    icon: 'media',
    items: [
      { label: 'Library', href: '/admin/collections/media', icon: 'image' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'tools',
    items: [
      { label: 'Tools', href: '/admin/tools', icon: 'tools' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    items: [
      { label: 'Header', href: '/admin/globals/header', icon: 'header' },
      { label: 'Footer', href: '/admin/globals/footer', icon: 'footer' },
      { label: 'Site Settings', href: '/admin/globals/settings', icon: 'gear' },
      { label: 'Forms', href: '/admin/collections/forms', icon: 'form' },
      { label: 'Redirects', href: '/admin/collections/redirects', icon: 'redirect' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'admin',
    items: [
      { label: 'Users', href: '/admin/collections/users', icon: 'users' },
      { label: 'Form Submissions', href: '/admin/collections/form-submissions', icon: 'inbox' },
    ],
  },
]

/**
 * Global links for search
 */
export const globalLinks = [
  { label: 'Header', href: '/admin/globals/header', slug: 'header' },
  { label: 'Footer', href: '/admin/globals/footer', slug: 'footer' },
  { label: 'Settings', href: '/admin/globals/settings', slug: 'settings' },
]

/**
 * Collection search configuration
 */
export const collectionSearchConfig = [
  { slug: 'pages', label: 'Pages', titleField: 'title' },
  { slug: 'posts', label: 'Posts', titleField: 'title' },
  { slug: 'events', label: 'Events', titleField: 'title' },
  { slug: 'archive-items', label: 'Archive Items', titleField: 'title' },
  { slug: 'products', label: 'Products', titleField: 'title' },
  { slug: 'people', label: 'People', titleField: 'name' },
  { slug: 'places', label: 'Places', titleField: 'name' },
  { slug: 'custom-items', label: 'Custom Items', titleField: 'title' },
  { slug: 'content-types', label: 'Content Types', titleField: 'name' },
  { slug: 'categories', label: 'Categories', titleField: 'title' },
  { slug: 'tags', label: 'Tags', titleField: 'title' },
  { slug: 'product-categories', label: 'Product Categories', titleField: 'title' },
  { slug: 'product-collections', label: 'Product Collections', titleField: 'title' },
  { slug: 'media', label: 'Media', titleField: 'filename' },
  { slug: 'users', label: 'Users', titleField: 'email' },
  { slug: 'forms', label: 'Forms', titleField: 'title' },
  { slug: 'form-submissions', label: 'Form Submissions', titleField: 'id' },
  { slug: 'redirects', label: 'Redirects', titleField: 'from' },
]

/**
 * Resolve which section is active based on current path
 */
export function resolveActiveSection(pathname: string): string | null {
  // Check each section's items for a match
  for (const section of navSections) {
    for (const item of section.items) {
      // Exact match for dashboard
      if (item.href === '/admin' && pathname === '/admin') {
        return section.id
      }
      // Prefix match for other routes
      if (item.href !== '/admin' && pathname.startsWith(item.href)) {
        return section.id
      }
    }
  }
  return null
}

/**
 * Resolve which item is active based on current path
 */
export function resolveActiveItem(pathname: string): string | null {
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.href === '/admin' && pathname === '/admin') {
        return item.href
      }
      if (item.href !== '/admin' && pathname.startsWith(item.href)) {
        return item.href
      }
    }
  }
  return null
}
