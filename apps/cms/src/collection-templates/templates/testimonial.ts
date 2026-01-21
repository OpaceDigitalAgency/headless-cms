import type { CollectionTemplate } from '../types'

export const testimonialTemplate: CollectionTemplate = {
  id: 'testimonial',
  name: 'Testimonials',
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
      blocks: [
        {
          blockType: 'stats',
          heading: 'Impact',
          stats: [
            { value: '2x', label: 'Delivery Speed' },
            { value: '3', label: 'Teams' },
            { value: '4.8', label: 'Satisfaction' },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'Our content finally feels consistent',
      slug: 'content-feels-consistent',
      excerpt: '“Everything looks and feels cohesive now.”',
      content: '“Everything looks and feels cohesive now. The structure is easy to maintain.”',
      blocks: [
        {
          blockType: 'features',
          heading: 'Why It Worked',
          layout: 'grid',
          items: [
            { title: 'Consistent Templates', description: 'Unified layouts across content.' },
            { title: 'Clear Governance', description: 'Defined roles and reviews.' },
            { title: 'Reusable Blocks', description: 'Faster publishing cycles.' },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'Results we could measure',
      slug: 'results-we-could-measure',
      excerpt: '“Engagement increased within weeks.”',
      content: '“Engagement increased within weeks and we now have a clear reporting baseline.”',
      blocks: [
        {
          blockType: 'grid',
          heading: 'Performance Wins',
          style: 'stats',
          columns: '3',
          items: [
            { title: 'Engagement', stat: '+28%', description: 'Time on page increase.' },
            { title: 'Leads', stat: '+18%', description: 'Form conversion lift.' },
            { title: 'Bounce', stat: '-22%', description: 'Reduced drop-off.' },
          ],
        },
      ],
      status: 'published',
    },
  ],
}

export default testimonialTemplate
