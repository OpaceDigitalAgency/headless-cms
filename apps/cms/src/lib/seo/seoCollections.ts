export const seoCollectionSlugs = [
  'pages',
  'posts',
  'archive-items',
  'people',
  'places',
  'events',
  'products',
  'custom-items',
  'content-types',
] as const

export type SeoCollectionSlug = (typeof seoCollectionSlugs)[number]
