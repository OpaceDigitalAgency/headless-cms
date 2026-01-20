/**
 * Event Collection Template
 * 
 * An event template suitable for:
 * - Events and exhibitions
 * - Workshops and classes
 * - Conferences
 * - Shows and performances
 */

import type { CollectionTemplate } from '../types'
import {
  titleField,
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
} from '../shared-fields'

export const eventTemplate: CollectionTemplate = {
  id: 'event',
  name: 'Event',
  description: 'Events, exhibitions, workshops, or performances with dates and venues',
  category: 'events',
  icon: 'calendar',
  defaultSlug: 'events',
  defaultSingular: 'Event',
  defaultPlural: 'Events',
  adminGroup: 'Collections',
  status: 'installed', // Currently installed
  hasSeedData: true,
  hasSeedMedia: false,
  seedDataCount: 5,
  
  fields: [
    titleField('Event Title'),
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            featuredImageField,
            excerptField('Short Description'),
            richContentField('Full Description'),
            {
              name: 'eventType',
              type: 'select',
              label: 'Event Type',
              options: [
                { label: 'Exhibition', value: 'exhibition' },
                { label: 'Workshop', value: 'workshop' },
                { label: 'Conference', value: 'conference' },
                { label: 'Performance', value: 'performance' },
                { label: 'Lecture', value: 'lecture' },
                { label: 'Tour', value: 'tour' },
                { label: 'Opening', value: 'opening' },
                { label: 'Other', value: 'other' },
              ],
            },
          ],
        },
        {
          label: 'Schedule',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'startDate',
                  type: 'date',
                  label: 'Start Date',
                  required: true,
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                  },
                },
                {
                  name: 'endDate',
                  type: 'date',
                  label: 'End Date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                  },
                },
              ],
            },
            {
              name: 'allDay',
              type: 'checkbox',
              label: 'All Day Event',
            },
            {
              name: 'recurring',
              type: 'group',
              label: 'Recurring Event',
              fields: [
                {
                  name: 'isRecurring',
                  type: 'checkbox',
                  label: 'This is a recurring event',
                },
                {
                  name: 'frequency',
                  type: 'select',
                  label: 'Frequency',
                  options: [
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                  ],
                  admin: {
                    condition: (_, siblingData) => siblingData?.isRecurring,
                  },
                },
                {
                  name: 'recurrenceEnd',
                  type: 'date',
                  label: 'Recurrence End Date',
                  admin: {
                    condition: (_, siblingData) => siblingData?.isRecurring,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              name: 'venue',
              type: 'relationship',
              relationTo: 'places',
              label: 'Venue',
            },
            {
              name: 'onlineEvent',
              type: 'checkbox',
              label: 'Online Event',
            },
            {
              name: 'onlineUrl',
              type: 'text',
              label: 'Online Event URL',
              admin: {
                condition: (data) => data?.onlineEvent,
              },
            },
            {
              name: 'customLocation',
              type: 'textarea',
              label: 'Custom Location Details',
              admin: {
                description: 'Additional location information',
              },
            },
          ],
        },
        {
          label: 'Registration',
          fields: [
            {
              name: 'requiresRegistration',
              type: 'checkbox',
              label: 'Requires Registration',
            },
            {
              name: 'registrationUrl',
              type: 'text',
              label: 'Registration URL',
              admin: {
                condition: (data) => data?.requiresRegistration,
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'capacity',
                  type: 'number',
                  label: 'Capacity',
                  min: 0,
                },
                {
                  name: 'registered',
                  type: 'number',
                  label: 'Registered',
                  min: 0,
                  defaultValue: 0,
                },
              ],
            },
            {
              name: 'price',
              type: 'group',
              label: 'Pricing',
              fields: [
                {
                  name: 'isFree',
                  type: 'checkbox',
                  label: 'Free Event',
                  defaultValue: true,
                },
                {
                  name: 'amount',
                  type: 'number',
                  label: 'Price',
                  min: 0,
                  admin: {
                    condition: (_, siblingData) => !siblingData?.isFree,
                  },
                },
                {
                  name: 'currency',
                  type: 'select',
                  label: 'Currency',
                  defaultValue: 'GBP',
                  options: [
                    { label: 'GBP (£)', value: 'GBP' },
                    { label: 'USD ($)', value: 'USD' },
                    { label: 'EUR (€)', value: 'EUR' },
                  ],
                  admin: {
                    condition: (_, siblingData) => !siblingData?.isFree,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            categoriesField,
            tagsField,
            {
              name: 'organizers',
              type: 'relationship',
              relationTo: 'people',
              hasMany: true,
              label: 'Organizers',
            },
            {
              name: 'relatedEvents',
              type: 'relationship',
              relationTo: 'events',
              hasMany: true,
              label: 'Related Events',
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
    {
      name: 'eventStatus',
      type: 'select',
      label: 'Event Status',
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Postponed', value: 'postponed' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Event status (separate from draft/published)',
      },
    },
    templateField([
      { label: 'Event Page', value: 'event' },
      { label: 'Calendar View', value: 'calendar' },
      { label: 'Card View', value: 'card' },
    ]),
  ],
}

export default eventTemplate
