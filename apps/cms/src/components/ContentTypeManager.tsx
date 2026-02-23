'use client'

import React, { useState, useEffect } from 'react'
import {
  BoxIcon,
  ShoppingBagIcon,
  ArtifactIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  DocumentIcon,
  ArchiveIcon,
  type IconProps
} from '../admin/icons'

/**
 * Content Type Manager Component
 *
 * Provides a user-friendly interface for managing dynamic content types.
 * Allows users to create, edit, and manage content types without server restart.
 */

interface ContentType {
  id: string
  name: string
  slug: string
  singularLabel: string
  pluralLabel: string
  icon: string
  template: string
  description?: string
  hasArchive: boolean
  customFields?: Array<{
    name: string
    label: string
    type: string
    required: boolean
    options?: string
  }>
  itemCount?: number
}

interface CustomItem {
  id: string
  title: string
  contentType: ContentType | string
  status: string
  updatedAt: string
}

const iconMap: Record<string, React.FC<IconProps>> = {
  box: BoxIcon,
  product: ShoppingBagIcon,
  artifact: ArtifactIcon,
  cart: ShoppingBagIcon,
  person: UserIcon,
  location: MapPinIcon,
  event: CalendarIcon,
  document: DocumentIcon,
  archive: ArchiveIcon,
}

