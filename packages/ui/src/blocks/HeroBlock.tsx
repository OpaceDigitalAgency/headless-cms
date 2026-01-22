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
    <section className={`relative flex ${minHeight} w-full items-center justify-center overflow-hidden ${isAgency ? 'bg-black' : 'bg-base'}`}>
      {/* Agency Background Effects - Matches Bolt Design */}
      {isAgency && (
        <>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

          {/* Animated Blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] animate-blob rounded-full bg-emerald-500/30 mix-blend-multiply blur-3xl" />
            <div className="absolute -right-1/4 top-0 h-[500px] w-[500px] animate-blob-delayed-2 rounded-full bg-teal-500/30 mix-blend-multiply blur-3xl" />
            <div className="absolute -bottom-8 left-1/2 h-[500px] w-[500px] animate-blob-delayed-4 rounded-full bg-cyan-500/30 mix-blend-multiply blur-3xl" />
          </div>

          {/* Radial Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.1)_0%,transparent_50%)] opacity-30" />
        </>
      )}

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
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
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
