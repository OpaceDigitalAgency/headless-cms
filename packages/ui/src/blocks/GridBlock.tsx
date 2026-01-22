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
    }>
    columns?: string
  }
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

  return (
    <section className="container py-12 relative">
      {/* Agency Background Effects - Restored & Variable Driven */}
      {/* Note: In a perfect world we'd use CSS variables for this too, but for these specific 'ping' animations, we need DOM elements. 
          We will wrap them in a class that only shows them when the agency skin is active if possible, or just let them be subtle enhancements.
          Actually, let's use the 'data-skin' attribute selector in CSS to hide/show these if they are global, but here they are local. 
          Result: I will add them back but with standard colors that might need variable tweaks. */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* We can use the same blob variables here */}
        <div className="absolute left-1/4 top-1/4 h-2 w-2 animate-ping rounded-full bg-[rgb(var(--color-blob-1))] opacity-20 [animation-duration:3s]" />
        <div className="absolute right-1/3 top-1/3 h-2 w-2 animate-ping rounded-full bg-[rgb(var(--color-blob-2))] opacity-20 [animation-delay:1s] [animation-duration:4s]" />
        <div className="absolute left-2/3 bottom-1/3 h-2 w-2 animate-ping rounded-full bg-[rgb(var(--color-blob-3))] opacity-20 [animation-delay:2s] [animation-duration:5s]" />
      </div>
      <div className={isAgencyCards || isAgencyList ? 'container relative mx-auto max-w-7xl' : undefined}>
        {/* Eyebrow */}
        {description && (
          <div className="mb-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            {description}
          </div>
        )}

        {/* Heading */}
        {heading && (
          <h2 className={`mb-6 text-2xl font-semibold text-foreground ${isAgencyCards || isAgencyList ? 'gradient-subheading text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl mb-20 max-w-3xl' : ''}`}>
            {heading}
          </h2>
        )}

        <div className={`grid gap-6 ${gridCols}`}>
          {items.map((item, index) => {
            if (isAgencyCards || isAgencyList) {
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl transition-all group-hover:scale-150" />

                  <div className="absolute right-4 top-4 h-16 w-16 rounded-full border border-emerald-500/20 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-150 animate-rotate-slow" />
                  <div className="absolute right-6 top-6 h-12 w-12 rounded-full border border-teal-500/20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125 animate-rotate-reverse" />

                  <div className="relative">
                    {(index !== undefined) && (
                      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl font-black text-emerald-400 ring-1 ring-emerald-500/30 transition-all group-hover:scale-110 group-hover:rotate-12">
                        {index + 1}
                      </div>
                    )}
                    {item.title && (
                      <h3 className="text-2xl font-bold text-white sm:text-3xl mb-4 transition-colors group-hover:text-emerald-100">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="leading-relaxed text-gray-400 text-lg transition-colors group-hover:text-gray-300">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              )
            }

            // Standard Card Fallback
            return (
              <div
                key={index}
                className="card p-5"
              >
                <div className="relative">
                  {item.image?.url && (
                    <img src={item.image.url} alt={item.image.alt || ''} className="mb-4 h-40 w-full rounded object-cover" />
                  )}
                  {item.stat && (
                    <div className="mb-3 text-2xl font-bold text-[rgb(var(--color-accent))]">
                      {item.stat}
                    </div>
                  )}
                  {item.title && (
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                  )}
                  {item.subtitle && <p className="mt-1 text-sm text-muted">{item.subtitle}</p>}
                  {item.description && (
                    <p className="mt-2 text-sm text-muted">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GridBlock
