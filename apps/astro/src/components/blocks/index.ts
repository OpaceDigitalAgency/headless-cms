/**
 * Block Components Index
 * 
 * Export all block components for easy importing.
 * Use BlockRenderer.astro for dynamic block rendering.
 */

// Note: Astro components can't be exported from .ts files
// Import them directly in your pages/layouts:
//
// import BlockRenderer from '../components/blocks/BlockRenderer.astro';
// import HeroBlock from '../components/blocks/HeroBlock.astro';
// etc.

export const blockTypes = [
  'hero',
  'content',
  'media',
  'cta',
  'gallery',
  'grid',
  'timeline',
  'archive',
  'form',
] as const;

export type BlockType = typeof blockTypes[number];
