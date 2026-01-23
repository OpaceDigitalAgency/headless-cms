/**
 * Brochure Preset Seeder
 *
 * Seeds sample data for the brochure preset.
 * Creates pages suitable for a marketing/brochure website.
 */

import type { Payload } from 'payload'
import { BaseSeeder, createRichText, createRichTextParagraphs, type SeedOptions } from '../base'

export class BrochureSeeder extends BaseSeeder {
  constructor(payload: Payload, options: SeedOptions = {}) {
    super(payload, options)
  }

  getPresetId(): string {
    return 'brochure'
  }

  getCollections(): string[] {
    return ['pages', 'content-types', 'custom-items']
  }

  async seed(): Promise<void> {
    this.log('Starting brochure seed...')

    await this.seedServices()
    await this.seedPages()

    await this.seedCustomContentType({
      name: 'Case Studies',
      slug: 'case-studies',
      singularLabel: 'Case Study',
      pluralLabel: 'Case Studies',
      icon: 'document',
      template: 'article',
      customFields: [
        { name: 'industry', label: 'Industry', type: 'text', required: true },
        { name: 'result', label: 'Result', type: 'text', required: true },
      ],
      items: [
        {
          title: 'Retail Growth Strategy',
          slug: 'retail-growth-strategy',
          excerpt: 'How we grew a retail brand by 120% YoY.',
          content: createRichTextParagraphs([
            'A multi-channel growth strategy that aligned merchandising, paid media, and retention.',
            'We focused on conversion optimization and customer lifetime value improvements.',
          ]),
          blocks: [
            {
              blockType: 'stats',
              heading: 'Outcome Summary',
              stats: [
                { value: '120%', label: 'YoY Growth' },
                { value: '3.2x', label: 'ROAS' },
                { value: '18%', label: 'CVR Lift' },
              ],
            },
            {
              blockType: 'features',
              heading: 'Key Initiatives',
              layout: 'grid',
              items: [
                { title: 'Merchandising', description: 'Rebuilt category structure for discovery.' },
                { title: 'Retention', description: 'Lifecycle programs for repeat revenue.' },
                { title: 'Paid Media', description: 'Full-funnel testing and optimization.' },
              ],
            },
          ],
          customData: { industry: 'Retail', result: '120% YoY growth' },
        },
        {
          title: 'SaaS Onboarding Redesign',
          slug: 'saas-onboarding-redesign',
          excerpt: 'Reducing time-to-value for a SaaS platform.',
          content: createRichTextParagraphs([
            'We redesigned onboarding to focus on faster activation and clearer guidance.',
            'The new flow reduced drop-off and improved retention in the first 30 days.',
          ]),
          blocks: [
            {
              blockType: 'grid',
              heading: 'What Changed',
              style: 'cards',
              columns: '3',
              items: [
                { title: 'Guided Setup', description: 'Step-by-step activation checklist.' },
                { title: 'In-App Tips', description: 'Contextual nudges at key moments.' },
                { title: 'Success Metrics', description: 'Clear progress milestones.' },
              ],
            },
          ],
          customData: { industry: 'SaaS', result: '35% activation lift' },
        },
        {
          title: 'Manufacturing Process Audit',
          slug: 'manufacturing-process-audit',
          excerpt: 'Operational audit driving measurable efficiency gains.',
          content: createRichTextParagraphs([
            'A full operational audit identified bottlenecks across production lines.',
            'We implemented a phased optimization plan for measurable efficiency gains.',
          ]),
          blocks: [
            {
              blockType: 'stats',
              heading: 'Operational Impact',
              stats: [
                { value: '22%', label: 'Cycle Time Cut' },
                { value: '15%', label: 'Cost Reduction' },
                { value: '9%', label: 'Throughput Gain' },
              ],
            },
            {
              blockType: 'cta',
              heading: 'Need an Operational Review?',
              description: 'We can help identify your next efficiency wins.',
              links: [
                { label: 'Book a Consultation', url: '/contact', variant: 'primary' },
              ],
              backgroundColor: 'light',
            },
          ],
          customData: { industry: 'Manufacturing', result: '22% cycle time reduction' },
        },
      ],
    })

    await this.seedGlobals()

    this.log('Brochure seed completed!')
  }

  async clear(): Promise<void> {
    this.log('Clearing brochure data...')
    await this.clearCollection('pages')
    await this.clearCollection('custom-items')
    await this.clearCollection('content-types')
    this.log('Brochure data cleared!')
  }

