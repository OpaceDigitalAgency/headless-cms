'use client'

/**
 * Client-safe version of RenderBlocks for live preview.
 * Does not include blocks that require server-side data fetching.
 */

import { HeroBlock } from './blocks/HeroBlock'
import { ContentBlock } from './blocks/ContentBlock'
import { MediaBlock } from './blocks/MediaBlock'
import { CTABlock } from './blocks/CTABlock'
import { FormBlock } from './blocks/FormBlock'
import { GalleryBlock } from './blocks/GalleryBlock'
import { GridBlock } from './blocks/GridBlock'
import { TimelineBlock } from './blocks/TimelineBlock'

interface RenderBlocksClientProps {
  blocks: any[]
}

const blockComponents: Record<string, React.ComponentType<{ block: any }>> = {
  hero: HeroBlock,
  content: ContentBlock,
  media: MediaBlock,
  cta: CTABlock,
  form: FormBlock,
  gallery: GalleryBlock,
  grid: GridBlock,
  timeline: TimelineBlock,
}

export function RenderBlocksClient({ blocks }: RenderBlocksClientProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <div className="space-y-12">
      {blocks.map((block, index) => {
        const BlockComponent = blockComponents[block.blockType]

        if (!BlockComponent) {
          // For archive blocks in preview, show placeholder
          if (block.blockType === 'archive') {
            return (
              <div key={index} className="container">
                <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50 p-8 text-centre text-amber-700">
                  <strong>Archive Block</strong>
                  <p className="mt-2 text-sm">Archive blocks require a full page refresh to display content.</p>
                </div>
              </div>
            )
          }
          console.warn(`Unknown block type: ${block.blockType}`)
          return (
            <div key={index} className="container">
              <div className="rounded-lg border border-dashed border-default bg-card p-8 text-centre text-muted">
                Unknown block type: {block.blockType}
              </div>
            </div>
          )
        }

        return <BlockComponent key={block.id || index} block={block} />
      })}
    </div>
  )
}

