import Link from 'next/link'

interface PricingBlockProps {
  block: {
    heading?: string
    subheading?: string
    plans?: Array<{
      name?: string
      price?: string
      period?: string
      description?: string
      features?: Array<{ feature?: string }>
      ctaLabel?: string
      ctaUrl?: string
      featured?: boolean
    }>
  }
}

export function PricingBlock({ block }: PricingBlockProps) {
  const plans = block.plans || []

  return (
    <section className="bg-gray-50 py-16">
      <div className="w-full">
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-6 ${plan.featured ? 'border-primary-500 bg-white shadow-lg' : 'border-gray-200 bg-white'}`}
            >
              {plan.name && <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>}
              {plan.price && (
                <div className="mt-4 text-3xl font-semibold text-gray-900">
                  {plan.price}
                  {plan.period && <span className="ml-2 text-base font-normal text-gray-500">/{plan.period}</span>}
                </div>
              )}
              {plan.description && <p className="mt-3 text-sm text-gray-600">{plan.description}</p>}
              {plan.features && plan.features.length > 0 && (
                <ul className="mt-6 space-y-2 text-sm text-gray-600">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
                      <span>{feature.feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              {plan.ctaLabel && plan.ctaUrl && (
                <div className="mt-6">
                  <Link href={plan.ctaUrl} className="btn btn-primary">
                    {plan.ctaLabel}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
