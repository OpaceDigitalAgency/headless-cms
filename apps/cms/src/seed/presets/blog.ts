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

    const posts = [
      {
        title: 'Getting Started with Modern Web Development',
        slug: 'getting-started-modern-web-development',
        excerpt: 'A comprehensive guide to starting your journey in modern web development with the latest tools and frameworks.',
        category: 'technology',
        content: createRichTextParagraphs([
          'Web development has evolved significantly over the past few years. With the rise of modern frameworks and tools, building websites has become more efficient and enjoyable.',
          'In this guide, we will explore the essential tools and technologies you need to know to get started with modern web development.',
          'From React and Next.js to Tailwind CSS and TypeScript, we will cover everything you need to build professional-grade web applications.',
        ]),
      },
      {
        title: 'The Art of Minimalist Design',
        slug: 'art-of-minimalist-design',
        excerpt: 'Discover how less can be more in design. Learn the principles of minimalism and how to apply them to your projects.',
        category: 'design',
        content: createRichTextParagraphs([
          'Minimalist design is not just about removing elements—it is about finding the perfect balance between form and function.',
          'By focusing on essential elements and removing unnecessary clutter, minimalist design creates clean, elegant, and user-friendly interfaces.',
          'In this article, we explore the core principles of minimalist design and provide practical tips for implementing them in your projects.',
        ]),
      },
      {
        title: 'Building a Successful Online Business',
        slug: 'building-successful-online-business',
        excerpt: 'Learn the key strategies and tactics for building and growing a successful online business in today\'s digital landscape.',
        category: 'business',
        content: createRichTextParagraphs([
          'Starting an online business has never been more accessible. With the right strategy and tools, anyone can build a successful digital venture.',
          'This guide covers everything from finding your niche and building your brand to marketing strategies and scaling your business.',
          'Whether you are a first-time entrepreneur or looking to expand your existing business online, these insights will help you succeed.',
        ]),
      },
      {
        title: 'Productivity Tips for Remote Workers',
        slug: 'productivity-tips-remote-workers',
        excerpt: 'Maximize your productivity while working from home with these proven strategies and tools.',
        category: 'lifestyle',
        content: createRichTextParagraphs([
          'Remote work offers incredible flexibility, but it also comes with unique challenges. Staying productive requires intentional effort and the right systems.',
          'In this article, we share practical tips for creating an effective home office, managing your time, and maintaining work-life balance.',
          'From time-blocking techniques to the best productivity apps, discover how to make the most of your remote work experience.',
        ]),
      },
      {
        title: 'Introduction to TypeScript for JavaScript Developers',
        slug: 'introduction-typescript-javascript-developers',
        excerpt: 'Make the transition from JavaScript to TypeScript and discover how static typing can improve your code quality.',
        category: 'technology',
        content: createRichTextParagraphs([
          'TypeScript has become an essential tool for modern JavaScript development. By adding static types to JavaScript, it helps catch errors early and improves code maintainability.',
          'This guide is designed for JavaScript developers who want to learn TypeScript. We will cover the basics of type annotations, interfaces, and generics.',
          'By the end of this article, you will have a solid foundation in TypeScript and be ready to start using it in your projects.',
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
