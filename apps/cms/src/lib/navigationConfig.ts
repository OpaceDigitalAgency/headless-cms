export type SectionId = 'content' | 'taxonomy' | 'collections' | 'shop' | 'media' | 'forms' | 'settings' | 'admin'

export const sectionOrder: SectionId[] = [
  'content',
  'taxonomy',
  'collections',
  'shop',
  'media',
  'forms',
  'settings',
  'admin',
]

export const sectionLabels: Record<SectionId, string> = {
  content: 'Content',
  taxonomy: 'Taxonomy',
  collections: 'Collections',
  shop: 'Shop',
  media: 'Media',
  forms: 'Forms',
  settings: 'Settings',
  admin: 'Admin',
}

export const nestedCollections: Record<string, string[]> = {
  products: ['product-categories', 'product-collections'],
}

export const taxonomySlugs = ['categories', 'tags']
export const shopSlugs = ['products', 'product-categories', 'product-collections']
export const collectionsSectionSlugs = [
  'archive-items',
  'people',
  'places',
  'events',
]

export const defaultEnabledSlugs = new Set<string>([
  'pages',
  'posts',
  'categories',
  'tags',
  'archive-items',
  'people',
  'places',
  'events',
  'media',
  'forms',
  'form-submissions',
  'users',
  'redirects',
])

export const isDefaultEnabled = (slug: string): boolean => defaultEnabledSlugs.has(slug)

const mediaSlugs = ['media']
const formsSlugs = ['forms', 'form-submissions']
const settingsSlugs = ['redirects']
const adminSlugs = ['users']

export const getDefaultSectionForSlug = (slug: string): SectionId => {
  if (taxonomySlugs.includes(slug)) return 'taxonomy'
  if (shopSlugs.includes(slug)) return 'shop'
  if (collectionsSectionSlugs.includes(slug)) return 'collections'
  if (mediaSlugs.includes(slug)) return 'media'
  if (formsSlugs.includes(slug)) return 'forms'
  if (settingsSlugs.includes(slug)) return 'settings'
  if (adminSlugs.includes(slug)) return 'admin'
  return 'content'
}
