'use client'

import React, { useState, useEffect } from 'react'
import { UnifiedCollectionTemplates } from '../../components/UnifiedCollectionTemplates'
import { ContentTypeManager } from '../../components/ContentTypeManager'
import {
  FileTextIcon,
  EditIcon,
  ArtifactIcon,
  ImageIcon,
  UserIcon,
  MapPinIcon,
  UploadIcon,
  SettingsIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  UsersIcon,
  BarChartIcon,
  FolderIcon,
  PackageIcon,
  SeedIcon
} from '../icons'

/**
 * Icon mapping for collections
 */
const iconMap: Record<string, any> = {
  pages: FileTextIcon,
  posts: EditIcon,
  'archive-items': ArtifactIcon,
  media: ImageIcon,
  people: UserIcon,
  places: MapPinIcon,
  events: EditIcon,
  products: PackageIcon,
  'product-categories': FolderIcon,
  'product-collections': PackageIcon,
  'museum-collections': FolderIcon,
  categories: FolderIcon,
  tags: FolderIcon,
  forms: FileTextIcon,
  'form-submissions': FileTextIcon,
  redirects: FileTextIcon,
  users: UsersIcon,
}

/**
 * Color mapping for collections
 */
const colorMap: Record<string, string> = {
  pages: '#3b82f6',
  posts: '#10b981',
  'archive-items': '#f59e0b',
  media: '#8b5cf6',
  people: '#ec4899',
  places: '#06b6d4',
  events: '#f97316',
  products: '#14b8a6',
  'product-categories': '#6366f1',
  'museum-collections': '#8b5cf6',
  'product-collections': '#8b5cf6',
  categories: '#6366f1',
  tags: '#84cc16',
  forms: '#3b82f6',
  'form-submissions': '#10b981',
  redirects: '#f59e0b',
  users: '#ec4899',
}

interface CollectionStat {
  slug: string
  label: string
  Icon: React.FC<{ size?: number; className?: string }>
  color: string
  count: number
}

interface RecentItem {
  id: string
  title: string
  collection: string
  collectionLabel: string
  updatedAt: string
  status?: string
}

/**
 * Custom Dashboard Component
 * 
 * Enhanced dashboard with collection stats, recent updates, drafts,
 * quick-create buttons, and site configuration shortcuts.
 */
