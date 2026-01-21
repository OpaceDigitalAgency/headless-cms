/**
 * Place Collection Template
 * 
 * A location/place template suitable for:
 * - Geographic locations
 * - Venues
 * - Store locations
 * - Historical sites
 * - Origins/sources
 */

import type { CollectionTemplate } from '../types'
import {
  nameField,
  slugField,
  featuredImageField,
  excerptField,
  contentBlocksField,
  categoriesField,
  tagsField,
  featuredField,
  templateField,
  seoTabFields,
  richContentField,
  mediaGalleryField,
} from '../shared-fields'

export const placeTemplate: CollectionTemplate = {
  id: 'place',
  name: 'Places',
  description: 'Locations like venues, stores, historical sites, or geographic origins',
  category: 'places',
  icon: 'map-pin',
  defaultSlug: 'places',
  defaultSingular: 'Place',
  defaultPlural: 'Places',
  adminGroup: 'Collections',
  status: 'installed', // Currently installed
  hasSeedData: true,
  hasSeedMedia: true,
  seedDataCount: 5,
  
  fields: [
    nameField('Place Name'),
    slugField('name', '/places'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            featuredImageField,
            excerptField('Short Description'),
            richContentField('Full Description'),
            mediaGalleryField,
            {
              name: 'placeType',
              type: 'select',
              label: 'Place Type',
              options: [
                { label: 'City', value: 'city' },
                { label: 'Country', value: 'country' },
                { label: 'Region', value: 'region' },
                { label: 'Venue', value: 'venue' },
                { label: 'Store', value: 'store' },
                { label: 'Museum', value: 'museum' },
                { label: 'Historical Site', value: 'historical' },
                { label: 'Archaeological Site', value: 'archaeological' },
                { label: 'Other', value: 'other' },
              ],
            },
          ],
        },
        {
          label: 'Address',
          fields: [
            {
              name: 'address',
              type: 'group',
              label: 'Address',
              fields: [
                { name: 'street', type: 'text', label: 'Street Address' },
                { name: 'street2', type: 'text', label: 'Address Line 2' },
                {
                  type: 'row',
                  fields: [
                    { name: 'city', type: 'text', label: 'City' },
                    { name: 'state', type: 'text', label: 'State/Province' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'postalCode', type: 'text', label: 'Postal Code' },
                    { name: 'country', type: 'text', label: 'Country' },
                  ],
                },
              ],
            },
            {
              name: 'coordinates',
              type: 'group',
              label: 'Coordinates',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'latitude',
                      type: 'number',
                      label: 'Latitude',
                      admin: {
                        description: 'e.g., 51.5074',
                      },
                    },
                    {
                      name: 'longitude',
                      type: 'number',
                      label: 'Longitude',
                      admin: {
                        description: 'e.g., -0.1278',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'phone', type: 'text', label: 'Phone' },
            { name: 'email', type: 'email', label: 'Email' },
            { name: 'website', type: 'text', label: 'Website' },
            {
              name: 'hours',
              type: 'array',
              label: 'Opening Hours',
              fields: [
                {
                  name: 'day',
                  type: 'select',
                  options: [
                    { label: 'Monday', value: 'monday' },
                    { label: 'Tuesday', value: 'tuesday' },
                    { label: 'Wednesday', value: 'wednesday' },
                    { label: 'Thursday', value: 'thursday' },
                    { label: 'Friday', value: 'friday' },
                    { label: 'Saturday', value: 'saturday' },
                    { label: 'Sunday', value: 'sunday' },
                  ],
                },
                { name: 'open', type: 'text', label: 'Open' },
                { name: 'close', type: 'text', label: 'Close' },
                { name: 'closed', type: 'checkbox', label: 'Closed' },
              ],
            },
          ],
        },
        {
          label: 'History',
          fields: [
            {
              name: 'historicalNames',
              type: 'array',
              label: 'Historical Names',
              fields: [
                { name: 'name', type: 'text', label: 'Name', required: true },
                { name: 'period', type: 'text', label: 'Period' },
              ],
            },
            {
              name: 'history',
              type: 'richText',
              label: 'Historical Background',
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            categoriesField,
            tagsField,
            {
              name: 'relatedPlaces',
              type: 'relationship',
              relationTo: 'places',
              hasMany: true,
              label: 'Related Places',
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
            },
          ],
        },
        {
          label: 'Content Sections',
          fields: [
            contentBlocksField,
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: seoTabFields,
        },
      ],
    },
    featuredField,
    templateField([
      { label: 'Location Page', value: 'location' },
      { label: 'Map View', value: 'map' },
      { label: 'Directory Card', value: 'card' },
    ]),
  ],
}

export default placeTemplate
