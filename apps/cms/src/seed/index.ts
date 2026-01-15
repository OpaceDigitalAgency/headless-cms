import { getPayload } from 'payload'
import config from '../payload.config'
import * as fs from 'fs'
import * as path from 'path'
import { downloadAllMedia, SAMPLE_IMAGES, getMediaPath, mediaExists } from './download-media'

/**
 * Seed script to populate the database with sample data
 * Run with: pnpm seed
 * 
 * This script:
 * 1. Downloads sample images from Unsplash
 * 2. Creates admin user
 * 3. Uploads media files
 * 4. Creates all collections with relationships
 * 5. Sets up globals (header, footer, settings)
 */
async function seed() {
  console.log('🌱 Starting database seed...')
  console.log('')

  const payload = await getPayload({ config })

  try {
    // ===========================================
    // Download Sample Media
    // ===========================================
    await downloadAllMedia()
    console.log('')

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
    // Upload Media Files
    // ===========================================
    console.log('Uploading media files...')
    
    const uploadedMedia: Record<string, any> = {}
    
    async function uploadMedia(key: keyof typeof SAMPLE_IMAGES): Promise<any> {
      const image = SAMPLE_IMAGES[key]
      const filepath = getMediaPath(key)
      
      // Check if already uploaded
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { contains: image.filename.replace('.jpg', '') } },
        limit: 1,
      })
      
      if (existing.docs.length > 0) {
        return existing.docs[0]
      }
      
      // Check if file exists locally
      if (!mediaExists(key)) {
        console.warn(`  ⚠️ Media file not found: ${image.filename}`)
        return null
      }
      
      try {
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: image.alt,
          },
          filePath: filepath,
        })
        return media
      } catch (error) {
        console.warn(`  ⚠️ Failed to upload ${image.filename}:`, error)
        return null
      }
    }
    
    // Upload all media files
    for (const key of Object.keys(SAMPLE_IMAGES) as Array<keyof typeof SAMPLE_IMAGES>) {
      const media = await uploadMedia(key)
      if (media) {
        uploadedMedia[key] = media
      }
    }
    console.log(`✅ Media uploaded: ${Object.keys(uploadedMedia).length} files`)

    // ===========================================
    // Create Categories
    // ===========================================
    console.log('Creating categories...')

    const categories = [
      { title: 'Technology', slug: 'technology', description: 'Tech news and updates' },
      { title: 'Design', slug: 'design', description: 'Design trends and inspiration' },
      { title: 'Business', slug: 'business', description: 'Business insights and strategies' },
      { title: 'Culture', slug: 'culture', description: 'Cultural topics and discussions' },
      { title: 'Art History', slug: 'art-history', description: 'Art history and analysis' },
      { title: 'Conservation', slug: 'conservation', description: 'Artifact conservation and preservation' },
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
        shortDescription: 'Artifacts from ancient Egypt, Greece, Rome, and Mesopotamia spanning 5000 years of human history.',
        template: 'grid',
        featuredImage: uploadedMedia.collection_ancient?.id,
        curator: adminUser.id,
        _status: 'published',
      },
      {
        title: 'Medieval Art',
        slug: 'medieval-art',
        shortDescription: 'European art and artifacts from the Middle Ages, including religious works and illuminated manuscripts.',
        template: 'list',
        featuredImage: uploadedMedia.collection_medieval?.id,
        curator: adminUser.id,
        _status: 'published',
      },
      {
        title: 'Asian Art',
        slug: 'asian-art',
        shortDescription: 'Art and artifacts from China, Japan, India, and Southeast Asia representing diverse cultural traditions.',
        template: 'gallery',
        featuredImage: uploadedMedia.collection_asian?.id,
        curator: adminUser.id,
        _status: 'published',
      },
      {
        title: 'Modern & Contemporary',
        slug: 'modern-contemporary',
        shortDescription: '19th century to present day artworks showcasing the evolution of modern artistic expression.',
        template: 'grid',
        featuredImage: uploadedMedia.collection_modern?.id,
        curator: adminUser.id,
        _status: 'published',
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
        coordinates: { latitude: 43.7696, longitude: 11.2558 },
        featuredImage: uploadedMedia.florence?.id,
        historicalNames: [{ name: 'Florentia', period: 'Roman era' }],
        _status: 'published',
      },
      {
        name: 'Paris',
        slug: 'paris',
        country: 'France',
        placeType: 'city',
        address: { city: 'Paris', country: 'France' },
        coordinates: { latitude: 48.8566, longitude: 2.3522 },
        featuredImage: uploadedMedia.paris?.id,
        historicalNames: [{ name: 'Lutetia', period: 'Roman era' }],
        _status: 'published',
      },
      {
        name: 'Athens',
        slug: 'athens',
        country: 'Greece',
        placeType: 'city',
        address: { city: 'Athens', country: 'Greece' },
        coordinates: { latitude: 37.9838, longitude: 23.7275 },
        featuredImage: uploadedMedia.athens?.id,
        historicalNames: [{ name: 'Athēnai', period: 'Ancient Greek' }],
        _status: 'published',
      },
      {
        name: 'Giza',
        slug: 'giza',
        country: 'Egypt',
        placeType: 'archaeological',
        address: { city: 'Giza', country: 'Egypt' },
        coordinates: { latitude: 29.9792, longitude: 31.1342 },
        featuredImage: uploadedMedia.giza?.id,
        _status: 'published',
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
        portrait: uploadedMedia.portrait_1?.id,
        _status: 'published',
      },
      {
        name: 'Michelangelo Buonarroti',
        slug: 'michelangelo',
        birthDate: '1475',
        deathDate: '1564',
        nationality: 'Italian',
        role: ['sculptor', 'artist', 'architect'],
        shortBio: 'Italian sculptor, painter, architect, and poet of the High Renaissance.',
        birthPlace: createdPlaces['florence']?.id,
        portrait: uploadedMedia.portrait_2?.id,
        _status: 'published',
      },
      {
        name: 'Claude Monet',
        slug: 'claude-monet',
        birthDate: '1840',
        deathDate: '1926',
        nationality: 'French',
        role: ['artist'],
        shortBio: 'French painter and founder of Impressionism, known for his water lily paintings.',
        birthPlace: createdPlaces['paris']?.id,
        _status: 'published',
      },
      {
        name: 'Phidias',
        slug: 'phidias',
        birthDate: 'c. 480 BCE',
        deathDate: 'c. 430 BCE',
        nationality: 'Greek',
        role: ['sculptor', 'architect'],
        shortBio: 'Ancient Greek sculptor, painter, and architect, considered one of the greatest of all sculptors.',
        birthPlace: createdPlaces['athens']?.id,
        _status: 'published',
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
        dimensions: { height: 77, width: 53, unit: 'cm' },
        provenance: 'Acquired by King Francis I of France, later moved to the Louvre.',
        people: [createdPeople['leonardo-da-vinci']?.id].filter(Boolean),
        places: [createdPlaces['florence']?.id, createdPlaces['paris']?.id].filter(Boolean),
        collections: [createdCollections['modern-contemporary']?.id].filter(Boolean),
        media: uploadedMedia.mona_lisa ? [{ image: uploadedMedia.mona_lisa.id, caption: 'Mona Lisa by Leonardo da Vinci' }] : [],
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
        materials: [{ material: 'Carrara marble' }],
        dimensions: { height: 517, width: 199, depth: 132, unit: 'cm' },
        provenance: 'Originally commissioned for the Florence Cathedral, moved to the Accademia Gallery in 1873.',
        people: [createdPeople['michelangelo']?.id].filter(Boolean),
        places: [createdPlaces['florence']?.id].filter(Boolean),
        collections: [createdCollections['medieval-art']?.id].filter(Boolean),
        media: uploadedMedia.sculpture ? [{ image: uploadedMedia.sculpture.id, caption: 'David by Michelangelo' }] : [],
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
        dimensions: { height: 89.9, width: 94.1, unit: 'cm' },
        provenance: 'Part of a series of approximately 250 oil paintings by Claude Monet.',
        people: [createdPeople['claude-monet']?.id].filter(Boolean),
        places: [createdPlaces['paris']?.id].filter(Boolean),
        collections: [createdCollections['modern-contemporary']?.id].filter(Boolean),
        media: uploadedMedia.water_lilies ? [{ image: uploadedMedia.water_lilies.id, caption: 'Water Lilies by Claude Monet' }] : [],
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
        dimensions: { height: 114, width: 72, depth: 28, weight: 760, unit: 'cm' },
        provenance: 'Discovered in 1799 near the town of Rashid (Rosetta) in Egypt.',
        places: [createdPlaces['giza']?.id].filter(Boolean),
        collections: [createdCollections['ancient-civilizations']?.id].filter(Boolean),
        media: uploadedMedia.ancient_artifact ? [{ image: uploadedMedia.ancient_artifact.id, caption: 'The Rosetta Stone' }] : [],
        _status: 'published',
      },
      {
        title: 'Parthenon Marbles',
        slug: 'parthenon-marbles',
        template: 'detail',
        dateCreated: '447-432 BCE',
        accessionNumber: 'GR-1816',
        featured: false,
        onDisplay: true,
        gallery: 'Duveen Gallery',
        materials: [{ material: 'Pentelic marble' }],
        provenance: 'Originally part of the Parthenon temple in Athens.',
        people: [createdPeople['phidias']?.id].filter(Boolean),
        places: [createdPlaces['athens']?.id].filter(Boolean),
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
        excerpt: 'Discover the new digital experience for exploring our collection. We are excited to launch our new online platform.',
        categories: [createdCategories['culture']?.id].filter(Boolean),
        author: adminUser.id,
        featuredImage: uploadedMedia.blog_1?.id,
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
      {
        title: 'The Art of Digital Preservation',
        slug: 'art-of-digital-preservation',
        excerpt: 'How technology is helping preserve cultural heritage for future generations through advanced imaging and documentation.',
        categories: [createdCategories['technology']?.id, createdCategories['conservation']?.id].filter(Boolean),
        author: adminUser.id,
        featuredImage: uploadedMedia.blog_2?.id,
        publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        _status: 'published',
      },
      {
        title: 'Behind the Scenes: Curating a Collection',
        slug: 'behind-the-scenes-curating',
        excerpt: 'An inside look at how our curators select, research, and organize artifacts for display and study.',
        categories: [createdCategories['culture']?.id, createdCategories['art-history']?.id].filter(Boolean),
        author: adminUser.id,
        featuredImage: uploadedMedia.blog_3?.id,
        publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        _status: 'published',
      },
      {
        title: 'Conservation Techniques in Modern Museums',
        slug: 'conservation-techniques-modern-museums',
        excerpt: 'Exploring the latest methods used to preserve and restore priceless artifacts for future generations.',
        categories: [createdCategories['conservation']?.id, createdCategories['technology']?.id].filter(Boolean),
        author: adminUser.id,
        publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
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
          subheading: 'Discover thousands of artifacts spanning centuries of human history and artistic achievement',
          overlay: 'dark',
          textAlign: 'center',
          backgroundImage: uploadedMedia.hero_museum?.id,
          links: [
            { label: 'Browse Collection', url: '/artifacts', variant: 'primary' },
            { label: 'Plan Your Visit', url: '/visit', variant: 'secondary' },
          ],
        },
        layout: [
          {
            blockType: 'archive',
            heading: 'Featured Artifacts',
            collection: 'artifacts',
            limit: 6,
            showFeaturedOnly: true,
          },
          {
            blockType: 'archive',
            heading: 'Latest Articles',
            collection: 'posts',
            limit: 3,
          },
        ],
        meta: {
          title: 'Museum Collection - Explore Art & History',
          description: 'Discover our world-class collection of art and artifacts spanning centuries of human history.',
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
          backgroundImage: uploadedMedia.hero_art?.id,
        },
        layout: [
          {
            blockType: 'content',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Our museum has been dedicated to preserving and sharing cultural heritage since its founding. We house one of the world\'s most comprehensive collections of art and artifacts.' }],
                  },
                ],
              },
            },
          },
        ],
        meta: {
          title: 'About Us',
          description: 'Learn about our museum\'s history, mission, and the dedicated team behind our world-class collection.',
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
        layout: [
          {
            blockType: 'content',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    tag: 'h2',
                    children: [{ type: 'text', text: 'Hours of Operation' }],
                  },
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Open daily from 10:00 AM to 5:00 PM. Extended hours on Fridays until 9:00 PM.' }],
                  },
                ],
              },
            },
          },
        ],
        meta: {
          title: 'Plan Your Visit',
          description: 'Everything you need to know before visiting our museum - hours, admission, directions, and accessibility information.',
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
        layout: [
          {
            blockType: 'content',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'We\'d love to hear from you. Reach out with questions, feedback, or inquiries about our collection.' }],
                  },
                ],
              },
            },
          },
        ],
        meta: {
          title: 'Contact Us',
          description: 'Get in touch with our museum team for inquiries, feedback, or information about our collection.',
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
        logo: uploadedMedia.hero_museum?.id,
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
        description: 'Preserving and sharing cultural heritage with the world since 1850.',
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
          { platform: 'github', url: 'https://github.com' },
        ],
        copyright: '© {year} Museum Collection. All rights reserved.',
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
        siteDescription: 'Explore our world-class collection of art and artifacts spanning centuries of human history.',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
        defaultMeta: {
          title: 'Museum Collection',
          description: 'Explore our world-class collection of art and artifacts spanning centuries of human history.',
        },
        twitterHandle: '@museum',
        googleAnalyticsId: '',
      },
    })

    console.log('✅ Globals configured')

    console.log('')
    console.log('═══════════════════════════════════════════════════════')
    console.log('🎉 Database seeding completed successfully!')
    console.log('═══════════════════════════════════════════════════════')
    console.log('')
    console.log('Admin credentials:')
    console.log('  Email:    admin@example.com')
    console.log('  Password: admin123')
    console.log('')
    console.log('Access points:')
    console.log('  CMS Admin: http://localhost:3000/admin')
    console.log('  Frontend:  http://localhost:3001')
    console.log('')

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }

  process.exit(0)
}

seed()
