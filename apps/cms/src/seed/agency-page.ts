import { BaseSeeder, type SeedOptions } from './base'
import type { Payload } from 'payload'

export class AgencyPageSeeder extends BaseSeeder {
    constructor(payload: Payload, options: SeedOptions = {}) {
        super(payload, options)
    }

    getPresetId(): string {
        return 'agency-showcase'
    }

    getCollections(): string[] {
        return ['pages']
    }

    async clear(): Promise<void> {
        // Only clear the specific page
        const existing = await this.payload.find({
            collection: 'pages',
            where: { slug: { equals: 'agency' } },
            limit: 1,
        })

        if (existing.docs[0]) {
            this.log('Clearing existing Agency page...')
            await this.payload.delete({
                collection: 'pages',
                id: existing.docs[0].id,
            })
        }
    }

    async seed(): Promise<void> {
        this.log('Seeding Agency showcase page...')

        const heroImage = await this.downloadMedia(
            'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&q=80',
            'agency-hero.webp',
            'Digital Agency Office'
        )

        const projectImage1 = await this.downloadMedia(
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
            'agency-project-1.webp',
            'Data Analytics Project'
        )

        const projectImage2 = await this.downloadMedia(
            'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
            'agency-project-2.webp',
            'Mobile App Design'
        )

        const projectImage3 = await this.downloadMedia(
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
            'agency-project-3.webp',
            'Brand Strategy'
        )

        await this.create('pages', {
            title: 'Agency Showcase',
            slug: 'agency',
            template: 'landing', // Use landing template structure
            _status: 'published',
            hero: {
                type: 'fullscreen',
                heading: 'We Build Digital Futures',
                subheading: 'Award-winning strategies for forward-thinking brands.',
                image: heroImage?.id,
                overlay: 'dark',
                links: [
                    { label: 'View Work', url: '#work', variant: 'primary' },
                    { label: 'Contact Us', url: '#contact', variant: 'secondary' },
                ],
                // Note: variant field would be here if extended in schema, for now utilizing 'agency' skin features via block variants
            },
            content: [
                {
                    blockType: 'features',
                    heading: 'Our Expertise',
                    layout: 'grid',
                    items: [
                        { heading: 'Digital Strategy', description: 'Data-driven roadmaps for growth.', icon: 'zap' },
                        { heading: 'UX/UI Design', description: 'Immersive experiences that convert.', icon: 'layout' },
                        { heading: 'Development', description: 'Scalable architecture for the web.', icon: 'code' },
                    ],
                },
                {
                    blockType: 'stats',
                    heading: 'Impact by the Numbers',
                    stats: [
                        { value: '$500M+', label: 'Client Revenue' },
                        { value: '50+', label: 'Awards Won' },
                        { value: '100%', label: 'Delivery Rate' },
                    ],
                },
                {
                    blockType: 'grid',
                    heading: 'Featured Work',
                    style: 'cards', // Agency skin interprets this boldly
                    columns: '3',
                    items: [
                        { heading: 'FinTech Revolution', description: 'Reinventing banking for Gen Z.', image: projectImage1?.id },
                        { heading: 'HealthPlus App', description: 'Telemedicine made simple.', image: projectImage2?.id },
                        { heading: 'EcoBrand Launch', description: 'Sustainable fashion identity.', image: projectImage3?.id },
                    ],
                },
                {
                    blockType: 'testimonials',
                    heading: 'Client Partnerships',
                    items: [
                        { quote: 'They transformed our business completely.', name: 'Sarah Jenkins', role: 'CMO, TechFlow' },
                        { quote: 'The best agency experience we have ever had.', name: 'Mike Chen', role: 'Founder, StartUp' },
                    ],
                },
                {
                    blockType: 'cta',
                    heading: 'Ready to Scale?',
                    description: 'Let\'s discuss your next big project.',
                    links: [{ label: 'Start a Project', url: '/contact', variant: 'primary' }],
                },
            ],
        })

        this.log('Agency showcase page seeded!')
    }
}
