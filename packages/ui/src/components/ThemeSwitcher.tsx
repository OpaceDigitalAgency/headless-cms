'use client'

import { useEffect, useState } from 'react'

const SKINS = [
  { label: 'Minimal', value: 'minimal' },
  { label: 'Editorial', value: 'editorial' },
  { label: 'SaaS', value: 'saas' },
  { label: 'Soft', value: 'soft' },
  { label: 'Bold', value: 'bold' },
  { label: 'Monochrome', value: 'monochrome' },
  { label: 'Glass', value: 'glass' },
  { label: 'High Contrast', value: 'high-contrast' },
] as const

const MODES = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
] as const

type Skin = typeof SKINS[number]['value']
type Mode = typeof MODES[number]['value']

interface ThemeSwitcherProps {
  defaultSkin?: Skin
  defaultMode?: Mode
  className?: string
}

export function ThemeSwitcher({ 
  defaultSkin = 'minimal', 
  defaultMode = 'light',
  className = '' 
}: ThemeSwitcherProps) {
  const [skin, setSkin] = useState<Skin>(defaultSkin)
  const [mode, setMode] = useState<Mode>(defaultMode)
  const [mounted, setMounted] = useState(false)

  // Load saved preferences on mount
  useEffect(() => {
    setMounted(true)
    const savedSkin = localStorage.getItem('theme-skin') as Skin | null
    const savedMode = localStorage.getItem('theme-mode') as Mode | null
    
    if (savedSkin) setSkin(savedSkin)
    if (savedMode) setMode(savedMode)
  }, [])

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    
    // Apply skin
    root.setAttribute('data-skin', skin)
    localStorage.setItem('theme-skin', skin)

    // Apply mode
    if (mode === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', systemPrefersDark)
      localStorage.setItem('theme-mode', 'system')
    } else {
      root.classList.toggle('dark', mode === 'dark')
      localStorage.setItem('theme-mode', mode)
    }
  }, [skin, mode, mounted])

  // Listen for system preference changes when mode is 'system'
  useEffect(() => {
    if (!mounted || mode !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mode, mounted])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div>
        <label htmlFor="skin-select" className="block text-sm font-medium mb-2">
          Theme Skin
        </label>
        <select
          id="skin-select"
          value={skin}
          onChange={(e) => setSkin(e.target.value as Skin)}
          className="w-full rounded-lg border px-3 py-2 text-sm"
          style={{
            borderColor: `rgb(var(--color-border))`,
            backgroundColor: `rgb(var(--color-card))`,
            color: `rgb(var(--color-foreground))`,
          }}
        >
          {SKINS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mode-select" className="block text-sm font-medium mb-2">
          Colour Mode
        </label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="w-full rounded-lg border px-3 py-2 text-sm"
          style={{
            borderColor: `rgb(var(--color-border))`,
            backgroundColor: `rgb(var(--color-card))`,
            color: `rgb(var(--color-foreground))`,
          }}
        >
          {MODES.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="text-xs" style={{ color: `rgb(var(--color-muted))` }}>
        Current: {SKINS.find(s => s.value === skin)?.label} • {MODES.find(m => m.value === mode)?.label}
      </div>
    </div>
  )
}

