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
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        {header && <Header data={header} />}
        <main className="flex-1">{children}</main>
        {footer && <Footer data={footer} />}
      </body>
    </html>
  )
}
