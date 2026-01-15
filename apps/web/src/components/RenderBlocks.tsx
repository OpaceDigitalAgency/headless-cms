import { HeroBlock } from './blocks/HeroBlock'
import { ContentBlock } from './blocks/ContentBlock'
import { MediaBlock } from './blocks/MediaBlock'
import { CTABlock } from './blocks/CTABlock'
import { ArchiveBlock } from './blocks/ArchiveBlock'
import { FormBlock } from './blocks/FormBlock'
import { GalleryBlock } from './blocks/GalleryBlock'
import { GridBlock } from './blocks/GridBlock'
import { TimelineBlock } from './blocks/TimelineBlock'

interface RenderBlocksProps {
  blocks: any[]
}

const blockComponents: Record<string, React.ComponentType<{ block: any }>> = {
  hero: HeroBlock,
  content: ContentBlock,
  media: MediaBlock,
  cta: CTABlock,
  archive: ArchiveBlock,
  form: FormBlock,
  gallery: GalleryBlock,
  grid: GridBlock,
  timeline: TimelineBlock,
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <div className="space-y-12">
      {blocks.map((block, index) => {
        const BlockComponent = blockComponents[block.blockType]

        if (!BlockComponent) {
          console.warn(`Unknown block type: ${block.blockType}`)
          return (
            <div key={index} className="container">
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
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
