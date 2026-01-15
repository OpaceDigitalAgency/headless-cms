'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900">Error</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">Something went wrong</h2>
      <p className="mt-2 text-gray-500">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="btn-primary mt-8"
      >
        Try Again
      </button>
    </div>
  )
}
