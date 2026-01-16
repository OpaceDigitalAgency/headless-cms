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
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-centre justify-centre text-centre">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Something went wrong</h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        An error occurred while loading this page.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
      >
        Try again
      </button>
    </div>
  )
}

