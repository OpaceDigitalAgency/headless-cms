'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Header as HeaderType } from '@/lib/api'

interface HeaderProps {
  data: HeaderType
}

export function Header({ data }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getUrl = (item: any) => {
    if (item.url) return item.url
    if (item.page?.slug) return `/${item.page.slug}`
    return '#'
  }

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {data.logo?.url ? (
            <Image
              src={data.logo.url}
              alt={data.logoText || 'Logo'}
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-xl font-bold text-gray-900">
              {data.logoText || 'Site'}
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {data.navItems?.map((item, index) => (
            <div key={index} className="relative">
              {item.type === 'dropdown' ? (
                <div className="group">
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                    {item.label}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[200px] rounded-lg bg-white p-2 shadow-lg ring-1 ring-gray-200">
                      {item.children?.map((child: any, childIndex: number) => (
                        <Link
                          key={childIndex}
                          href={getUrl(child)}
                          target={child.newTab ? '_blank' : undefined}
                          className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {child.label}
                          {child.description && (
                            <span className="block text-xs text-gray-500">{child.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={getUrl(item)}
                  target={item.newTab ? '_blank' : undefined}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* CTA Button */}
          {data.ctaButton?.show && (
            <Link
              href={getUrl(data.ctaButton)}
              target={data.ctaButton.newTab ? '_blank' : undefined}
              className="btn-primary"
            >
              {data.ctaButton.label}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container space-y-1 py-4">
            {data.navItems?.map((item, index) => (
              <div key={index}>
                {item.type === 'dropdown' ? (
                  <>
                    <span className="block px-3 py-2 text-sm font-medium text-gray-500">
                      {item.label}
                    </span>
                    {item.children?.map((child: any, childIndex: number) => (
                      <Link
                        key={childIndex}
                        href={getUrl(child)}
                        target={child.newTab ? '_blank' : undefined}
                        className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={getUrl(item)}
                    target={item.newTab ? '_blank' : undefined}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            {data.ctaButton?.show && (
              <div className="px-3 pt-4">
                <Link
                  href={getUrl(data.ctaButton)}
                  target={data.ctaButton.newTab ? '_blank' : undefined}
                  className="btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {data.ctaButton.label}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
