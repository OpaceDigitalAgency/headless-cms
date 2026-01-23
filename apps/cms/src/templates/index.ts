
export interface TemplateDefinition {
    label: string
    value: string
    description: string
    thumbnail: string // Icon name from admin/icons
    defaultContent?: any[] // Payload blocks
    defaultHero?: any
}

// Reusable block structures
const HERO_STANDARD = {
    type: 'standard',
    heading: 'New Page',
    subheading: 'Add a subheading here.',
}

const HERO_FULLSCREEN = {
    type: 'fullscreen',
    heading: 'Welcome',
    subheading: 'A powerful opening statement.',
}

const BLOCK_CONTENT_Lorem = {
    blockType: 'content',
    columns: [
        {
            size: 'full',
            richText: [
                {
                    children: [{ text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }],
                },
            ],
        },
    ],
}

const BLOCK_FEATURES_3Col = {
    blockType: 'features',
    heading: 'Key Features',
    variant: 'grid',
    items: [
        { heading: 'Feature 1', description: 'Description of feature 1.' },
        { heading: 'Feature 2', description: 'Description of feature 2.' },
        { heading: 'Feature 3', description: 'Description of feature 3.' },
    ],
}

const BLOCK_STATS = {
    blockType: 'stats',
    heading: 'By The Numbers',
    stats: [
        { value: '100+', label: 'Clients' },
        { value: '50k', label: 'Users' },
        { value: '99%', label: 'Satisfaction' },
    ],
}

const BLOCK_FAQ = {
    blockType: 'faq',
    heading: 'Frequently Asked Questions',
    items: [
        { question: 'What is this?', answer: [{ children: [{ text: 'This is a sample question.' }] }] },
        { question: 'How does it work?', answer: [{ children: [{ text: 'This is a sample answer.' }] }] },
    ],
}

const BLOCK_CTA = {
    blockType: 'cta',
    heading: 'Ready to get started?',
    description: 'Join us today.',
    links: [{ label: 'Sign Up', url: '/signup', variant: 'primary' }],
}

export const PAGE_TEMPLATES: TemplateDefinition[] = [
    {
        label: 'Landing Page',
        value: 'landing',
        description: 'High-conversion landing page with hero, features, proof, and CTA.',
        thumbnail: 'layout',
        defaultHero: HERO_FULLSCREEN,
        defaultContent: [
            BLOCK_FEATURES_3Col,
            BLOCK_STATS,
            {
                blockType: 'testimonials',
                heading: 'What People Say',
                items: [
                    { quote: 'This product is amazing!', name: 'Jane Doe', role: 'CEO' }
                ]
            },
            BLOCK_CTA
        ]
    },
    {
        label: 'Standard Page',
        value: 'default',
        description: 'Simple content page for about, privacy, or general info.',
        thumbnail: 'file-text',
        defaultHero: HERO_STANDARD,
        defaultContent: [
            BLOCK_CONTENT_Lorem
        ]
    },
    {
        label: 'Contact Page',
        value: 'contact',
        description: 'Contact form and location details.',
        thumbnail: 'user',
        defaultHero: HERO_STANDARD,
        defaultContent: [
            BLOCK_CONTENT_Lorem,
            {
                blockType: 'form',
                formType: 'contact',
            },
            BLOCK_FAQ
        ]
    },
    {
        label: 'Archive / Listing',
        value: 'archive',
        description: 'List posts, products, or other collection items.',
        thumbnail: 'archive',
        defaultHero: HERO_STANDARD,
        defaultContent: [
            {
                blockType: 'archive',
                heading: 'Latest Items',
                populateBy: 'collection',
                relationTo: 'posts',
                limit: 12
            }
        ]
    }
]

export const POST_TEMPLATES: TemplateDefinition[] = [
    {
        label: 'Standard Article',
        value: 'article',
        description: 'Classic blog post with text and images.',
        thumbnail: 'file-text',
        defaultContent: [
            BLOCK_CONTENT_Lorem
        ]
    },
    {
        label: 'Feature Story',
        value: 'feature',
        description: 'Visual-heavy layout with grids and galleries.',
        thumbnail: 'image',
        defaultContent: [
            BLOCK_CONTENT_Lorem,
            {
                blockType: 'gallery',
                style: 'grid',
                columns: '3',
                images: [] // Placeholder
            },
            BLOCK_FEATURES_3Col
        ]
    },
    {
        label: 'Case Study',
        value: 'case-study',
        description: 'Problem-solution narrative with stats and timeline.',
        thumbnail: 'briefcase',
        defaultContent: [
            BLOCK_CONTENT_Lorem,
            BLOCK_STATS,
            {
                blockType: 'timeline',
                heading: 'Project Timeline',
                events: [
                    { date: 'Phase 1', title: 'Discovery', description: [{ children: [{ text: 'Initial research.' }] }] }
                ]
            },
            BLOCK_CTA
        ]
    },
    {
        label: 'News Brief',
        value: 'brief',
        description: 'Concise update with media assets.',
        thumbnail: 'bell',
        defaultContent: [
            BLOCK_CONTENT_Lorem,
            {
                blockType: 'grid',
                heading: 'Key Takeaways',
                style: 'list',
                items: [
                    { title: 'Point 1', description: 'Details here.' },
                    { title: 'Point 2', description: 'Details here.' }
                ]
            }
        ]
    }
]

export const PRODUCT_TEMPLATES: TemplateDefinition[] = [
    {
        label: 'Standard Product',
        value: 'standard',
        description: 'Clean layout for standard items.',
        thumbnail: 'shopping-bag', // Use shopping bag icon
        defaultContent: [
            BLOCK_CONTENT_Lorem,
            {
                blockType: 'features',
                heading: 'Product Features',
                variant: 'list',
                items: [
                    { heading: 'Quality Material', description: 'Built to last.' },
                    { heading: 'Versatile', description: 'Perfect for any occasion.' }
                ]
            }
        ]
    },
    {
        label: 'Featured Product',
        value: 'featured',
        description: 'Rich layout with stats and grid for flagship items.',
        thumbnail: 'zap', // Use Zap/Bell icon for "Featured" capability
        defaultContent: [
            BLOCK_CONTENT_Lorem,
            BLOCK_STATS,
            {
                blockType: 'grid',
                heading: 'Why This Matters',
                style: 'cards',
                columns: '3',
                items: [
                    { title: 'Innovation', description: 'Leading the market.' },
                    { title: 'Design', description: 'Award-winning aesthetics.' },
                    { title: 'Support', description: '24/7 dedicated support.' }
                ]
            },
            BLOCK_CTA
        ]
    },
    {
        label: 'Bundle / Collection',
        value: 'bundle',
        description: 'Showcase multiple items or benefits.',
        thumbnail: 'briefcase', // Use Box/Briefcase icon
        defaultContent: [
            BLOCK_CONTENT_Lorem,
            {
                blockType: 'features',
                heading: 'What\'s Inside',
                variant: 'grid',
                items: [
                    { heading: 'Main Item', description: 'The core product.' },
                    { heading: 'Bonus 1', description: 'Exclusive add-on.' },
                    { heading: 'Bonus 2', description: 'Extended warranty.' }
                ]
            },
            {
                blockType: 'testimonials',
                heading: 'Customer Reviews',
                items: [
                    { quote: 'Best value I found!', name: 'Alex Smith', role: 'Verified Buyer' }
                ]
            },
            BLOCK_CTA
        ]
    }
]
