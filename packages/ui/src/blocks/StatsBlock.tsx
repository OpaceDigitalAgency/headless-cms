interface StatsBlockProps {
  block: {
    heading?: string
    subheading?: string
    stats?: Array<{
      value?: string
      label?: string
      description?: string
    }>
  }
}

export function StatsBlock({ block }: StatsBlockProps) {
  const stats = block.stats || []

  return (
    <section className="w-full bg-[rgb(var(--color-card))] py-16">
      <div className="container">
        {(block.heading || block.subheading) && (
          <div className="mb-12 max-w-2xl">
            {block.heading && (
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{block.heading}</h2>
            )}
            {block.subheading && (
              <p className="mt-4 text-lg text-muted">{block.subheading}</p>
            )}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-xl border border-[rgb(var(--color-border))] bg-base p-6">
              {stat.value && (
                <div className="text-4xl font-bold text-[rgb(var(--color-accent))]">{stat.value}</div>
              )}
              {stat.label && (
                <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-foreground">{stat.label}</div>
              )}
              {stat.description && (
                <p className="mt-3 text-sm leading-relaxed text-muted">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
