import type { Metadata } from 'next'
import { getSettings, getHeader, getFooter } from '@/lib/api'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
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
      metadataBase: new URL(settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'),
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

export default async function RootLayout({
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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script to prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100 transition-colors">
        {header && <Header data={header} />}
        <main className="flex-1">{children}</main>
        {footer && <Footer data={footer} />}
      </body>
    </html>
  )
}
