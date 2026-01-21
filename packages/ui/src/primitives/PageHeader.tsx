import { ReactNode } from 'react'
import { Container } from './Container'

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
}

export function PageHeader({ title, description, children, className = '' }: PageHeaderProps) {
  return (
    <div className={`border-b bg-gray-50 dark:bg-gray-900 ${className}`}>
      <Container>
        <div className="py-12 sm:py-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </div>
  )
}

