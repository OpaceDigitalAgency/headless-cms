import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'revalidation-secret-key'

/**
 * On-demand revalidation endpoint
 * Called by Payload CMS after publish/unpublish operations
 * 
 * CRITICAL: This is the ONLY way pages get regenerated
 * There is NO time-based ISR - all updates are on-demand
 * 
 * Expected payload from Payload CMS:
 * {
 *   secret: string,
 *   collection: string,
 *   slug: string,
 *   id?: string,
 *   operation?: 'create' | 'update' | 'delete'
 * }
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await request.json()
    const { secret, collection, slug, id, operation, contentTypeSlug, tags: extraTags } = body

    // SECURITY: Verify secret token
    if (secret !== REVALIDATION_SECRET) {
      console.error('[Revalidate] Invalid secret token')
      return NextResponse.json(
        { error: 'Invalid revalidation secret' },
        { status: 401 }
      )
    }

    console.log(`[Revalidate] ${operation || 'update'} ${collection}/${slug || id}`)

    // Build list of tags to revalidate
    const tags: string[] = []

    if (collection) {
      tags.push(collection)
      
      if (slug) {
        tags.push(`${collection}:${slug}`)
      }
      
      if (id) {
        tags.push(`${collection}:id:${id}`)
      }
    }

    if (Array.isArray(extraTags)) {
      tags.push(...extraTags)
    }

    // Revalidate all tags
    for (const tag of tags) {
      revalidateTag(tag)
      console.log(`[Revalidate] Tag: ${tag}`)
    }

    // Build list of paths to revalidate based on collection
    const paths: string[] = []

    switch (collection) {
      case 'pages':
        if (slug === 'home' || slug === 'index') {
          paths.push('/')
        } else if (slug) {
          paths.push(`/${slug}`)
        }
        break
        
      case 'posts':
        paths.push('/blog')
        if (slug) {
          paths.push(`/blog/${slug}`)
        }
        // Also revalidate home page as it may show recent posts
        paths.push('/')
        break
        
      case 'artifacts':
        paths.push('/artifacts')
        if (slug) {
          paths.push(`/artifacts/${slug}`)
        }
        // Also revalidate home page as it may show featured artifacts
        paths.push('/')
        break
        
      case 'people':
        paths.push('/people')
        if (slug) {
          paths.push(`/people/${slug}`)
        }
        break
        
      case 'places':
        paths.push('/places')
        if (slug) {
          paths.push(`/places/${slug}`)
        }
        break
        
      case 'museum-collections':
        paths.push('/collections')
        if (slug) {
          paths.push(`/collections/${slug}`)
        }
        break
        
      case 'categories':
        // Category changes affect blog listing
        paths.push('/blog')
        if (slug) {
          paths.push(`/blog/category/${slug}`)
        }
        break

      case 'tags':
        paths.push('/blog')
        if (slug) {
          paths.push(`/blog/tag/${slug}`)
        }
        break
        
      case 'media':
        // Media changes can affect many pages - revalidate common areas
        revalidateTag('media')
        break

      case 'custom-items':
        if (contentTypeSlug) {
          paths.push(`/items/${contentTypeSlug}`)
          if (slug) {
            paths.push(`/items/${contentTypeSlug}/${slug}`)
          }
        } else if (slug) {
          paths.push(`/items/${slug}`)
        }
        // Also revalidate top-level items index if present
        paths.push('/items')
        break

      case 'content-types':
        paths.push('/items')
        if (slug) {
          paths.push(`/items/${slug}`)
        }
        break
        
      case 'header':
        // Header changes affect all pages - revalidate the header tag
        revalidateTag('header')
        revalidateTag('global')
        // Revalidate all known paths since header appears on every page
        paths.push('/')
        revalidatePath('/', 'layout')
        console.log('[Revalidate] Header global - revalidating layout')
        break

      case 'footer':
        // Footer changes affect all pages - revalidate the footer tag
        revalidateTag('footer')
        revalidateTag('global')
        paths.push('/')
        revalidatePath('/', 'layout')
        console.log('[Revalidate] Footer global - revalidating layout')
        break

      case 'settings':
        // Settings changes affect all pages
        revalidateTag('settings')
        revalidateTag('global')
        paths.push('/')
        revalidatePath('/', 'layout')
        console.log('[Revalidate] Settings global - revalidating layout')
        break
    }

    // Execute path revalidations
    for (const path of paths) {
      try {
        revalidatePath(path)
        console.log(`[Revalidate] Path: ${path}`)
      } catch (error) {
        console.error(`[Revalidate] Failed to revalidate path ${path}:`, error)
      }
    }

    const duration = Date.now() - startTime

    return NextResponse.json({
      success: true,
      revalidated: {
        tags,
        paths,
      },
      collection,
      slug,
      operation: operation || 'update',
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Revalidate] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}

/**
 * Health check for revalidation endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/revalidate',
    method: 'POST',
    description: 'On-demand revalidation for static pages',
    requiredFields: ['secret', 'collection'],
    optionalFields: ['slug', 'id', 'operation'],
    note: 'This is the ONLY way pages get regenerated - no time-based ISR',
  })
}
