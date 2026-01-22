import Link from 'next/link'
import Image from 'next/image'

interface HeroBlockProps {
  block: {
    variant?: string
    type?: string
    eyebrow?: string
    heading: string
    subheading?: string
    image?: { url: string; alt?: string }
    videoUrl?: string
    overlay?: string
    textAlign?: string
    links?: Array<{
      label: string
      url?: string
      page?: { slug: string }
      variant?: string
      newTab?: boolean
    }>
  }
}

export function HeroBlock({ block }: HeroBlockProps) {
  const {
    variant = 'standard',
    type = 'standard',
    eyebrow,
    heading,
    subheading,
    image,
    videoUrl,
    overlay = 'dark',
    textAlign = 'center',
    links,
  } = block

  const getUrl = (link: any) => {
    if (link.url) return link.url
    if (link.page?.slug) return `/${link.page.slug}`
    return '#'
  }

  const overlayClasses = {
    none: '',
    light: 'bg-base/50',
    dark: 'bg-[rgb(var(--color-foreground))]/50',
    gradient: 'bg-gradient-to-t from-[rgb(var(--color-foreground))]/80 to-transparent',
  }

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  const minHeight = type === 'fullscreen' ? 'min-h-screen' : 'min-h-[60vh]'
  const isAgency = variant === 'agency'

  return (
    <section className={`relative flex ${minHeight} w-full items-center justify-center overflow-hidden bg-base`}>
      {/* Background Image */}
      {image?.url && (
        <div className="absolute inset-0">
          <Image
            src={image.url}
            alt={image.alt || ''}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Video Background */}
      {videoUrl && type === 'video' && (
        <div className="absolute inset-0">
          <iframe
            src={videoUrl.includes('youtube')
              ? `${videoUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0`
              : videoUrl
            }
            className="h-full w-full object-cover"
            allow="autoplay; fullscreen"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      )}

      {/* Overlay */}
      {overlay !== 'none' && !isAgency && (
        <div className={`absolute inset-0 ${overlayClasses[overlay as keyof typeof overlayClasses]}`} />
      )}

      {/* Content */}
      <div className={`container relative z-10 flex flex-col px-4 py-20 sm:py-24 lg:py-32 ${alignClasses[textAlign as keyof typeof alignClasses]}`}>
        {eyebrow && (
          <span className="mb-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-4xl font-bold tracking-tight text-foreground">
          {heading}
        </h1>

        {subheading && (
          <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            {subheading}
          </p>
        )}

        {links && links.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-4">
            {links.map((link, index) => (
              <Link
                key={index}
                href={getUrl(link)}
                target={link.newTab ? '_blank' : undefined}
                className={`btn inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold transition-all ${
                  link.variant === 'primary'
                    ? 'btn-primary'
                    : link.variant === 'outline'
                    ? 'border border-[rgb(var(--color-border))] bg-transparent text-foreground hover:border-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-card))]'
                    : 'bg-[rgb(var(--color-card))] text-foreground hover:bg-[rgb(var(--color-accent))]/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
