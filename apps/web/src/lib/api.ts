/**
 * CMS API Client
 * Fetches data from Payload CMS REST API
 */

const CMS_URL = process.env.CMS_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'
const isDevelopment = process.env.NODE_ENV === 'development'

export interface FetchOptions {
  draft?: boolean
  depth?: number
  locale?: string
  cache?: RequestCache
  tags?: string[]
}

/**
 * Generic fetch function for CMS API
 * In development, we use 'no-store' to always get fresh data
 * In production, we use 'force-cache' with revalidation tags
 */
async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  // Use no-store in development to always get fresh data
  const defaultCache: RequestCache = isDevelopment ? 'no-store' : 'force-cache'
  const { draft = false, depth = 2, locale, cache = defaultCache, tags } = options

  const url = new URL(`/api${endpoint}`, CMS_URL)

  if (depth) url.searchParams.set('depth', String(depth))
  if (locale) url.searchParams.set('locale', locale)
  if (draft) url.searchParams.set('draft', 'true')

  const fetchOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache,
  }

  // Add Next.js cache tags for revalidation (production only)
  if (tags && tags.length > 0 && !isDevelopment) {
    (fetchOptions as any).next = { tags }
  }

  const response = await fetch(url.toString(), fetchOptions)

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// ===========================================
// Pages
// ===========================================

