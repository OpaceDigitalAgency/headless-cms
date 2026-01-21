'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'

const SKINS = [
  'minimal',
  'editorial',
  'saas',
  'soft',
  'bold',
  'monochrome',
  'glass',
  'high-contrast',
] as const

type Skin = typeof SKINS[number]

interface ThemeProviderProps {
  children: React.ReactNode
  defaultSkin?: Skin
  defaultMode?: 'light' | 'dark' | 'system'
}

/**
 * ThemeProvider - Wraps next-themes for mode (light/dark) and adds skin support
 * 
 * This provider handles:
 * - Light/Dark mode via next-themes (with system preference support)
 * - Skin selection via data-skin attribute
 * - Persistence via localStorage
 * - No FOUC (Flash of Unstyled Content)
 */
export function ThemeProvider({ 
  children, 
  defaultSkin = 'minimal',
  defaultMode = 'system'
}: ThemeProviderProps) {
  const [skin, setSkinState] = useState<Skin>(defaultSkin)
  const [mounted, setMounted] = useState(false)

  // Load saved skin preference on mount
  useEffect(() => {
    setMounted(true)
    const savedSkin = localStorage.getItem('theme-skin') as Skin | null
    if (savedSkin && SKINS.includes(savedSkin)) {
      setSkinState(savedSkin)
    }
  }, [])

  // Apply skin to document
  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-skin', skin)
    localStorage.setItem('theme-skin', skin)
  }, [skin, mounted])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultMode}
      enableSystem
      disableTransitionOnChange
    >
      <SkinContext.Provider value={{ skin, setSkin: setSkinState }}>
        {children}
      </SkinContext.Provider>
    </NextThemesProvider>
  )
}

// Context for skin management
import { createContext, useContext } from 'react'

interface SkinContextType {
  skin: Skin
  setSkin: (skin: Skin) => void
}

const SkinContext = createContext<SkinContextType | undefined>(undefined)

export function useSkin() {
  const context = useContext(SkinContext)
  if (!context) {
    throw new Error('useSkin must be used within ThemeProvider')
  }
  return context
}

export { SKINS }
export type { Skin }

