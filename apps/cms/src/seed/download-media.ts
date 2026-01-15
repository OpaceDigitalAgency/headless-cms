/**
 * Media Download Utility for Seed Script
 * 
 * Downloads sample images from Unsplash for seeding the database.
 * Uses placeholder images that are free to use.
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'

const MEDIA_DIR = path.join(__dirname, 'media')

// Sample images from Unsplash (free to use)
export const SAMPLE_IMAGES = {
  // Hero/Banner images
  hero_museum: {
    url: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1920&h=1080&fit=crop',
    filename: 'hero-museum.jpg',
    alt: 'Museum interior with grand architecture',
  },
  hero_art: {
    url: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1920&h=1080&fit=crop',
    filename: 'hero-art.jpg',
    alt: 'Art gallery with paintings',
  },
  
  // Artifact images
  mona_lisa: {
    url: 'https://images.unsplash.com/photo-1423742774270-6884aac775fa?w=800&h=1000&fit=crop',
    filename: 'mona-lisa.jpg',
    alt: 'Classic painting in ornate frame',
  },
  sculpture: {
    url: 'https://images.unsplash.com/photo-1544413660-299165566b1d?w=800&h=1200&fit=crop',
    filename: 'sculpture.jpg',
    alt: 'Classical marble sculpture',
  },
  water_lilies: {
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=800&fit=crop',
    filename: 'water-lilies.jpg',
    alt: 'Impressionist painting of water lilies',
  },
  ancient_artifact: {
    url: 'https://images.unsplash.com/photo-1608376630927-c1b8f5e1e8a0?w=800&h=1000&fit=crop',
    filename: 'ancient-artifact.jpg',
    alt: 'Ancient stone artifact',
  },
  
  // People portraits
  portrait_1: {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    filename: 'portrait-1.jpg',
    alt: 'Portrait photograph',
  },
  portrait_2: {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    filename: 'portrait-2.jpg',
    alt: 'Portrait photograph',
  },
  
  // Place images
  florence: {
    url: 'https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?w=1200&h=800&fit=crop',
    filename: 'florence.jpg',
    alt: 'Florence cityscape with Duomo',
  },
  paris: {
    url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
    filename: 'paris.jpg',
    alt: 'Paris with Eiffel Tower',
  },
  athens: {
    url: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&h=800&fit=crop',
    filename: 'athens.jpg',
    alt: 'Athens Acropolis',
  },
  giza: {
    url: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1200&h=800&fit=crop',
    filename: 'giza.jpg',
    alt: 'Pyramids of Giza',
  },
  
  // Collection covers
  collection_ancient: {
    url: 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=1200&h=600&fit=crop',
    filename: 'collection-ancient.jpg',
    alt: 'Ancient artifacts collection',
  },
  collection_medieval: {
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
    filename: 'collection-medieval.jpg',
    alt: 'Medieval art collection',
  },
  collection_asian: {
    url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=600&fit=crop',
    filename: 'collection-asian.jpg',
    alt: 'Asian art collection',
  },
  collection_modern: {
    url: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&h=600&fit=crop',
    filename: 'collection-modern.jpg',
    alt: 'Modern art collection',
  },
  
  // Blog post images
  blog_1: {
    url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&h=600&fit=crop',
    filename: 'blog-1.jpg',
    alt: 'Museum exhibition',
  },
  blog_2: {
    url: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&h=600&fit=crop',
    filename: 'blog-2.jpg',
    alt: 'Digital preservation technology',
  },
  blog_3: {
    url: 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=1200&h=600&fit=crop',
    filename: 'blog-3.jpg',
    alt: 'Curator examining artifact',
  },
}

/**
 * Download a single image
 */
function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location
        if (redirectUrl) {
          file.close()
          fs.unlinkSync(filepath)
          downloadImage(redirectUrl, filepath).then(resolve).catch(reject)
          return
        }
      }
      
      if (response.statusCode !== 200) {
        file.close()
        fs.unlinkSync(filepath)
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }
      
      response.pipe(file)
      
      file.on('finish', () => {
        file.close()
        resolve()
      })
      
      file.on('error', (err) => {
        file.close()
        fs.unlinkSync(filepath)
        reject(err)
      })
    }).on('error', (err) => {
      file.close()
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath)
      }
      reject(err)
    })
  })
}

/**
 * Download all sample images
 */
export async function downloadAllMedia(): Promise<void> {
  // Ensure media directory exists
  if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true })
  }
  
  console.log('📥 Downloading sample media files...')
  
  const entries = Object.entries(SAMPLE_IMAGES)
  let downloaded = 0
  let skipped = 0
  
  for (const [key, image] of entries) {
    const filepath = path.join(MEDIA_DIR, image.filename)
    
    // Skip if already downloaded
    if (fs.existsSync(filepath)) {
      skipped++
      continue
    }
    
    try {
      await downloadImage(image.url, filepath)
      downloaded++
      process.stdout.write(`\r  Downloaded ${downloaded}/${entries.length - skipped} images`)
    } catch (error) {
      console.warn(`\n  ⚠️ Failed to download ${key}: ${error}`)
    }
  }
  
  console.log(`\n✅ Media download complete: ${downloaded} downloaded, ${skipped} already existed`)
}

/**
 * Get the local path for a sample image
 */
export function getMediaPath(key: keyof typeof SAMPLE_IMAGES): string {
  const image = SAMPLE_IMAGES[key]
  return path.join(MEDIA_DIR, image.filename)
}

/**
 * Check if media files exist
 */
export function mediaExists(key: keyof typeof SAMPLE_IMAGES): boolean {
  return fs.existsSync(getMediaPath(key))
}

// Run if executed directly
if (require.main === module) {
  downloadAllMedia()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Failed to download media:', error)
      process.exit(1)
    })
}
