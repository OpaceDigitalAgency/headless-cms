import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-demand revalidation endpoint
 * Called by Payload CMS after content changes
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, collection, slug, id } = body

    // Verify secret
    const revalidationSecret = process.env.REVALIDATION_SECRET
    if (revalidationSecret && secret !== revalidationSecret) {
      return NextResponse.json(
        { error: 'Invalid revalidation secret' },
        { status: 401 }
      )
    }

    // Revalidate by tag
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

    // Revalidate all tags
    for (const tag of tags) {
      revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
    }

    // Also revalidate specific paths based on collection
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
        break
      case 'artifacts':
        paths.push('/artifacts')
        if (slug) {
          paths.push(`/artifacts/${slug}`)
        }
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
      case 'header':
      case 'footer':
      case 'settings':
        // Revalidate all pages for global changes
        paths.push('/')
        break
    }

    // Revalidate paths
    for (const path of paths) {
      revalidatePath(path)
      console.log(`Revalidated path: ${path}`)
    }

    return NextResponse.json({
      revalidated: true,
      tags,
      paths,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
