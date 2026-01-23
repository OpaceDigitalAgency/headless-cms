import { BaseSeeder, type SeedOptions } from './base'
import type { Payload } from 'payload'

export class MinimalPageSeeder extends BaseSeeder {
    constructor(payload: Payload, options: SeedOptions = {}) {
        super(payload, options)
    }

    getPresetId(): string {
        return 'minimal-showcase'
    }

    getCollections(): string[] {
        return ['pages']
    }

    async clear(): Promise<void> {
        // Only clear the specific page
        const existing = await this.payload.find({
            collection: 'pages',
            where: { slug: { equals: 'minimal' } },
            limit: 1,
        })

        if (existing.docs[0]) {
            this.log('Clearing existing Minimal page...')
            await this.payload.delete({
                collection: 'pages',
                id: existing.docs[0].id,
            })
        }
    }

    async seed(): Promise<void> {
        this.log('Seeding Minimal showcase page...')

        const heroImage = await this.downloadMedia(
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop&q=80',
            'minimal-hero.webp',
            'Portrait'
        )

        await this.create('pages', {
            title: 'Minimal Showcase',
            slug: 'minimal',
            template: 'detail', // Minimal often uses detail/article structure
            _status: 'published',
            hero: {
                type: 'minimal',
                heading: 'Less is More.',
                subheading: 'Focus on content, typography, and space.',
                image: heroImage?.id,
            },
            content: [
                {
                    blockType: 'content',
                    columns: [
                        {
                            size: 'twoThirds',
                            richText: [
                                {
                                    children: [
                                        {
                                            text: 'Essentialism is not about how to get more things done; it’s about how to get the right things done. It doesn’t mean just doing less for the sake of less either. It is about making the wisest possible investment of your time and energy in order to operate at our highest point of contribution by doing only what is essential.',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    paddingTop: 'large',
                    paddingBottom: 'large',
                },
                {
                    blockType: 'quote',
                    quote: 'Simplicity is the ultimate sophistication.',
                    author: 'Leonardo da Vinci',
                    align: 'center', // Minimal skin centers quotes elegantly
                },
                {
                    blockType: 'grid',
                    heading: 'Selected Works',
                    style: 'list', // List view suits minimal aesthetic
                    columns: '1',
                    items: [
                        { title: 'Project Alpha', description: 'Brand Identity', icon: 'arrow-right' },
                        { title: 'Project Beta', description: 'Editorial Design', icon: 'arrow-right' },
                        { title: 'Project Gamma', description: 'Spatial Design', icon: 'arrow-right' },
                    ],
                },
                {
                    blockType: 'form',
                    formType: 'contact', // Simple contact form
                    heading: 'Get in Touch',
                    backgroundColor: 'light',
                },
            ],
        })

        this.log('Minimal showcase page seeded!')
    }
}
