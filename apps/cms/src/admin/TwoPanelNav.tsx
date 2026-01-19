'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import type { NavSection } from './navData'

/**
 * Icon components for navigation
 */
const NavIcon: Record<string, React.FC<{ size?: number }>> = {
  dashboard: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  home: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  tools: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  content: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  page: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  post: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  category: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  tag: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  tags: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 3h6a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z" />
    </svg>
  ),
  customItem: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  contentType: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  museum: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-8h6v8" />
    </svg>
  ),
  artifact: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  person: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  place: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  collection: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  media: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  image: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  settings: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  header: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  ),
  footer: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="15" x2="21" y2="15" />
    </svg>
  ),
  gear: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  admin: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  users: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  form: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  inbox: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  redirect: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 14 20 9 15 4" />
      <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
    </svg>
  ),
  search: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  user: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  logout: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  chevronDown: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
}

/**
 * Get icon component by name
 */
const getIcon = (name: string, size = 20) => {
  const IconComponent = NavIcon[name]
  if (IconComponent) {
    return <IconComponent size={size} />
  }
  return null
}

/**
 * Resolve which section is active based on current path
 */
function resolveActiveSection(pathname: string, navSections: NavSection[]): string | null {
  for (const section of navSections) {
    for (const item of section.items) {
      // Check direct item
      if (item.href === '/admin' && pathname === '/admin') {
        return section.id
      }
      if (item.href && item.href !== '/admin' && pathname.startsWith(item.href)) {
        return section.id
      }

      // Check nested items
      if (item.items) {
        for (const nestedItem of item.items) {
          if (nestedItem.href === '/admin' && pathname === '/admin') {
            return section.id
          }
          if (nestedItem.href && nestedItem.href !== '/admin' && pathname.startsWith(nestedItem.href)) {
            return section.id
          }
        }
      }
    }
  }
  return null
}

/**
 * Resolve which item is active based on current path
 */
function resolveActiveItem(pathname: string, navSections: NavSection[]): string | null {
  for (const section of navSections) {
    for (const item of section.items) {
      // Check direct item
      if (item.href === '/admin' && pathname === '/admin') {
        return item.href
      }
      if (item.href && item.href !== '/admin' && pathname.startsWith(item.href)) {
        return item.href
      }

      // Check nested items
      if (item.items) {
        for (const nestedItem of item.items) {
          if (nestedItem.href === '/admin' && pathname === '/admin') {
            return nestedItem.href
          }
          if (nestedItem.href && nestedItem.href !== '/admin' && pathname.startsWith(nestedItem.href)) {
            return nestedItem.href
          }
        }
      }
    }
  }
  return null
}

/**
 * Admin Search Component
 */
