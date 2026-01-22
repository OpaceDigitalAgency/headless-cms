import Link from 'next/link'
import Image from 'next/image'

interface CTABlockProps {
  block: {
    style?: string
    heading: string
    description?: string
    image?: { url: string; alt?: string }
    links?: Array<{
      label: string
      url?: string
      page?: { slug: string }
      variant?: string
      newTab?: boolean
    }>
    backgroundColor?: string
  }
}

export function CTABlock({ block }: CTABlockProps) {
  const {
    style = 'standard',
    heading,
    description,
    image,
    links,
    backgroundColor = 'primary',
  } = block

  const getUrl = (link: any) => {
    if (link.url) return link.url
    if (link.page?.slug) return `/${link.page.slug}`
    return '#'
  }

  const bgClasses = {
    none: 'bg-base',
    light: 'bg-card',
    dark: 'bg-[rgb(var(--color-foreground))] text-[rgb(var(--color-background))]',
    primary: 'bg-accent text-[rgb(var(--color-background))]',
    secondary: 'bg-card text-foreground',
  }

  if (style === 'banner') {
    return (
      <section className="relative w-full overflow-hidden py-16">
        {image?.url && (
          <div className="absolute inset-0">
            <Image
              src={image.url}
              alt={image.alt || ''}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[rgb(var(--color-foreground))]/70" />
          </div>
        )}
        <div className="container relative z-10 text-center text-[rgb(var(--color-background))]">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90">
              {description}
            </p>
          )}
          {links && links.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={getUrl(link)}
                  target={link.newTab ? '_blank' : undefined}
                  className={`btn inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold transition-all ${
                    link.variant === 'primary'
                      ? 'bg-[rgb(var(--color-background))] text-foreground hover:bg-[rgb(var(--color-card))]'
                      : 'border border-[rgb(var(--color-background))] bg-transparent text-[rgb(var(--color-background))] hover:bg-[rgb(var(--color-background))]/10'
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

  if (style === 'card') {
    return (
      <section className="container py-16">
        <div className="card relative overflow-hidden">
          {image?.url && (
            <div className="absolute inset-0">
              <Image
                src={image.url}
                alt={image.alt || ''}
                fill
                className="object-cover opacity-20"
              />
            </div>
          )}
          <div className="relative z-10 p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {heading}
            </h2>
            {description && (
              <p className="mx-auto mt-6 max-w-xl text-muted">
                {description}
              </p>
            )}
            {links && links.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-4">
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
        </div>
      </section>
    )
  }

  if (style === 'agency') {
    return (
      <section className="relative overflow-hidden bg-black px-6 py-32 sm:px-8 sm:py-40 lg:px-12 lg:py-48">
        {/* Agency Background Effects - Matches Bolt Design */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 bottom-0 h-[600px] w-[600px] animate-blob-9s rounded-full bg-emerald-500/20 mix-blend-multiply blur-3xl" />
          <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] animate-blob-11s rounded-full bg-teal-500/20 mix-blend-multiply blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <h2 className="text-5xl font-black leading-[1.1] tracking-tighter sm:text-6xl lg:text-7xl xl:text-8xl mb-12">
            <span className="inline-block bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              {heading}
            </span>
          </h2>
          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-gray-400 sm:text-2xl">
              {description}
            </p>
          )}
          {links && links.length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={getUrl(link)}
                  target={link.newTab ? '_blank' : undefined}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-5 text-lg font-bold text-black shadow-2xl shadow-emerald-500/50 transition-all hover:scale-105 hover:shadow-emerald-500/70 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 animate-button-glow"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative">{link.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // Standard CTA
  return (
    <section className={`w-full ${bgClasses[backgroundColor as keyof typeof bgClasses]} py-16`}>
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {heading}
        </h2>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            {description}
          </p>
        )}
        {links && links.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {links.map((link, index) => (
              <Link
                key={index}
                href={getUrl(link)}
                target={link.newTab ? '_blank' : undefined}
                className={`btn inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold transition-all ${
                  backgroundColor === 'primary' || backgroundColor === 'dark'
                    ? link.variant === 'primary'
                      ? 'bg-[rgb(var(--color-background))] text-foreground hover:bg-[rgb(var(--color-card))]'
                      : 'border border-[rgb(var(--color-background))] bg-transparent text-[rgb(var(--color-background))] hover:bg-[rgb(var(--color-background))]/10'
                    : link.variant === 'primary'
                    ? 'btn-primary'
                    : 'border border-[rgb(var(--color-border))] bg-transparent text-foreground hover:border-[rgb(var(--color-accent))] hover:bg-[rgb(var(--color-card))]'
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
