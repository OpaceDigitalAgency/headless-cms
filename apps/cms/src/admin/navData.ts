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
      { label: 'Tools', href: '/admin/tools', icon: 'tools' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    icon: 'content',
    items: [
      { label: 'Pages', href: '/admin/collections/pages', icon: 'page' },
      { label: 'Posts', href: '/admin/collections/posts', icon: 'post' },
      { label: 'Categories', href: '/admin/collections/categories', icon: 'category' },
    ],
  },
  {
    id: 'museum',
    label: 'Museum',
    icon: 'museum',
    items: [
      { label: 'Artifacts', href: '/admin/collections/artifacts', icon: 'artifact' },
      { label: 'People', href: '/admin/collections/people', icon: 'person' },
      { label: 'Places', href: '/admin/collections/places', icon: 'place' },
      { label: 'Collections', href: '/admin/collections/museum-collections', icon: 'collection' },
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
    id: 'settings',
    label: 'Site Settings',
    icon: 'settings',
    items: [
      { label: 'Header', href: '/admin/globals/header', icon: 'header' },
      { label: 'Footer', href: '/admin/globals/footer', icon: 'footer' },
      { label: 'Settings', href: '/admin/globals/settings', icon: 'gear' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'admin',
    items: [
      { label: 'Users', href: '/admin/collections/users', icon: 'users' },
      { label: 'Forms', href: '/admin/collections/forms', icon: 'form' },
      { label: 'Submissions', href: '/admin/collections/form-submissions', icon: 'inbox' },
      { label: 'Redirects', href: '/admin/collections/redirects', icon: 'redirect' },
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
  { slug: 'artifacts', label: 'Artifacts', titleField: 'title' },
  { slug: 'people', label: 'People', titleField: 'name' },
  { slug: 'places', label: 'Places', titleField: 'name' },
  { slug: 'museum-collections', label: 'Collections', titleField: 'title' },
  { slug: 'media', label: 'Media', titleField: 'filename' },
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
