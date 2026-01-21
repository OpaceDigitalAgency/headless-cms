import { ReactNode } from 'react'

interface ProseProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'base' | 'lg'
}

const sizeClasses = {
  sm: 'prose-sm',
  base: 'prose',
  lg: 'prose-lg',
}

export function Prose({ children, className = '', size = 'base' }: ProseProps) {
  return (
    <div
      className={`${sizeClasses[size]} prose-headings:font-bold prose-a:text-blue-600 dark:prose-invert max-w-none ${className}`}
    >
      {children}
    </div>
  )
}

