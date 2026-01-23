import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

/**
 * Gallery Block
 * 
 * Displays a collection of images in various layouts.
 * Supports lightbox, grid, masonry, and carousel layouts.
 */
export const galleryBlock: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  imageURL: blockIcons.gallery,
  imageAltText: 'Gallery block preview',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Optional heading for the gallery section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description text',
      },
    },
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'Lightbox Grid', value: 'lightbox' },
        { label: 'Slider', value: 'slider' },
      ],
      admin: {
        description: 'Choose how images are displayed',
      },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
        { label: '5 Columns', value: '5' },
        { label: '6 Columns', value: '6' },
      ],
      admin: {
        condition: (_, siblingData) => ['grid', 'masonry', 'lightbox'].includes(siblingData?.variant),
        description: 'Number of columns on desktop',
      },
    },
    {
      name: 'gap',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      admin: {
        description: 'Space between images',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Auto (Original)', value: 'auto' },
        { label: 'Square (1:1)', value: 'square' },
        { label: 'Landscape (16:9)', value: 'landscape' },
        { label: 'Portrait (3:4)', value: 'portrait' },
        { label: 'Wide (21:9)', value: 'wide' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.variant !== 'masonry',
        description: 'Force images to a specific aspect ratio',
      },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Images',
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
          label: 'Caption',
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link (optional)',
          fields: [
            {
              name: 'url',
              type: 'text',
              label: 'URL',
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Or select a page',
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
            },
          ],
        },
      ],
    },
    {
      name: 'showCaptions',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Captions',
    },
    {
      name: 'enableLightbox',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Lightbox',
      admin: {
        description: 'Allow clicking images to view full size',
      },
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      label: 'Autoplay',
      admin: {
        condition: (_, siblingData) => ['carousel', 'slider'].includes(siblingData?.variant),
      },
    },
    {
      name: 'autoplaySpeed',
      type: 'number',
      defaultValue: 5000,
      label: 'Autoplay Speed (ms)',
      admin: {
        condition: (_, siblingData) =>
          ['carousel', 'slider'].includes(siblingData?.variant) && siblingData?.autoplay,
      },
    },
  ],
}

export default galleryBlock
