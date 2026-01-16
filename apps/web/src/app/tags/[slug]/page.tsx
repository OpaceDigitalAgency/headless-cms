import { redirect } from 'next/navigation'

interface TagRedirectProps {
  params: Promise<{ slug: string }>
}

export default async function TagRedirectPage({ params }: TagRedirectProps) {
  const { slug } = await params
  redirect(`/blog/tag/${slug}`)
}

export const dynamicParams = true
