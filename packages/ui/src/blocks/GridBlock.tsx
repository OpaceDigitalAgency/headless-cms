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
    <section className={isAgencyCards || isAgencyList ? 'relative w-full bg-black py-16 sm:py-20 lg:py-32' : 'container py-12'}>
      {/* Agency Background Effects */}
      {(isAgencyCards || isAgencyList) && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-1/4 h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-20 [animation-duration:3s]" />
            <div className="absolute right-1/3 top-1/3 h-2 w-2 animate-ping rounded-full bg-teal-400 opacity-20 [animation-delay:1s] [animation-duration:4s]" />
            <div className="absolute left-2/3 bottom-1/3 h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-20 [animation-delay:2s] [animation-duration:5s]" />
          </div>
        </>
      )}

      <div className={isAgencyCards || isAgencyList ? 'container relative mx-auto max-w-7xl' : undefined}>
        {/* Agency Eyebrow */}
        {description && (isAgencyCards || isAgencyList) && (
          <div className="mb-6 inline-block px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm animate-float">
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">{description}</span>
          </div>
        )}
        {description && !isAgencyCards && !isAgencyList && (
          <div className="mb-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            {description}
          </div>
        )}

        {/* Agency Heading */}
        {heading && (isAgencyCards || isAgencyList) && (
          <h2 className="mb-20 text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl max-w-3xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {heading}
          </h2>
        )}
        {heading && !isAgencyCards && !isAgencyList && (
          <h2 className="mb-6 text-2xl font-semibold text-foreground">
            {heading}
          </h2>
        )}

        <div className={`${isAgencyList ? 'space-y-6' : `grid ${isAgencyCards || isAgencyList ? 'gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'gap-6'} ${gridCols}`}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={
                isAgencyCards
                  ? 'group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2'
                  : isAgencyList
                  ? 'group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-10 transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-[1.02] sm:p-12'
                  : 'card p-5'
              }
            >
              {/* Agency Cards Background Effects */}
              {isAgencyCards && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl transition-all group-hover:scale-150" />
                  <div className="absolute right-4 top-4 h-16 w-16 rounded-full border border-emerald-500/20 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-150 animate-rotate-slow" />
                  <div className="absolute right-6 top-6 h-12 w-12 rounded-full border border-teal-500/20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125" />
                </>
              )}

              {/* Agency List Background Effects */}
              {isAgencyList && (
                <>
                  <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute left-0 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl opacity-0 transition-all duration-700 group-hover:opacity-100" />
                </>
              )}

              <div className="relative">
                {item.image?.url && (
                  <img src={item.image.url} alt={item.image.alt || ''} className="mb-4 h-40 w-full rounded object-cover" />
                )}
                {item.stat && isAgencyCards && (
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl font-black text-emerald-400 ring-1 ring-emerald-500/30 transition-all group-hover:scale-110 group-hover:rotate-12">
                    {item.stat}
                  </div>
                )}
                {item.stat && isAgencyList && (
                  <div className="mb-4 inline-block rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/30 transition-all group-hover:scale-110 group-hover:bg-emerald-500/20">
                    {item.stat}
                  </div>
                )}
                {item.stat && !isAgencyCards && !isAgencyList && (
                  <div className="mb-3 text-2xl font-bold text-[rgb(var(--color-accent))]">
                    {item.stat}
                  </div>
                )}
                {item.title && isAgencyCards && (
                  <h3 className="text-2xl font-bold text-white sm:text-3xl mb-4 transition-colors group-hover:text-emerald-100">
                    {item.title}
                  </h3>
                )}
                {item.title && isAgencyList && (
                  <h3 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-4 transition-all group-hover:translate-x-2">
                    {item.title}
                  </h3>
                )}
                {item.title && !isAgencyCards && !isAgencyList && (
                  <h3 className="mt-2 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                )}
                {item.subtitle && <p className="mt-1 text-sm text-muted">{item.subtitle}</p>}
                {item.description && isAgencyCards && (
                  <p className="leading-relaxed text-gray-400 text-lg transition-colors group-hover:text-gray-300">
                    {item.description}
                  </p>
                )}
                {item.description && isAgencyList && (
                  <p className="leading-relaxed text-gray-400 text-xl max-w-2xl transition-all group-hover:text-gray-300 group-hover:translate-x-2">
                    {item.description}
                  </p>
                )}
                {item.description && !isAgencyCards && !isAgencyList && (
                  <p className="mt-2 text-sm text-muted">
                    {item.description}
                  </p>
                )}
                {isAgencyList && (
                  <div className="mt-6 flex items-center justify-end">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-700 bg-black text-emerald-400 transition-all group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-black group-hover:rotate-90 group-hover:scale-110">
                      <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GridBlock
