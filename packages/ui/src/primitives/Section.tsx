import { ReactNode } from 'react'

interface SectionProps {
  children: any
  className?: string
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'muted' | 'accent'
}

const spacingClasses = {
  none: '',
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16',
  lg: 'py-16 sm:py-24',
  xl: 'py-24 sm:py-32',
}

const backgroundClasses = {
  default: '',
  muted: 'bg-card',
  accent: 'bg-accent-soft',
}

export function Section({
  children,
  className = '',
  spacing = 'lg',
  background = 'default',
}: SectionProps) {
  return (
    <section className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}>
      {children}
    </section>
  )
}
