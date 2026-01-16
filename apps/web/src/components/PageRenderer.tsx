import type { Page } from '@/lib/api'
import { RenderBlocks } from './RenderBlocks'
import { LandingTemplate, DetailTemplate, ListTemplate, ArticleTemplate } from '@repo/templates'

interface PageRendererProps {
  page: Page
}

export function PageRenderer({ page }: PageRendererProps) {
  const { template, hero, content } = page

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

  // Render based on template
  switch (template) {
    case 'landing':
    case 'showcase':
      return (
        <LandingTemplate
          hero={heroData}
          blocks={content ? <RenderBlocks blocks={content} /> : null}
        />
      )

    case 'detail':
      return (
        <DetailTemplate
          heading={page.title}
          content={content ? <RenderBlocks blocks={content} /> : null}
        />
      )

    case 'list':
      return (
        <ListTemplate
          heading={page.title}
          content={content ? <RenderBlocks blocks={content} /> : null}
        />
      )

    case 'article':
      return (
        <ArticleTemplate
          heading={page.title}
          content={content ? <RenderBlocks blocks={content} /> : null}
        />
      )

    default:
      // Default template with hero and blocks
      return (
        <div className="min-h-screen">
          {heroData && (
            <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gray-900">
              {heroData.image && (
                <div className="absolute inset-0">
                  <img
                    src={heroData.image.url}
                    alt={heroData.image.alt || ''}
                    className="h-full w-full object-cover opacity-50"
                  />
                </div>
              )}
              <div className="relative z-10 px-4 text-center text-white">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {heroData.heading}
                </h1>
                {heroData.subheading && (
                  <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
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
                            ? 'btn-outline text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
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
            <div className="py-12">
              <RenderBlocks blocks={content} />
            </div>
          )}
        </div>
      )
  }
}