export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content-types' | 'templates'>('overview')
  const [stats, setStats] = useState<CollectionStat[]>([])
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const [drafts, setDrafts] = useState<RecentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [collectionSlugs, setCollectionSlugs] = useState<string[]>([])

  // Fetch collection stats and recent items
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        // First, fetch the navigation data to get all collections dynamically
        const navResponse = await fetch('/api/admin/navigation')
        if (navResponse.ok) {
          const navData = await navResponse.json()

          // Extract all collection slugs from navigation
          const slugs: string[] = []
          navData.navSections?.forEach((section: any) => {
            section.items?.forEach((item: any) => {
              if (item.slug && item.slug !== 'dashboard' && item.slug !== 'tools') {
                slugs.push(item.slug)
              }
              // Also check nested items
              if (item.items) {
                item.items.forEach((nestedItem: any) => {
                  if (nestedItem.slug) {
                    slugs.push(nestedItem.slug)
                  }
                })
              }
            })
          })

          setCollectionSlugs(slugs)

          // Fetch stats for each collection
          const statsPromises = slugs.map(async (slug) => {
            try {
              const response = await fetch(`/api/${slug}?limit=0`)
              if (response.ok) {
                const data = await response.json()

                // Get label from navigation data
                let label = slug
                navData.navSections?.forEach((section: any) => {
                  section.items?.forEach((item: any) => {
                    if (item.slug === slug) {
                      label = item.label
                    }
                    if (item.items) {
                      item.items.forEach((nestedItem: any) => {
                        if (nestedItem.slug === slug) {
                          label = nestedItem.label
                        }
                      })
                    }
                  })
                })

                return {
                  slug,
                  label,
                  Icon: iconMap[slug] || FileTextIcon,
                  color: colorMap[slug] || '#6b7280',
                  count: data.totalDocs || 0,
                }
              }
            } catch (e) {
              // Ignore errors
            }
            return null
          })

          // Fetch recent items from main content collections
          const recentSlugs = ['pages', 'posts', 'archive-items', 'events', 'products'].filter(s => slugs.includes(s))
          const recentPromises = recentSlugs.map(async (slug) => {
            try {
              const response = await fetch(`/api/${slug}?limit=3&sort=-updatedAt`)
              if (response.ok) {
                const data = await response.json()

                // Determine title field
                let titleField = 'title'
                if (slug === 'people' || slug === 'places') titleField = 'name'
                if (slug === 'media') titleField = 'filename'

                // Get label
                let label = slug.charAt(0).toUpperCase() + slug.slice(1)
                navData.navSections?.forEach((section: any) => {
                  section.items?.forEach((item: any) => {
                    if (item.slug === slug) label = item.label
                    if (item.items) {
                      item.items.forEach((nestedItem: any) => {
                        if (nestedItem.slug === slug) label = nestedItem.label
                      })
                    }
                  })
                })

                return data.docs?.map((doc: any) => ({
                  id: doc.id,
                  title: doc[titleField] || 'Untitled',
                  collection: slug,
                  collectionLabel: label,
                  updatedAt: doc.updatedAt,
                  status: doc._status || 'published',
                })) || []
              }
            } catch (e) {
              // Ignore errors
            }
            return []
          })

          // Fetch drafts
          const draftsPromises = recentSlugs.map(async (slug) => {
            try {
              const response = await fetch(`/api/${slug}?limit=3&where[_status][equals]=draft`)
              if (response.ok) {
                const data = await response.json()

                // Determine title field
                let titleField = 'title'
                if (slug === 'people' || slug === 'places') titleField = 'name'
                if (slug === 'media') titleField = 'filename'

                // Get label
                let label = slug.charAt(0).toUpperCase() + slug.slice(1)
                navData.navSections?.forEach((section: any) => {
                  section.items?.forEach((item: any) => {
                    if (item.slug === slug) label = item.label
                    if (item.items) {
                      item.items.forEach((nestedItem: any) => {
                        if (nestedItem.slug === slug) label = nestedItem.label
                      })
                    }
                  })
                })

                return data.docs?.map((doc: any) => ({
                  id: doc.id,
                  title: doc[titleField] || 'Untitled',
                  collection: slug,
                  collectionLabel: label,
                  updatedAt: doc.updatedAt,
                  status: 'draft',
                })) || []
              }
            } catch (e) {
              // Ignore errors
            }
            return []
          })

          const [statsResults, recentResults, draftsResults] = await Promise.all([
            Promise.all(statsPromises),
            Promise.all(recentPromises),
            Promise.all(draftsPromises),
          ])

          setStats(statsResults.filter(Boolean) as CollectionStat[])
          setRecentItems(recentResults.flat().sort((a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          ).slice(0, 5))
          setDrafts(draftsResults.flat().slice(0, 5))
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="ra-dashboard">
      <div className="ra-dashboard__header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your content.</p>
      </div>

      {/* Tab Navigation */}
      <div className="ra-dashboard__tabs">
        <button
          className={`ra-dashboard__tab ${activeTab === 'overview' ? 'ra-dashboard__tab--active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChartIcon size={16} /> Overview
        </button>
        <button
          className={`ra-dashboard__tab ${activeTab === 'content-types' ? 'ra-dashboard__tab--active' : ''}`}
          onClick={() => setActiveTab('content-types')}
        >
          <FolderIcon size={16} /> Content Types
        </button>
        <button
          className={`ra-dashboard__tab ${activeTab === 'templates' ? 'ra-dashboard__tab--active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <PackageIcon size={16} /> Collections
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="ra-dashboard__stats">
            {stats.map((stat) => {
              const IconComponent = stat.Icon
              return (
                <a
                  key={stat.slug}
                  href={`/admin/collections/${stat.slug}`}
                  className="ra-dashboard__stat-card"
                >
                  <div className="ra-dashboard__stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                    <IconComponent size={24} />
                  </div>
                  <div className="ra-dashboard__stat-content">
                    <span className="ra-dashboard__stat-count">
                      {isLoading ? '...' : stat.count}
                    </span>
                    <span className="ra-dashboard__stat-label">{stat.label}</span>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Two-column grid for recent and drafts */}
          <div className="ra-dashboard__grid">
            {/* Recent Updates */}
            <div className="ra-dashboard__card">
              <div className="ra-dashboard__card-header">
                <h2>Recent Updates</h2>
                <span className="ra-dashboard__card-badge">{recentItems.length}</span>
              </div>
              <div className="ra-dashboard__card-content">
                {isLoading ? (
                  <div className="ra-dashboard__loading">Loading...</div>
                ) : recentItems.length > 0 ? (
                  <ul className="ra-dashboard__list">
                    {recentItems.map((item) => (
                      <li key={`${item.collection}-${item.id}`}>
                        <a href={`/admin/collections/${item.collection}/${item.id}`} className="ra-dashboard__list-item">
                          <div className="ra-dashboard__list-item-content">
                            <span className="ra-dashboard__list-item-title">{item.title}</span>
                            <span className="ra-dashboard__list-item-meta">
                              {item.collectionLabel} • {formatDate(item.updatedAt)}
                            </span>
                          </div>
                          <span className={`ra-dashboard__status ra-dashboard__status--${item.status}`}>
                            {item.status}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="ra-dashboard__empty">No recent updates</div>
                )}
              </div>
            </div>

            {/* Drafts Needing Review */}
            <div className="ra-dashboard__card">
              <div className="ra-dashboard__card-header">
                <h2>Drafts Needing Review</h2>
                <span className="ra-dashboard__card-badge ra-dashboard__card-badge--warning">{drafts.length}</span>
              </div>
              <div className="ra-dashboard__card-content">
                {isLoading ? (
                  <div className="ra-dashboard__loading">Loading...</div>
                ) : drafts.length > 0 ? (
                  <ul className="ra-dashboard__list">
                    {drafts.map((item) => (
                      <li key={`draft-${item.collection}-${item.id}`}>
                        <a href={`/admin/collections/${item.collection}/${item.id}`} className="ra-dashboard__list-item">
                          <div className="ra-dashboard__list-item-content">
                            <span className="ra-dashboard__list-item-title">{item.title}</span>
                            <span className="ra-dashboard__list-item-meta">
                              {item.collectionLabel} • {formatDate(item.updatedAt)}
                            </span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="ra-dashboard__empty">No drafts pending</div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Create */}
          <div className="ra-dashboard__section">
            <h2>Quick Create</h2>
            <div className="ra-dashboard__quick-actions">
              {collectionSlugs.includes('pages') && (
                <a href="/admin/collections/pages/create" className="ra-dashboard__quick-btn">
                  <FileTextIcon size={18} /> New Page
                </a>
              )}
              {collectionSlugs.includes('posts') && (
                <a href="/admin/collections/posts/create" className="ra-dashboard__quick-btn">
                  <EditIcon size={18} /> New Post
                </a>
              )}
              {collectionSlugs.includes('archive-items') && (
                <a href="/admin/collections/archive-items/create" className="ra-dashboard__quick-btn">
                  <ArtifactIcon size={18} /> New Archive Item
                </a>
              )}
              {collectionSlugs.includes('events') && (
                <a href="/admin/collections/events/create" className="ra-dashboard__quick-btn">
                  <EditIcon size={18} /> New Event
                </a>
              )}
              {collectionSlugs.includes('products') && (
                <a href="/admin/collections/products/create" className="ra-dashboard__quick-btn">
                  <PackageIcon size={18} /> New Product
                </a>
              )}
              {collectionSlugs.includes('media') && (
                <a href="/admin/collections/media/create" className="ra-dashboard__quick-btn">
                  <UploadIcon size={18} /> Upload Media
                </a>
              )}
            </div>
          </div>

          {/* Site Configuration */}
          <div className="ra-dashboard__section">
            <h2>Site Configuration</h2>
            <div className="ra-dashboard__config-grid">
              <a href="/admin/globals/header" className="ra-dashboard__config-card">
                <span className="ra-dashboard__config-icon"><ChevronUpIcon size={20} /></span>
                <div>
                  <h3>Header</h3>
                  <p>Navigation & branding</p>
                </div>
              </a>
              <a href="/admin/globals/footer" className="ra-dashboard__config-card">
                <span className="ra-dashboard__config-icon"><ChevronDownIcon size={20} /></span>
                <div>
                  <h3>Footer</h3>
                  <p>Links & social</p>
                </div>
              </a>
              <a href="/admin/globals/settings" className="ra-dashboard__config-card">
                <span className="ra-dashboard__config-icon"><SettingsIcon size={20} /></span>
                <div>
                  <h3>Settings</h3>
                  <p>Site-wide config</p>
                </div>
              </a>
              <a href="/admin/collections/users" className="ra-dashboard__config-card">
                <span className="ra-dashboard__config-icon"><UsersIcon size={20} /></span>
                <div>
                  <h3>Users</h3>
                  <p>Manage admins</p>
                </div>
              </a>
            </div>
          </div>
        </>
      )}

      {/* Content Types Tab */}
      {activeTab === 'content-types' && (
        <ContentTypeManager />
      )}

      {/* Collection Templates Tab (Unified with Sample Data) */}
      {activeTab === 'templates' && (
        <UnifiedCollectionTemplates />
      )}
    </div>
  )
}

export default Dashboard
