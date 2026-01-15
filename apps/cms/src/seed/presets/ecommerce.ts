/**
 * Ecommerce Preset Seeder
 * 
 * Seeds sample data for the ecommerce-next preset.
 * Creates products, categories, and collections suitable for an ecommerce catalog site.
 */

import type { Payload } from 'payload'
import { BaseSeeder, createRichText, createRichTextParagraphs, type SeedOptions } from '../base'

export class EcommerceSeeder extends BaseSeeder {
  constructor(payload: Payload, options: SeedOptions = {}) {
    super(payload, options)
  }

  getPresetId(): string {
    return 'ecommerce-next'
  }

  getCollections(): string[] {
    return ['pages', 'products', 'product-categories', 'product-collections']
  }

  async seed(): Promise<void> {
    this.log('Starting ecommerce seed...')

    // Seed in dependency order
    const categories = await this.seedProductCategories()
    const collections = await this.seedProductCollections()
    await this.seedProducts(categories, collections)
    await this.seedPages()
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
    
    this.log('Ecommerce data cleared!')
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
        name: 'Wireless Bluetooth Headphones',
        slug: 'wireless-bluetooth-headphones',
        sku: 'ELEC-001',
        shortDescription: 'Premium wireless headphones with noise cancellation.',
        description: 'Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.',
        price: 149.99,
        salePrice: 119.99,
        category: 'electronics',
        collections: ['summer-sale', 'best-sellers'],
        features: ['Active Noise Cancellation', '30-hour Battery Life', 'Bluetooth 5.0', 'Foldable Design'],
        inStock: true,
        quantity: 50,
        featured: true,
      },
      {
        name: 'Classic Cotton T-Shirt',
        slug: 'classic-cotton-tshirt',
        sku: 'CLTH-001',
        shortDescription: 'Comfortable 100% cotton t-shirt in multiple colors.',
        description: 'Our classic cotton t-shirt is made from premium 100% organic cotton for ultimate comfort and durability.',
        price: 29.99,
        category: 'clothing',
        collections: ['best-sellers'],
        features: ['100% Organic Cotton', 'Pre-shrunk', 'Machine Washable', 'Available in 8 Colors'],
        inStock: true,
        quantity: 200,
        hasVariants: true,
      },
      {
        name: 'Smart Home Hub',
        slug: 'smart-home-hub',
        sku: 'ELEC-002',
        shortDescription: 'Control all your smart devices from one central hub.',
        description: 'The ultimate smart home control center. Compatible with over 1000 devices from major brands.',
        price: 199.99,
        salePrice: 149.99,
        category: 'electronics',
        collections: ['summer-sale', 'new-arrivals'],
        features: ['Voice Control', 'Works with Alexa & Google', '1000+ Device Compatibility', 'Easy Setup'],
        inStock: true,
        quantity: 30,
        featured: true,
        newArrival: true,
      },
      {
        name: 'Ergonomic Office Chair',
        slug: 'ergonomic-office-chair',
        sku: 'HOME-001',
        shortDescription: 'Premium ergonomic chair for all-day comfort.',
        description: 'Designed with your comfort in mind, this ergonomic office chair features adjustable lumbar support and breathable mesh back.',
        price: 399.99,
        salePrice: 349.99,
        category: 'home-garden',
        collections: ['summer-sale'],
        features: ['Adjustable Lumbar Support', 'Breathable Mesh', 'Height Adjustable', '5-Year Warranty'],
        inStock: true,
        quantity: 15,
      },
      {
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        sku: 'SPRT-001',
        shortDescription: 'Extra thick, non-slip yoga mat for all practices.',
        description: 'Our premium yoga mat provides the perfect balance of cushioning and stability for any yoga practice.',
        price: 49.99,
        category: 'sports-outdoors',
        collections: ['new-arrivals'],
        features: ['6mm Thick', 'Non-Slip Surface', 'Eco-Friendly Materials', 'Includes Carry Strap'],
        inStock: true,
        quantity: 75,
        newArrival: true,
      },
      {
        name: 'Bestselling Novel Collection',
        slug: 'bestselling-novel-collection',
        sku: 'BOOK-001',
        shortDescription: 'A curated collection of this year\'s bestselling novels.',
        description: 'Dive into the most talked-about books of the year with this carefully curated collection of bestselling novels.',
        price: 79.99,
        salePrice: 59.99,
        category: 'books-media',
        collections: ['summer-sale', 'best-sellers'],
        features: ['5 Bestselling Titles', 'Hardcover Editions', 'Gift Box Included', 'Author Bookmarks'],
        inStock: true,
        quantity: 40,
        bestSeller: true,
      },
      {
        name: 'Portable Bluetooth Speaker',
        slug: 'portable-bluetooth-speaker',
        sku: 'ELEC-003',
        shortDescription: 'Waterproof speaker with 360° sound.',
        description: 'Take your music anywhere with this waterproof portable speaker featuring powerful 360° sound.',
        price: 79.99,
        category: 'electronics',
        collections: ['new-arrivals', 'best-sellers'],
        features: ['IPX7 Waterproof', '360° Sound', '12-hour Battery', 'Built-in Microphone'],
        inStock: true,
        quantity: 60,
        newArrival: true,
        bestSeller: true,
      },
      {
        name: 'Running Shoes Pro',
        slug: 'running-shoes-pro',
        sku: 'SPRT-002',
        shortDescription: 'Lightweight running shoes with responsive cushioning.',
        description: 'Engineered for performance, these running shoes feature responsive cushioning and breathable mesh upper.',
        price: 129.99,
        category: 'sports-outdoors',
        collections: ['best-sellers'],
        features: ['Responsive Cushioning', 'Breathable Mesh', 'Lightweight Design', 'Reflective Details'],
        inStock: true,
        quantity: 45,
        hasVariants: true,
        bestSeller: true,
      },
    ]

    for (const data of productsData.slice(0, this.getItemCount('products', 12))) {
      await this.create('products', {
        name: data.name,
        slug: data.slug,
        sku: data.sku,
        shortDescription: data.shortDescription,
        description: createRichText(data.description),
        price: data.price,
        salePrice: data.salePrice,
        categories: categories[data.category] ? [categories[data.category]] : [],
        collections: data.collections.map(slug => collections[slug]).filter(Boolean),
        features: data.features.map(feature => ({ feature })),
        inStock: data.inStock,
        quantity: data.quantity,
        trackInventory: true,
        hasVariants: data.hasVariants || false,
        featured: data.featured || false,
        newArrival: data.newArrival || false,
        bestSeller: data.bestSeller || false,
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
            { title: 'Electronics', description: 'Gadgets & Tech' },
            { title: 'Clothing', description: 'Fashion & Apparel' },
            { title: 'Home & Garden', description: 'Furniture & Decor' },
            { title: 'Sports', description: 'Athletic Gear' },
            { title: 'Books', description: 'Books & Media' },
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

    // About page
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

    // Contact page
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

  private async seedGlobals(): Promise<void> {
    this.log('Seeding globals...')

    // Header
    await this.updateGlobal('header', {
      logo: {
        text: 'My Store',
      },
      navItems: [
        { link: { type: 'custom', label: 'Home', url: '/' } },
        { link: { type: 'custom', label: 'Products', url: '/products' } },
        { link: { type: 'custom', label: 'Collections', url: '/collections' } },
        { link: { type: 'custom', label: 'Sale', url: '/collections/summer-sale' } },
        { link: { type: 'custom', label: 'About', url: '/about' } },
        { link: { type: 'custom', label: 'Contact', url: '/contact' } },
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
            { link: { type: 'custom', label: 'FAQ', url: '/faq' } },
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