const AdminSearch: React.FC<{
  navSections: NavSection[]
  globalLinks: Array<{ label: string; href: string; slug: string }>
  collectionSearchConfig: Array<{ slug: string; label: string; titleField: string }>
}> = ({ navSections, globalLinks, collectionSearchConfig }) => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Array<{ type: string; label: string; href: string; title: string }>>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    const searchResults: Array<{ type: string; label: string; href: string; title: string }> = []

    // Search globals
    for (const global of globalLinks) {
      if (global.label.toLowerCase().includes(searchQuery.toLowerCase())) {
        searchResults.push({
          type: 'Global',
          label: global.label,
          href: global.href,
          title: global.label,
        })
      }
    }

    // Search collections
    for (const section of navSections) {
      for (const item of section.items) {
        if (item.label.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchResults.push({
            type: 'Navigation',
            label: item.label,
            href: item.href,
            title: item.label,
          })
        }
      }
    }

    // Fetch documents from collections
    try {
      const fetchPromises = collectionSearchConfig.map(async (config) => {
        try {
          const response = await fetch(`/api/${config.slug}?limit=3&where[${config.titleField}][contains]=${encodeURIComponent(searchQuery)}`)
          if (response.ok) {
            const data = await response.json()
            return data.docs?.map((doc: any) => ({
              type: config.label,
              label: doc[config.titleField] || doc.id,
              href: `/admin/collections/${config.slug}/${doc.id}`,
              title: doc[config.titleField] || doc.id,
            })) || []
          }
        } catch (e) {
          // Ignore fetch errors
        }
        return []
      })

      const docResults = await Promise.all(fetchPromises)
      searchResults.push(...docResults.flat())
    } catch (e) {
      // Ignore errors
    }

    setResults(searchResults.slice(0, 10))
    setIsOpen(searchResults.length > 0)
    setIsLoading(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      handleSearch(value)
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      router.push(results[0].href)
      setIsOpen(false)
      setQuery('')
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="ra-top-nav__search" ref={searchRef}>
      <div className="ra-top-nav__search-input">
        {getIcon('search', 16)}
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <div className="ra-top-nav__search-results">
          {isLoading ? (
            <div className="ra-top-nav__search-loading">Searching...</div>
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <Link
                key={`${result.href}-${index}`}
                href={result.href}
                className="ra-top-nav__search-result"
                onClick={() => {
                  setIsOpen(false)
                  setQuery('')
                }}
              >
                <span className="ra-top-nav__search-result-title">{result.title}</span>
                <span className="ra-top-nav__search-result-type">{result.type}</span>
              </Link>
            ))
          ) : (
            <div className="ra-top-nav__search-empty">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Account Dropdown Component
 */
const AccountDropdown: React.FC = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (e) {
      console.error('Logout failed:', e)
    }
  }

  return (
    <div className="ra-top-nav__account" ref={dropdownRef}>
      <button 
        className="ra-top-nav__account-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getIcon('user', 18)}
        <span>Account</span>
        {getIcon('chevronDown', 14)}
      </button>
      {isOpen && (
        <div className="ra-top-nav__dropdown">
          <Link href="/admin/account" className="ra-top-nav__dropdown-item">
            {getIcon('user', 16)}
            <span>My Account</span>
          </Link>
          <button 
            className="ra-top-nav__dropdown-item ra-top-nav__dropdown-item--danger"
            onClick={handleLogout}
          >
            {getIcon('logout', 16)}
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * Two-Panel Navigation Component
 *
 * Replaces Payload's default nav with a fixed top bar and collapsible sidebar.
 * Fetches navigation dynamically from the server to reflect enabled collections.
 */
export const TwoPanelNav: React.FC = () => {
  const pathname = usePathname()
  const [isCompact, setIsCompact] = useState(true)
  const getCachedNavData = () => {
    if (typeof window === 'undefined') {
      return null
    }
    const cached = sessionStorage.getItem('nav-data')
    if (!cached) {
      return null
    }
    try {
      const data = JSON.parse(cached)
      return {
        navSections: data.navSections || [],
        globals: data.globals || [],
        collectionSearchConfig: data.collectionSearchConfig || [],
      }
    } catch (e) {
      return null
    }
  }

  const cachedNavData = getCachedNavData()
  const [navSections, setNavSections] = useState<NavSection[]>(() => cachedNavData?.navSections || [])
  const [globalLinks, setGlobalLinks] = useState<Array<{ label: string; href: string; slug: string }>>(() => cachedNavData?.globals || [])
  const [collectionSearchConfig, setCollectionSearchConfig] = useState<Array<{ slug: string; label: string; titleField: string }>>(
    () => cachedNavData?.collectionSearchConfig || []
  )
  const [isLoading, setIsLoading] = useState(!cachedNavData)

  const activeSection = resolveActiveSection(pathname, navSections)
  const activeItem = resolveActiveItem(pathname, navSections)

  // Fetch dynamic navigation on mount with caching
  useEffect(() => {
    const fetchNavigation = async () => {
      const now = Date.now()
      const cacheTime = sessionStorage.getItem('nav-cache-time')
      const cacheAge = cacheTime ? now - parseInt(cacheTime) : null

      if (cachedNavData && cacheAge !== null && cacheAge < 300000) {
        return
      }

      try {
        const response = await fetch('/api/admin/navigation')
        if (response.ok) {
          const data = await response.json()
          setNavSections(data.navSections || [])
          setGlobalLinks(data.globals || [])
          setCollectionSearchConfig(data.collectionSearchConfig || [])

          sessionStorage.setItem('nav-data', JSON.stringify(data))
          sessionStorage.setItem('nav-cache-time', now.toString())
        }
      } catch (error) {
        console.error('Failed to fetch navigation:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchNavigation()
  }, [])

  useEffect(() => {
    const stored = window.localStorage.getItem('ra-density')
    setIsCompact(stored !== 'comfortable')
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('ra-density-compact', isCompact)
    window.localStorage.setItem('ra-density', isCompact ? 'compact' : 'comfortable')
  }, [isCompact])

  // Define which sections should appear in the top menu
  // Only show major sections, not sub-groupings like Museum, Shop, Archive
  const topMenuSections = navSections.filter(section =>
    ['dashboard', 'tools', 'content', 'taxonomy', 'collections', 'shop', 'media', 'forms', 'settings', 'admin'].includes(section.id)
  )

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="ra-top-nav">
        <Link href="/admin" className="ra-top-nav__logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>CMS</span>
        </Link>

        {/* Top-level section links - only show major sections */}
        <div className="ra-top-nav__links">
          {isLoading ? (
            // Loading skeleton
            <>
              <div className="ra-top-nav__link ra-top-nav__link--skeleton" style={{ width: '80px', height: '20px', background: 'var(--theme-elevation-100)', borderRadius: '4px' }} />
              <div className="ra-top-nav__link ra-top-nav__link--skeleton" style={{ width: '70px', height: '20px', background: 'var(--theme-elevation-100)', borderRadius: '4px' }} />
              <div className="ra-top-nav__link ra-top-nav__link--skeleton" style={{ width: '60px', height: '20px', background: 'var(--theme-elevation-100)', borderRadius: '4px' }} />
            </>
          ) : (
            topMenuSections.map((section) => {
              // For sections with nested items, find the first actual href
              let sectionHref = '#'
              if (section.items && section.items.length > 0) {
                // Check if first item has href directly
                if (section.items[0].href) {
                  sectionHref = section.items[0].href
                } else if (section.items[0].items && section.items[0].items.length > 0) {
                  // If first item is a label with nested items, use first nested item's href
                  sectionHref = section.items[0].items[0]?.href || '#'
                }
              }

              return (
                <Link
                  key={section.id}
                  href={sectionHref}
                  className={`ra-top-nav__link ${activeSection === section.id ? 'ra-top-nav__link--active' : ''}`}
                >
                  {section.label}
                </Link>
              )
            })
          )}
        </div>

        <div className="ra-top-nav__spacer" />

        <AdminSearch
          navSections={navSections}
          globalLinks={globalLinks}
          collectionSearchConfig={collectionSearchConfig}
        />
        <button
          type="button"
          className={`ra-top-nav__density ${isCompact ? 'ra-top-nav__density--active' : ''}`}
          onClick={() => setIsCompact((prev) => !prev)}
          aria-pressed={isCompact}
          title={isCompact ? 'Switch to comfortable spacing' : 'Switch to compact spacing'}
        >
          {isCompact ? 'Compact' : 'Comfort'}
        </button>
        <ThemeToggle />
        <AccountDropdown />
      </nav>

      {/* Side Navigation Rail - Only shows sub-items of active section */}
      <aside className="ra-side-nav">
        {activeSection && navSections.find(s => s.id === activeSection) && (
          <div className="ra-side-nav__section">
            {navSections.find(s => s.id === activeSection)!.items.map((item, index) => {
              // Check if this is an item with nested items (like Posts with Categories/Tags, or Products with Categories/Collections)
              if (item.items && item.href) {
                return (
                  <div key={item.href} className="ra-side-nav__subsection">
                    <Link
                      href={item.href}
                      className={`ra-side-nav__link ${activeItem === item.href ? 'ra-side-nav__link--active' : ''}`}
                    >
                      <span className="ra-side-nav__icon">{getIcon(item.icon, 18)}</span>
                      <span className="ra-side-nav__label">{item.label}</span>
                    </Link>
                    {item.items.map((nestedItem: any) => (
                      <Link
                        key={nestedItem.href}
                        href={nestedItem.href}
                        className={`ra-side-nav__link ra-side-nav__link--nested ${activeItem === nestedItem.href ? 'ra-side-nav__link--active' : ''}`}
                      >
                        <span className="ra-side-nav__icon">{getIcon(nestedItem.icon, 18)}</span>
                        <span className="ra-side-nav__label">{nestedItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )
              }

              // Regular item without nesting
              if (item.href) {
                return (
                  <Link
                    key={item.href || `item-${index}`}
                    href={item.href}
                    className={`ra-side-nav__link ${activeItem === item.href ? 'ra-side-nav__link--active' : ''}`}
                  >
                    <span className="ra-side-nav__icon">{getIcon(item.icon, 18)}</span>
                    <span className="ra-side-nav__label">{item.label}</span>
                  </Link>
                )
              }

              return (
                <span
                  key={`item-${index}`}
                  className="ra-side-nav__link"
                >
                  <span className="ra-side-nav__icon">{getIcon(item.icon, 18)}</span>
                  <span className="ra-side-nav__label">{item.label}</span>
                </span>
              )
            })}
          </div>
        )}
      </aside>
    </>
  )
}

export default TwoPanelNav
