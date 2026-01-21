'use server'

/**
 * Revalidation Utilities
 *
 * Direct revalidation using Next.js cache functions.
 * Since Payload and the frontend are in the same Next.js app,
 * we can call revalidatePath/revalidateTag directly without webhooks.
 *
 * These functions are called from Payload hooks which run server-side.
 * They are NOT Server Actions - they're just utility functions.
 */

import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Revalidate a page by its slug
 */
export async function revalidatePage(slug: string, previousSlug?: string) {
  const path = slug === 'home' ? '/' : `/${slug}`

  revalidatePath(path)
  revalidateTag('pages')

  // If slug changed, also revalidate the old path
  if (previousSlug && previousSlug !== slug) {
    const oldPath = previousSlug === 'home' ? '/' : `/${previousSlug}`
    revalidatePath(oldPath)
  }

  console.log(`[Revalidate] Page: ${path}`)
}

/**
 * Revalidate a post by its slug
 */
export async function revalidatePost(slug: string, previousSlug?: string) {
  const path = `/blog/${slug}`

  revalidatePath(path)
  revalidatePath('/blog') // Blog listing page
  revalidateTag('posts')

  // If slug changed, also revalidate the old path
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/blog/${previousSlug}`)
  }

  console.log(`[Revalidate] Post: ${path}`)
}

/**
 * Revalidate an archive item by its slug
 */
export async function revalidateArchiveItem(slug: string, previousSlug?: string) {
  const path = `/archive-items/${slug}`

  revalidatePath(path)
  revalidatePath('/archive-items') // Archive items listing page
  revalidateTag('archive-items')

  // If slug changed, also revalidate the old path
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/archive-items/${previousSlug}`)
  }

  console.log(`[Revalidate] Archive Item: ${path}`)
}

/**
 * Revalidate a person by their slug
 */
export async function revalidatePerson(slug: string, previousSlug?: string) {
  const path = `/people/${slug}`

  revalidatePath(path)
  revalidatePath('/people') // People listing page
  revalidateTag('people')

  // If slug changed, also revalidate the old path
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/people/${previousSlug}`)
  }

  console.log(`[Revalidate] Person: ${path}`)
}

/**
 * Revalidate a place by its slug
 */
export async function revalidatePlace(slug: string, previousSlug?: string) {
  const path = `/places/${slug}`

  revalidatePath(path)
  revalidatePath('/places') // Places listing page
  revalidateTag('places')

  // If slug changed, also revalidate the old path
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/places/${previousSlug}`)
  }

  console.log(`[Revalidate] Place: ${path}`)
}

/**
 * Revalidate an event by its slug
 */
export async function revalidateEvent(slug: string, previousSlug?: string) {
  const path = `/events/${slug}`

  revalidatePath(path)
  revalidatePath('/events') // Events listing page
  revalidateTag('events')

  // If slug changed, also revalidate the old path
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/events/${previousSlug}`)
  }

  console.log(`[Revalidate] Event: ${path}`)
}

/**
 * Revalidate header global
 */
export async function revalidateHeader() {
  revalidateTag('header')
  // Header appears on all pages, revalidate the layout
  revalidatePath('/', 'layout')
  console.log('[Revalidate] Header global')
}

/**
 * Revalidate footer global
 */
export async function revalidateFooter() {
  revalidateTag('footer')
  // Footer appears on all pages, revalidate the layout
  revalidatePath('/', 'layout')
  console.log('[Revalidate] Footer global')
}

/**
 * Revalidate settings global
 */
export async function revalidateSettings() {
  revalidateTag('settings')
  // Settings affect all pages, revalidate the layout
  revalidatePath('/', 'layout')
  console.log('[Revalidate] Settings global')
}

