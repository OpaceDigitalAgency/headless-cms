import Link from 'next/link'
import { Container, Section } from '@repo/ui/primitives'

export default function NotFound() {
  return (
    <Section spacing="lg" background="default">
      <Container>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Page Not Found
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Link
            href="/"
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Go back home
          </Link>
        </div>
      </Container>
    </Section>
  )
}

