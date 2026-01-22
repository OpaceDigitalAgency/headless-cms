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
    <section className={isAgencyCards || isAgencyList ? 'relative w-full bg-base py-16 sm:py-20 lg:py-24' : 'container py-12'}>
      <div className={isAgencyCards || isAgencyList ? 'container relative' : undefined}>
        {description && (
          <div className="mb-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            {description}
          </div>
        )}
        {heading && (
          <h2 className={isAgencyCards || isAgencyList ? 'mb-12 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl' : 'mb-6 text-2xl font-semibold text-foreground'}>
            {heading}
          </h2>
        )}
        <div className={`grid ${isAgencyCards || isAgencyList ? 'gap-8' : 'gap-6'} ${gridCols}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={
                isAgencyCards
                  ? 'card group relative overflow-hidden p-8 transition-all hover:scale-[1.02]'
                  : isAgencyList
                  ? 'card group relative overflow-hidden p-8 transition-all hover:border-[rgb(var(--color-accent))]'
                  : 'card p-5'
              }
            >
              {item.image?.url && (
                <img src={item.image.url} alt={item.image.alt || ''} className="mb-4 h-40 w-full rounded object-cover" />
              )}
              {item.stat && (
                <div className={isAgencyCards || isAgencyList ? 'mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(var(--color-accent))]/10 text-sm font-bold text-[rgb(var(--color-accent))] ring-1 ring-[rgb(var(--color-border))]' : 'mb-3 text-2xl font-bold text-[rgb(var(--color-accent))]'}>
                  {item.stat}
                </div>
              )}
              {item.title && (
                <h3 className={isAgencyCards || isAgencyList ? 'text-xl font-semibold text-foreground sm:text-2xl' : 'mt-2 text-lg font-semibold text-foreground'}>
                  {item.title}
                </h3>
              )}
              {item.subtitle && <p className="mt-1 text-sm text-muted">{item.subtitle}</p>}
              {item.description && (
                <p className={isAgencyCards || isAgencyList ? 'mt-3 text-base leading-relaxed text-muted' : 'mt-2 text-sm text-muted'}>
                  {item.description}
                </p>
              )}
              {isAgencyList && (
                <div className="mt-6 flex items-center justify-end">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(var(--color-border))] text-[rgb(var(--color-accent))] transition-all group-hover:translate-x-1 group-hover:border-[rgb(var(--color-accent))]">
                    →
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GridBlock
