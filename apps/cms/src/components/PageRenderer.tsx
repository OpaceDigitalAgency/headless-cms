import { RenderBlocks } from './RenderBlocks'
import { LandingTemplate, DetailTemplate, ListTemplate, ArticleTemplate } from '@repo/templates'
import { HeroBlock } from './blocks/HeroBlock'
import { ContentBlock } from './blocks/ContentBlock'
import { MediaBlock } from './blocks/MediaBlock'
import { CTABlock } from './blocks/CTABlock'
import { ArchiveBlock } from './blocks/ArchiveBlock'
import { FormBlock } from './blocks/FormBlock'
import { GalleryBlock } from './blocks/GalleryBlock'
import { GridBlock } from './blocks/GridBlock'
import { TimelineBlock } from './blocks/TimelineBlock'
import { QuoteBlock } from './blocks/QuoteBlock'
import { FeaturesBlock } from './blocks/FeaturesBlock'
import { StatsBlock } from './blocks/StatsBlock'
import { LogoCloudBlock } from './blocks/LogoCloudBlock'
import { TestimonialsBlock } from './blocks/TestimonialsBlock'
import { FaqBlock } from './blocks/FaqBlock'
import { PricingBlock } from './blocks/PricingBlock'
import { TeamBlock } from './blocks/TeamBlock'
import { EmbedBlock } from './blocks/EmbedBlock'
import { SpacerBlock } from './blocks/SpacerBlock'
import { HtmlBlock } from './blocks/HtmlBlock'
import { Container, Section } from '@repo/ui/primitives'
import { generateWebsiteSchema, generateOrganizationSchema, generateBreadcrumbSchema, renderJsonLd } from '@/lib/seo/schema'
// import { getSettings } from '@/lib/payload-api' // Removed to make component client-safe

interface PageRendererProps {
  page: any // Using Payload's generated types would be ideal
  settings?: any // Optional settings for schema generation
}

/**
 * Wraps template components with Section and Container primitives
 * This ensures consistent layout, spacing, and content centering across all page types
 *
 * IMPORTANT: All page templates MUST be wrapped with this to maintain:
 * - Consistent max-width constraints
 * - Proper horizontal padding and centering
 * - Vertical spacing (py-16 sm:py-24)
 * - Global theme alignment
 *
 * This prevents layout issues when creating new pages, posts, or collections
 */
function TemplateWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Section spacing="lg" background="default">
      <Container>
        {children}
      </Container>
    </Section>
  )
}

export function PageRenderer({ page, settings }: PageRendererProps) {
  // Settings can be passed as prop for schema generation (optional)
  const { template, hero, content } = page

  // Generate JSON-LD schemas
  const schemas = []

  if (settings) {
    // Add WebSite schema (only on home page)
    if (page.slug === 'home') {
      schemas.push(generateWebsiteSchema(settings))
    }

    // Add Organization schema
    schemas.push(generateOrganizationSchema(settings))

    // Add Breadcrumb schema
    const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const breadcrumbs = [
      { name: 'Home', url: siteUrl },
    ]
    if (page.slug !== 'home') {
      breadcrumbs.push({ name: page.title, url: `${siteUrl}/${page.slug}` })
    }
    schemas.push(generateBreadcrumbSchema(breadcrumbs))
  }

  // Map hero data if present
  const heroData = hero
    ? {
        type: hero.type || 'standard',
        heading: hero.heading,
        subheading: hero.subheading,
        image: hero.image?.url ? { url: hero.image.url, alt: hero.image.alt } : undefined,
        videoUrl: hero.videoUrl,
        overlay: hero.overlay,
        textAlign: hero.textAlign,
        links: hero.links?.map((link: any) => ({
          label: link.label,
          url: link.url || (link.page?.slug ? `/${link.page.slug}` : '#'),
          variant: link.variant,
          newTab: link.newTab,
        })),
      }
    : undefined

  // Block component mapping
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

  // Render based on template
  switch (template) {
    case 'landing':
    case 'showcase':
      return (
        <>
          {schemas.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: renderJsonLd(schemas) }}
            />
          )}
          <LandingTemplate
            hero={heroData}
            blocks={content}
            renderBlock={(block) => {
              const BlockComponent = blockComponents[block.blockType]
              if (!BlockComponent) {
                return (
                  <div className="container">
                    <div className="rounded-lg border border-dashed border-default bg-card p-8 text-center text-muted">
                      Unknown block type: {block.blockType}
                    </div>
                  </div>
                )
              }
              return <BlockComponent block={block} />
            }}
          />
        </>
      )

    case 'detail':
      return (
        <>
          {schemas.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: renderJsonLd(schemas) }}
            />
          )}
          <TemplateWrapper>
            <DetailTemplate
              heading={page.title}
              content={content ? <RenderBlocks blocks={content} /> : null}
            />
          </TemplateWrapper>
        </>
      )

    case 'list':
      return (
        <>
          {schemas.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: renderJsonLd(schemas) }}
            />
          )}
          <TemplateWrapper>
            <ListTemplate
              heading={page.title}
              content={content ? <RenderBlocks blocks={content} /> : null}
            />
          </TemplateWrapper>
        </>
      )

    case 'article':
      return (
        <>
          {schemas.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: renderJsonLd(schemas) }}
            />
          )}
          <TemplateWrapper>
            <ArticleTemplate
              heading={page.title}
              content={content ? <RenderBlocks blocks={content} /> : null}
            />
          </TemplateWrapper>
        </>
      )

    default:
      // Default template with hero and blocks
      return (
        <>
          {schemas.length > 0 && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: renderJsonLd(schemas) }}
            />
          )}
          <div className="min-h-screen">
            {heroData && (
              <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-base">
                {heroData.image && (
                  <div className="absolute inset-0">
                    <img
                      src={heroData.image.url}
                      alt={heroData.image.alt || ''}
                      className="h-full w-full object-cover opacity-50"
                    />
                  </div>
                )}
                <div className="relative z-10 px-4 text-center text-foreground">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    {heroData.heading}
                  </h1>
                  {heroData.subheading && (
                    <p className="mx-auto mt-6 max-w-2xl text-xl text-muted">
                      {heroData.subheading}
                    </p>
                  )}
                  {heroData.links && heroData.links.length > 0 && (
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                      {heroData.links.map((link: any, index: number) => (
                        <a
                          key={index}
                          href={link.url}
                          target={link.newTab ? '_blank' : undefined}
                          className={`btn ${
                            link.variant === 'primary'
                              ? 'btn-primary'
                              : link.variant === 'outline'
                              ? 'btn-outline'
                              : 'bg-base/10 text-foreground hover:bg-base/20'
                          }`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}
            {content && (
              <TemplateWrapper>
                <RenderBlocks blocks={content} />
              </TemplateWrapper>
            )}
          </div>
        </>
      )
  }
}
