'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { formatDateTime } from './toolUtils'

type UserDoc = {
  id: number | string
  email: string
  name?: string
  role?: string
  createdAt: string
}

type UsersResponse = {
  docs: UserDoc[]
  totalDocs: number
}

const roles = ['admin', 'editor', 'user']

const UserManagementClient: React.FC = () => {
  const [users, setUsers] = useState<UserDoc[]>([])
  const [totalDocs, setTotalDocs] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingUser, setSavingUser] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/users?limit=50&sort=-createdAt')
      if (!response.ok) {
        throw new Error('Failed to load users')
      }
      const json = (await response.json()) as UsersResponse
      setUsers(json.docs || [])
      setTotalDocs(json.totalDocs || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const updateRole = async (userId: string, role: string) => {
    setSavingUser(userId)
    setError(null)

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      })
      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Failed to update role')
      }
      fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setSavingUser(null)
    }
  }

  return (
    <section className="ra-tool-card">
      <div className="ra-tool-card__header">
        <div>
          <h2>Users</h2>
          <p>Total users: {totalDocs}</p>
        </div>
        <button type="button" className="ra-tool-button" onClick={fetchUsers}>
          Refresh
        </button>
      </div>

      {isLoading && <p className="ra-tool-muted">Loading users...</p>}
      {error && <p className="ra-tool-error">{error}</p>}

      {!isLoading && (
        <div className="ra-tool-table">
          <div className="ra-tool-table__row ra-tool-table__row--header">
            <span>User</span>
            <span>Role</span>
            <span>Created</span>
            <span></span>
          </div>
          {users.map((user) => (
            <div key={String(user.id)} className="ra-tool-table__row">
              <span>
                <strong>{user.name || user.email}</strong>
                <span className="ra-tool-muted">{user.email}</span>
              </span>
              <span>
                <select
                  value={user.role || 'user'}
                  onChange={(event) => updateRole(String(user.id), event.target.value)}
                  disabled={savingUser === String(user.id)}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </span>
              <span>{formatDateTime(user.createdAt)}</span>
              <span>
                <a className="ra-tool-link" href={`/admin/collections/users/${user.id}`}>
                  Open
                </a>
              </span>
            </div>
          ))}
          {users.length === 0 && <p className="ra-tool-muted">No users found.</p>}
        </div>
      )}
    </section>
  )
}

export default UserManagementClient