export interface Page {
  id: string
  title: string
  slug: string
  template: string
  hero?: any
  content?: any[]
  meta?: any
  _status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface PaginatedDocs<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export async function getPages(options?: FetchOptions): Promise<PaginatedDocs<Page>> {
  return fetchAPI<PaginatedDocs<Page>>('/pages', {
    ...options,
    tags: ['pages'],
  })
}

export async function getPageBySlug(slug: string, options?: FetchOptions): Promise<Page | null> {
  const result = await fetchAPI<PaginatedDocs<Page>>(
    `/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    {
      ...options,
      tags: ['pages', `pages:${slug}`],
    }
  )
  return result.docs[0] || null
}

/**
 * Convenience helper used by routes expecting `getPage`
 */
export async function getPage(slug: string, options?: FetchOptions): Promise<Page | null> {
  return getPageBySlug(slug, options)
}

export async function getPageById(id: string, options?: FetchOptions): Promise<Page> {
  return fetchAPI<Page>(`/pages/${id}`, {
    ...options,
    tags: ['pages', `pages:id:${id}`],
  })
}

// ===========================================
// Posts
// ===========================================

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: any
  featuredImage?: any
  categories?: any[]
  author?: any
  publishedAt?: string
  meta?: any
  _status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export async function getPosts(
  options?: FetchOptions & { limit?: number; page?: number; category?: string }
): Promise<PaginatedDocs<Post>> {
  let endpoint = '/posts?sort=-publishedAt'
  
  if (options?.limit) endpoint += `&limit=${options.limit}`
  if (options?.page) endpoint += `&page=${options.page}`
  if (options?.category) endpoint += `&where[categories][in]=${options.category}`

  return fetchAPI<PaginatedDocs<Post>>(endpoint, {
    ...options,
    tags: ['posts'],
  })
}

export async function getPostBySlug(slug: string, options?: FetchOptions): Promise<Post | null> {
  const result = await fetchAPI<PaginatedDocs<Post>>(
    `/posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    {
      ...options,
      tags: ['posts', `posts:${slug}`],
    }
  )
  return result.docs[0] || null
}

/**
 * Convenience helper used by routes expecting `getPost`
 */
export async function getPost(slug: string, options?: FetchOptions): Promise<Post | null> {
  return getPostBySlug(slug, options)
}

// ===========================================
// Categories
// ===========================================

export interface Category {
  id: string
  title: string
  slug: string
  description?: string
  parent?: Category | string
}

export async function getCategories(options?: FetchOptions): Promise<PaginatedDocs<Category>> {
  return fetchAPI<PaginatedDocs<Category>>('/categories', {
    ...options,
    tags: ['categories'],
  })
}

export async function getCategoryBySlug(slug: string, options?: FetchOptions): Promise<Category | null> {
  const result = await fetchAPI<PaginatedDocs<Category>>(
    `/categories?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    {
      ...options,
      tags: ['categories', `categories:${slug}`],
    }
  )
  return result.docs[0] || null
}

// ===========================================
// Content Types (Dynamic)
// ===========================================

export interface ContentType {
  id: string
  name: string
  slug: string
  singularLabel: string
  pluralLabel: string
  icon?: string
  template: string
  description?: string
  hasArchive?: boolean
  archiveSlug?: string
  customFields?: Array<{
    name: string
    label: string
    type: string
    required?: boolean
    options?: string
  }>
}

export async function getContentTypes(options?: FetchOptions): Promise<PaginatedDocs<ContentType>> {
  return fetchAPI<PaginatedDocs<ContentType>>('/content-types', {
    ...options,
    tags: ['content-types'],
  })
}

export async function getContentTypeBySlug(slug: string, options?: FetchOptions): Promise<ContentType | null> {
  const result = await fetchAPI<PaginatedDocs<ContentType>>(
    `/content-types?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    {
      ...options,
      tags: ['content-types', `content-types:${slug}`],
    }
  )
  return result.docs[0] || null
}

export async function getContentTypeBySlugOrArchiveSlug(
  slug: string,
  options?: FetchOptions
): Promise<ContentType | null> {
  const archiveSlug = slug.startsWith('items/') ? slug : `items/${slug}`
  const result = await fetchAPI<PaginatedDocs<ContentType>>(
    `/content-types?where[or][0][slug][equals]=${encodeURIComponent(slug)}&where[or][1][archiveSlug][equals]=${encodeURIComponent(archiveSlug)}&limit=1`,
    {
      ...options,
      tags: ['content-types', `content-types:${slug}`, `content-types:archive:${archiveSlug}`],
    }
  )
  return result.docs[0] || null
}

export async function getContentTypeById(id: string, options?: FetchOptions): Promise<ContentType> {
  return fetchAPI<ContentType>(`/content-types/${id}`, {
    ...options,
    tags: ['content-types', `content-types:id:${id}`],
  })
}

// ===========================================
// Artifacts (Museum)
// ===========================================

export interface Artifact {
  id: string
  title: string
  slug: string
  description?: any
  media?: any[]
  people?: any[]
  places?: any[]
  collections?: any[]
  template: string
  meta?: any
  _status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export async function getArtifacts(options?: FetchOptions): Promise<PaginatedDocs<Artifact>> {
  return fetchAPI<PaginatedDocs<Artifact>>('/artifacts', {
    ...options,
    tags: ['artifacts'],
  })
}

export async function getArtifactBySlug(slug: string, options?: FetchOptions): Promise<Artifact | null> {
  const result = await fetchAPI<PaginatedDocs<Artifact>>(
    `/artifacts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    {
      ...options,
      tags: ['artifacts', `artifacts:${slug}`],
    }
  )
  return result.docs[0] || null
}

/**
 * Convenience helper used by routes expecting `getArtifact`
 */
export async function getArtifact(slug: string, options?: FetchOptions): Promise<Artifact | null> {
  return getArtifactBySlug(slug, options)
}

// ===========================================
// Custom Items (Dynamic)
// ===========================================

export interface CustomItem {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: any
  blocks?: any[]
  featuredImage?: any
  gallery?: any[]
  customData?: Record<string, any>
  meta?: any
  contentType: ContentType | string
  status: 'draft' | 'published' | 'archived'
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export async function getCustomItems(options?: FetchOptions & { limit?: number; page?: number; contentTypeId?: string; status?: string }): Promise<PaginatedDocs<CustomItem>> {
  let endpoint = '/custom-items?sort=-updatedAt'

  if (options?.limit) endpoint += `&limit=${options.limit}`
  if (options?.page) endpoint += `&page=${options.page}`
  if (options?.contentTypeId) endpoint += `&where[contentType][equals]=${options.contentTypeId}`
  if (options?.status) endpoint += `&where[status][equals]=${options.status}`

  return fetchAPI<PaginatedDocs<CustomItem>>(endpoint, {
    ...options,
    tags: ['custom-items'],
  })
}

export async function getCustomItemBySlug(
  slug: string,
  options?: FetchOptions & { contentTypeId?: string; status?: string }
): Promise<CustomItem | null> {
  let endpoint = `/custom-items?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
  if (options?.contentTypeId) endpoint += `&where[contentType][equals]=${options.contentTypeId}`
  if (options?.status) endpoint += `&where[status][equals]=${options.status}`

  const result = await fetchAPI<PaginatedDocs<CustomItem>>(endpoint, {
    ...options,
    tags: ['custom-items', `custom-items:${slug}`],
  })
  return result.docs[0] || null
}

// ===========================================
// People (Museum)
// ===========================================

export interface Person {
  id: string
  name: string
  slug: string
  biography?: any
  portrait?: any
  birthDate?: string
  deathDate?: string
}

export async function getPeople(options?: FetchOptions): Promise<PaginatedDocs<Person>> {
  return fetchAPI<PaginatedDocs<Person>>('/people', {
    ...options,
    tags: ['people'],
  })
}

export async function getPersonBySlug(slug: string, options?: FetchOptions): Promise<Person | null> {
  const result = await fetchAPI<PaginatedDocs<Person>>(
    `/people?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    {
      ...options,
      tags: ['people', `people:${slug}`],
    }
  )
  return result.docs[0] || null
}

// ===========================================
// Places (Museum)
// ===========================================

export interface Place {
  id: string
  name: string
  slug: string
  description?: any
  featuredImage?: any
  location?: { latitude: number; longitude: number }
}

export async function getPlaces(options?: FetchOptions): Promise<PaginatedDocs<Place>> {
  return fetchAPI<PaginatedDocs<Place>>('/places', {
    ...options,
    tags: ['places'],
  })
}

export async function getPlaceBySlug(slug: string, options?: FetchOptions): Promise<Place | null> {
  const result = await fetchAPI<PaginatedDocs<Place>>(
    `/places?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    {
      ...options,
      tags: ['places', `places:${slug}`],
    }
  )
  return result.docs[0] || null
}

// ===========================================
// Collections (Museum)
// ===========================================

export interface MuseumCollection {
  id: string
  title: string
  slug: string
  description?: any
  featuredImage?: any
  parent?: MuseumCollection | string
}

export async function getMuseumCollections(options?: FetchOptions): Promise<PaginatedDocs<MuseumCollection>> {
  return fetchAPI<PaginatedDocs<MuseumCollection>>('/museum-collections', {
    ...options,
    tags: ['museum-collections'],
  })
}

export async function getMuseumCollectionBySlug(
  slug: string,
  options?: FetchOptions
): Promise<MuseumCollection | null> {
  const result = await fetchAPI<PaginatedDocs<MuseumCollection>>(
    `/museum-collections?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    {
      ...options,
      tags: ['museum-collections', `museum-collections:${slug}`],
    }
  )
  return result.docs[0] || null
}

// ===========================================
// Globals
// ===========================================

export interface Header {
  logo?: any
  logoText?: string
  navItems?: any[]
  ctaButton?: any
}

export interface Footer {
  logo?: any
  description?: string
  columns?: any[]
  socialLinks?: any[]
  copyright?: string
  legalLinks?: any[]
}

export interface Settings {
  siteName: string
  siteDescription?: string
  siteUrl?: string
  favicon?: any
  logo?: any
  defaultMeta?: any
  socialProfiles?: any[]
}

export async function getHeader(options?: FetchOptions): Promise<Header> {
  return fetchAPI<Header>('/globals/header', {
    ...options,
    tags: ['header'],
  })
}

export async function getFooter(options?: FetchOptions): Promise<Footer> {
  return fetchAPI<Footer>('/globals/footer', {
    ...options,
    tags: ['footer'],
  })
}

export async function getSettings(options?: FetchOptions): Promise<Settings> {
  return fetchAPI<Settings>('/globals/settings', {
    ...options,
    tags: ['settings'],
  })
}

// ===========================================
// Search
// ===========================================

export async function search(
  query: string,
  options?: FetchOptions
): Promise<PaginatedDocs<any>> {
  return fetchAPI<PaginatedDocs<any>>(
    `/search?where[title][contains]=${encodeURIComponent(query)}`,
    options
  )
}
