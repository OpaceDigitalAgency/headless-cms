import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Enable draft mode for preview
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const collection = searchParams.get('collection')

  // Verify secret
  const previewSecret = process.env.REVALIDATION_SECRET
  if (previewSecret && secret !== previewSecret) {
    return NextResponse.json(
      { error: 'Invalid preview secret' },
      { status: 401 }
    )
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the preview page
  let redirectUrl = '/'

  if (collection && slug) {
    switch (collection) {
      case 'pages':
        redirectUrl = slug === 'home' ? '/' : `/${slug}`
        break
      case 'posts':
        redirectUrl = `/blog/${slug}`
        break
      case 'artifacts':
        redirectUrl = `/artifacts/${slug}`
        break
      case 'people':
        redirectUrl = `/people/${slug}`
        break
      case 'places':
        redirectUrl = `/places/${slug}`
        break
      case 'museum-collections':
        redirectUrl = `/collections/${slug}`
        break
      default:
        redirectUrl = `/${collection}/${slug}`
    }
  }

  redirect(redirectUrl)
}

/**
 * Disable draft mode
 */
export async function POST() {
  const draft = await draftMode()
  draft.disable()
  
  return NextResponse.json({ draftMode: false })
}
