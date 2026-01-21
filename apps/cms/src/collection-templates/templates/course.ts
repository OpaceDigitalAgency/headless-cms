import type { CollectionTemplate } from '../types'

export const courseTemplate: CollectionTemplate = {
  id: 'course',
  name: 'Courses',
  description: 'Structured learning programs with lessons, resources, and outcomes.',
  category: 'archive',
  icon: 'archive',
  defaultSlug: 'courses',
  defaultSingular: 'Course',
  defaultPlural: 'Courses',
  adminGroup: 'Collections',
  status: 'available',
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 3,
  contentTypeTemplate: {
    template: 'archive-item',
    icon: 'archive',
    hasArchive: true,
    archiveSlug: 'courses',
  },
  seedItems: [
    {
      title: 'Intro to Strategy',
      slug: 'intro-to-strategy',
      excerpt: 'Learn the fundamentals of positioning and planning.',
      content: 'A practical introduction to strategic thinking and measurable outcomes.',
      status: 'published',
    },
    {
      title: 'Content Operations',
      slug: 'content-operations',
      excerpt: 'Build a sustainable content system that scales.',
      content: 'Process, tooling, and governance for consistent publishing.',
      status: 'published',
    },
    {
      title: 'Analytics for Teams',
      slug: 'analytics-for-teams',
      excerpt: 'Turn data into insights your team can act on.',
      content: 'A course on metrics, dashboards, and decision-making.',
      status: 'published',
    },
  ],
}

export default courseTemplate
