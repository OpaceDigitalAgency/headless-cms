// SVG Icon definitions to avoid external dependencies
const Icons = {
  Zap: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
  Palette: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>
  ),
  Image: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
  ),
  Layers: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
  ),
  Frame: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" y1="6" x2="2" y2="6" /><line x1="22" y1="18" x2="2" y2="18" /><line x1="6" y1="2" x2="6" y2="22" /><line x1="18" y1="2" x2="18" y2="22" /></svg>
  ),
  Pen: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
  ),
  Sparkles: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M9 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
  ),
  Star: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  ),
  Heart: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
  ),
  ArrowRight: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
  ),
}

interface GridBlockProps {
  block: {
    heading?: string
    description?: string
    style?: string
    items?: Array<{
      title?: string
      subtitle?: string
      description?: string
      stat?: string
      image?: { url: string; alt?: string }
      icon?: string
    }>
    columns?: string
  }
}

const iconMap: Record<string, any> = {
  zap: Icons.Zap,
  palette: Icons.Palette,
  image: Icons.Image,
  layers: Icons.Layers,
  frame: Icons.Frame,
  pen: Icons.Pen,
  sparkles: Icons.Sparkles,
  star: Icons.Star,
  heart: Icons.Heart,
}

export function GridBlock({ block }: GridBlockProps) {
  const { heading, description, style, items = [], columns = '3' } = block
  if (items.length === 0) return null

  const colCount = Number(columns) || 3
  const gridCols =
    colCount === 1
      ? 'md:grid-cols-1'
      : colCount === 2
        ? 'md:grid-cols-2'
        : colCount === 4
          ? 'md:grid-cols-4'
          : 'md:grid-cols-3'

  const isAgencyCards = style === 'agency-cards'
  const isAgencyList = style === 'agency-list'
  const isRetroCards = style === 'retro-cards'

  return (
    <section className={isAgencyCards || isAgencyList || isRetroCards ? 'relative bg-base py-20' : 'container py-12'}>
      {(isAgencyCards || isAgencyList) && !isRetroCards && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
      )}

      {/* Retro Global Background Elements for Grid Sections */}
      {isRetroCards && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 retro-grain opacity-20" />
          <div className="absolute top-10 right-1/4 w-8 h-8 text-[rgb(var(--color-accent))] opacity-10 animate-pulse">
            <Icons.Sparkles width={32} height={32} />
          </div>
          <div className="absolute bottom-20 left-1/3 w-6 h-6 text-[rgb(var(--color-accent))] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>
            <Icons.Sparkles width={24} height={24} />
          </div>
        </div>
      )}

      {/* Retro Testimonials Background Elements */}
      {isAgencyCards && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 retro-grain opacity-20 animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/4 left-10 w-6 h-6 text-[rgb(var(--color-accent))] opacity-10 animate-pulse">
            <Icons.Heart width={24} height={24} />
          </div>
          <div className="absolute bottom-1/3 right-20 w-5 h-5 text-[rgb(var(--color-accent))] opacity-10 animate-pulse" style={{ animationDelay: '1.5s' }}>
            <Icons.Heart width={20} height={20} />
          </div>
        </div>
      )}

      <div className={isAgencyCards || isAgencyList || isRetroCards ? 'container relative' : undefined}>
        {description && (
          <div className="mb-4 inline-flex items-center rounded-full border border-default px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted">
            {description}
          </div>
        )}
        {heading && (
          <h2 className={isAgencyCards || isAgencyList ? 'mb-10 text-4xl font-bold text-foreground sm:text-5xl' : isRetroCards ? 'mb-16 text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-retro text-center animate-text-shimmer' : 'mb-2 text-2xl font-semibold'}>
            {heading}
          </h2>
        )}
        <div className={`grid gap-6 ${gridCols}`}>
          {items.map((item, index) => {
            const Icon = item.icon ? iconMap[item.icon.toLowerCase()] : null

            // Retro Services Card Style (matches 'retro-cards')
            if (isRetroCards) {
              return (
                <div
                  key={index}
                  className="group relative bg-card border border-border rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-2xl hover:shadow-[rgb(var(--color-accent))]/20 hover:border-accent"
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgb(var(--color-accent))]/5 to-transparent animate-scanline" />
                  </div>

                  <div className="relative z-10 space-y-4">
                    {Icon && (
                      <div className="w-16 h-16 bg-[rgb(var(--color-accent))]/10 rounded-xl flex items-center justify-center text-[rgb(var(--color-accent))] transition-all duration-500 group-hover:bg-[rgb(var(--color-accent))] group-hover:text-base group-hover:scale-110 group-hover:rotate-12">
                        <Icon className="w-8 h-8" />
                      </div>
                    )}
                    {item.title && (
                      <h3 className="text-2xl font-bold text-foreground transition-all duration-300 group-hover:text-accent">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-muted leading-relaxed transition-all duration-300 group-hover:text-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="absolute top-0 right-0 w-20 h-20 gradient-border-retro rounded-bl-full opacity-0 group-hover:opacity-30 transition-all duration-500 group-hover:rotate-45" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-[rgb(var(--color-accent))]/5 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )
            }

            // Retro Testimonials Style (mapped from 'agency-cards' when in retro skin context logic - technically agency cards is shared but we embellish it here)
            if (isAgencyCards) {
              return (
                <div
                  key={index}
                  className="group relative bg-card border border-border rounded-2xl p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-accent hover:rotate-1"
                >
                  <div className="relative z-10 space-y-6">
                    <div className="text-6xl text-[rgb(var(--color-accent))] opacity-20 font-serif leading-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-40">
                      "
                    </div>
                    {item.description && (
                      <p className="text-lg text-foreground leading-relaxed -mt-8 transition-all duration-300 group-hover:text-accent">
                        {item.description} {/* Using description field for quote */}
                      </p>
                    )}
                    <div className="pt-4 border-t border-border transition-colors duration-300 group-hover:border-accent">
                      {item.title && (
                        <p className="font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
                          {item.title}
                        </p>
                      )}
                      {item.subtitle && (
                        <p className="text-sm text-muted transition-colors duration-300 group-hover:text-foreground">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-[rgb(var(--color-accent))] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10" />
                  <div className="absolute top-4 right-4 w-5 h-5 text-[rgb(var(--color-accent))] opacity-0 transition-all duration-500 group-hover:opacity-30 group-hover:rotate-180">
                    <Icons.Sparkles width={20} height={20} />
                  </div>
                </div>
              )
            }

            // Default Card
            return (
              <div
                key={index}
                className={
                  isAgencyList
                    ? 'group relative overflow-hidden rounded-3xl border border-default bg-card p-8 shadow-lg shadow-black/20'
                    : 'rounded-lg border border-default p-5 shadow-sm'
                }
              >
                {isAgencyList && (
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
                )}

                {item.image?.url && (
                  <img src={item.image.url} alt={item.image.alt || ''} className="mb-4 h-40 w-full rounded object-cover" />
                )}

                {Icon && (
                  <div className="mb-4 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                )}

                {item.stat && (
                  <div className="text-2xl font-bold">
                    {item.stat}
                  </div>
                )}
                {item.title && (
                  <h3 className={isAgencyList ? 'text-xl font-semibold text-foreground sm:text-2xl' : 'mt-2 text-lg font-semibold'}>
                    {item.title}
                  </h3>
                )}
                {item.subtitle && <p className="text-sm text-muted">{item.subtitle}</p>}
                {item.description && (
                  <p className={isAgencyList ? 'mt-3 text-base text-muted' : 'mt-2 text-sm text-muted'}>
                    {item.description}
                  </p>
                )}
                {isAgencyList && (
                  <div className="mt-6 flex items-center justify-end">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-default text-accent transition-transform group-hover:translate-x-1">
                      <Icons.ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GridBlock
