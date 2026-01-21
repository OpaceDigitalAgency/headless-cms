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
      blocks: [
        {
          blockType: 'grid',
          heading: 'Course Outline',
          style: 'cards',
          columns: '3',
          items: [
            { title: 'Positioning', description: 'Define your market stance.' },
            { title: 'Objectives', description: 'Set measurable targets.' },
            { title: 'Roadmap', description: 'Translate goals into action.' },
          ],
        },
        {
          blockType: 'stats',
          heading: 'Course Details',
          stats: [
            { value: '4', label: 'Modules' },
            { value: '6h', label: 'Video' },
            { value: '3', label: 'Exercises' },
          ],
        },
      ],
      status: 'published',
    },
    {
      title: 'Content Operations',
      slug: 'content-operations',
      excerpt: 'Build a sustainable content system that scales.',
      content: 'Process, tooling, and governance for consistent publishing.',
      blocks: [
        {
          blockType: 'features',
          heading: 'Key Topics',
          layout: 'grid',
          items: [
            { title: 'Workflow', description: 'Editorial stages and QA.' },
            { title: 'Tooling', description: 'CMS and automation stack.' },
            { title: 'Governance', description: 'Roles, permissions, and standards.' },
          ],
        },
        {
          blockType: 'cta',
          heading: 'Get the Playbook',
          description: 'Download templates and checklists.',
          links: [
            { label: 'Request Access', url: '/contact', variant: 'primary' },
          ],
          backgroundColor: 'light',
        },
      ],
      status: 'published',
    },
    {
      title: 'Analytics for Teams',
      slug: 'analytics-for-teams',
      excerpt: 'Turn data into insights your team can act on.',
      content: 'A course on metrics, dashboards, and decision-making.',
      blocks: [
        {
          blockType: 'grid',
          heading: 'Skills You\'ll Build',
          style: 'cards',
          columns: '2',
          items: [
            { title: 'KPI Design', description: 'Choose meaningful metrics.' },
            { title: 'Dashboarding', description: 'Build actionable reports.' },
            { title: 'Insight Sharing', description: 'Communicate findings clearly.' },
            { title: 'Optimization', description: 'Iterate with data.' },
          ],
        },
      ],
      status: 'published',
    },
  ],
}

export default courseTemplate
