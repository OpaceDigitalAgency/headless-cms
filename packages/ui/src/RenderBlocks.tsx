import {
  HeroBlock,
  ContentBlock,
  MediaBlock,
  CTABlock,
  ArchiveBlock,
  FormBlock,
  GalleryBlock,
  GridBlock,
  TimelineBlock,
  QuoteBlock,
  FeaturesBlock,
  StatsBlock,
  LogoCloudBlock,
  TestimonialsBlock,
  FaqBlock,
  PricingBlock,
  TeamBlock,
  EmbedBlock,
  SpacerBlock,
  HtmlBlock,
} from './blocks'

interface RenderBlocksProps {
  blocks: any[]
}

const blockComponents: Record<string, React.ComponentType<{ block: any }>> = {
  hero: HeroBlock,
  content: ContentBlock,
  media: MediaBlock,
  cta: CTABlock,
  quote: QuoteBlock,
  features: FeaturesBlock,
  stats: StatsBlock,
  logoCloud: LogoCloudBlock,
  testimonials: TestimonialsBlock,
  faq: FaqBlock,
  pricing: PricingBlock,
  team: TeamBlock,
  embed: EmbedBlock,
  archive: ArchiveBlock,
  form: FormBlock,
  gallery: GalleryBlock,
  grid: GridBlock,
  timeline: TimelineBlock,
  spacer: SpacerBlock,
  html: HtmlBlock,
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
