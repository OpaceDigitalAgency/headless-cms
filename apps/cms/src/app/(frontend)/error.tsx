'use client'

import { useEffect } from 'react'
import { Container, Section } from '@repo/ui/primitives'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <Section spacing="lg" background="default">
      <Container>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-foreground text-foreground">Something went wrong</h1>
          <p className="mt-4 text-muted text-muted">
            An error occurred while loading this page.
          </p>
          <button
            onClick={reset}
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </Container>
    </Section>
  )
}

