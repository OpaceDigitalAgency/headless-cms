import Image from 'next/image'
import Link from 'next/link'

interface LogoCloudBlockProps {
  block: {
    heading?: string
    logos?: Array<{
      logo?: { url?: string; alt?: string }
      label?: string
      url?: string
    }>
  }
}

export function LogoCloudBlock({ block }: LogoCloudBlockProps) {
  const logos = block.logos || []

  return (
    <section className="bg-base py-14">
      <div className="w-full">
        {block.heading && (
          <h2 className="mb-8 text-center text-2xl font-semibold text-foreground">
            {block.heading}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {logos.map((logo, index) => {
            const content = logo.logo?.url ? (
              <Image
                src={logo.logo.url}
                alt={logo.label || logo.logo.alt || ''}
                width={140}
                height={80}
                className="h-10 w-auto object-contain opacity-75 grayscale"
              />
            ) : (
              <span className="text-sm text-muted">{logo.label}</span>
            )

            return (
              <div key={index} className="flex items-center justify-center rounded-lg border border-default bg-card px-4 py-3">
                {logo.url ? <Link href={logo.url}>{content}</Link> : content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
