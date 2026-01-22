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
    <section className={isAgencyCards || isAgencyList ? 'relative bg-base py-20' : 'container py-12'}>
      {(isAgencyCards || isAgencyList) && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
      )}
      <div className={isAgencyCards || isAgencyList ? 'container relative' : undefined}>
        {description && (
          <div className="mb-4 inline-flex items-center rounded-full border border-default px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted">
            {description}
          </div>
        )}
        {heading && (
          <h2 className={isAgencyCards || isAgencyList ? 'mb-10 text-4xl font-bold text-foreground sm:text-5xl' : 'mb-2 text-2xl font-semibold'}>
            {heading}
          </h2>
        )}
        <div className={`grid gap-6 ${gridCols}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={
                isAgencyCards
                  ? 'group relative overflow-hidden rounded-3xl border border-default bg-card p-8 shadow-xl shadow-black/20'
                  : isAgencyList
                    ? 'group relative overflow-hidden rounded-3xl border border-default bg-card p-8 shadow-lg shadow-black/20'
                    : 'rounded-lg border border-default p-5 shadow-sm'
              }
            >
              {isAgencyCards && (
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-accent))]/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              )}
              {item.image?.url && (
                <img src={item.image.url} alt={item.image.alt || ''} className="mb-4 h-40 w-full rounded object-cover" />
              )}
              {item.stat && (
                <div className={isAgencyCards || isAgencyList ? 'mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--color-accent))]/10 text-sm font-bold text-[rgb(var(--color-accent))] ring-1 ring-[rgb(var(--color-accent))]/20' : 'text-2xl font-bold'}>
                  {item.stat}
                </div>
              )}
              {item.title && (
                <h3 className={isAgencyCards || isAgencyList ? 'text-xl font-semibold text-foreground sm:text-2xl' : 'mt-2 text-lg font-semibold'}>
                  {item.title}
                </h3>
              )}
              {item.subtitle && <p className="text-sm text-muted">{item.subtitle}</p>}
              {item.description && (
                <p className={isAgencyCards || isAgencyList ? 'mt-3 text-base text-muted' : 'mt-2 text-sm text-muted'}>
                  {item.description}
                </p>
              )}
              {isAgencyList && (
                <div className="mt-6 flex items-center justify-end">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-default text-accent transition-transform group-hover:translate-x-1">
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
