import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Places: CollectionConfig = {
  slug: 'places',

  admin: {
    useAsTitle: 'name',
    group: 'Museum',
    defaultColumns: ['name', 'country', 'updatedAt'],
    description: 'Geographic locations and historical sites',
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Place Name',
    },
    slugField('name'),
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
            },
            {
              name: 'historicalSignificance',
              type: 'richText',
              label: 'Historical Significance',
            },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              name: 'location',
              type: 'point',
              label: 'Geographic Coordinates',
            },
            {
              name: 'address',
              type: 'group',
              label: 'Address',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                },
                {
                  name: 'city',
                  type: 'text',
                },
                {
                  name: 'region',
                  type: 'text',
                  label: 'State/Region',
                },
                {
                  name: 'country',
                  type: 'text',
                },
                {
                  name: 'postalCode',
                  type: 'text',
                },
              ],
            },
            {
              name: 'historicalNames',
              type: 'array',
              label: 'Historical Names',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'period',
                  type: 'text',
                  admin: {
                    description: 'e.g., "Ancient", "Medieval", "1500-1800"',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'relatedArtifacts',
              type: 'join',
              collection: 'artifacts',
              on: 'places',
              label: 'Related Artifacts',
            },
            {
              name: 'relatedPeople',
              type: 'join',
              collection: 'people',
              on: 'birthPlace',
              label: 'People Born Here',
            },
            {
              name: 'relatedPlaces',
              type: 'relationship',
              relationTo: 'places',
              hasMany: true,
              label: 'Related Places',
              filterOptions: ({ id }) => ({
                id: {
                  not_equals: id,
                },
              }),
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              label: 'Image Gallery',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'placeType',
      type: 'select',
      label: 'Place Type',
      options: [
        { label: 'City', value: 'city' },
        { label: 'Region', value: 'region' },
        { label: 'Country', value: 'country' },
        { label: 'Archaeological Site', value: 'archaeological' },
        { label: 'Museum', value: 'museum' },
        { label: 'Historical Site', value: 'historical' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Place',
      admin: {
        position: 'sidebar',
      },
    },
  ],

  timestamps: true,
}
