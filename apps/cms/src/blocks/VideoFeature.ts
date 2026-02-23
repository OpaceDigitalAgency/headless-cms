import type { Block } from 'payload'
import { blockIcons } from './blockIcons'

export const videoFeatureBlock: Block = {
    slug: 'videoFeature',
    labels: {
        singular: 'Video Feature',
        plural: 'Video Features',
    },
    imageURL: blockIcons.embed,
    imageAltText: 'Video feature block preview',
    fields: [
        {
            name: 'heading',
            type: 'text',
            label: 'Heading',
            required: false, // Changed to false to allow autosave without validation errors
        },
        {
            name: 'videoUrl',
            type: 'text',
            required: false, // Changed to false to allow autosave without validation errors
            label: 'YouTube Video URL',
            admin: {
                description: 'Full YouTube URL (e.g., https://www.youtube.com/watch?v=...)',
            },
        },
        {
            name: 'caption',
            type: 'textarea',
            label: 'Caption',
            admin: {
                description: 'Description text shown next to the video',
            },
        },
        {
            name: 'checkItems',
            type: 'textarea',
            label: 'Check Items (one per line)',
            admin: {
                description: 'Enter each check item on a new line. These will appear as checkmarks.',
            },
        },
    ],
}

export default videoFeatureBlock
