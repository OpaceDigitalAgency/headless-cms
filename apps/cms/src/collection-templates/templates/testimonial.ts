import type { CollectionTemplate } from '../types'

export const testimonialTemplate: CollectionTemplate = {
  id: 'testimonial',
  name: 'Testimonial',
  description: 'Customer quotes and endorsements.',
  category: 'archive',
  icon: 'archive',
  defaultSlug: 'testimonials',
  defaultSingular: 'Testimonial',
  defaultPlural: 'Testimonials',
  adminGroup: 'Collections',
  status: 'available',
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 3,
  contentTypeTemplate: {
    template: 'archive-item',
    icon: 'archive',
    hasArchive: true,
    archiveSlug: 'testimonials',
  },
  seedItems: [
    {
      title: 'A clear process and great outcomes',
      slug: 'clear-process-great-outcomes',
      excerpt: '“We shipped faster and with more confidence.”',
      content: '“We shipped faster and with more confidence. The workflow was clear and collaborative.”',
      status: 'published',
    },
    {
      title: 'Our content finally feels consistent',
      slug: 'content-feels-consistent',
      excerpt: '“Everything looks and feels cohesive now.”',
      content: '“Everything looks and feels cohesive now. The structure is easy to maintain.”',
      status: 'published',
    },
    {
      title: 'Results we could measure',
      slug: 'results-we-could-measure',
      excerpt: '“Engagement increased within weeks.”',
      content: '“Engagement increased within weeks and we now have a clear reporting baseline.”',
      status: 'published',
    },
  ],
}

export default testimonialTemplate
