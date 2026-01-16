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
    <section className="bg-gray-50 py-16">
      <div className="container">
        {(block.heading || block.subheading) && (
          <div className="mb-10 max-w-2xl">
            {block.heading && (
              <h2 className="text-3xl font-semibold text-gray-900">{block.heading}</h2>
            )}
            {block.subheading && (
              <p className="mt-3 text-lg text-gray-500">{block.subheading}</p>
            )}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-xl border border-gray-100 bg-white p-6">
              {stat.value && (
                <div className="text-3xl font-semibold text-gray-900">{stat.value}</div>
              )}
              {stat.label && (
                <div className="mt-2 text-sm font-medium text-gray-600">{stat.label}</div>
              )}
              {stat.description && (
                <p className="mt-3 text-sm text-gray-500">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
