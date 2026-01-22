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

  try {
    revalidatePath(path)
    revalidateTag('pages')
  } catch (err) {
    // Silence errors when revalidating outside of a request context (e.g. seeding)
    console.warn(`[Revalidate] Skipping page revalidation for ${path}: ${err instanceof Error ? err.message : String(err)}`)
  }

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

  try {
    revalidatePath(path)
    revalidatePath('/blog') // Blog listing page
    revalidateTag('posts')
  } catch (err) {
    console.warn(`[Revalidate] Skipping post revalidation for ${path}: ${err instanceof Error ? err.message : String(err)}`)
  }

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

  try {
    revalidatePath(path)
    revalidatePath('/archive-items') // Archive items listing page
    revalidateTag('archive-items')
  } catch (err) {
    console.warn(`[Revalidate] Skipping archive item revalidation for ${path}: ${err instanceof Error ? err.message : String(err)}`)
  }

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

  try {
    revalidatePath(path)
    revalidatePath('/people') // People listing page
    revalidateTag('people')
  } catch (err) {
    console.warn(`[Revalidate] Skipping person revalidation for ${path}: ${err instanceof Error ? err.message : String(err)}`)
  }

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

  try {
    revalidatePath(path)
    revalidatePath('/places') // Places listing page
    revalidateTag('places')
  } catch (err) {
    console.warn(`[Revalidate] Skipping place revalidation for ${path}: ${err instanceof Error ? err.message : String(err)}`)
  }

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

  try {
    revalidatePath(path)
    revalidatePath('/events') // Events listing page
    revalidateTag('events')
  } catch (err) {
    console.warn(`[Revalidate] Skipping event revalidation for ${path}: ${err instanceof Error ? err.message : String(err)}`)
  }

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
  try {
    revalidateTag('header')
    // Header appears on all pages, revalidate the layout
    revalidatePath('/', 'layout')
  } catch (err) {
    console.warn(`[Revalidate] Skipping header revalidation: ${err instanceof Error ? err.message : String(err)}`)
  }
  console.log('[Revalidate] Header global')
}

/**
 * Revalidate footer global
 */
export async function revalidateFooter() {
  try {
    revalidateTag('footer')
    // Footer appears on all pages, revalidate the layout
    revalidatePath('/', 'layout')
  } catch (err) {
    console.warn(`[Revalidate] Skipping footer revalidation: ${err instanceof Error ? err.message : String(err)}`)
  }
  console.log('[Revalidate] Footer global')
}

/**
 * Revalidate settings global
 */
export async function revalidateSettings() {
  try {
    revalidateTag('settings')
    // Settings affect all pages, revalidate the layout
    revalidatePath('/', 'layout')
  } catch (err) {
    console.warn(`[Revalidate] Skipping settings revalidation: ${err instanceof Error ? err.message : String(err)}`)
  }
  console.log('[Revalidate] Settings global')
}

