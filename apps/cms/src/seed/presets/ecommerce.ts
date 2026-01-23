/**
 * Ecommerce Preset Seeder
 *
 * Seeds sample data for the ecommerce preset.
 * Creates products, categories, and collections suitable for an ecommerce catalog site.
 */

import type { Payload } from 'payload'
import { BaseSeeder, createRichText, createRichTextParagraphs, type SeedOptions } from '../base'

export class EcommerceSeeder extends BaseSeeder {
  constructor(payload: Payload, options: SeedOptions = {}) {
    super(payload, options)
  }

  getPresetId(): string {
    return 'ecommerce'
  }

  getCollections(): string[] {
    return ['pages', 'products', 'product-categories', 'product-collections', 'content-types', 'custom-items']
  }

  async seed(): Promise<void> {
    this.log('Starting ecommerce seed...')

    // Seed in dependency order
    const categories = await this.seedProductCategories()
    const collections = await this.seedProductCollections()
    await this.seedProducts(categories, collections)
    await this.seedPages()

    await this.seedCustomContentType({
      name: 'Brands',
      slug: 'brands',
      singularLabel: 'Brand',
      pluralLabel: 'Brands',
      icon: 'service',
      template: 'archive-item',
      customFields: [
        { name: 'country', label: 'Country', type: 'text', required: true },
        { name: 'founded', label: 'Founded', type: 'number', required: false },
      ],
      items: [
        {
          title: 'Acme Co.',
          slug: 'acme-co',
          excerpt: 'A trusted brand for everyday products.',
          content: createRichTextParagraphs([
            'Acme is known for reliable household essentials and strong customer support.',
            'Their product line focuses on durable, affordable design.',
          ]),
          blocks: [
            {
              blockType: 'stats',
              heading: 'Brand Snapshot',
              stats: [
                { value: '1986', label: 'Founded' },
                { value: '40+', label: 'Countries' },
                { value: '2M', label: 'Customers' },
              ],
            },
          ],
          customData: { country: 'USA', founded: 1986 },
        },
        {
          title: 'Nordic Supply',
          slug: 'nordic-supply',
          excerpt: 'Scandinavian design meets everyday utility.',
          content: createRichTextParagraphs([
            'Minimalist design and functional craftsmanship are at the heart of Nordic Supply.',
            'Their catalog emphasizes sustainable materials and clean aesthetics.',
          ]),
          blocks: [
            {
              blockType: 'features',
              heading: 'Brand Values',
              layout: 'grid',
              items: [
                { heading: 'Sustainability', description: 'Responsible sourcing and packaging.' },
                { heading: 'Minimalism', description: 'Clean, timeless product design.' },
                { heading: 'Durability', description: 'Built to last with quality materials.' },
              ],
            },
          ],
          customData: { country: 'Sweden', founded: 1998 },
        },
        {
          title: 'Solara Tech',
          slug: 'solara-tech',
          excerpt: 'Smart devices with a renewable-first approach.',
          content: createRichTextParagraphs([
            'Solara designs smart home products optimized for energy efficiency.',
            'Their devices integrate with leading automation platforms.',
          ]),
          blocks: [
            {
              blockType: 'grid',
              heading: 'Signature Products',
              style: 'cards',
              columns: '3',
              items: [
                { heading: 'Energy Hub', description: 'Monitors household consumption.' },
                { heading: 'Solar Panel Kit', description: 'Plug-and-play renewable setup.' },
                { heading: 'Smart Thermostat', description: 'Adaptive temperature control.' },
              ],
            },
          ],
          customData: { country: 'Germany', founded: 2012 },
        },
      ],
    })

    await this.seedGlobals()

    this.log('Ecommerce seed completed!')
  }

  async clear(): Promise<void> {
    this.log('Clearing ecommerce data...')

    // Clear in reverse dependency order
    await this.clearCollection('products')
    await this.clearCollection('product-collections')
    await this.clearCollection('product-categories')
    await this.clearCollection('pages')
    await this.clearCollection('custom-items')
    await this.clearCollection('content-types')

    this.log('Ecommerce data cleared!')
  }

