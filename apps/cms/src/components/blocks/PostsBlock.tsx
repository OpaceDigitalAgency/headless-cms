import Link from 'next/link'
import Image from 'next/image'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

interface Post {
    id: string | number
    slug: string
    title: string
    excerpt?: string
    publishedAt?: string
    featuredImage?: {
        url?: string
        alt?: string
        width?: number
        height?: number
    }
    author?: {
        name?: string
    }
}

interface PostsBlockProps {
    block: {
        heading?: string
        description?: string
        limit?: number
        layout?: 'grid' | 'list' | 'featured'
        showExcerpt?: boolean
        showFeaturedImage?: boolean
        showDate?: boolean
        showAuthor?: boolean
    }
}

export async function PostsBlock({ block }: PostsBlockProps) {
    // Fetch posts from Payload
    let posts: Post[] = []

    try {
        const payload = await getPayloadHMR({ config: configPromise })
        const result = await payload.find({
            collection: 'posts',
            where: {
                _status: { equals: 'published' }
            },
            limit: block.limit || 10,
            sort: '-publishedAt',
            depth: 1,
        })

        posts = result.docs as Post[]
    } catch (error) {
        console.error('Error fetching posts:', error)
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    if (posts.length === 0) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-gray-500">No blog posts found.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {block.heading && (
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {block.heading}
                    </h2>
                )}
                {block.description && (
                    <p className="text-gray-600 mb-12 max-w-2xl">
                        {block.description}
                    </p>
                )}

                {/* Grid Layout */}
                {(block.layout === 'grid' || !block.layout) && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {block.showFeaturedImage && post.featuredImage?.url && (
                                    <div className="relative h-48 bg-gray-100">
                                        <Image
                                            src={post.featuredImage.url}
                                            alt={post.featuredImage.alt || post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    {block.showDate && post.publishedAt && (
                                        <time className="text-sm text-gray-500 mb-2 block">
                                            {formatDate(post.publishedAt)}
                                        </time>
                                    )}
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    {block.showExcerpt && post.excerpt && (
                                        <p className="text-gray-600 text-sm line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    {block.showAuthor && post.author?.name && (
                                        <p className="text-sm text-gray-500 mt-4">
                                            By {post.author.name}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* List Layout */}
                {block.layout === 'list' && (
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group flex gap-6 bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                            >
                                {block.showFeaturedImage && post.featuredImage?.url && (
                                    <div className="relative w-48 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                        <Image
                                            src={post.featuredImage.url}
                                            alt={post.featuredImage.alt || post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    {block.showDate && post.publishedAt && (
                                        <time className="text-sm text-gray-500 mb-2 block">
                                            {formatDate(post.publishedAt)}
                                        </time>
                                    )}
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    {block.showExcerpt && post.excerpt && (
                                        <p className="text-gray-600 line-clamp-2 mb-4">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    {block.showAuthor && post.author?.name && (
                                        <p className="text-sm text-gray-500">
                                            By {post.author.name}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Featured + Grid Layout */}
                {block.layout === 'featured' && posts.length > 0 && (
                    <div>
                        {/* Featured Post */}
                        <Link
                            href={`/blog/${posts[0].slug}`}
                            className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow mb-12"
                        >
                            <div className="md:flex">
                                {block.showFeaturedImage && posts[0].featuredImage?.url && (
                                    <div className="relative md:w-1/2 h-64 md:h-auto bg-gray-100">
                                        <Image
                                            src={posts[0].featuredImage.url}
                                            alt={posts[0].featuredImage.alt || posts[0].title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-8 md:w-1/2">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                                        Featured
                                    </span>
                                    {block.showDate && posts[0].publishedAt && (
                                        <time className="text-sm text-gray-500 mb-2 block">
                                            {formatDate(posts[0].publishedAt)}
                                        </time>
                                    )}
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {posts[0].title}
                                    </h3>
                                    {block.showExcerpt && posts[0].excerpt && (
                                        <p className="text-gray-600 mb-4">
                                            {posts[0].excerpt}
                                        </p>
                                    )}
                                    {block.showAuthor && posts[0].author?.name && (
                                        <p className="text-sm text-gray-500">
                                            By {posts[0].author.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>

                        {/* Grid of remaining posts */}
                        {posts.length > 1 && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.slice(1).map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        {block.showFeaturedImage && post.featuredImage?.url && (
                                            <div className="relative h-48 bg-gray-100">
                                                <Image
                                                    src={post.featuredImage.url}
                                                    alt={post.featuredImage.alt || post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            {block.showDate && post.publishedAt && (
                                                <time className="text-sm text-gray-500 mb-2 block">
                                                    {formatDate(post.publishedAt)}
                                                </time>
                                            )}
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </h3>
                                            {block.showExcerpt && post.excerpt && (
                                                <p className="text-gray-600 text-sm line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            {block.showAuthor && post.author?.name && (
                                                <p className="text-sm text-gray-500 mt-4">
                                                    By {post.author.name}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
