/**
 * Blog Preset Seeder
 *
 * Seeds sample data for the blog preset.
 * Creates posts, categories, and pages suitable for a blog site.
 */

import type { Payload } from 'payload'
import { BaseSeeder, createRichText, createRichTextParagraphs, type SeedOptions } from '../base'
import { ensureShowcasePage } from '../showcase'

export class BlogSeeder extends BaseSeeder {
  constructor(payload: Payload, options: SeedOptions = {}) {
    super(payload, options)
  }

  getPresetId(): string {
    return 'blog'
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
          content: createRichTextParagraphs([
            'Payload delivers a flexible developer experience with a modern admin UI.',
            'This review highlights strengths in customization, typing, and performance.',
          ]),
          blocks: [
            {
              blockType: 'stats',
              heading: 'Review Snapshot',
              items: [
                { value: '4.5/5', label: 'Overall' },
                { value: '5/5', label: 'Flexibility' },
                { value: '4/5', label: 'UX' },
              ],
            },
            {
              blockType: 'features',
              heading: 'Standout Features',
              layout: 'grid',
              items: [
                { heading: 'Type Safety', description: 'Generated types and strong schemas.' },
                { heading: 'Custom UI', description: 'Extensible admin experience.' },
                { heading: 'Performance', description: 'Optimized API responses.' },
              ],
            },
          ],
          customData: { rating: 4.5, product: 'Payload CMS' },
        },
        {
          title: 'Astro CMS Starter Review',
          slug: 'astro-cms-starter-review',
          excerpt: 'A design-forward starter focused on performance and editorial flow.',
          content: createRichTextParagraphs([
            'The Astro starter prioritizes speed and structured content layouts.',
            'Great for marketing sites that need flexible blocks and fast build times.',
          ]),
          blocks: [
            {
              blockType: 'testimonials',
              heading: 'Editor Feedback',
              items: [
                { quote: 'The layout tools are easy to grasp.', name: 'Casey Nguyen', role: 'Content Lead' },
                { quote: 'Fast previews make iteration painless.', name: 'Morgan Lee', role: 'Designer' },
              ],
            },
          ],
          customData: { rating: 4.2, product: 'Astro CMS Starter' },
        },
        {
          title: 'Next.js Commerce Review',
          slug: 'nextjs-commerce-review',
          excerpt: 'A quick assessment of commerce readiness and extensibility.',
          content: createRichTextParagraphs([
            'A solid foundation for modern commerce with clean data models.',
            'Best suited for teams with in-house engineering support.',
          ]),
          blocks: [
            {
              blockType: 'grid',
              heading: 'Key Scores',
              style: 'stats',
              columns: '3',
              items: [
                { heading: 'Performance', stat: '4.6', description: 'Core Web Vitals friendly.' },
                { heading: 'Flexibility', stat: '4.4', description: 'Composable architecture.' },
                { heading: 'UX', stat: '4.1', description: 'Needs editorial polish.' },
              ],
            },
          ],
          customData: { rating: 4.1, product: 'Next.js Commerce' },
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

  public async seedCollection(collection: string): Promise<void> {
    switch (collection) {
      case 'categories':
        await this.seedCategories()
        return
      case 'pages':
        await this.seedPages()
        return
      case 'posts': {
        const categories = await this.seedCategories()
        await this.seedPosts(categories)
        return
      }
      case 'content-types':
      case 'custom-items':
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
              content: createRichTextParagraphs([
                'Payload delivers a flexible developer experience with a modern admin UI.',
                'This review highlights strengths in customization, typing, and performance.',
              ]),
              blocks: [
                {
                  blockType: 'stats',
                  heading: 'Review Snapshot',
                  items: [
                    { value: '4.5/5', label: 'Overall' },
                    { value: '5/5', label: 'Flexibility' },
                    { value: '4/5', label: 'UX' },
                  ],
                },
              ],
              customData: { rating: 4.5, product: 'Payload CMS' },
            },
          ],
        })
        return
      default:
        this.log(`No seed handler for collection: ${collection}`)
    }
  }

  public async seedItem(collection: string, slug: string): Promise<void> {
    switch (collection) {
      case 'posts':
        await this.seedSinglePost(slug)
        return
      case 'pages':
        await this.seedSinglePage(slug)
        return
      case 'categories':
        await this.seedSingleCategory(slug)
        return
      default:
        this.log(`No seed item handler for collection: ${collection}`)
    }
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
      if (await this.checkIfExists('categories', data.slug)) {
        this.log(`Category "${data.name}" already exists, skipping.`)
        // Try to get the existing category ID to return it
        const existing = await this.payload.find({
          collection: 'categories',
          where: { slug: { equals: data.slug } },
          limit: 1,
          depth: 0,
        })
        if (existing.docs[0]) {
          categories[data.slug] = existing.docs[0].id as any
        }
        continue
      }

      const category = await this.create('categories', {
        title: data.name,
        slug: data.slug,
        description: data.description,
      })
      categories[data.slug] = category.id
    }

    this.log(`Seeding categories completed. Found/Created: ${Object.keys(categories).join(', ')}`)
    return categories
  }

  private async seedPages(): Promise<void> {
    if (!this.shouldSeedCollection('pages')) {
      return
    }

    this.log('Seeding pages...')

    // Home page - Rich, well-designed homepage
    if (this.shouldSeedItem('home')) {
      if (await this.checkIfExists('pages', 'home')) {
        this.log('Home page already exists, skipping.')
      } else {
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
              backgroundColor: 'muted',
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
              heading: 'By The Numbers',
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
              heading: 'Latest Articles',
              relationTo: 'posts',
              limit: 6,
              showImage: true,
              showExcerpt: true,
              showDate: true,
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
              links: [
                { label: 'Subscribe Now', url: '/contact', variant: 'primary' },
              ],
            },
          ],
        })
      }
    }

    // About page - Comprehensive about page
    if (this.shouldSeedItem('about')) {
      if (await this.checkIfExists('pages', 'about')) {
        this.log('About page already exists, skipping.')
      } else {
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
              items: [
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
              backgroundColor: 'muted',
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
              links: [
                { label: 'Subscribe Now', url: '/contact', variant: 'primary' },
              ],
            },
          ],
        })
      }
    }

    // Contact page - Rich contact page with multiple sections
    if (this.shouldSeedItem('contact')) {
      if (await this.checkIfExists('pages', 'contact')) {
        this.log('Contact page already exists, skipping.')
      } else {
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
              backgroundColor: 'muted',
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
              links: [
                { label: 'Send Message', url: '#contact-form', variant: 'primary' },
              ],
            },
          ],
        })
      }
    }

    // Privacy page - Privacy policy page
    if (this.shouldSeedItem('privacy')) {
      if (await this.checkIfExists('pages', 'privacy')) {
        this.log('Privacy page already exists, skipping.')
      } else {
        await this.create('pages', {
          title: 'Privacy Policy',
          slug: 'privacy',
          template: 'detail',
          _status: 'published',
          hero: {
            type: 'minimal',
            heading: 'Privacy Policy',
            subheading: 'How we collect, use, and protect your personal information.',
          },
          content: [
            {
              blockType: 'content',
              backgroundColor: 'none',
              paddingTop: 'large',
              paddingBottom: 'large',
              columns: [
                {
                  size: 'full',
                  richText: createRichTextParagraphs([
                    'Last updated: ' + new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
                    'This Privacy Policy describes how we collect, use, and share your personal information when you visit or use our website.',
                  ]),
                },
              ],
            },
            {
              blockType: 'content',
              backgroundColor: 'muted',
              paddingTop: 'large',
              paddingBottom: 'large',
              columns: [
                {
                  size: 'full',
                  richText: createRichText('Information We Collect'),
                },
                {
                  size: 'full',
                  richText: createRichTextParagraphs([
                    'We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.',
                    'We also automatically collect certain information about your device when you use our website, including your IP address, browser type, and usage data.',
                  ]),
                },
              ],
            },
            {
              blockType: 'content',
              backgroundColor: 'none',
              paddingTop: 'large',
              paddingBottom: 'large',
              columns: [
                {
                  size: 'full',
                  richText: createRichText('How We Use Your Information'),
                },
                {
                  size: 'full',
                  richText: createRichTextParagraphs([
                    'We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalise your experience.',
                    'We may also use your information to send you marketing communications, but you can opt out at any time.',
                  ]),
                },
              ],
            },
            {
              blockType: 'content',
              backgroundColor: 'muted',
              paddingTop: 'large',
              paddingBottom: 'large',
              columns: [
                {
                  size: 'full',
                  richText: createRichText('Information Sharing'),
                },
                {
                  size: 'full',
                  richText: createRichTextParagraphs([
                    'We do not sell your personal information. We may share your information with service providers who help us operate our website and provide our services.',
                    'We may also share information when required by law or to protect our rights and safety.',
                  ]),
                },
              ],
            },
            {
              blockType: 'content',
              backgroundColor: 'none',
              paddingTop: 'large',
              paddingBottom: 'large',
              columns: [
                {
                  size: 'full',
                  richText: createRichText('Your Rights'),
                },
                {
                  size: 'full',
                  richText: createRichTextParagraphs([
                    'You have the right to access, update, or delete your personal information at any time. You can also object to certain processing of your data.',
                    'To exercise these rights, please contact us using the information provided below.',
                  ]),
                },
              ],
            },
            {
              blockType: 'content',
              backgroundColor: 'muted',
              paddingTop: 'large',
              paddingBottom: 'large',
              columns: [
                {
                  size: 'full',
                  richText: createRichText('Contact Us'),
                },
                {
                  size: 'full',
                  richText: createRichTextParagraphs([
                    'If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@myblog.com.',
                  ]),
                },
              ],
            },
          ],
        })
      }
    }

    // Blocks Showcase Page
    if (this.shouldSeedItem('blocks-showcase')) {
      this.log('Creating Blocks Showcase page...')
      await ensureShowcasePage(this.payload, { updateHeader: false })
      this.log('Blocks Showcase page created successfully!')
    }

  }

  private async seedPosts(categories: Record<string, string>): Promise<void> {
    if (!this.shouldSeedCollection('posts')) {
      return
    }

    this.log('Seeding posts...')

    // Get admin user to use as author
    const adminId = await this.getOrCreateAdminUser()

    // Create placeholder featured images
    const heroImage = await this.createPlaceholderMedia('post-hero.png', 'Standard article hero image')
    const gridImage = await this.createPlaceholderMedia('post-grid.png', 'Feature story grid layout')
    const guideImage = await this.createPlaceholderMedia('post-guide.png', 'In-depth guide image')
    const caseStudyImage = await this.createPlaceholderMedia('post-case-study.png', 'Case study timeline')
    const newsImage = await this.createPlaceholderMedia('post-news.png', 'News brief media gallery')

    // Define the 15 posts
    const posts = [
      // Format: [Template] Standard (Hero Focus)
      {
        title: 'The Future of AI in Design',
        slug: 'future-of-ai-in-design',
        excerpt: 'How artificial intelligence is reshaping the creative landscape.',
        category: 'technology',
        featuredImage: heroImage?.id,
        content: createRichTextParagraphs([
          'Artificial Intelligence is no longer just a buzzword; it is a fundamental shift in how we approach design.',
          'From generative algorithms to automated workflows, AI is empowering designers to create faster and more efficiently.',
          'However, the human element remains crucial. Empathy, context, and storytelling are skills that AI cannot replicate.',
        ]),
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Key Shifts',
            layout: 'grid',
            items: [
              { heading: 'Generative UI', description: 'Interfaces that adapt to user needs.' },
              { heading: 'Automated Layouts', description: 'Speeding up production time.' },
              { heading: 'Data-Driven Art', description: 'Visuals informed by user behavior.' },
            ],
          },
        ],
      },
      {
        title: 'Sustainable Living Tips for 2024',
        slug: 'sustainable-living-tips-2024',
        excerpt: 'Practical ways to reduce your carbon footprint starting today.',
        category: 'lifestyle',
        featuredImage: heroImage?.id,
        content: createRichTextParagraphs([
          'Sustainability starts with small, daily choices.',
          'In this article, we explore simple changes you can make to your lifestyle that have a big impact on the planet.',
          'From reducing plastic waste to mindful consumption, every action counts.',
        ]),
        contentBlocks: [
          {
            blockType: 'cta',
            heading: 'Take the Pledge',
            description: 'Join thousands of others in committing to a greener future.',
            links: [{ label: 'Join Now', url: '/contact', variant: 'primary' }],
            backgroundColor: 'muted',
          },
        ],
      },
      {
        title: 'Remote Work Best Practices',
        slug: 'remote-work-best-practices',
        excerpt: 'How to stay productive and maintain work-life balance from home.',
        category: 'business',
        featuredImage: heroImage?.id,
        content: createRichTextParagraphs([
          'Remote work is here to stay, but it comes with its own set of challenges.',
          'maintaining boundaries, communicating effectively, and staying motivated require a proactive approach.',
          'We interviewed 50 remote-first leaders to gather these essential tips.',
        ]),
        contentBlocks: undefined,
      },

      // Format: [Template] Feature (Grid/Visual Layout)
      {
        title: 'Top 10 Design Trends of 2024',
        slug: 'top-10-design-trends-2024',
        excerpt: 'A visual showcase of the styles defining this year.',
        category: 'design',
        featuredImage: gridImage?.id,
        content: createRichTextParagraphs([
          'This year is all about bold minimalism and returning to nature.',
          'We are seeing a surge in earth tones, tactile textures, and typographic experimentation.',
          'Check out our curated list of the most influential trends below.',
        ]),
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Trend Watch',
            style: 'cards',
            columns: '3',
            items: [
              { heading: 'Neo-Brutalism', description: 'Raw, unpolished aesthetics.' },
              { heading: 'Bento Grids', description: 'Organized, modular layouts.' },
              { heading: '3D Elements', description: 'Immersive, interactive visuals.' },
            ],
          },
        ],
      },
      {
        title: 'Best Tech Gadgets of the Year',
        slug: 'best-tech-gadgets-year',
        excerpt: 'Our editors pick the must-have devices for your toolkit.',
        category: 'technology',
        featuredImage: gridImage?.id,
        content: createRichTextParagraphs([
          'We tested hundreds of devices to bring you this definitive list.',
          'Whether you are a creator, a gamer, or a productivity geek, there is something here for everyone.',
        ]),
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Top Picks',
            style: 'cards',
            columns: '3',
            items: [
              { heading: 'VR Headset X', description: 'Best in class immersion.' },
              { heading: 'Laptop Pro', description: 'Unmatched performance.' },
              { heading: 'Smart Watch', description: 'Health tracking redefined.' },
            ],
          },
        ],
      },
      {
        title: 'Startup Success Stories',
        slug: 'startup-success-stories',
        excerpt: 'Meet the founders shaking up their industries.',
        category: 'business',
        featuredImage: gridImage?.id,
        content: createRichTextParagraphs([
          'Every unicorn started as an idea.',
          'We highlight three startups that turned simple concepts into global movements.',
        ]),
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Founders',
            style: 'cards',
            columns: '3',
            items: [
              { heading: 'Jane Doe', description: 'Founder of GreenTech.' },
              { heading: 'John Smith', description: 'CEO of FinFast.' },
              { heading: 'Sarah Lee', description: 'CTO of HealthAI.' },
            ],
          },
        ],
      },

      // Format: [Template] Guide (Structured/Educational)
      {
        title: 'How to Start a Business in 2024',
        slug: 'how-to-start-business-2024',
        excerpt: 'A step-by-step guide from idea to launch.',
        category: 'business',
        featuredImage: guideImage?.id,
        content: createRichTextParagraphs([
          'Starting a business is a journey of a thousand steps.',
          'This guide breaks it down into manageable phases: validation, legal, product, and marketing.',
        ]),
        contentBlocks: [
          {
            blockType: 'faq',
            heading: 'Founder FAQs',
            items: [
              { question: 'Do I need a co-founder?', answer: createRichText('It helps, but solo founders succeed too.') },
              { question: 'How much capital do I need?', answer: createRichText('It depends on your business model.') },
            ],
          },
        ],
      },
      {
        title: 'Beginners Guide to UX Design',
        slug: 'beginners-guide-ux-design',
        excerpt: 'Understanding the basics of user experience.',
        category: 'design',
        featuredImage: guideImage?.id,
        content: createRichTextParagraphs([
          'User Experience is the heart of digital product design.',
          'Learn about personas, user journeys, wireframing, and usability testing.',
        ]),
        contentBlocks: [
          {
            blockType: 'stats',
            heading: 'UX Impact',
            items: [
              { value: '$100', label: 'Return on $1 UX Investment' },
              { value: '400%', label: 'Conversion Lift' },
              { value: '50%', label: 'Less Dev Time' },
            ],
          },
        ],
      },
      {
        title: 'Mastering React Hooks',
        slug: 'mastering-react-hooks',
        excerpt: 'Deep dive into useEffect, useState, and custom hooks.',
        category: 'technology',
        featuredImage: guideImage?.id,
        content: createRichTextParagraphs([
          'Hooks revolutionized how we write React components.',
          'This tutorial covers common pitfalls and best practices for cleaner, more efficient code.',
        ]),
        contentBlocks: undefined,
      },

      // Format: [Template] Case Study (Narrative/Timeline)
      {
        title: 'Rebranding TechCorp',
        slug: 'rebranding-techcorp',
        excerpt: 'How we revitalized a legacy brand for the digital age.',
        category: 'design',
        featuredImage: caseStudyImage?.id,
        content: createRichTextParagraphs([
          'TechCorp had a trust problem. Their visual identity felt stuck in the 90s.',
          'Our challenge was to modernize the brand without alienating their loyal enterprise customer base.',
        ]),
        contentBlocks: [
          {
            blockType: 'timeline',
            heading: 'Project Timeline',
            layout: 'vertical',
            events: [
              { date: 'Phase 1', heading: 'Audit', description: createRichText('Brand perception analysis.') },
              { date: 'Phase 2', heading: 'Identity', description: createRichText('Logo and color system overhaul.') },
              { date: 'Phase 3', heading: 'Rollout', description: createRichText('Global asset update.') },
            ],
          },
        ],
      },
      {
        title: 'Scaling to 1 Million Users',
        slug: 'scaling-to-1-million-users',
        excerpt: 'The infrastructure challenges behind rapid growth.',
        category: 'technology',
        featuredImage: caseStudyImage?.id,
        content: createRichTextParagraphs([
          'When our app went viral, our database connection pool hit its limit immediately.',
          'This is the story of the frantic 48 hours where we rewrote our backend architecture.',
        ]),
        contentBlocks: [
          {
            blockType: 'stats',
            heading: 'Growth Metrics',
            items: [
              { value: '1M', label: 'Users' },
              { value: '5k', label: 'Req/Sec' },
              { value: '99.9%', label: 'Uptime' },
            ],
          },
        ],
      },
      {
        title: 'Green Energy Initiative',
        slug: 'green-energy-initiative',
        excerpt: 'Transitioning our HQ to 100% renewable energy.',
        category: 'business',
        featuredImage: caseStudyImage?.id,
        content: createRichTextParagraphs([
          'Corporate responsibility is more than a slogan.',
          'We installed solar panels and switched providers to achieve carbon neutrality.',
        ]),
        contentBlocks: [
          {
            blockType: 'timeline',
            heading: 'Sustainability Roadmap',
            layout: 'vertical',
            events: [
              { date: '2022', heading: 'Audit', description: createRichText('Energy usage baseline.') },
              { date: '2023', heading: 'Installation', description: createRichText('Solar array deployment.') },
              { date: '2024', heading: 'Net Zero', description: createRichText('Certification achieved.') },
            ],
          },
        ],
      },

      // Format: [Template] News (Brief/Media)
      {
        title: 'New Product V2 Launch',
        slug: 'new-product-v2-launch',
        excerpt: 'Announcing the next generation of our flagship tool.',
        category: 'technology',
        featuredImage: newsImage?.id,
        content: createRichTextParagraphs([
          'It is finally here. Version 2.0 brings the features you asked for.',
          'Dark mode, API access, and 5x performance improvements.',
        ]),
        contentBlocks: [
          {
            blockType: 'cta',
            heading: 'Try It Today',
            description: 'Free 14-day trial for new users.',
            links: [{ label: 'Download', url: '/products', variant: 'primary' }],
            backgroundColor: 'accent',
          },
        ],
      },
      {
        title: 'Design Conference Recap',
        slug: 'design-conference-recap',
        excerpt: 'Highlights from the annual International Design Summit.',
        category: 'design',
        featuredImage: newsImage?.id,
        content: createRichTextParagraphs([
          'Designers from around the world gathered to discuss the future of our industry.',
          'Key themes included accessibility, ethical AI, and sustainable packaging.',
        ]),
        contentBlocks: undefined,
      },
      {
        title: 'Quarterly Earnings Report',
        slug: 'quarterly-earnings-report',
        excerpt: 'Financial highlights for Q3 2024.',
        category: 'business',
        featuredImage: newsImage?.id,
        content: createRichTextParagraphs([
          'We exceeded revenue targets by 15% this quarter.',
          'Growth was driven by strong adoption in the enterprise sector.',
        ]),
        contentBlocks: [
          {
            blockType: 'stats',
            heading: 'Q3 Highlights',
            items: [
              { value: '+15%', label: 'Revenue' },
              { value: '+8%', label: 'Margins' },
              { value: 'Zero', label: 'Debt' },
            ],
          },
        ],
      },
    ]

    for (const post of posts) {
      if (this.shouldSeedItem(post.slug)) {
        if (await this.checkIfExists('posts', post.slug)) {
          this.log(`Post "${post.title}" already exists, skipping.`)
          continue
        }

        this.log(`Seeding post "${post.title}"...`)
        await this.create('posts', {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          contentBlocks: post.contentBlocks,
          featuredImage: post.featuredImage,
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

  private async seedSinglePost(slug: string): Promise<void> {
    this.log(`Seeding single post: ${slug}`)

    // Get admin user to use as author
    const adminId = await this.getOrCreateAdminUser()

    // Ensure we have categories
    const categories = await this.seedCategories()

    // Create placeholder featured images
    const heroImage = await this.createPlaceholderMedia('post-hero.png', 'Standard article hero image')
    const gridImage = await this.createPlaceholderMedia('post-grid.png', 'Feature story grid layout')
    const guideImage = await this.createPlaceholderMedia('post-guide.png', 'In-depth guide image')
    const caseStudyImage = await this.createPlaceholderMedia('post-case-study.png', 'Case study timeline')
    const newsImage = await this.createPlaceholderMedia('post-news.png', 'News brief media gallery')

    // Define all posts
    const allPosts = [
      {
        title: 'Standard Article with Hero',
        slug: 'standard-article-with-hero',
        excerpt: 'Classic single-column layout with hero image, rich text content, and call-to-action.',
        category: 'technology',
        featuredImage: heroImage?.id,
        content: createRichTextParagraphs([
          'This is a standard article layout showcasing the classic single-column design pattern.',
          'Perfect for blog posts, news articles, and long-form content that benefits from a clean, focused reading experience.',
          'The hero section at the top draws attention, whilst the rich text content below provides the main narrative.',
          'This layout is ideal for articles that prioritise readability and engagement with minimal distractions.',
        ]),
        contentBlocks: [
          {
            blockType: 'cta',
            heading: 'Ready to Get Started?',
            description: 'Join thousands of readers who trust our content.',
            links: [{ label: 'Subscribe Now', url: '/subscribe', variant: 'primary' }],
          },
        ],
      },
      {
        title: 'Feature Story with Grid Layout',
        slug: 'feature-story-with-grid-layout',
        excerpt: 'Multi-column layout showcasing grid blocks, image galleries, and featured content sections.',
        category: 'design',
        featuredImage: gridImage?.id,
        content: createRichTextParagraphs([
          'Feature stories benefit from dynamic layouts that break up content into digestible sections.',
          'Grid-based designs allow for visual variety whilst maintaining structure and hierarchy.',
          'This approach works well for visual storytelling, product showcases, and content-rich articles.',
        ]),
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Key Features',
            columns: 3,
            items: [
              {
                heading: 'Responsive Design',
                description: 'Adapts seamlessly to any screen size',
              },
              {
                heading: 'Visual Hierarchy',
                description: 'Guides readers through content naturally',
              },
              {
                heading: 'Flexible Layouts',
                description: 'Mix and match content types easily',
              },
            ],
          },
        ],
      },
      {
        title: 'In-Depth Guide with FAQ Section',
        slug: 'in-depth-guide-with-faq-section',
        excerpt: 'Comprehensive article with table of contents, multiple sections, and FAQ block for common questions.',
        category: 'tutorials',
        featuredImage: guideImage?.id,
        content: createRichTextParagraphs([
          'Comprehensive guides require thoughtful structure to help readers navigate complex topics.',
          'Breaking content into clear sections with headings makes information easier to scan and digest.',
          'Adding an FAQ section addresses common questions and improves the overall user experience.',
        ]),
        contentBlocks: [
          {
            blockType: 'faq',
            heading: 'Frequently Asked Questions',
            items: [
              {
                question: 'How do I get started?',
                answer: createRichText('Begin by reading through the introduction and following the step-by-step instructions.'),
              },
              {
                question: 'What if I get stuck?',
                answer: createRichText('Check our troubleshooting section or reach out to our support team for assistance.'),
              },
            ],
          },
        ],
      },
      {
        title: 'Case Study with Timeline',
        slug: 'case-study-with-timeline',
        excerpt: 'Narrative-driven post with timeline block showing project progression and key milestones.',
        category: 'case-studies',
        featuredImage: caseStudyImage?.id,
        content: createRichTextParagraphs([
          'Case studies tell the story of real-world projects and their outcomes.',
          'Timeline blocks help visualise project progression and highlight key milestones.',
          'This format is perfect for showcasing client work, project retrospectives, and success stories.',
        ]),
        contentBlocks: [
          {
            blockType: 'timeline',
            heading: 'Project Timeline',
            items: [
              { date: '2024-01', title: 'Discovery Phase', description: 'Initial research and planning' },
              { date: '2024-03', title: 'Design Sprint', description: 'Wireframes and prototypes' },
              { date: '2024-06', title: 'Development', description: 'Building and testing' },
              { date: '2024-09', title: 'Launch', description: 'Going live and monitoring' },
            ],
          },
        ],
      },
      {
        title: 'News Brief with Media Gallery',
        slug: 'news-brief-with-media-gallery',
        excerpt: 'Concise update with embedded media gallery, multiple images, and quick-reference callouts.',
        category: 'news',
        featuredImage: newsImage?.id,
        content: createRichTextParagraphs([
          'News briefs deliver timely updates in a concise, scannable format.',
          'Media galleries add visual context and allow readers to explore related images.',
          'Callout blocks highlight key information and important takeaways.',
        ]),
        contentBlocks: [
          {
            blockType: 'callout',
            type: 'info',
            content: createRichText('This is a sample callout highlighting important information from the news brief.'),
          },
        ],
      },
    ]

    // Find the post to seed
    const postToSeed = allPosts.find(p => p.slug === slug)
    if (!postToSeed) {
      this.log(`Post with slug "${slug}" not found in seed data`)
      return
    }

    // Check if it already exists
    if (await this.checkIfExists('posts', slug)) {
      this.log(`Post "${postToSeed.title}" already exists, skipping.`)
      return
    }

    // Create the post
    this.log(`Creating post "${postToSeed.title}" with category slug "${postToSeed.category}" -> ID "${categories[postToSeed.category]}"`)
    await this.create('posts', {
      title: postToSeed.title,
      slug: postToSeed.slug,
      excerpt: postToSeed.excerpt,
      content: postToSeed.content,
      contentBlocks: postToSeed.contentBlocks,
      featuredImage: postToSeed.featuredImage,
      categories: categories[postToSeed.category] ? [categories[postToSeed.category]] : [],
      author: adminId,
      _status: 'published',
      publishedAt: new Date().toISOString(),
    })
  }

  private async seedSinglePage(slug: string): Promise<void> {
    this.log(`Seeding single page: ${slug}`)

    // For now, just seed all pages since we only have a few
    await this.seedPages()
  }

  private async seedSingleCategory(slug: string): Promise<void> {
    this.log(`Seeding single category: ${slug}`)

    const categoryData = [
      { name: 'Technology', slug: 'technology', description: 'Latest tech news and insights' },
      { name: 'Design', slug: 'design', description: 'Design trends and best practices' },
      { name: 'Tutorials', slug: 'tutorials', description: 'Step-by-step guides and how-tos' },
      { name: 'Case Studies', slug: 'case-studies', description: 'Real-world project examples' },
      { name: 'News', slug: 'news', description: 'Company updates and announcements' },
    ]

    const categoryToSeed = categoryData.find(c => c.slug === slug)
    if (!categoryToSeed) {
      this.log(`Category with slug "${slug}" not found in seed data`)
      return
    }

    if (await this.checkIfExists('categories', slug)) {
      this.log(`Category "${categoryToSeed.name}" already exists, skipping.`)
      return
    }

    await this.create('categories', {
      title: categoryToSeed.name,
      slug: categoryToSeed.slug,
      description: categoryToSeed.description,
    })
  }
}

export default BlogSeeder