  public async seedCollection(collection: string): Promise<void> {
    switch (collection) {
      case 'product-categories':
        await this.seedProductCategories()
        return
      case 'product-collections':
        await this.seedProductCollections()
        return
      case 'products': {
        const categories = await this.seedProductCategories()
        const collections = await this.seedProductCollections()
        await this.seedProducts(categories, collections)
        return
      }
      case 'pages':
        await this.seedPages()
        return
      case 'content-types':
      case 'custom-items':
        await this.seedCustomContentType({
          name: 'Brands',
          slug: 'brands',
          singularLabel: 'Brand',
          pluralLabel: 'Brands',
          icon: 'service',
          template: 'archive-item',
          customFields: [
            { name: 'country', label: 'Country', type: 'text', required: true },
            { name: 'founded', label: 'Founded', type: 'number', required: false },
          ],
          items: [
            {
              title: 'Acme Co.',
              slug: 'acme-co',
              excerpt: 'A trusted brand for everyday products.',
              content: createRichTextParagraphs([
                'Acme is known for reliable household essentials and strong customer support.',
                'Their product line focuses on durable, affordable design.',
              ]),
              blocks: [
                {
                  blockType: 'stats',
                  heading: 'Brand Snapshot',
                  stats: [
                    { value: '1986', label: 'Founded' },
                    { value: '40+', label: 'Countries' },
                    { value: '2M', label: 'Customers' },
                  ],
                },
              ],
              customData: { country: 'USA', founded: 1986 },
            },
          ],
        })
        return
      default:
        this.log(`No seed handler for collection: ${collection}`)
    }
  }

  private async seedProductCategories(): Promise<Record<string, string>> {
    if (!this.shouldSeedCollection('product-categories')) {
      return {}
    }

    this.log('Seeding product categories...')

    const categoryData = [
      { name: 'Electronics', slug: 'electronics', description: 'Gadgets, devices, and tech accessories' },
      { name: 'Clothing', slug: 'clothing', description: 'Apparel and fashion items' },
      { name: 'Home & Garden', slug: 'home-garden', description: 'Furniture, decor, and outdoor items' },
      { name: 'Sports & Outdoors', slug: 'sports-outdoors', description: 'Athletic gear and outdoor equipment' },
      { name: 'Books & Media', slug: 'books-media', description: 'Books, music, and digital media' },
    ]

    const categories: Record<string, string> = {}

    for (const data of categoryData.slice(0, this.getItemCount('product-categories', 5))) {
      if (await this.checkIfExists('product-categories', data.slug)) {
        this.log(`Category "${data.name}" already exists, skipping.`)
        const existing = await this.payload.find({
          collection: 'product-categories',
          where: { slug: { equals: data.slug } },
          limit: 1,
          depth: 0,
        })
        if (existing.docs[0]) {
          categories[data.slug] = existing.docs[0].id as any
        }
        continue
      }

      const category = await this.create('product-categories', {
        name: data.name,
        slug: data.slug,
        description: data.description,
      })
      categories[data.slug] = category.id
    }

    return categories
  }

  private async seedProductCollections(): Promise<Record<string, string>> {
    if (!this.shouldSeedCollection('product-collections')) {
      return {}
    }

    this.log('Seeding product collections...')

    const collectionsData = [
      {
        name: 'Summer Sale',
        slug: 'summer-sale',
        description: 'Hot deals for the summer season! Up to 50% off selected items.',
        shortDescription: 'Up to 50% off summer essentials',
        discountPercentage: 25,
        featured: true,
      },
      {
        name: 'New Arrivals',
        slug: 'new-arrivals',
        description: 'Check out our latest products, fresh off the shelves.',
        shortDescription: 'The newest additions to our catalog',
        featured: true,
      },
      {
        name: 'Best Sellers',
        slug: 'best-sellers',
        description: 'Our most popular products loved by customers.',
        shortDescription: 'Customer favorites',
        featured: true,
      },
    ]

    const collections: Record<string, string> = {}

    for (const data of collectionsData) {
      const collection = await this.create('product-collections', {
        name: data.name,
        slug: data.slug,
        description: createRichText(data.description),
        shortDescription: data.shortDescription,
        discountPercentage: data.discountPercentage,
        featured: data.featured,
        _status: 'published',
      })
      collections[data.slug] = collection.id
    }

    return collections
  }

