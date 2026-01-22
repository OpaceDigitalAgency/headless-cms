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

  /* Agency Skin - Exact Match from agency-v2/page.tsx */
  if (isAgency) {
    return (
      <section className="relative overflow-hidden bg-black px-6 py-32 sm:px-8 sm:py-40 lg:px-12 lg:py-56">
        {/* Exact Grid from Reference */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] animate-blob rounded-full bg-emerald-500/30 mix-blend-multiply blur-3xl" />
          <div className="absolute -right-1/4 top-0 h-[500px] w-[500px] animate-blob-delayed-2 rounded-full bg-teal-500/30 mix-blend-multiply blur-3xl" />
          <div className="absolute -bottom-8 left-1/2 h-[500px] w-[500px] animate-blob-delayed-4 rounded-full bg-cyan-500/30 mix-blend-multiply blur-3xl" />
        </div>

        {/* Radial Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.1)_0%,transparent_50%)] opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl">
            {eyebrow && (
              <div className="inline-block mb-8 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm animate-pulse-slow">
                <span className="text-sm font-medium text-emerald-400 tracking-wide uppercase">{eyebrow}</span>
              </div>
            )}

            <h1 className="text-6xl font-black leading-[1.1] tracking-tighter sm:text-7xl lg:text-8xl xl:text-9xl">
              <span className="inline-block bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                {heading}
              </span>
            </h1>

            {subheading && (
              <p className="mt-8 text-xl leading-relaxed text-gray-400 sm:text-2xl lg:text-3xl max-w-3xl font-light animate-text-shimmer">
                {subheading}
              </p>
            )}

            {links && links.length > 0 && (
              <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
                {links.map((link, index) => {
                  if (link.variant === 'primary' || index === 0) {
                    return (
                      <Link
                        key={index}
                        href={getUrl(link)}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-5 text-lg font-bold text-black shadow-2xl shadow-emerald-500/50 transition-all hover:scale-105 hover:shadow-emerald-500/70 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 animate-button-glow"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                        <span className="relative">{link.label}</span>
                        <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    )
                  }
                  return (
                    <Link
                      key={index}
                      href={getUrl(link)}
                      className="group inline-flex items-center justify-center rounded-full border-2 border-gray-700 bg-black/40 px-10 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
                    >
                      {link.label}
                      <svg className="ml-2 h-5 w-5 transition-transform group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`relative flex ${minHeight} w-full items-center justify-center overflow-hidden bg-base`}>
      {/* Agency Background Effects - Using CSS Variables/Classes now */}
      <div className={`absolute inset-0 ${isAgency ? 'opacity-100' : 'hidden'}`}>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[image:var(--pattern-grid)] bg-[size:var(--skin-bg-size)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Animated Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] animate-blob rounded-full bg-[rgb(var(--color-blob-1))]/30 mix-blend-multiply blur-3xl" />
          <div className="absolute -right-1/4 top-0 h-[500px] w-[500px] animate-blob-delayed-2 rounded-full bg-[rgb(var(--color-blob-2))]/30 mix-blend-multiply blur-3xl" />
          <div className="absolute -bottom-8 left-1/2 h-[500px] w-[500px] animate-blob-delayed-4 rounded-full bg-[rgb(var(--color-blob-3))]/30 mix-blend-multiply blur-3xl" />
        </div>

        {/* Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(var(--color-blob-1),0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(var(--color-blob-2),0.1)_0%,transparent_50%)] opacity-30" />
      </div>

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
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlayClasses[overlay as keyof typeof overlayClasses]}`} />
      )}

      {/* Content */}
      <div className={`container relative z-10 flex flex-col px-4 py-20 sm:py-24 lg:py-32 ${alignClasses[textAlign as keyof typeof alignClasses]}`}>
        {eyebrow && (
          <div className="mb-8 inline-block">
            <span className="eyebrow">
              {eyebrow}
            </span>
          </div>
        )}

        <h1 className={`max-w-4xl text-4xl sm:text-5xl lg:text-6xl ${isAgency ? 'gradient-text-hero font-black tracking-tighter' : 'text-foreground font-bold tracking-tight'}`}>
          {heading}
        </h1>

        {subheading && (
          <p className={`max-w-2xl text-lg sm:text-xl text-muted ${isAgency ? 'mt-10 text-xl leading-relaxed sm:text-2xl' : 'mt-6'}`}>
            {subheading}
          </p>
        )}

        {links && links.length > 0 && (
          <div className={`flex flex-wrap ${isAgency ? 'mt-12 gap-6' : 'mt-10 gap-4'}`}>
            {links.map((link, index) => (
              <Link
                key={index}
                href={getUrl(link)}
                target={link.newTab ? '_blank' : undefined}
                className={`btn inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold transition-all ${link.variant === 'primary'
                  ? 'btn-primary'
                  : link.variant === 'outline'
                    ? 'btn-outline'
                    : 'btn-secondary'
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
