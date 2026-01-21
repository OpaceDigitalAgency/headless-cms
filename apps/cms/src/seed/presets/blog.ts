/**
 * Blog Preset Seeder
 * 
 * Seeds sample data for the blog-astro preset.
 * Creates posts, categories, and pages suitable for a blog site.
 */

import type { Payload } from 'payload'
import { BaseSeeder, createRichText, createRichTextParagraphs, type SeedOptions } from '../base'

export class BlogSeeder extends BaseSeeder {
  constructor(payload: Payload, options: SeedOptions = {}) {
    super(payload, options)
  }

  getPresetId(): string {
    return 'blog-astro'
  }

  getCollections(): string[] {
    return ['pages', 'posts', 'categories', 'content-types', 'custom-items']
  }

  async seed(): Promise<void> {
    this.log('Starting blog seed...')

    // Seed categories first (no dependencies)
    const categories = await this.seedCategories()

    // Seed pages
    await this.seedPages()

    // Seed posts (depends on categories)
    await this.seedPosts(categories)

    // Seed a custom content type with items
    await this.seedCustomContentType({
      name: 'Reviews',
      slug: 'reviews',
      singularLabel: 'Review',
      pluralLabel: 'Reviews',
      icon: 'document',
      template: 'article',
      customFields: [
        { name: 'rating', label: 'Rating', type: 'number', required: true },
        { name: 'product', label: 'Product', type: 'text', required: true },
      ],
      items: [
        {
          title: 'Payload CMS Review',
          slug: 'payload-cms-review',
          excerpt: 'A quick look at how Payload compares for content teams.',
          customData: { rating: 4.5, product: 'Payload CMS' },
        },
      ],
    })

    // Update globals
    await this.seedGlobals()

    this.log('Blog seed completed!')
  }

  async clear(): Promise<void> {
    this.log('Clearing blog data...')
    
    // Clear in reverse dependency order
    await this.clearCollection('posts')
    await this.clearCollection('pages')
    await this.clearCollection('custom-items')
    await this.clearCollection('content-types')
    await this.clearCollection('categories')
    
    this.log('Blog data cleared!')
  }

  private async seedCategories(): Promise<Record<string, string>> {
    if (!this.shouldSeedCollection('categories')) {
      return {}
    }

    this.log('Seeding categories...')
    
    const categoryData = [
      { name: 'Technology', slug: 'technology', description: 'Tech news, tutorials, and insights' },
      { name: 'Design', slug: 'design', description: 'UI/UX, graphic design, and creative inspiration' },
      { name: 'Business', slug: 'business', description: 'Entrepreneurship, marketing, and strategy' },
      { name: 'Lifestyle', slug: 'lifestyle', description: 'Personal development and life tips' },
    ]

    const categories: Record<string, string> = {}
    
    for (const data of categoryData.slice(0, this.getItemCount('categories', 4))) {
      const category = await this.create('categories', {
        title: data.name,
        slug: data.slug,
        description: data.description,
      })
      categories[data.slug] = category.id
    }

    return categories
  }

  private async seedPages(): Promise<void> {
    if (!this.shouldSeedCollection('pages')) {
      return
    }

    this.log('Seeding pages...')

    // Home page
    await this.create('pages', {
      title: 'Home',
      slug: 'home',
      template: 'home',
      _status: 'published',
      hero: {
        type: 'standard',
        heading: 'Welcome to Our Blog',
        subheading: 'Discover stories, insights, and ideas that inspire.',
      },
      content: [
        {
          blockType: 'archive',
          collection: 'posts',
          limit: 6,
          showFeaturedImage: true,
          showExcerpt: true,
          showDate: true,
          showCategory: true,
        },
      ],
    })

    // About page
    await this.create('pages', {
      title: 'About',
      slug: 'about',
      template: 'detail',
      _status: 'published',
      hero: {
        type: 'minimal',
        heading: 'About Us',
        subheading: 'Learn more about who we are and what we do.',
      },
      content: [
        {
          blockType: 'content',
          columns: 'oneColumn',
          content: createRichTextParagraphs([
            'We are a team of passionate writers and creators dedicated to sharing knowledge and inspiring others.',
            'Our blog covers a wide range of topics from technology and design to business and lifestyle.',
            'Founded in 2024, we have grown to become a trusted source of information and inspiration for thousands of readers worldwide.',
          ]),
        },
      ],
    })

    // Contact page
    await this.create('pages', {
      title: 'Contact',
      slug: 'contact',
      template: 'detail',
      _status: 'published',
      hero: {
        type: 'minimal',
        heading: 'Get in Touch',
        subheading: 'We would love to hear from you.',
      },
      content: [
        {
          blockType: 'content',
          columns: 'oneColumn',
          content: createRichText('Have a question or want to collaborate? Drop us a message and we will get back to you as soon as possible.'),
        },
        {
          blockType: 'form',
          formType: 'contact',
        },
      ],
    })
  }

