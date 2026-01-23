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
      blocks: [
        {
          blockType: 'grid',
          heading: 'Gallery Sections',
          style: 'cards',
          columns: '3',
          items: [
            { title: 'Concepts', description: 'Early sketches and explorations.' },
            { title: 'Final Works', description: 'Published campaign visuals.' },
            { title: 'Behind the Scenes', description: 'Studio process moments.' },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'Product Collection',
      slug: 'product-collection',
      excerpt: 'Visuals showcasing new releases and features.',
      content: 'A gallery focused on key product visuals and details.',
      blocks: [
        {
          blockType: 'features',
          heading: 'Product Story',
          variant: 'grid',
          items: [
            { heading: 'Hero Shots', description: 'Signature images for landing pages.' },
            { heading: 'Detail Views', description: 'Macro shots for feature callouts.' },
            { heading: 'Lifestyle', description: 'In-context usage scenarios.' },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'Event Moments',
      slug: 'event-moments',
      excerpt: 'Key moments captured from recent events.',
      content: 'A gallery of images and highlights from live events.',
      blocks: [
        {
          blockType: 'stats',
          heading: 'Event Recap',
          stats: [
            { value: '450+', label: 'Attendees' },
            { value: '12', label: 'Speakers' },
            { value: '2', label: 'Days' },
          ],
        },
      ],
      status: 'published',
    },
  ],
}

export default galleryTemplate
