/**
 * CMS API Client
 * Fetches data from Payload CMS REST API
 */

const CMS_URL = process.env.CMS_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'

export interface FetchOptions {
  draft?: boolean
  depth?: number
  locale?: string
  cache?: RequestCache
  tags?: string[]
}

/**
 * Generic fetch function for CMS API
 */
async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { draft = false, depth = 2, locale, cache = 'force-cache', tags } = options

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

  // Add Next.js cache tags for revalidation
  if (tags && tags.length > 0) {
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
