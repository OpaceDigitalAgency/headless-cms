'use client'

/**
 * Preview Loading Skeleton
 * 
 * Shows a quick loading state while the preview page is rendering.
 * This provides immediate visual feedback to the user.
 */
export function PreviewLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="h-12 bg-card mb-4" />
      
      {/* Hero section skeleton */}
      <div className="h-96 bg-card mb-8" />
      
      {/* Content section skeleton */}
      <div className="max-w-4xl mx-auto px-4 space-y-4">
        <div className="h-8 bg-card w-3/4" />
        <div className="h-4 bg-card w-full" />
        <div className="h-4 bg-card w-5/6" />
        <div className="h-4 bg-card w-4/5" />
      </div>
    </div>
  )
}