  public async seedCollection(collection: string): Promise<void> {
    switch (collection) {
      case 'services':
        await this.seedServices()
        return
      case 'pages':
        await this.seedPages()
        return
      case 'content-types':
      case 'custom-items':
        await this.seedCustomContentType({
          name: 'Case Studies',
          slug: 'case-studies',
          singularLabel: 'Case Study',
          pluralLabel: 'Case Studies',
          icon: 'document',
          template: 'article',
          customFields: [
            { name: 'industry', label: 'Industry', type: 'text', required: true },
            { name: 'result', label: 'Result', type: 'text', required: true },
          ],
          items: [
            {
              title: 'Digital Transformation Success',
              slug: 'digital-transformation-success',
              excerpt: 'How we helped a manufacturing company modernise their operations.',
              content: createRichTextParagraphs([
                'A leading manufacturing company faced operational challenges with legacy systems.',
                'Through strategic digital transformation, we achieved significant improvements.',
              ]),
              blocks: [
                {
                  blockType: 'stats',
                  heading: 'Operational Impact',
                  stats: [
                    { value: '22%', label: 'Cycle Time Cut' },
                    { value: '15%', label: 'Cost Reduction' },
                    { value: '9%', label: 'Throughput Gain' },
                  ],
                },
              ],
              customData: { industry: 'Manufacturing', result: '22% cycle time reduction' },
            },
          ],
        })
        return
      default:
        this.log(`No seed handler for collection: ${collection}`)
    }
  }

