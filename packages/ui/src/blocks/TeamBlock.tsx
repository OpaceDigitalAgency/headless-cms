import Image from 'next/image'
import Link from 'next/link'

interface TeamBlockProps {
  block: {
    heading?: string
    members?: Array<{
      name?: string
      role?: string
      bio?: string
      photo?: { url?: string; alt?: string }
      socials?: Array<{ label?: string; url?: string }>
    }>
  }
}

export function TeamBlock({ block }: TeamBlockProps) {
  const members = block.members || []

  return (
    <section className="bg-white py-16">
      <div className="container">
        {block.heading && (
          <h2 className="mb-10 text-3xl font-semibold text-gray-900">{block.heading}</h2>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <div key={index} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              {member.photo?.url && (
                <Image
                  src={member.photo.url}
                  alt={member.photo.alt || member.name || ''}
                  width={160}
                  height={160}
                  className="mb-4 h-40 w-40 rounded-xl object-cover"
                />
              )}
              {member.name && <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>}
              {member.role && <p className="text-sm text-gray-500">{member.role}</p>}
              {member.bio && <p className="mt-3 text-sm text-gray-600">{member.bio}</p>}
              {member.socials && member.socials.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  {member.socials.map((social, idx) => (
                    <Link key={idx} href={social.url || '#'} className="text-primary-600 hover:underline">
                      {social.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
