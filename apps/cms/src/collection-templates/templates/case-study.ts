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
      status: 'published',
    },
    {
      title: 'Local Brand Relaunch',
      slug: 'local-brand-relaunch',
      excerpt: 'A refreshed identity and content system for growth.',
      content: 'A new narrative, visual language, and publishing workflow.',
      status: 'published',
    },
    {
      title: 'Service Design Sprint',
      slug: 'service-design-sprint',
      excerpt: 'Rapid validation of a new service offering.',
      content: 'A focused sprint delivered validated concepts and a delivery plan.',
      status: 'published',
    },
  ],
}

export default caseStudyTemplate
