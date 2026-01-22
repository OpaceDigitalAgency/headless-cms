import Link from 'next/link'

export default function Home() {
  const hero = {
    heading: 'We build premium digital experiences',
    subheading: 'Brand, web, and content systems for ambitious teams.',
    primaryCta: { label: 'Book a call →', url: '/contact' },
    secondaryCta: { label: 'View work →', url: '/work' },
  }

  const services = [
    {
      title: 'Brand Strategy',
      description: 'Positioning, messaging, and visual identity systems that cut through the noise.',
    },
    {
      title: 'Web Design & Build',
      description: 'Custom sites built for performance, conversion, and lasting impact.',
    },
    {
      title: 'Content Systems',
      description: 'Scalable frameworks that empower your team to create and publish with confidence.',
    },
  ]

  const work = [
    {
      title: 'Apex Health',
      summary: 'Replatformed healthcare site with improved accessibility and 40% faster load times.',
    },
    {
      title: 'Nova Labs',
      summary: 'Product launch campaign that generated 10K signups in the first week.',
    },
    {
      title: 'Harbor Co',
      summary: 'Ecommerce redesign that increased conversion rate by 35%.',
    },
  ]

  const testimonials = [
    {
      quote: 'We doubled qualified leads in 60 days.',
      name: 'Maya Singh',
      role: 'CMO',
    },
    {
      quote: 'Stunning work, flawless delivery.',
      name: 'Alex Rowe',
      role: 'Founder',
    },
    {
      quote: 'The best partner we have ever worked with.',
      name: 'Jordan Lee',
      role: 'VP of Marketing',
    },
  ]

  const cta = {
    heading: 'Ready to grow with a partner you can trust?',
    button: { label: "Let's talk →", url: '/contact' },
  }

  return (
    <article className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black px-6 py-32 sm:px-8 sm:py-40 lg:px-12 lg:py-56">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] animate-blob rounded-full bg-emerald-500/30 mix-blend-multiply blur-3xl" />
          <div className="absolute -right-1/4 top-0 h-[500px] w-[500px] animate-blob-delayed-2 rounded-full bg-teal-500/30 mix-blend-multiply blur-3xl" />
          <div className="absolute -bottom-8 left-1/2 h-[500px] w-[500px] animate-blob-delayed-4 rounded-full bg-cyan-500/30 mix-blend-multiply blur-3xl" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.1)_0%,transparent_50%)] opacity-30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl">
            <div className="inline-block mb-8 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm animate-pulse-slow">
              <span className="text-sm font-medium text-emerald-400 tracking-wide">DIGITAL EXCELLENCE</span>
            </div>
            <h1 className="text-6xl font-black leading-[1.1] tracking-tighter sm:text-7xl lg:text-8xl xl:text-9xl">
              {hero.heading.split(' ').map((word, i) => (
                <span
                  key={i}
                  className="inline-block bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x"
                >
                  {word}{' '}
                </span>
              ))}
            </h1>
            {hero.subheading && (
              <p className="mt-8 text-xl leading-relaxed text-gray-400 sm:text-2xl lg:text-3xl max-w-3xl font-light animate-text-shimmer">
                {hero.subheading}
              </p>
            )}
            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
              {hero.primaryCta && (
                <Link
                  href={hero.primaryCta.url}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-5 text-lg font-bold text-black shadow-2xl shadow-emerald-500/50 transition-all hover:scale-105 hover:shadow-emerald-500/70 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 animate-button-glow"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative">{hero.primaryCta.label}</span>
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
              {hero.secondaryCta && (
                <Link
                  href={hero.secondaryCta.url}
                  className="group inline-flex items-center justify-center rounded-full border-2 border-gray-700 bg-black/40 px-10 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
                >
                  {hero.secondaryCta.label}
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative bg-black px-6 py-32 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-20 [animation-duration:3s]" />
          <div className="absolute right-1/3 top-1/3 h-2 w-2 animate-ping rounded-full bg-teal-400 opacity-20 [animation-delay:1s] [animation-duration:4s]" />
          <div className="absolute left-2/3 bottom-1/3 h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-20 [animation-delay:2s] [animation-duration:5s]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-20">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm animate-float">
              <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Capabilities</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl max-w-3xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Built for scale
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl transition-all group-hover:scale-150" />

                <div className="absolute right-4 top-4 h-16 w-16 rounded-full border border-emerald-500/20 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-150 animate-rotate-slow" />
                <div className="absolute right-6 top-6 h-12 w-12 rounded-full border border-teal-500/20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-125 animate-rotate-reverse" />

                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl font-black text-emerald-400 ring-1 ring-emerald-500/30 transition-all group-hover:scale-110 group-hover:rotate-12">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl mb-4 transition-colors group-hover:text-emerald-100">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="leading-relaxed text-gray-400 text-lg transition-colors group-hover:text-gray-300">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="relative bg-black px-6 py-32 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 h-64 w-64 animate-blob-slow rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 animate-blob-slower rounded-full bg-teal-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm animate-float">
              <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Portfolio</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl bg-gradient-to-r from-white via-emerald-50 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              Case Studies
            </h2>
          </div>
          <div className="space-y-6">
            {work.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-10 transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-[1.02] sm:p-12"
              >
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="absolute left-0 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl opacity-0 transition-all duration-700 group-hover:opacity-100" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="mb-4 inline-block rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/30 transition-all group-hover:scale-110 group-hover:bg-emerald-500/20">
                      {`0${index + 1}`}
                    </div>
                    <h3 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-4 transition-all group-hover:translate-x-2">
                      {project.title}
                    </h3>
                    {project.summary && (
                      <p className="leading-relaxed text-gray-400 text-xl max-w-2xl transition-all group-hover:text-gray-300 group-hover:translate-x-2">
                        {project.summary}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-700 bg-black text-emerald-400 transition-all group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-black group-hover:rotate-90 group-hover:scale-110">
                      <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative bg-black px-6 py-32 sm:px-8 lg:px-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-blob-slowest rounded-full bg-emerald-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm animate-float">
              <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Testimonials</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Proven Results
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 hover:rotate-1"
              >
                <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl transition-all group-hover:scale-150 group-hover:bg-emerald-500/20" />

                <div className="absolute right-4 top-4 h-24 w-24 rounded-full border border-emerald-500/10 opacity-0 transition-all duration-700 group-hover:opacity-100 animate-rotate-slow" />

                <div className="relative">
                  <div className="mb-6 text-6xl font-black text-emerald-500/20 transition-all group-hover:text-emerald-500/30 group-hover:scale-110">"</div>
                  <blockquote className="text-xl leading-relaxed text-gray-300 font-medium mb-8 transition-all group-hover:text-white">
                    {testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-4 border-t border-gray-800 pt-6 group-hover:border-emerald-500/30 transition-colors">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-lg font-black text-black transition-all group-hover:scale-110 group-hover:rotate-12">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white transition-colors group-hover:text-emerald-100">{testimonial.name}</p>
                      {testimonial.role && (
                        <p className="text-sm text-gray-500 transition-colors group-hover:text-gray-400">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-black px-6 py-32 sm:px-8 sm:py-40 lg:px-12 lg:py-48">
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
              {cta.heading}
            </span>
          </h2>
          <div>
            <Link
              href={cta.button.url}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-12 py-6 text-xl font-bold text-black shadow-2xl shadow-emerald-500/50 transition-all hover:scale-110 hover:shadow-emerald-500/70 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 animate-button-glow"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center">
                {cta.button.label}
                <svg className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}