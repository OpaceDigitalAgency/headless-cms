import type { CollectionTemplate } from '../types'

export const caseStudyTemplate: CollectionTemplate = {
  id: 'case-study',
  name: 'Case Studies',
  description: 'Project stories with outcomes, challenges, and results.',
  category: 'archive',
  icon: 'archive',
  defaultSlug: 'case-studies',
  defaultSingular: 'Case Study',
  defaultPlural: 'Case Studies',
  adminGroup: 'Collections',
  status: 'available',
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 3,
  contentTypeTemplate: {
    template: 'archive-item',
    icon: 'archive',
    hasArchive: true,
    archiveSlug: 'case-studies',
  },
  seedItems: [
    {
      title: 'Modernized Ecommerce Stack',
      slug: 'modernized-ecommerce-stack',
      excerpt: 'A platform refresh that improved conversion and speed.',
      content: 'We streamlined the architecture, improved performance, and lifted conversions.',
      blocks: [
        {
          blockType: 'stats',
          heading: 'Outcomes',
          stats: [
            { value: '2.1x', label: 'Conversion' },
            { value: '48%', label: 'Faster TTFB' },
            { value: '30%', label: 'Bounce Drop' },
          ],
        },
        {
          blockType: 'grid',
          heading: 'Key Improvements',
          style: 'cards',
          columns: '3',
          items: [
            { title: 'Architecture', description: 'Simplified deployment and caching.' },
            { title: 'UX', description: 'Streamlined checkout flow.' },
            { title: 'Search', description: 'Improved product discovery.' },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'Local Brand Relaunch',
      slug: 'local-brand-relaunch',
      excerpt: 'A refreshed identity and content system for growth.',
      content: 'A new narrative, visual language, and publishing workflow.',
      blocks: [
        {
          blockType: 'features',
          heading: 'What We Delivered',
          variant: 'grid',
          items: [
            { heading: 'Brand System', description: 'Updated identity and guidelines.' },
            { heading: 'Content Model', description: 'Reusable templates and governance.' },
            { heading: 'Launch Plan', description: 'Rollout strategy with milestones.' },
          ],
        },
        {
          blockType: 'testimonials',
          heading: 'Client Note',
          items: [
            { quote: 'Our team finally has a content system that scales.', name: 'Riley Clarke', role: 'Marketing Lead' },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'Service Design Sprint',
      slug: 'service-design-sprint',
      excerpt: 'Rapid validation of a new service offering.',
      content: 'A focused sprint delivered validated concepts and a delivery plan.',
      blocks: [
        {
          blockType: 'grid',
          heading: 'Sprint Outputs',
          style: 'cards',
          columns: '2',
          items: [
            { title: 'Prototype', description: 'Interactive flow for testing.' },
            { title: 'Insights', description: 'User feedback synthesis.' },
            { title: 'Roadmap', description: 'Delivery phases and scope.' },
            { title: 'Business Case', description: 'Expected impact and ROI.' },
          ],
        },
      ],
      status: 'published',
    },
  ],
}

export default caseStudyTemplate