  private async seedPosts(categories: Record<string, string>): Promise<void> {
    if (!this.shouldSeedCollection('posts')) {
      return
    }

    this.log('Seeding posts...')

    // Get admin user to use as author
    const adminId = await this.getOrCreateAdminUser()

    const posts = [
      {
        title: 'Standard Article with Hero',
        slug: 'standard-article-with-hero',
        excerpt: 'Classic single-column layout with hero image, rich text content, and call-to-action.',
        category: 'technology',
        content: createRichTextParagraphs([
          'This is a standard article layout showcasing the classic single-column design pattern.',
          'Perfect for blog posts, news articles, and long-form content that benefits from a clean, focused reading experience.',
          'The hero section at the top draws attention, whilst the rich text content below provides the main narrative.',
          'This layout is ideal for articles that prioritise readability and engagement with minimal distractions.',
        ]),
      },
      {
        title: 'Feature Story with Grid Layout',
        slug: 'feature-story-with-grid-layout',
        excerpt: 'Multi-column layout showcasing grid blocks, image galleries, and featured content sections.',
        category: 'design',
        content: createRichTextParagraphs([
          'Feature stories benefit from dynamic, multi-column layouts that showcase visual content alongside text.',
          'Grid blocks allow you to display related items, products, or featured sections in an organised, visually appealing way.',
          'Image galleries can be embedded to tell a visual story, whilst maintaining a professional appearance.',
          'This layout works exceptionally well for case studies, portfolio pieces, and visually-rich narratives.',
        ]),
      },
      {
        title: 'In-Depth Guide with FAQ Section',
        slug: 'in-depth-guide-with-faq-section',
        excerpt: 'Comprehensive article with table of contents, multiple sections, and FAQ block for common questions.',
        category: 'business',
        content: createRichTextParagraphs([
          'Comprehensive guides benefit from structured layouts with clear sections and navigation aids.',
          'FAQ blocks at the end address common questions, improving user experience and reducing support burden.',
          'Multiple content sections allow you to break up long-form content into digestible, scannable chunks.',
          'This layout is perfect for tutorials, how-to guides, and educational content that requires depth and clarity.',
        ]),
      },
      {
        title: 'Case Study with Timeline',
        slug: 'case-study-with-timeline',
        excerpt: 'Narrative-driven post with timeline block showing project progression and key milestones.',
        category: 'business',
        content: createRichTextParagraphs([
          'Case studies tell a story of transformation, progress, and results. Timeline blocks are perfect for visualising project progression.',
          'By showing key milestones and achievements chronologically, you create a compelling narrative arc.',
          'This layout helps readers understand the journey, challenges overcome, and outcomes achieved.',
          'Ideal for showcasing client success stories, project retrospectives, and historical narratives.',
        ]),
      },
      {
        title: 'News Brief with Media Gallery',
        slug: 'news-brief-with-media-gallery',
        excerpt: 'Concise update with embedded media gallery, multiple images, and quick-reference callouts.',
        category: 'technology',
        content: createRichTextParagraphs([
          'News briefs require concise, scannable content that gets straight to the point.',
          'Media galleries showcase multiple images or videos, perfect for announcements, events, or product launches.',
          'Quick-reference callouts highlight key information, making content accessible at a glance.',
          'This layout is ideal for news updates, announcements, and time-sensitive content that needs immediate impact.',
        ]),
      },
    ]

    for (const post of posts.slice(0, this.getItemCount('posts', 5))) {
      await this.create('posts', {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        categories: categories[post.category] ? [categories[post.category]] : [],
        author: adminId,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      })
    }
  }

  private async seedGlobals(): Promise<void> {
    this.log('Seeding globals...')

    // Header
    await this.updateGlobal('header', {
      logo: {
        text: 'My Blog',
      },
      navItems: [
        { link: { type: 'custom', label: 'Home', url: '/' } },
        { link: { type: 'custom', label: 'Blog', url: '/blog' } },
        { link: { type: 'custom', label: 'About', url: '/about' } },
        { link: { type: 'custom', label: 'Contact', url: '/contact' } },
      ],
    })

    // Footer
    await this.updateGlobal('footer', {
      copyright: `© ${new Date().getFullYear()} My Blog. All rights reserved.`,
      columns: [
        {
          label: 'Navigation',
          navItems: [
            { link: { type: 'custom', label: 'Home', url: '/' } },
            { link: { type: 'custom', label: 'Blog', url: '/blog' } },
            { link: { type: 'custom', label: 'About', url: '/about' } },
          ],
        },
        {
          label: 'Categories',
          navItems: [
            { link: { type: 'custom', label: 'Technology', url: '/category/technology' } },
            { link: { type: 'custom', label: 'Design', url: '/category/design' } },
            { link: { type: 'custom', label: 'Business', url: '/category/business' } },
          ],
        },
      ],
    })

    // Settings
    await this.updateGlobal('settings', {
      siteName: 'My Blog',
      siteDescription: 'A blog about technology, design, business, and lifestyle.',
    })
  }
}

export default BlogSeeder
