import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    defaultColumns: ['email', 'name', 'role', 'createdAt'],
    description: 'Manage user accounts and permissions',
  },

  // Enable authentication
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false, // Email verification disabled for PoC
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
    useAPIKey: true,
    depth: 0,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      domain: undefined,
    },
  },

  // Access control
  access: {
    // Anyone can read users (for author display)
    read: () => true,
    // Only admins can create users
    create: ({ req: { user } }) => user?.role === 'admin',
    // Users can update themselves, admins can update anyone
    update: ({ req: { user }, id }) => {
      if (user?.role === 'admin') return true
      return user?.id === id
    },
    // Only admins can delete
    delete: ({ req: { user } }) => user?.role === 'admin',
    // Only admins can access admin panel
    admin: ({ req: { user } }) => ['admin', 'editor'].includes(user?.role || ''),
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      access: {
        // Only admins can change roles
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Avatar',
      admin: {
        description: 'Profile picture',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biography',
      admin: {
        description: 'Short bio for author pages',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'Website', value: 'website' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],

  timestamps: true,
}
