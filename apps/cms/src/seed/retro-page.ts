// @ts-nocheck
import './load-env'
import { getPayload } from 'payload'
import config from '../payload.config'

const retroPageData = {
    title: 'Retro Dreams',
    slug: 'retro',
    _status: 'published' as const,
    layout: [
        {
            blockType: 'hero',
            variant: 'retro',
            type: 'standard',
            heading: 'Retro Dreams, Rendered Real',
            subheading: 'Nostalgia meets innovation in every piece. From pixel art to physical prints, I bring the aesthetic of yesterday into the world of tomorrow.',
            textAlign: 'center',
            overlay: 'dark',
            links: [
                {
                    label: 'Commission a Piece',
                    url: '#commission',
                    variant: 'primary',
                },
                {
                    label: 'View Portfolio',
                    url: '#portfolio',
                    variant: 'secondary',
                },
            ],
        },
        {
            blockType: 'grid',
            heading: 'What I Create',
            description: 'Art that transcends time and medium',
            style: 'retro-cards',
            columns: '3',
            gap: 'medium',
            items: [
                {
                    title: 'Digital Illustrations',
                    description: 'Custom artwork that captures the essence of 80s and 90s visual culture with modern polish.',
                    icon: 'image',
                },
                {
                    title: 'Pixel Art',
                    description: 'Meticulously crafted pixel graphics for games, NFTs, and nostalgic branding.',
                    icon: 'palette',
                },
                {
                    title: 'Limited Prints',
                    description: 'Museum-quality physical prints of retro-inspired originals. Each piece numbered and signed.',
                    icon: 'frame',
                },
                {
                    title: 'Album & Cover Art',
                    description: 'Bold visuals for musicians who want their sound to look as good as it sounds.',
                    icon: 'sparkles',
                },
                {
                    title: 'NFT Collections',
                    description: 'Blockchain-ready art collections with authentic retro aesthetics and smart contract integration.',
                    icon: 'layers',
                },
                {
                    title: 'Custom Commissions',
                    description: 'Bespoke pieces tailored to your vision. Portraits, landscapes, abstract — you dream it, I create it.',
                    icon: 'pen',
                },
            ],
        },
        {
            blockType: 'grid',
            heading: 'Collector Stories',
            description: 'What people are saying about the work',
            style: 'agency-cards',
            columns: '2',
            items: [
                {
                    title: 'Kai Martinez',
                    subtitle: 'Synthwave Producer',
                    description: '"This artist captured my album\'s vibe perfectly. The retro aesthetic elevated my entire brand. People buy the vinyl just for the cover art."',
                    icon: 'star',
                },
                {
                    title: 'Emma Thompson',
                    subtitle: 'Art Collector',
                    description: '"I commissioned a portrait of my dog in 16-bit style. It\'s hanging in my living room and every guest asks about it. Pure magic."',
                    icon: 'heart',
                },
                {
                    title: 'Devon Lee',
                    subtitle: 'Web3 Founder',
                    description: '"Our NFT collection sold out in 4 hours. The pixel art was so detailed and nostalgic, collectors went wild. Best decision we made."',
                    icon: 'zap',
                },
                {
                    title: 'Alex Rivera',
                    subtitle: 'Design Enthusiast',
                    description: '"I\'ve been following this artist for years. Finally got a limited print and the quality blew me away. Retro never looked so good."',
                    icon: 'sparkles',
                },
            ],
        },
        {
            blockType: 'hero',
            variant: 'retro',
            type: 'standard',
            heading: 'Ready to Own a Piece?',
            subheading: 'Let\'s create something that takes you back — and moves you forward.',
            links: [
                {
                    label: 'Start Your Commission',
                    url: '#start',
                    variant: 'primary',
                }
            ]
        }
    ],
}

async function seedRetroPage() {
    const payload = await getPayload({ config })

    // check if exists
    const existing = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: 'retro',
            },
        },
    })

    if (existing.totalDocs > 0) {
        console.log('Retro page already exists, updating...')
        await payload.update({
            collection: 'pages',
            id: existing.docs[0].id,
            data: retroPageData,
        })
    } else {
        console.log('Creating Retro page...')
        await payload.create({
            collection: 'pages',
            data: retroPageData,
        })
    }

    console.log('Retro page seeded successfully!')
    process.exit(0)
}

seedRetroPage()