  private async seedPages(): Promise<void> {
    if (!this.shouldSeedCollection('pages')) {
      return
    }

    this.log('Seeding pages...')

    // Home page
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
            heading: 'Transform Your Business',
            subheading: 'We help companies grow with innovative solutions and expert guidance.',
            links: [
              { label: 'Get Started', url: '/contact', variant: 'primary' },
              { label: 'Learn More', url: '/services', variant: 'secondary' },
            ],
          },
          content: [
            {
              blockType: 'grid',
              heading: 'Our Services',
              description: 'Comprehensive solutions tailored to your needs',
              style: 'features',
              columns: '3',
              items: [
                {
                  icon: 'lightbulb',
                  title: 'Strategy Consulting',
                  description: 'Develop winning strategies that drive growth and competitive advantage.'
                },
                {
                  icon: 'code',
                  title: 'Digital Transformation',
                  description: 'Modernize your operations with cutting-edge technology solutions.'
                },
                {
                  icon: 'trending-up',
                  title: 'Growth Marketing',
                  description: 'Accelerate your growth with data-driven marketing strategies.'
                },
              ],
            },
            {
              blockType: 'content',
              columns: 'twoColumns',
              content: createRichTextParagraphs([
                'With over a decade of experience, we have helped hundreds of businesses achieve their goals.',
                'Our team of experts combines industry knowledge with innovative thinking to deliver results that matter.',
              ]),
            },
            {
              blockType: 'grid',
              heading: 'Trusted by Industry Leaders',
              style: 'stats',
              columns: '4',
              items: [
                { stat: '500+', title: 'Clients Served' },
                { stat: '98%', title: 'Client Satisfaction' },
                { stat: '50M+', title: 'Revenue Generated' },
                { stat: '15+', title: 'Years Experience' },
              ],
            },
            {
              blockType: 'cta',
              heading: 'Ready to Get Started?',
              description: 'Contact us today for a free consultation and discover how we can help your business grow.',
              links: [
                { label: 'Contact Us', url: '/contact', variant: 'primary' },
              ],
            },
          ],
        })
      }
    }

    // About page
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
            heading: 'About Our Company',
            subheading: 'A team dedicated to your success.',
          },
          content: [
            {
              blockType: 'content',
              columns: 'oneColumn',
              content: createRichTextParagraphs([
                'Founded in 2010, we set out with a simple mission: to help businesses thrive in an ever-changing world.',
                'Today, we are proud to be a trusted partner for companies across industries, from startups to Fortune 500 enterprises.',
                'Our success is built on a foundation of expertise, integrity, and an unwavering commitment to our clients\' success.',
              ]),
            },
            {
              blockType: 'grid',
              heading: 'Our Values',
              style: 'cards',
              columns: '3',
              items: [
                { title: 'Excellence', description: 'We strive for excellence in everything we do.' },
                { title: 'Innovation', description: 'We embrace new ideas and creative solutions.' },
                { title: 'Integrity', description: 'We act with honesty and transparency.' },
              ],
            },
            {
              blockType: 'timeline',
              heading: 'Our Journey',
              layout: 'alternating',
              events: [
                { date: '2010', heading: 'Company Founded', description: createRichText('Started with a small team and big dreams.') },
                { date: '2015', heading: 'National Expansion', description: createRichText('Opened offices in 5 major cities.') },
                { date: '2020', heading: 'Global Reach', description: createRichText('Expanded services to international markets.') },
                { date: '2024', heading: 'Industry Leader', description: createRichText('Recognized as a top consulting firm.') },
              ],
            },
          ],
        })
      }
    }

    // Services page
    if (this.shouldSeedItem('services')) {
      if (await this.checkIfExists('pages', 'services')) {
        this.log('Services page already exists, skipping.')
      } else {
        await this.create('pages', {
          title: 'Services',
          slug: 'services',
          template: 'detail',
          _status: 'published',
          hero: {
            type: 'standard',
            heading: 'Our Services',
            subheading: 'Comprehensive solutions for modern businesses.',
          },
          content: [
            {
              blockType: 'grid',
              style: 'cards',
              columns: '2',
              gap: 'large',
              items: [
                {
                  title: 'Strategy Consulting',
                  description: 'We help you develop and execute strategies that drive sustainable growth and competitive advantage in your market.'
                },
                {
                  title: 'Digital Transformation',
                  description: 'Modernize your business with our comprehensive digital transformation services, from cloud migration to process automation.'
                },
                {
                  title: 'Growth Marketing',
                  description: 'Accelerate your growth with data-driven marketing strategies that deliver measurable results and ROI.'
                },
                {
                  title: 'Technology Solutions',
                  description: 'Custom software development and technology solutions designed to solve your unique business challenges.'
                },
              ],
            },
            {
              blockType: 'cta',
              heading: 'Need a Custom Solution?',
              description: 'Our team can create tailored solutions to meet your specific needs.',
              links: [
                { label: 'Get in Touch', url: '/contact', variant: 'primary' },
              ],
            },
          ],
        })
      }
    }

    // Contact page
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
            type: 'minimal',
            heading: 'Contact Us',
            subheading: 'Let\'s start a conversation.',
          },
          content: [
            {
              blockType: 'content',
              columns: 'oneColumn',
              content: createRichText('Ready to take the next step? Fill out the form below and one of our team members will be in touch within 24 hours.'),
            },
            {
              blockType: 'form',
              formType: 'contact',
            },
            {
              blockType: 'grid',
              heading: 'Other Ways to Reach Us',
              style: 'icons',
              columns: '3',
              items: [
                { icon: 'mail', title: 'Email', description: 'hello@example.com' },
                { icon: 'phone', title: 'Phone', description: '+1 (555) 123-4567' },
                { icon: 'map-pin', title: 'Address', description: '123 Business St, City, ST 12345' },
              ],
            },
          ],
        })
      }
    }

    // Privacy Policy page
    if (this.shouldSeedItem('privacy')) {
      if (await this.checkIfExists('pages', 'privacy')) {
        this.log('Privacy page already exists, skipping.')
      } else {
        await this.create('pages', {
          title: 'Privacy Policy',
          slug: 'privacy',
          template: 'article',
          _status: 'published',
          hero: {
            type: 'minimal',
            heading: 'Privacy Policy',
            subheading: 'Last updated: January 2024',
          },
          content: [
            {
              blockType: 'content',
              columns: 'oneColumn',
              content: createRichTextParagraphs([
                'This Privacy Policy describes how we collect, use, and share information about you when you use our website and services.',
                'We are committed to protecting your privacy and ensuring the security of your personal information.',
                'By using our services, you agree to the collection and use of information in accordance with this policy.',
              ]),
            },
          ],
        })
      }
    }

  }

  private async seedServices() {
    if (!this.shouldSeedCollection('services')) return
    this.log('Seeding Services...')
    const services = [
      { title: 'Strategy Consulting', excerpt: 'Strategic guidance for sustainable growth.', icon: 'lightbulb' },
      { title: 'Digital Transformation', excerpt: 'Modernize your operations with tech.', icon: 'code' },
      { title: 'Growth Marketing', excerpt: 'Data-driven marketing strategies.', icon: 'trending-up' },
      { title: 'Technology Solutions', excerpt: 'Custom software tailored to your needs.', icon: 'monitor' }
    ]
    for (const s of services) {
      const slug = s.title.toLowerCase().replace(/ /g, '-')
      if (await this.checkIfExists('services', slug)) continue

      await this.create('services', {
        title: s.title,
        slug: slug,
        excerpt: s.excerpt,
        icon: s.icon,
        _status: 'published'
      })
    }
  }

  private async seedGlobals(): Promise<void> {
    this.log('Seeding globals...')

    // Header
    await this.updateGlobal('header', {
      logoText: 'Company Name',
      navItems: [
        { label: 'Home', type: 'link', url: '/' },
        { label: 'About', type: 'link', url: '/about' },
        { label: 'Services', type: 'link', url: '/services' },
        { label: 'Contact', type: 'link', url: '/contact' },
      ],
    })

    // Footer
    await this.updateGlobal('footer', {
      copyright: `© ${new Date().getFullYear()} Company Name. All rights reserved.`,
      columns: [
        {
          label: 'Company',
          navItems: [
            { link: { type: 'custom', label: 'About Us', url: '/about' } },
            { link: { type: 'custom', label: 'Services', url: '/services' } },
            { link: { type: 'custom', label: 'Contact', url: '/contact' } },
          ],
        },
        {
          label: 'Legal',
          navItems: [
            { link: { type: 'custom', label: 'Privacy Policy', url: '/privacy' } },
            { link: { type: 'custom', label: 'Terms of Service', url: '/terms' } },
          ],
        },
      ],
    })

    // Settings
    await this.updateGlobal('settings', {
      siteName: 'Company Name',
      siteDescription: 'We help businesses grow with innovative solutions and expert guidance.',
    })
  }
}

export default BrochureSeeder
