export const seoCollectionSlugs = [
  'pages',
  'posts',
] as const

export type SeoCollectionSlug = (typeof seoCollectionSlugs)[number]
