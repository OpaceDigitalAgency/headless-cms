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

    // Home page - Rich, well-designed homepage
    if (this.shouldSeedItem('home')) {
      await this.create('pages', {
        title: 'Home',
        slug: 'home',
        template: 'home',
        _status: 'published',
        hero: {
          type: 'fullscreen',
          heading: 'Discover Stories That Inspire',
          subheading: 'Explore insights, ideas, and perspectives from our community of writers and thinkers.',
          links: [
            { label: 'Read Latest Articles', url: '/blog', variant: 'primary' },
            { label: 'Learn More', url: '/about', variant: 'secondary' },
          ],
        },
        content: [
          // Featured content section with intro
          {
            blockType: 'content',
            backgroundColor: 'light',
            paddingTop: 'large',
            paddingBottom: 'large',
            columns: [
              {
                size: 'full',
                richText: createRichTextParagraphs([
                  'Welcome to our blog, where we share thoughtful articles on technology, design, business, and lifestyle.',
                  'Whether you\'re looking for practical tips, industry insights, or inspiring stories, you\'ll find it here. Our team of passionate writers and thinkers is dedicated to delivering quality content that educates, inspires, and entertains.',
                ]),
              },
            ],
          },
          // Stats section
          {
            blockType: 'stats',
            items: [
              { label: 'Articles Published', value: '150+' },
              { label: 'Active Readers', value: '50K+' },
              { label: 'Categories', value: '12' },
              { label: 'Years Active', value: '5+' },
            ],
          },
          // Latest posts grid
          {
            blockType: 'archive',
            collection: 'posts',
            limit: 6,
            showFeaturedImage: true,
            showExcerpt: true,
            showDate: true,
            showCategory: true,
          },
          // Testimonials section
          {
            blockType: 'testimonials',
            heading: 'What Our Readers Say',
            items: [
              {
                quote: 'The articles here have genuinely helped me improve my skills and stay updated with industry trends.',
                name: 'Sarah Johnson',
                role: 'Product Manager',
                company: 'Tech Innovations Inc',
                rating: 5,
              },
              {
                quote: 'Excellent writing quality and diverse topics. This is my go-to source for reliable information.',
                name: 'Michael Chen',
                role: 'Software Engineer',
                company: 'Digital Solutions Ltd',
                rating: 5,
              },
              {
                quote: 'The design articles are particularly insightful. Highly recommend to anyone in the creative field.',
                name: 'Emma Williams',
                role: 'UX Designer',
                company: 'Creative Studios',
                rating: 5,
              },
            ],
          },
          // CTA section
          {
            blockType: 'cta',
            heading: 'Stay Updated with Our Latest Content',
            description: 'Subscribe to our newsletter to get the latest articles, insights, and exclusive content delivered directly to your inbox.',
            buttons: [
              { label: 'Subscribe Now', url: '/contact', variant: 'primary' },
            ],
          },
        ],
      })
    }

    // About page - Comprehensive about page
    if (this.shouldSeedItem('about')) {
      await this.create('pages', {
        title: 'About Us',
        slug: 'about',
        template: 'detail',
        _status: 'published',
        hero: {
          type: 'standard',
          heading: 'About Our Blog',
          subheading: 'Learn more about our mission, values, and the team behind the content.',
        },
        content: [
          // Mission section
          {
            blockType: 'content',
            backgroundColor: 'none',
            paddingTop: 'large',
            paddingBottom: 'large',
            columns: [
              {
                size: 'full',
                richText: createRichTextParagraphs([
                  'We are a team of passionate writers, designers, and thinkers dedicated to sharing knowledge and inspiring others through thoughtful content.',
                  'Our blog covers a wide range of topics from technology and design to business and lifestyle. We believe in the power of storytelling and the importance of sharing diverse perspectives.',
                  'Founded in 2024, we have grown to become a trusted source of information and inspiration for thousands of readers worldwide.',
                ]),
              },
            ],
          },
          // Features section - What We Offer
          {
            blockType: 'features',
            heading: 'What We Offer',
            features: [
              {
                title: 'In-Depth Articles',
                description: 'Comprehensive guides and long-form content that explores topics in detail.',
              },
              {
                title: 'Expert Insights',
                description: 'Perspectives from industry leaders and experienced professionals.',
              },
              {
                title: 'Practical Tips',
                description: 'Actionable advice you can apply to your work and life.',
              },
              {
                title: 'Community',
                description: 'Join a community of curious minds and engaged readers.',
              },
            ],
          },
          // Team section
          {
            blockType: 'team',
            heading: 'Meet Our Team',
            members: [
              {
                name: 'Alex Rivera',
                role: 'Founder & Editor-in-Chief',
                bio: 'With over 10 years of experience in digital media, Alex leads our editorial vision and ensures quality content.',
              },
              {
                name: 'Jordan Smith',
                role: 'Senior Writer',
                bio: 'Specialising in technology and innovation, Jordan brings deep industry knowledge to every article.',
              },
              {
                name: 'Casey Lee',
                role: 'Design & UX Writer',
                bio: 'Casey explores the intersection of design, user experience, and business strategy.',
              },
              {
                name: 'Morgan Taylor',
                role: 'Community Manager',
                bio: 'Morgan builds and nurtures our community, ensuring every reader feels heard and valued.',
              },
            ],
          },
          // Values section
          {
            blockType: 'content',
            backgroundColor: 'light',
            paddingTop: 'large',
            paddingBottom: 'large',
            columns: [
              {
                size: 'full',
                richText: createRichText('Our Core Values'),
              },
              {
                size: 'half',
                richText: createRichTextParagraphs([
                  'Quality: We prioritise well-researched, thoughtfully written content that provides real value.',
                  'Authenticity: We share genuine perspectives and honest insights from our team and contributors.',
                ]),
              },
              {
                size: 'half',
                richText: createRichTextParagraphs([
                  'Inclusivity: We celebrate diverse voices and perspectives from around the world.',
                  'Impact: We aim to inspire positive change and help our readers grow professionally and personally.',
                ]),
              },
            ],
          },
          // CTA section
          {
            blockType: 'cta',
            heading: 'Join Our Community',
            description: 'Subscribe to our newsletter and be the first to receive our latest articles, exclusive insights, and special announcements.',
            buttons: [
              { label: 'Subscribe Now', url: '/contact', variant: 'primary' },
            ],
          },
        ],
      })
    }

    // Contact page - Rich contact page with multiple sections
    if (this.shouldSeedItem('contact')) {
      await this.create('pages', {
        title: 'Contact',
        slug: 'contact',
        template: 'detail',
        _status: 'published',
        hero: {
          type: 'standard',
          heading: 'Get in Touch',
          subheading: 'We would love to hear from you. Send us a message and we will respond as soon as possible.',
        },
        content: [
          // Introduction section
          {
            blockType: 'content',
            backgroundColor: 'none',
            paddingTop: 'large',
            paddingBottom: 'large',
            columns: [
              {
                size: 'full',
                richText: createRichTextParagraphs([
                  'Have a question, suggestion, or just want to say hello? We\'d love to hear from you.',
                  'Whether you\'re interested in collaborating, have feedback on our content, or simply want to connect, please don\'t hesitate to reach out. We read and respond to every message.',
                ]),
              },
            ],
          },
          // Contact info section
          {
            blockType: 'content',
            backgroundColor: 'light',
            paddingTop: 'large',
            paddingBottom: 'large',
            columns: [
              {
                size: 'full',
                richText: createRichText('How to Reach Us'),
              },
              {
                size: 'half',
                richText: createRichTextParagraphs([
                  'Email: hello@myblog.com',
                  'Response time: 24-48 hours',
                  'Available: Monday to Friday, 9 AM - 5 PM EST',
                ]),
              },
              {
                size: 'half',
                richText: createRichTextParagraphs([
                  'Follow us on social media for daily updates and behind-the-scenes content.',
                  'Twitter | LinkedIn | Instagram | Facebook',
                ]),
              },
            ],
          },
          // FAQ section
          {
            blockType: 'faq',
            heading: 'Frequently Asked Questions',
            items: [
              {
                question: 'How often do you publish new articles?',
                answer: createRichText('We publish new articles every week, typically on Mondays and Thursdays. Subscribe to our newsletter to never miss an update.'),
              },
              {
                question: 'Can I contribute to your blog?',
                answer: createRichText('Absolutely! We welcome guest contributions from experts and passionate writers. Please email us with your article idea and a brief bio.'),
              },
              {
                question: 'Do you accept sponsorships or partnerships?',
                answer: createRichText('Yes, we do. We work with brands and organisations that align with our values. Please contact us to discuss partnership opportunities.'),
              },
              {
                question: 'How can I unsubscribe from the newsletter?',
                answer: createRichText('You can unsubscribe at any time by clicking the unsubscribe link at the bottom of any newsletter email.'),
              },
            ],
          },
          // CTA section
          {
            blockType: 'cta',
            heading: 'Ready to Connect?',
            description: 'Fill out the form below and we\'ll get back to you as soon as possible.',
            buttons: [
              { label: 'Send Message', url: '#contact-form', variant: 'primary' },
            ],
          },
        ],
      })
    }
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
      if (this.shouldSeedItem(post.slug)) {
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
  }

  private async seedGlobals(): Promise<void> {
    this.log('Seeding globals...')

    // Header
    await this.updateGlobal('header', {
      logoText: 'My Blog',
      navItems: [
        { label: 'Home', type: 'link', url: '/' },
        { label: 'Blog', type: 'link', url: '/blog' },
        { label: 'About', type: 'link', url: '/about' },
        { label: 'Contact', type: 'link', url: '/contact' },
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
