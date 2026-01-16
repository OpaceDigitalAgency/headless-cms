import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Revalidation API Route
 * 
 * Handles on-demand revalidation requests from Payload CMS hooks.
 * Since the CMS and frontend are now in the same Next.js app,
 * this endpoint provides compatibility with any external revalidation needs.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, collection, slug, path: pathToRevalidate, tag } = body

    // Validate secret
    const expectedSecret = process.env.REVALIDATION_SECRET || 'revalidation-secret-key'
    if (secret !== expectedSecret) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate by tag if provided
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({ revalidated: true, tag })
    }

    // Revalidate specific path if provided
    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate)
      return NextResponse.json({ revalidated: true, path: pathToRevalidate })
    }

    // Revalidate based on collection
    if (collection) {
      switch (collection) {
        case 'pages':
          if (slug === 'home') {
            revalidatePath('/')
          } else if (slug) {
            revalidatePath(`/${slug}`)
          }
          revalidatePath('/', 'layout')
          break

        case 'posts':
          if (slug) {
            revalidatePath(`/blog/${slug}`)
          }
          revalidatePath('/blog')
          break

        case 'artifacts':
          if (slug) {
            revalidatePath(`/artifacts/${slug}`)
          }
          revalidatePath('/artifacts')
          break

        case 'people':
          if (slug) {
            revalidatePath(`/people/${slug}`)
          }
          revalidatePath('/people')
          break

        case 'places':
          if (slug) {
            revalidatePath(`/places/${slug}`)
          }
          revalidatePath('/places')
          break

        case 'museum-collections':
          if (slug) {
            revalidatePath(`/collections/${slug}`)
          }
          revalidatePath('/collections')
          break

        case 'custom-items':
          if (slug) {
            revalidatePath(`/items/${slug}`)
          }
          revalidatePath('/items')
          break

        case 'header':
        case 'footer':
        case 'settings':
          // Revalidate entire site for global changes
          revalidatePath('/', 'layout')
          break

        default:
          revalidatePath('/', 'layout')
      }

      return NextResponse.json({ revalidated: true, collection, slug })
    }

    return NextResponse.json({ error: 'No revalidation target specified' }, { status: 400 })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

