import type { Metadata } from 'next'
import React from 'react'
import { getSettings, getHeader, getFooter } from '@/lib/payload-api'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ThemeProvider } from '@repo/ui/components/ThemeProvider'
import '@/styles/globals.css'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings()

    return {
      title: {
        default: settings.siteName || 'Payload CMS + Jamstack',
        template: `%s | ${settings.siteName || 'Payload CMS + Jamstack'}`,
      },
      description: settings.siteDescription || 'A modern CMS platform',
      metadataBase: new URL(settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
      openGraph: {
        title: settings.siteName || undefined,
        description: settings.siteDescription || undefined,
        siteName: settings.siteName || undefined,
        type: 'website',
      },
    }
  } catch {
    return {
      title: 'Payload CMS + Jamstack',
      description: 'A modern CMS platform',
    }
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let header = null
  let footer = null
  let settings = null

  try {
    ;[header, footer, settings] = await Promise.all([
      getHeader(),
      getFooter(),
      getSettings(),
    ])
  } catch (error) {
    console.error('Failed to fetch globals:', error)
  }

  // Get default theme preferences from settings
  const defaultSkin = (settings?.defaultSkin as any) || 'minimal'
  const defaultMode = (settings?.defaultMode as any) || 'light'
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="flex min-h-screen flex-col transition-colors" suppressHydrationWarning={true} style={{
        backgroundColor: 'rgb(var(--color-background))',
        color: 'rgb(var(--color-foreground))'
      }}>
        <ThemeProvider defaultSkin={defaultSkin as any} defaultMode={defaultMode as any}>
          {process.env.NODE_ENV === 'production' ? null : <LivePreviewListener serverURL={serverURL} />}
          {header && <Header data={header} />}
          <main className="flex-1">{children}</main>
          {footer && <Footer data={footer} />}
        </ThemeProvider>
      </body>
    </html>
  )
}
