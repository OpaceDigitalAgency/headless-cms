import type { CollectionTemplate } from '../types'

export const galleryTemplate: CollectionTemplate = {
  id: 'gallery',
  name: 'Galleries',
  description: 'Curated galleries of visual work or media.',
  category: 'archive',
  icon: 'archive',
  defaultSlug: 'galleries',
  defaultSingular: 'Gallery',
  defaultPlural: 'Galleries',
  adminGroup: 'Collections',
  status: 'available',
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 3,
  contentTypeTemplate: {
    template: 'archive-item',
    icon: 'archive',
    hasArchive: true,
    archiveSlug: 'galleries',
  },
  seedItems: [
    {
      title: 'Studio Highlights',
      slug: 'studio-highlights',
      excerpt: 'A curated selection of recent work.',
      content: 'A highlight reel of recent projects and visuals.',
      status: 'published',
    },
    {
      title: 'Product Collection',
      slug: 'product-collection',
      excerpt: 'Visuals showcasing new releases and features.',
      content: 'A gallery focused on key product visuals and details.',
      status: 'published',
    },
    {
      title: 'Event Moments',
      slug: 'event-moments',
      excerpt: 'Key moments captured from recent events.',
      content: 'A gallery of images and highlights from live events.',
      status: 'published',
    },
  ],
}

export default galleryTemplate
