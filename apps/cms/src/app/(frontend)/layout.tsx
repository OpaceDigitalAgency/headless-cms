import type { Metadata } from 'next'
import React from 'react'
import { getSettings, getHeader, getFooter } from '@/lib/payload-api'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { LivePreviewListener } from '@/components/LivePreviewListener'
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
        title: settings.siteName,
        description: settings.siteDescription,
        siteName: settings.siteName,
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

// Script to prevent flash of wrong theme
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
`

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let header = null
  let footer = null

  try {
    header = await getHeader()
    footer = await getFooter()
  } catch (error) {
    console.error('Failed to fetch globals:', error)
  }

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100 transition-colors" suppressHydrationWarning={true}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <LivePreviewListener serverURL={serverURL} />
        {header && <Header data={header} />}
        <main className="flex-1">{children}</main>
        {footer && <Footer data={footer} />}
      </body>
    </html>
  )
}

