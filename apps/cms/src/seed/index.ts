import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Seed script to populate the database with sample data
 * Run with: pnpm seed
 */
async function seed() {
  console.log('🌱 Starting database seed...')

  const payload = await getPayload({ config })

  try {
    // ===========================================
    // Create Admin User
    // ===========================================
    console.log('Creating admin user...')
    
    const existingAdmin = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@example.com' } },
      limit: 1,
    })

    let adminUser
    if (existingAdmin.docs.length === 0) {
      adminUser = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@example.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin',
        },
      })
      console.log('✅ Admin user created')
    } else {
      adminUser = existingAdmin.docs[0]
      console.log('ℹ️ Admin user already exists')
    }

    // ===========================================
    // Create Categories
    // ===========================================
    console.log('Creating categories...')

    const categories = [
      { title: 'Technology', slug: 'technology', description: 'Tech news and updates' },
      { title: 'Design', slug: 'design', description: 'Design trends and inspiration' },
      { title: 'Business', slug: 'business', description: 'Business insights and strategies' },
      { title: 'Culture', slug: 'culture', description: 'Cultural topics and discussions' },
    ]

    const createdCategories: Record<string, any> = {}
    for (const cat of categories) {
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: cat.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'categories',
          data: cat,
        })
        createdCategories[cat.slug] = created
      } else {
        createdCategories[cat.slug] = existing.docs[0]
      }
    }
    console.log('✅ Categories created')

    // ===========================================
    // Create Museum Collections
    // ===========================================
    console.log('Creating museum collections...')

    const museumCollections = [
      {
        title: 'Ancient Civilizations',
        slug: 'ancient-civilizations',
        shortDescription: 'Artifacts from ancient Egypt, Greece, Rome, and Mesopotamia',
        template: 'grid',
      },
      {
        title: 'Medieval Art',
        slug: 'medieval-art',
        shortDescription: 'European art and artifacts from the Middle Ages',
        template: 'list',
      },
      {
        title: 'Asian Art',
        slug: 'asian-art',
        shortDescription: 'Art and artifacts from China, Japan, India, and Southeast Asia',
        template: 'gallery',
      },
      {
        title: 'Modern & Contemporary',
        slug: 'modern-contemporary',
        shortDescription: '19th century to present day artworks',
        template: 'grid',
      },
    ]

    const createdCollections: Record<string, any> = {}
    for (const col of museumCollections) {
      const existing = await payload.find({
        collection: 'museum-collections',
        where: { slug: { equals: col.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'museum-collections',
          data: col,
        })
        createdCollections[col.slug] = created
      } else {
        createdCollections[col.slug] = existing.docs[0]
      }
    }
    console.log('✅ Museum collections created')

    // ===========================================
    // Create Places
    // ===========================================
    console.log('Creating places...')

    const places = [
      {
        name: 'Florence',
        slug: 'florence',
        country: 'Italy',
        placeType: 'city',
        address: { city: 'Florence', country: 'Italy' },
      },
      {
        name: 'Paris',
        slug: 'paris',
        country: 'France',
        placeType: 'city',
        address: { city: 'Paris', country: 'France' },
      },
      {
        name: 'Athens',
        slug: 'athens',
        country: 'Greece',
        placeType: 'city',
        address: { city: 'Athens', country: 'Greece' },
      },
      {
        name: 'Giza',
        slug: 'giza',
        country: 'Egypt',
        placeType: 'archaeological',
        address: { city: 'Giza', country: 'Egypt' },
      },
    ]

    const createdPlaces: Record<string, any> = {}
    for (const place of places) {
      const existing = await payload.find({
        collection: 'places',
        where: { slug: { equals: place.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'places',
          data: place,
        })
        createdPlaces[place.slug] = created
      } else {
        createdPlaces[place.slug] = existing.docs[0]
      }
    }
    console.log('✅ Places created')

    // ===========================================
    // Create People
    // ===========================================
    console.log('Creating people...')

    const people = [
      {
        name: 'Leonardo da Vinci',
        slug: 'leonardo-da-vinci',
        birthDate: '1452',
        deathDate: '1519',
        nationality: 'Italian',
        role: ['artist', 'sculptor', 'architect'],
        shortBio: 'Italian Renaissance polymath, painter, sculptor, architect, and inventor.',
        birthPlace: createdPlaces['florence']?.id,
      },
      {
        name: 'Michelangelo',
        slug: 'michelangelo',
        birthDate: '1475',
        deathDate: '1564',
        nationality: 'Italian',
        role: ['sculptor', 'artist', 'architect'],
        shortBio: 'Italian sculptor, painter, architect, and poet of the High Renaissance.',
        birthPlace: createdPlaces['florence']?.id,
      },
      {
        name: 'Claude Monet',
        slug: 'claude-monet',
        birthDate: '1840',
        deathDate: '1926',
        nationality: 'French',
        role: ['artist'],
        shortBio: 'French painter and founder of Impressionism.',
        birthPlace: createdPlaces['paris']?.id,
      },
    ]

    const createdPeople: Record<string, any> = {}
    for (const person of people) {
      const existing = await payload.find({
        collection: 'people',
        where: { slug: { equals: person.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'people',
          data: person,
        })
        createdPeople[person.slug] = created
      } else {
        createdPeople[person.slug] = existing.docs[0]
      }
    }
    console.log('✅ People created')

    // ===========================================
    // Create Artifacts
    // ===========================================
    console.log('Creating artifacts...')

    const artifacts = [
      {
        title: 'Mona Lisa',
        slug: 'mona-lisa',
        template: 'detail',
        dateCreated: 'circa 1503-1519',
        accessionNumber: 'INV-779',
        featured: true,
        onDisplay: true,
        gallery: 'Gallery 711',
        materials: [{ material: 'Oil on poplar panel' }],
        dimensions: { height: 77, width: 53 },
        people: [createdPeople['leonardo-da-vinci']?.id].filter(Boolean),
        places: [createdPlaces['florence']?.id, createdPlaces['paris']?.id].filter(Boolean),
        collections: [createdCollections['modern-contemporary']?.id].filter(Boolean),
        _status: 'published',
      },
      {
        title: 'David',
        slug: 'david',
        template: 'detail',
        dateCreated: '1501-1504',
        accessionNumber: 'GAL-001',
        featured: true,
        onDisplay: true,
        gallery: 'Gallery of the Academy',
        materials: [{ material: 'Marble' }],
        dimensions: { height: 517, width: 199, depth: 132 },
        people: [createdPeople['michelangelo']?.id].filter(Boolean),
        places: [createdPlaces['florence']?.id].filter(Boolean),
        collections: [createdCollections['medieval-art']?.id].filter(Boolean),
        _status: 'published',
      },
      {
        title: 'Water Lilies',
        slug: 'water-lilies',
        template: 'detail',
        dateCreated: '1906',
        accessionNumber: 'MOM-1981',
        featured: true,
        onDisplay: true,
        gallery: 'Impressionist Wing',
        materials: [{ material: 'Oil on canvas' }],
        dimensions: { height: 89.9, width: 94.1 },
        people: [createdPeople['claude-monet']?.id].filter(Boolean),
        places: [createdPlaces['paris']?.id].filter(Boolean),
        collections: [createdCollections['modern-contemporary']?.id].filter(Boolean),
        _status: 'published',
      },
      {
        title: 'Rosetta Stone',
        slug: 'rosetta-stone',
        template: 'detail',
        dateCreated: '196 BCE',
        accessionNumber: 'EA-24',
        featured: true,
        onDisplay: true,
        gallery: 'Egyptian Sculpture Gallery',
        materials: [{ material: 'Granodiorite' }],
        dimensions: { height: 114, width: 72, depth: 28, weight: 760 },
        places: [createdPlaces['giza']?.id].filter(Boolean),
        collections: [createdCollections['ancient-civilizations']?.id].filter(Boolean),
        _status: 'published',
      },
    ]

    for (const artifact of artifacts) {
      const existing = await payload.find({
        collection: 'artifacts',
        where: { slug: { equals: artifact.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'artifacts',
          data: artifact,
        })
      }
    }
    console.log('✅ Artifacts created')

    // ===========================================
    // Create Posts
    // ===========================================
    console.log('Creating blog posts...')

    const posts = [
      {
        title: 'Welcome to Our Museum Platform',
        slug: 'welcome-to-our-museum-platform',
        excerpt: 'Discover the new digital experience for exploring our collection.',
        categories: [createdCategories['culture']?.id].filter(Boolean),
        author: adminUser.id,
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
      {
        title: 'The Art of Digital Preservation',
        slug: 'art-of-digital-preservation',
        excerpt: 'How technology is helping preserve cultural heritage for future generations.',
        categories: [createdCategories['technology']?.id, createdCategories['culture']?.id].filter(Boolean),
        author: adminUser.id,
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
      {
        title: 'Behind the Scenes: Curating a Collection',
        slug: 'behind-the-scenes-curating',
        excerpt: 'An inside look at how our curators select and organize artifacts.',
        categories: [createdCategories['culture']?.id].filter(Boolean),
        author: adminUser.id,
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
    ]

    for (const post of posts) {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: post.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'posts',
          data: post,
        })
      }
    }
    console.log('✅ Posts created')

    // ===========================================
    // Create Pages
    // ===========================================
    console.log('Creating pages...')

    const pages = [
      {
        title: 'Home',
        slug: 'home',
        template: 'landing',
        hero: {
          type: 'fullscreen',
          heading: 'Explore Our Collection',
          subheading: 'Discover thousands of artifacts spanning centuries of human history',
          overlay: 'dark',
          textAlign: 'center',
          links: [
            { label: 'Browse Collection', url: '/artifacts', variant: 'primary' },
            { label: 'Plan Your Visit', url: '/visit', variant: 'secondary' },
          ],
        },
        _status: 'published',
      },
      {
        title: 'About',
        slug: 'about',
        template: 'detail',
        hero: {
          type: 'standard',
          heading: 'About Our Museum',
          subheading: 'Learn about our history, mission, and the people behind our collection',
        },
        _status: 'published',
      },
      {
        title: 'Visit',
        slug: 'visit',
        template: 'detail',
        hero: {
          type: 'standard',
          heading: 'Plan Your Visit',
          subheading: 'Hours, admission, directions, and visitor information',
        },
        _status: 'published',
      },
      {
        title: 'Contact',
        slug: 'contact',
        template: 'detail',
        hero: {
          type: 'minimal',
          heading: 'Contact Us',
          subheading: 'Get in touch with our team',
        },
        _status: 'published',
      },
    ]

    for (const page of pages) {
      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: page.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'pages',
          data: page,
        })
      }
    }
    console.log('✅ Pages created')

    // ===========================================
    // Create Globals
    // ===========================================
    console.log('Setting up globals...')

    // Header
    await payload.updateGlobal({
      slug: 'header',
      data: {
        logoText: 'Museum',
        navItems: [
          { label: 'Home', type: 'link', url: '/' },
          { label: 'Collection', type: 'dropdown', children: [
            { label: 'All Artifacts', url: '/artifacts' },
            { label: 'Ancient Civilizations', url: '/collections/ancient-civilizations' },
            { label: 'Medieval Art', url: '/collections/medieval-art' },
            { label: 'Asian Art', url: '/collections/asian-art' },
            { label: 'Modern & Contemporary', url: '/collections/modern-contemporary' },
          ]},
          { label: 'People', type: 'link', url: '/people' },
          { label: 'Places', type: 'link', url: '/places' },
          { label: 'Blog', type: 'link', url: '/blog' },
          { label: 'About', type: 'link', url: '/about' },
        ],
        ctaButton: {
          show: true,
          label: 'Plan Your Visit',
          url: '/visit',
        },
      },
    })

    // Footer
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        logoText: 'Museum',
        description: 'Preserving and sharing cultural heritage with the world.',
        columns: [
          {
            heading: 'Explore',
            links: [
              { label: 'Collection', url: '/artifacts' },
              { label: 'Exhibitions', url: '/exhibitions' },
              { label: 'Events', url: '/events' },
              { label: 'Research', url: '/research' },
            ],
          },
          {
            heading: 'Visit',
            links: [
              { label: 'Hours & Admission', url: '/visit' },
              { label: 'Directions', url: '/visit#directions' },
              { label: 'Accessibility', url: '/accessibility' },
              { label: 'Group Tours', url: '/tours' },
            ],
          },
          {
            heading: 'About',
            links: [
              { label: 'Our Story', url: '/about' },
              { label: 'Leadership', url: '/about#leadership' },
              { label: 'Careers', url: '/careers' },
              { label: 'Press', url: '/press' },
            ],
          },
        ],
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'twitter', url: 'https://twitter.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'youtube', url: 'https://youtube.com' },
        ],
        copyright: '© {year} Museum. All rights reserved.',
        legalLinks: [
          { label: 'Privacy Policy', url: '/privacy' },
          { label: 'Terms of Use', url: '/terms' },
          { label: 'Cookie Policy', url: '/cookies' },
        ],
      },
    })

    // Settings
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        siteName: 'Museum Collection',
        siteDescription: 'Explore our world-class collection of art and artifacts',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
        defaultMeta: {
          title: 'Museum Collection',
          description: 'Explore our world-class collection of art and artifacts spanning centuries of human history.',
        },
        twitterHandle: 'museum',
      },
    })

    console.log('✅ Globals configured')

    console.log('')
    console.log('🎉 Database seeding completed successfully!')
    console.log('')
    console.log('Admin credentials:')
    console.log('  Email: admin@example.com')
    console.log('  Password: admin123')
    console.log('')

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }

  process.exit(0)
}

seed()