export const ContentTypeManager: React.FC = () => {
  const [contentTypes, setContentTypes] = useState<ContentType[]>([])
  const [selectedType, setSelectedType] = useState<ContentType | null>(null)
  const [items, setItems] = useState<CustomItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [newTypeName, setNewTypeName] = useState('')
  const [newTypeTemplate, setNewTypeTemplate] = useState('archive-item')

  // Fetch content types
  useEffect(() => {
    fetchContentTypes()
  }, [])

  // Fetch items when a type is selected
  useEffect(() => {
    if (selectedType) {
      fetchItems(selectedType.id)
    }
  }, [selectedType])

  const fetchContentTypes = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/content-types?limit=100')
      if (response.ok) {
        const data = await response.json()
        
        // Get item counts for each type
        const typesWithCounts = await Promise.all(
          data.docs.map(async (type: ContentType) => {
            try {
              const countResponse = await fetch(`/api/custom-items?where[contentType][equals]=${type.id}&limit=0`)
              if (countResponse.ok) {
                const countData = await countResponse.json()
                return { ...type, itemCount: countData.totalDocs }
              }
            } catch (e) {
              // Ignore errors
            }
            return { ...type, itemCount: 0 }
          })
        )
        
        setContentTypes(typesWithCounts)
      }
    } catch (e) {
      console.error('Failed to fetch content types:', e)
    }
    setIsLoading(false)
  }

  const fetchItems = async (typeId: string) => {
    try {
      const response = await fetch(`/api/custom-items?where[contentType][equals]=${typeId}&limit=20&sort=-updatedAt`)
      if (response.ok) {
        const data = await response.json()
        setItems(data.docs)
      }
    } catch (e) {
      console.error('Failed to fetch items:', e)
    }
  }

  const createContentType = async () => {
    if (!newTypeName.trim()) return
    
    const slug = newTypeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    try {
      const response = await fetch('/api/content-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTypeName,
          slug,
          singularLabel: newTypeName,
          pluralLabel: newTypeName + 's',
          template: newTypeTemplate,
          icon: 'box',
          hasArchive: true,
        }),
      })
      
      if (response.ok) {
        setNewTypeName('')
        setIsCreating(false)
        fetchContentTypes()
      }
    } catch (e) {
      console.error('Failed to create content type:', e)
    }
  }

  const deleteContentType = async (typeId: string) => {
    if (!confirm('Are you sure? This will NOT delete items, but they will become orphaned.')) return
    
    try {
      const response = await fetch(`/api/content-types/${typeId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setSelectedType(null)
        fetchContentTypes()
      }
    } catch (e) {
      console.error('Failed to delete content type:', e)
    }
  }

  return (
    <div className="ctm">
      <style>{`
        .ctm {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 1.5rem;
          min-height: 400px;
        }
        .ctm__sidebar {
          background: var(--theme-elevation-50);
          border: 1px solid var(--theme-elevation-150);
          border-radius: 8px;
          overflow: hidden;
        }
        .ctm__sidebar-header {
          padding: 1rem;
          border-bottom: 1px solid var(--theme-elevation-150);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ctm__sidebar-header h3 {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--theme-elevation-800);
        }
        .ctm__add-btn {
          padding: 0.375rem 0.75rem;
          background: var(--theme-success-500);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
        }
        .ctm__add-btn:hover {
          background: var(--theme-success-600);
        }
        .ctm__type-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .ctm__type-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          cursor: pointer;
          border-bottom: 1px solid var(--theme-elevation-100);
          transition: background 0.15s;
        }
        .ctm__type-item:hover {
          background: var(--theme-elevation-100);
        }
        .ctm__type-item--active {
          background: var(--theme-success-50);
          border-left: 3px solid var(--theme-success-500);
        }
        .ctm__type-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--theme-elevation-600);
        }
        .ctm__type-info {
          flex: 1;
        }
        .ctm__type-name {
          font-weight: 500;
          color: var(--theme-elevation-800);
          font-size: 0.875rem;
        }
        .ctm__type-count {
          font-size: 0.75rem;
          color: var(--theme-elevation-500);
        }
        .ctm__main {
          background: var(--theme-elevation-50);
          border: 1px solid var(--theme-elevation-150);
          border-radius: 8px;
          padding: 1.5rem;
        }
        .ctm__main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .ctm__main-header h2 {
          margin: 0;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .ctm__actions {
          display: flex;
          gap: 0.5rem;
        }
        .ctm__btn {
          padding: 0.5rem 1rem;
          border: 1px solid var(--theme-elevation-200);
          background: var(--theme-elevation-100);
          border-radius: 4px;
          font-size: 0.8125rem;
          cursor: pointer;
          text-decoration: none;
          color: var(--theme-elevation-700);
        }
        .ctm__btn:hover {
          background: var(--theme-elevation-150);
        }
        .ctm__btn--primary {
          background: var(--theme-success-500);
          border-color: var(--theme-success-500);
          color: white;
        }
        .ctm__btn--primary:hover {
          background: var(--theme-success-600);
        }
        .ctm__btn--danger {
          color: var(--theme-error-600);
        }
        .ctm__btn--danger:hover {
          background: var(--theme-error-50);
        }
        .ctm__items-table {
          width: 100%;
          border-collapse: collapse;
        }
        .ctm__items-table th,
        .ctm__items-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid var(--theme-elevation-150);
        }
        .ctm__items-table th {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--theme-elevation-500);
          text-transform: uppercase;
        }
        .ctm__items-table td a {
          color: var(--theme-elevation-800);
          text-decoration: none;
        }
        .ctm__items-table td a:hover {
          color: var(--theme-success-600);
        }
        .ctm__status {
          display: inline-block;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .ctm__status--published {
          background: var(--theme-success-100);
          color: var(--theme-success-700);
        }
        .ctm__status--draft {
          background: var(--theme-warning-100);
          color: var(--theme-warning-700);
        }
        .ctm__empty {
          text-align: center;
          padding: 3rem;
          color: var(--theme-elevation-500);
        }
        .ctm__create-form {
          padding: 1rem;
          background: var(--theme-elevation-100);
          border-bottom: 1px solid var(--theme-elevation-150);
        }
        .ctm__create-form input,
        .ctm__create-form select {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          border: 1px solid var(--theme-elevation-200);
          border-radius: 4px;
          font-size: 0.875rem;
        }
        .ctm__create-form-actions {
          display: flex;
          gap: 0.5rem;
        }
      `}</style>

      {/* Sidebar - Content Types List */}
      <div className="ctm__sidebar">
        <div className="ctm__sidebar-header">
          <h3>Content Types</h3>
          <button className="ctm__add-btn" onClick={() => setIsCreating(true)}>
            + New
          </button>
        </div>
        
        {isCreating && (
          <div className="ctm__create-form">
            <input
              type="text"
              placeholder="Type name (e.g., Classic Cars)"
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
              autoFocus
            />
            <select value={newTypeTemplate} onChange={(e) => setNewTypeTemplate(e.target.value)}>
              <option value="archive-item">Archive Item</option>
              <option value="product">Product</option>
              <option value="person">Person</option>
              <option value="place">Place</option>
              <option value="event">Event</option>
              <option value="article">Article</option>
            </select>
            <div className="ctm__create-form-actions">
              <button className="ctm__btn ctm__btn--primary" onClick={createContentType}>
                Create
              </button>
              <button className="ctm__btn" onClick={() => setIsCreating(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="ctm__empty">Loading...</div>
        ) : contentTypes.length === 0 ? (
          <div className="ctm__empty">
            No content types yet.<br />
            Click "+ New" to create one.
          </div>
        ) : (
          <ul className="ctm__type-list">
            {contentTypes.map((type) => {
              const IconComponent = iconMap[type.icon] || BoxIcon
              return (
                <li
                  key={type.id}
                  className={`ctm__type-item ${selectedType?.id === type.id ? 'ctm__type-item--active' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  <div className="ctm__type-icon">
                    <IconComponent size={20} />
                  </div>
                  <div className="ctm__type-info">
                    <div className="ctm__type-name">{type.name}</div>
                    <div className="ctm__type-count">{type.itemCount || 0} items</div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Main Content Area */}
      <div className="ctm__main">
        {selectedType ? (
          <>
            <div className="ctm__main-header">
              <h2>
                {(() => {
                  const IconComponent = iconMap[selectedType.icon] || BoxIcon
                  return <IconComponent size={24} />
                })()}
                {selectedType.pluralLabel}
              </h2>
              <div className="ctm__actions">
                <a 
                  href={`/admin/collections/custom-items/create?contentType=${selectedType.id}`}
                  className="ctm__btn ctm__btn--primary"
                >
                  + New {selectedType.singularLabel}
                </a>
                <a 
                  href={`/admin/collections/content-types/${selectedType.id}`}
                  className="ctm__btn"
                >
                  Edit Type
                </a>
                <button 
                  className="ctm__btn ctm__btn--danger"
                  onClick={() => deleteContentType(selectedType.id)}
                >
                  Delete Type
                </button>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="ctm__empty">
                No {selectedType.pluralLabel.toLowerCase()} yet.<br />
                <a 
                  href={`/admin/collections/custom-items/create?contentType=${selectedType.id}`}
                  style={{ color: 'var(--theme-success-600)' }}
                >
                  Create your first {selectedType.singularLabel.toLowerCase()}
                </a>
              </div>
            ) : (
              <table className="ctm__items-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <a href={`/admin/collections/custom-items/${item.id}`}>
                          {item.title}
                        </a>
                      </td>
                      <td>
                        <span className={`ctm__status ctm__status--${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--theme-elevation-500)', fontSize: '0.8125rem' }}>
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        ) : (
          <div className="ctm__empty">
            <h3>Welcome to Content Types</h3>
            <p>Select a content type from the sidebar or create a new one.</p>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
              Content Types let you create custom collections like "Classic Cars", 
              "Recipes", or "Products" without any server restart.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentTypeManager
