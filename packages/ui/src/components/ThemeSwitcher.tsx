'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useSkin, SKINS, type Skin } from './ThemeProvider'

const SKIN_LABELS: Record<Skin, string> = {
  minimal: 'Minimal',
  editorial: 'Editorial',
  saas: 'SaaS',
  soft: 'Soft',
  bold: 'Bold',
  monochrome: 'Monochrome',
  glass: 'Glass',
  'high-contrast': 'High Contrast',
}

const MODES = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
] as const

interface ThemeSwitcherProps {
  className?: string
}

/**
 * ThemeSwitcher - UI component for switching themes and skins
 *
 * Uses next-themes for mode (light/dark/system) and custom skin context
 */
export function ThemeSwitcher({ className = '' }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { skin, setSkin } = useSkin()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div>
        <label htmlFor="skin-select" className="block text-sm font-semibold mb-3">
          Theme Skin
        </label>
        <select
          id="skin-select"
          value={skin}
          onChange={(e) => setSkin(e.target.value as Skin)}
          className="w-full rounded-md border-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            borderColor: `rgb(var(--color-border))`,
            backgroundColor: `rgb(var(--color-card))`,
            color: `rgb(var(--color-foreground))`,
            '--tw-ring-color': `rgb(var(--color-accent))`,
          } as React.CSSProperties}
        >
          {SKINS.map((s) => (
            <option key={s} value={s}>
              {SKIN_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mode-select" className="block text-sm font-semibold mb-3">
          Colour Mode
        </label>
        <select
          id="mode-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full rounded-md border-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            borderColor: `rgb(var(--color-border))`,
            backgroundColor: `rgb(var(--color-card))`,
            color: `rgb(var(--color-foreground))`,
            '--tw-ring-color': `rgb(var(--color-accent))`,
          } as React.CSSProperties}
        >
          {MODES.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="text-xs font-medium pt-2 border-t" style={{ color: `rgb(var(--color-muted))`, borderColor: `rgb(var(--color-border))` }}>
        <span className="block">Current: <strong>{SKIN_LABELS[skin]}</strong> • <strong>{MODES.find(m => m.value === theme)?.label || 'System'}</strong></span>
      </div>
    </div>
  )
}

