/**
 * Blocks Index
 * 
 * Central export for all content blocks.
 * Blocks are reusable content components that can be added to pages.
 */

// Core blocks
export { heroBlock } from './Hero'
export { contentBlock } from './Content'
export { mediaBlock } from './Media'
export { ctaBlock } from './CallToAction'
export { archiveBlock } from './Archive'
export { formBlock } from './Form'
export { quoteBlock } from './Quote'
export { featuresBlock } from './Features'
export { statsBlock } from './Stats'
export { logoCloudBlock } from './LogoCloud'
export { testimonialsBlock } from './Testimonials'
export { faqBlock } from './FAQ'
export { pricingBlock } from './Pricing'
export { teamBlock } from './Team'
export { embedBlock } from './Embed'
export { spacerBlock } from './Spacer'
export { htmlBlock } from './HTML'

// Layout blocks
export { galleryBlock } from './Gallery'
export { gridBlock } from './Grid'
export { timelineBlock } from './Timeline'

// Block registry for dynamic loading
import { heroBlock } from './Hero'
import { contentBlock } from './Content'
import { mediaBlock } from './Media'
import { ctaBlock } from './CallToAction'
import { archiveBlock } from './Archive'
import { formBlock } from './Form'
import { galleryBlock } from './Gallery'
import { gridBlock } from './Grid'
import { timelineBlock } from './Timeline'
import { quoteBlock } from './Quote'
import { featuresBlock } from './Features'
import { statsBlock } from './Stats'
import { logoCloudBlock } from './LogoCloud'
import { testimonialsBlock } from './Testimonials'
import { faqBlock } from './FAQ'
import { pricingBlock } from './Pricing'
import { teamBlock } from './Team'
import { embedBlock } from './Embed'
import { spacerBlock } from './Spacer'
import { htmlBlock } from './HTML'

/**
 * All available blocks
 */
export const allBlocks = [
  heroBlock,
  contentBlock,
  mediaBlock,
  ctaBlock,
  archiveBlock,
  formBlock,
  quoteBlock,
  featuresBlock,
  statsBlock,
  logoCloudBlock,
  testimonialsBlock,
  faqBlock,
  pricingBlock,
  teamBlock,
  embedBlock,
  spacerBlock,
  htmlBlock,
  galleryBlock,
  gridBlock,
  timelineBlock,
]

/**
 * Block registry by slug
 */
export const blockRegistry = {
  hero: heroBlock,
  content: contentBlock,
  media: mediaBlock,
  cta: ctaBlock,
  archive: archiveBlock,
  form: formBlock,
  quote: quoteBlock,
  features: featuresBlock,
  stats: statsBlock,
  logoCloud: logoCloudBlock,
  testimonials: testimonialsBlock,
  faq: faqBlock,
  pricing: pricingBlock,
  team: teamBlock,
  embed: embedBlock,
  spacer: spacerBlock,
  html: htmlBlock,
  gallery: galleryBlock,
  grid: gridBlock,
  timeline: timelineBlock,
} as const

export type BlockSlug = keyof typeof blockRegistry

/**
 * Get a block by slug
 */
export function getBlock(slug: BlockSlug) {
  return blockRegistry[slug]
}

/**
 * Get blocks by slugs
 */
export function getBlocks(slugs: BlockSlug[]) {
  return slugs.map(slug => blockRegistry[slug]).filter(Boolean)
}