  private async seedProducts(
    categories: Record<string, string>,
    collections: Record<string, string>
  ): Promise<void> {
    if (!this.shouldSeedCollection('products')) {
      return
    }

    this.log('Seeding products...')

    const productsData = [
      {
        title: 'Wireless Bluetooth Headphones',
        slug: 'wireless-bluetooth-headphones',
        sku: 'ELEC-001',
        excerpt: 'Premium wireless headphones with noise cancellation.',
        richContent: createRichTextParagraphs([
          'Experience crystal-clear audio with premium wireless headphones featuring active noise cancellation.',
          'Designed for long listening sessions with a 30-hour battery life and comfortable fit.',
        ]),
        price: 149.99,
        salePrice: 119.99,
        category: 'electronics',
        collections: ['summer-sale', 'best-sellers'],
        stockQuantity: 50,
        featured: true,
        template: 'featured',
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Audio Highlights',
            layout: 'grid',
            items: [
              { heading: 'Noise Cancellation', description: 'Adaptive ANC for immersive listening.' },
              { heading: 'Battery', description: 'Up to 30 hours on a single charge.' },
              { heading: 'Connectivity', description: 'Bluetooth 5.0 with multi-device pairing.' },
            ],
          },
          {
            blockType: 'stats',
            heading: 'Performance',
            stats: [
              { value: '30h', label: 'Battery Life' },
              { value: '3', label: 'EQ Modes' },
              { value: '12m', label: 'Range' },
            ],
          },
        ],
      },
      {
        title: 'Classic Cotton T-Shirt',
        slug: 'classic-cotton-tshirt',
        sku: 'CLTH-001',
        excerpt: 'Comfortable 100% cotton t-shirt in multiple colors.',
        richContent: createRichTextParagraphs([
          'A classic fit made from 100% organic cotton for everyday wear.',
          'Breathable fabric with a soft hand feel and durable stitching.',
        ]),
        price: 29.99,
        category: 'clothing',
        collections: ['best-sellers'],
        stockQuantity: 200,
        template: 'standard',
        variants: [
          { name: 'Small / Black', sku: 'CLTH-001-S-BLK', price: 29.99, stockQuantity: 60 },
          { name: 'Medium / White', sku: 'CLTH-001-M-WHT', price: 29.99, stockQuantity: 70 },
          { name: 'Large / Navy', sku: 'CLTH-001-L-NVY', price: 29.99, stockQuantity: 70 },
        ],
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Fabric & Fit',
            style: 'cards',
            columns: '3',
            items: [
              { heading: 'Organic Cotton', description: 'Soft, breathable, and responsibly sourced.' },
              { heading: 'Pre-Shrunk', description: 'Holds shape after every wash.' },
              { heading: 'Classic Fit', description: 'A timeless silhouette for everyday wear.' },
            ],
          },
        ],
      },
      {
        title: 'Smart Home Hub',
        slug: 'smart-home-hub',
        sku: 'ELEC-002',
        excerpt: 'Control all your smart devices from one central hub.',
        richContent: createRichTextParagraphs([
          'The ultimate smart home control center with support for over 1,000 devices.',
          'Voice-enabled control with a sleek, minimal interface.',
        ]),
        price: 199.99,
        salePrice: 149.99,
        category: 'electronics',
        collections: ['summer-sale', 'new-arrivals'],
        stockQuantity: 30,
        featured: true,
        template: 'featured',
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Smart Home Ready',
            layout: 'grid',
            items: [
              { heading: 'Voice Control', description: 'Works with Alexa and Google Assistant.' },
              { heading: 'Device Sync', description: 'Connects with 1,000+ devices.' },
              { heading: 'Automation', description: 'Create routines with one tap.' },
            ],
          },
          {
            blockType: 'stats',
            heading: 'Compatibility',
            stats: [
              { value: '1000+', label: 'Devices' },
              { value: '3', label: 'Assistants' },
              { value: '10m', label: 'Setup' },
            ],
          },
        ],
      },
      {
        title: 'Ergonomic Office Chair',
        slug: 'ergonomic-office-chair',
        sku: 'HOME-001',
        excerpt: 'Premium ergonomic chair for all-day comfort.',
        richContent: createRichTextParagraphs([
          'Designed with adjustable lumbar support and breathable mesh backing.',
          'Built for long sessions with multi-position armrests and tilt control.',
        ]),
        price: 399.99,
        salePrice: 349.99,
        category: 'home-garden',
        collections: ['summer-sale'],
        stockQuantity: 15,
        template: 'standard',
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Comfort Features',
            layout: 'list',
            items: [
              { heading: 'Lumbar Support', description: 'Adjustable lumbar support for posture.' },
              { heading: 'Breathable Mesh', description: 'Cooling airflow through the backrest.' },
              { heading: 'Tilt Control', description: 'Lockable recline with tension adjustment.' },
            ],
          },
          {
            blockType: 'testimonials',
            heading: 'Customer Feedback',
            items: [
              { quote: 'My back feels better after long workdays.', name: 'Jordan Lee', role: 'Remote Designer' },
            ],
          },
        ],
      },
      {
        title: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        sku: 'SPRT-001',
        excerpt: 'Extra thick, non-slip yoga mat for all practices.',
        richContent: createRichTextParagraphs([
          'Extra-cushioned mat that keeps you stable across all poses.',
          'Textured grip and eco-friendly materials for daily practice.',
        ]),
        price: 49.99,
        category: 'sports-outdoors',
        collections: ['new-arrivals'],
        stockQuantity: 75,
        template: 'standard',
        contentBlocks: [
          {
            blockType: 'grid',
            heading: 'Practice Ready',
            style: 'cards',
            columns: '2',
            items: [
              { heading: '6mm Cushioning', description: 'Extra support for knees and joints.' },
              { heading: 'Non-Slip Texture', description: 'Stay grounded in every flow.' },
              { heading: 'Eco-Friendly', description: 'Made with responsibly sourced materials.' },
              { heading: 'Carry Strap', description: 'Easy transport to studio or outdoors.' },
            ],
          },
        ],
      },
      {
        title: 'Bestselling Novel Collection',
        slug: 'bestselling-novel-collection',
        sku: 'BOOK-001',
        excerpt: 'A curated collection of this year\'s bestselling novels.',
        richContent: createRichTextParagraphs([
          'A curated bundle of the most talked-about novels of the year.',
          'Hardcover editions packaged in a gift-ready box.',
        ]),
        price: 79.99,
        salePrice: 59.99,
        category: 'books-media',
        collections: ['summer-sale', 'best-sellers'],
        stockQuantity: 40,
        template: 'featured',
        contentBlocks: [
          {
            blockType: 'stats',
            heading: 'Bundle Value',
            stats: [
              { value: '5', label: 'Titles' },
              { value: '2', label: 'Exclusive Editions' },
              { value: '1', label: 'Gift Box' },
            ],
          },
          {
            blockType: 'cta',
            heading: 'Gift the Collection',
            description: 'Perfect for readers who love new releases.',
            links: [
              { label: 'Add to Cart', url: '/products/bestselling-novel-collection', variant: 'primary' },
            ],
            backgroundColor: 'accent',
          },
        ],
      },
      {
        title: 'Portable Bluetooth Speaker',
        slug: 'portable-bluetooth-speaker',
        sku: 'ELEC-003',
        excerpt: 'Waterproof speaker with 360° sound.',
        richContent: createRichTextParagraphs([
          'Take your music anywhere with immersive 360-degree sound.',
          'Waterproof build and long battery life make it travel-ready.',
        ]),
        price: 79.99,
        category: 'electronics',
        collections: ['new-arrivals', 'best-sellers'],
        stockQuantity: 60,
        template: 'standard',
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Built for Adventure',
            layout: 'grid',
            items: [
              { heading: 'IPX7 Waterproof', description: 'Safe by pool or beach.' },
              { heading: '360° Sound', description: 'Immersive audio in any direction.' },
              { heading: '12h Battery', description: 'All-day playback on a single charge.' },
            ],
          },
        ],
      },
      {
        title: 'Running Shoes Pro',
        slug: 'running-shoes-pro',
        sku: 'SPRT-002',
        excerpt: 'Lightweight running shoes with responsive cushioning.',
        richContent: createRichTextParagraphs([
          'Engineered for performance with responsive cushioning and breathable mesh.',
          'Designed for daily training and long-distance comfort.',
        ]),
        price: 129.99,
        category: 'sports-outdoors',
        collections: ['best-sellers'],
        stockQuantity: 45,
        template: 'featured',
        variants: [
          { name: 'UK 8 / Black', sku: 'SPRT-002-8-BLK', price: 129.99, stockQuantity: 12 },
          { name: 'UK 9 / Gray', sku: 'SPRT-002-9-GRY', price: 129.99, stockQuantity: 18 },
          { name: 'UK 10 / Blue', sku: 'SPRT-002-10-BLU', price: 129.99, stockQuantity: 15 },
        ],
        contentBlocks: [
          {
            blockType: 'features',
            heading: 'Performance Build',
            layout: 'list',
            items: [
              { heading: 'Cushioning', description: 'Responsive foam for impact control.' },
              { heading: 'Breathability', description: 'Mesh upper keeps feet cool.' },
              { heading: 'Visibility', description: 'Reflective accents for night runs.' },
            ],
          },
          {
            blockType: 'stats',
            heading: 'Runner Metrics',
            stats: [
              { value: '240g', label: 'Weight' },
              { value: '8mm', label: 'Drop' },
              { value: '500+', label: 'KM Durability' },
            ],
          },
        ],
      },
    ]

    for (const data of productsData.slice(0, this.getItemCount('products', 12))) {
      await this.create('products', {
        title: data.title,
        slug: data.slug,
        sku: data.sku,
        excerpt: data.excerpt,
        richContent: data.richContent,
        price: data.price,
        salePrice: data.salePrice,
        categories: categories[data.category] ? [categories[data.category]] : [],
        collections: data.collections.map(slug => collections[slug]).filter(Boolean),
        stockQuantity: data.stockQuantity,
        trackInventory: true,
        availability: data.stockQuantity > 0 ? 'active' : 'out-of-stock',
        variants: data.variants || [],
        featured: data.featured || false,
        template: data.template || 'standard',
        contentBlocks: data.contentBlocks,
        _status: 'published',
      })
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
            heading: 'Summer Sale Now On',
            subheading: 'Up to 50% off selected items. Shop now and save big!',
            links: [
              { label: 'Shop Now', url: '/products', variant: 'primary' },
              { label: 'View Collections', url: '/collections', variant: 'secondary' },
            ],
          },
          content: [
            {
              blockType: 'grid',
              heading: 'Shop by Category',
              style: 'cards',
              columns: '5',
              items: [
                { heading: 'Electronics', description: 'Gadgets & Tech' },
                { heading: 'Clothing', description: 'Fashion & Apparel' },
                { heading: 'Home & Garden', description: 'Furniture & Decor' },
                { heading: 'Sports', description: 'Athletic Gear' },
                { heading: 'Books', description: 'Books & Media' },
              ],
            },
            {
              blockType: 'archive',
              heading: 'Featured Products',
              collection: 'products',
              limit: 8,
              showFeaturedImage: true,
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
            heading: 'About Our Store',
            subheading: 'Quality products, exceptional service.',
          },
          content: [
            {
              blockType: 'content',
              columns: 'oneColumn',
              content: createRichTextParagraphs([
                'Welcome to our online store! We are dedicated to providing you with the best products at competitive prices.',
                'Founded in 2020, we have grown to become a trusted destination for quality products across multiple categories.',
                'Our commitment to customer satisfaction drives everything we do. From carefully curating our product selection to providing excellent customer support, we strive to exceed your expectations.',
              ]),
            },
            {
              blockType: 'grid',
              heading: 'Why Shop With Us',
              style: 'features',
              columns: '3',
              items: [
                { icon: 'truck', title: 'Free Shipping', description: 'On orders over $50' },
                { icon: 'shield', title: 'Secure Payment', description: '100% secure checkout' },
                { icon: 'headphones', title: '24/7 Support', description: 'Always here to help' },
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
            subheading: 'We would love to hear from you.',
          },
          content: [
            {
              blockType: 'content',
              columns: 'oneColumn',
              content: createRichText('Have a question about an order or need help finding the perfect product? Our team is here to help!'),
            },
            {
              blockType: 'form',
              formType: 'contact',
            },
          ],
        })
      }
    }

    // Shop Page
    if (this.shouldSeedItem('shop')) {
      if (!await this.checkIfExists('pages', 'shop')) {
        await this.create('pages', {
          title: 'Shop',
          slug: 'products', // Using 'products' to match standard URL structure
          template: 'standard',
          _status: 'published',
          hero: {
            type: 'standard',
            heading: 'Shop All Products',
            subheading: 'Explore our full catalog.',
          },
          content: [
            {
              blockType: 'archive',
              heading: 'All Products',
              collection: 'products',
              limit: 12,
              showFeaturedImage: true,
              layout: 'grid',
            },
          ],
        })
      }
    }

    // Cart Page
    if (this.shouldSeedItem('cart')) {
      if (!await this.checkIfExists('pages', 'cart')) {
        await this.create('pages', {
          title: 'Cart',
          slug: 'cart',
          template: 'detail',
          _status: 'published',
          hero: {
            type: 'minimal',
            heading: 'Your Cart',
          },
          content: [
            {
              // In a real app this would be a specialized "Cart" block
              // For now we simulate with a placeholder content message
              blockType: 'content',
              columns: 'oneColumn',
              content: createRichText('Your cart is currently empty. Start shopping to add items.'),
            },
            {
              blockType: 'cta',
              heading: 'Continue Shopping',
              links: [{ label: 'Browse Products', url: '/products', variant: 'primary' }],
            },
          ],
        })
      }
    }

    // Checkout Page
    if (this.shouldSeedItem('checkout')) {
      if (!await this.checkIfExists('pages', 'checkout')) {
        await this.create('pages', {
          title: 'Checkout',
          slug: 'checkout',
          template: 'detail',
          _status: 'published',
          hero: {
            type: 'minimal',
            heading: 'Checkout',
          },
          content: [
            {
              // Simplified checkout placeholder
              blockType: 'content',
              columns: 'oneColumn',
              content: createRichText('Secure checkout implementation would appear here in the production frontend.'),
            },
          ],
        })
      }
    }

    // Account Page
    if (this.shouldSeedItem('account')) {
      if (!await this.checkIfExists('pages', 'account')) {
        await this.create('pages', {
          title: 'My Account',
          slug: 'account',
          template: 'detail',
          _status: 'published',
          hero: {
            type: 'minimal',
            heading: 'My Account',
          },
          content: [
            {
              // Account dashboard placeholder
              blockType: 'content',
              columns: 'oneColumn',
              content: createRichText('Manage your orders and profile settings.'),
            },
          ],
        })
      }
    }

    // Policy Pages
    const policies = [
      {
        title: 'Shipping Policy',
        slug: 'shipping',
        content: 'Currently we ship to USA, Canada, and EU. Standard shipping takes 3-5 business days.',
      },
      {
        title: 'Returns Policy',
        slug: 'returns',
        content: 'We accept returns within 30 days of purchase. Items must be unused and in original packaging.',
      },
      {
        title: 'Terms of Service',
        slug: 'terms',
        content: 'By using this site, you agree to our terms of service.',
      },
      {
        title: 'Privacy Policy',
        slug: 'privacy',
        content: 'We respect your privacy and protect your personal data.',
      },
    ]

    for (const policy of policies) {
      if (this.shouldSeedItem(policy.slug)) {
        if (!await this.checkIfExists('pages', policy.slug)) {
          await this.create('pages', {
            title: policy.title,
            slug: policy.slug,
            template: 'detail',
            _status: 'published',
            hero: {
              type: 'minimal',
              heading: policy.title,
            },
            content: [
              {
                blockType: 'content',
                columns: 'oneColumn',
                content: createRichText(policy.content),
              },
            ],
          })
        }
      }
    }

  }

  private async seedGlobals(): Promise<void> {
    this.log('Seeding globals...')

    // Header
    await this.updateGlobal('header', {
      logoText: 'My Store',
      navItems: [
        { label: 'Home', type: 'link', url: '/' },
        { label: 'Products', type: 'link', url: '/products' },
        { label: 'Collections', type: 'link', url: '/collections' },
        { label: 'Sale', type: 'link', url: '/collections/summer-sale' },
        { label: 'About', type: 'link', url: '/about' },
        { label: 'Contact', type: 'link', url: '/contact' },
      ],
    })

    // Footer
    await this.updateGlobal('footer', {
      copyright: `© ${new Date().getFullYear()} My Store. All rights reserved.`,
      columns: [
        {
          label: 'Shop',
          navItems: [
            { link: { type: 'custom', label: 'All Products', url: '/products' } },
            { link: { type: 'custom', label: 'New Arrivals', url: '/collections/new-arrivals' } },
            { link: { type: 'custom', label: 'Best Sellers', url: '/collections/best-sellers' } },
            { link: { type: 'custom', label: 'Sale', url: '/collections/summer-sale' } },
          ],
        },
        {
          label: 'Support',
          navItems: [
            { link: { type: 'custom', label: 'Contact Us', url: '/contact' } },
            { link: { type: 'custom', label: 'Shipping Info', url: '/shipping' } },
            { link: { type: 'custom', label: 'Returns', url: '/returns' } },
            { link: { type: 'custom', label: 'FAQ', url: '/contact' } }, // Pointing FAQ to contact for now as we didn't seed standalone FAQ
          ],
        },
        {
          label: 'My Account',
          navItems: [
            { link: { type: 'custom', label: 'Sign In', url: '/account' } },
            { link: { type: 'custom', label: 'View Cart', url: '/cart' } },
            { link: { type: 'custom', label: 'Order Status', url: '/account' } },
          ],
        },
        {
          label: 'Company',
          navItems: [
            { link: { type: 'custom', label: 'About Us', url: '/about' } },
            { link: { type: 'custom', label: 'Privacy Policy', url: '/privacy' } },
            { link: { type: 'custom', label: 'Terms of Service', url: '/terms' } },
          ],
        },
      ],
    })

    // Settings
    await this.updateGlobal('settings', {
      siteName: 'My Store',
      siteDescription: 'Quality products at competitive prices. Shop electronics, clothing, home goods, and more.',
    })
  }
}

export default EcommerceSeeder
