'use client'

import React from 'react'
import {
  CalendarIcon,
  EditIcon,
  SearchIcon,
  ImageIcon,
  TrashIcon,
  PackageIcon,
  CornerDownRightIcon,
  ClipboardIcon,
  InboxIcon,
  UsersIcon,
  ZapIcon,
  FileTextIcon,
  FolderIcon
} from '../icons'

/**
 * Tools Configuration
 */
const toolsConfig = [
  {
    category: 'Content Management',
    tools: [
      {
        title: 'Publishing Calendar',
        description: 'View and manage scheduled content',
        Icon: CalendarIcon,
        href: '/admin/collections/posts?sort=-publishedAt',
        color: '#3b82f6',
      },
      {
        title: 'Draft Review',
        description: 'Review all unpublished drafts',
        Icon: EditIcon,
        href: '/admin/collections/pages?where[_status][equals]=draft',
        color: '#f59e0b',
      },
      {
        title: 'SEO Audit',
        description: 'Check pages missing meta descriptions',
        Icon: SearchIcon,
        href: '/admin/collections/pages',
        color: '#10b981',
      },
    ],
  },
  {
    category: 'Media & Assets',
    tools: [
      {
        title: 'Media Library',
        description: 'Browse and manage all media files',
        Icon: ImageIcon,
        href: '/admin/collections/media',
        color: '#8b5cf6',
      },
      {
        title: 'Unused Media',
        description: 'Find media not used in content',
        Icon: TrashIcon,
        href: '/admin/collections/media?sort=-createdAt',
        color: '#ef4444',
      },
      {
        title: 'Large Files',
        description: 'Identify large media files',
        Icon: PackageIcon,
        href: '/admin/collections/media?sort=-filesize',
        color: '#06b6d4',
      },
    ],
  },
  {
    category: 'Site Configuration',
    tools: [
      {
        title: 'Navigation Manager',
        description: 'Reorder and toggle collections in the admin menu',
        Icon: FolderIcon,
        href: '/admin/globals/navigation-settings',
        color: '#0f766e',
      },
      {
        title: 'Redirects',
        description: 'Manage URL redirects',
        Icon: CornerDownRightIcon,
        href: '/admin/collections/redirects',
        color: '#ec4899',
      },
      {
        title: 'Forms',
        description: 'View and manage forms',
        Icon: ClipboardIcon,
        href: '/admin/collections/forms',
        color: '#14b8a6',
      },
      {
        title: 'Form Submissions',
        description: 'Review form submissions',
        Icon: InboxIcon,
        href: '/admin/collections/form-submissions',
        color: '#f97316',
      },
    ],
  },
  {
    category: 'Administration',
    tools: [
      {
        title: 'User Management',
        description: 'Manage admin users and roles',
        Icon: UsersIcon,
        href: '/admin/collections/users',
        color: '#6366f1',
      },
      {
        title: 'Search Index',
        description: 'View search index status',
        Icon: SearchIcon,
        href: '/admin/collections/search',
        color: '#84cc16',
      },
      {
        title: 'API Explorer',
        description: 'Test API endpoints',
        Icon: ZapIcon,
        href: '/api/graphql-playground',
        color: '#a855f7',
        external: true,
      },
    ],
  },
]

/**
 * Tools View Component
 * 
 * A lightweight landing page with quick links for QA, publishing calendar,
 * media audit, and other administrative tools.
 */
export const Tools: React.FC = () => {
  return (
    <div className="ra-tools">
      <div className="ra-tools__header">
        <h1>Tools</h1>
        <p>Quick access to administrative tools and utilities.</p>
      </div>

      {toolsConfig.map((category) => (
        <div key={category.category} className="ra-tools__section">
          <h2>{category.category}</h2>
          <div className="ra-tools__grid">
            {category.tools.map((tool) => {
              const IconComponent = tool.Icon
              return (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="ra-tools__card"
                  target={tool.external ? '_blank' : undefined}
                  rel={tool.external ? 'noopener noreferrer' : undefined}
                >
                  <div
                    className="ra-tools__card-icon"
                    style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <div className="ra-tools__card-content">
                    <h3>{tool.title}</h3>
                    <p>{tool.description}</p>
                  </div>
                  {tool.external && (
                    <span className="ra-tools__external-badge">↗</span>
                  )}
                </a>
              )
            })}
          </div>
        </div>
      ))}

      {/* System Info */}
      <div className="ra-tools__section">
        <h2>System Information</h2>
        <div className="ra-tools__info-grid">
          <div className="ra-tools__info-card">
            <span className="ra-tools__info-label">CMS Version</span>
            <span className="ra-tools__info-value">Payload CMS v3.14</span>
          </div>
          <div className="ra-tools__info-card">
            <span className="ra-tools__info-label">Database</span>
            <span className="ra-tools__info-value">PostgreSQL</span>
          </div>
          <div className="ra-tools__info-card">
            <span className="ra-tools__info-label">Environment</span>
            <span className="ra-tools__info-value">{process.env.NODE_ENV || 'development'}</span>
          </div>
          <div className="ra-tools__info-card">
            <span className="ra-tools__info-label">API</span>
            <span className="ra-tools__info-value">REST + GraphQL</span>
          </div>
        </div>
      </div>

      {/* Documentation Links */}
      <div className="ra-tools__section">
        <h2>Documentation</h2>
        <div className="ra-tools__docs-grid">
          <a
            href="https://payloadcms.com/docs"
            className="ra-tools__doc-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="ra-tools__doc-icon">
              <FileTextIcon size={24} />
            </div>
            <div>
              <h3>Payload CMS Docs</h3>
              <p>Official documentation</p>
            </div>
          </a>
          <a
            href="/admin"
            className="ra-tools__doc-link"
          >
            <div className="ra-tools__doc-icon">
              <FileTextIcon size={24} />
            </div>
            <div>
              <h3>Agent Contract</h3>
              <p>Development guidelines</p>
            </div>
          </a>
          <a
            href="/api"
            className="ra-tools__doc-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="ra-tools__doc-icon">
              <ZapIcon size={24} />
            </div>
            <div>
              <h3>REST API</h3>
              <p>API endpoints</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Tools
