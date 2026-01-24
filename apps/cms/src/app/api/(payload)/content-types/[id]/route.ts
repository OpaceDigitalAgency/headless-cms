import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/content-types/[id]
 * 
 * Fetch a single content type by ID.
 * Used by the CustomItemsListHeader component to display the correct collection name.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const payload = await getPayload({ config })

    const contentType = await payload.findByID({
      collection: 'content-types',
      id,
      depth: 0,
    })

    if (!contentType) {
      return NextResponse.json(
        { error: 'Content type not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: contentType.id,
      name: contentType.name,
      slug: contentType.slug,
      pluralLabel: contentType.pluralLabel,
      singularLabel: contentType.singularLabel,
      icon: contentType.icon,
    })
  } catch (error) {
    console.error('Error fetching content type:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content type' },
      { status: 500 }
    )
  }
}

