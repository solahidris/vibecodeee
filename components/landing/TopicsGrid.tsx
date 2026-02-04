import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Topic } from '@/types'
import Image from 'next/image'

const topics: Topic[] = [
  {
    name: 'General Discussion',
    icon: '💬',
    description: 'Connect and share ideas with the community',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80'
  },
  {
    name: 'Job Opportunities',
    icon: '💼',
    description: 'Discover career opportunities and postings',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80'
  },
  {
    name: 'Best Prompts',
    icon: '✨',
    description: 'Curated collection of effective AI prompts',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80'
  },
  {
    name: 'Fitness & Wellness',
    icon: '💪',
    description: 'Health tips and workout inspiration',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80'
  },
  {
    name: 'Announcements',
    icon: '📢',
    description: 'Stay updated with community news',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80'
  },
  {
    name: 'Showcase',
    icon: '🚀',
    description: 'Share your projects and achievements',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80'
  },
  {
    name: 'Career Growth',
    icon: '📈',
    description: 'Internal career development resources',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80'
  },
  {
    name: 'AI Fundamentals',
    icon: '🤖',
    description: 'Learn AI and coding from scratch',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80'
  },
  {
    name: 'AI News',
    icon: '📰',
    description: 'Latest trends and developments in AI',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80'
  },
  {
    name: 'Tips & Tricks',
    icon: '💡',
    description: 'Pro tips to boost your productivity',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80'
  },
  {
    name: 'Tools & Resources',
    icon: '🛠️',
    description: 'Essential tools for creators',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&q=80'
  },
  {
    name: 'Community Events',
    icon: '🎉',
    description: 'Join workshops and networking sessions',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80'
  },
]

export function TopicsGrid() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="features" className="relative py-32 overflow-hidden bg-zinc-50">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block rounded-full bg-zinc-100 border border-zinc-200 px-4 py-1.5 text-sm font-semibold text-zinc-700 transition-all duration-300 hover:border-zinc-300">
            Exclusive Access
          </span>
          <h2 className="mb-6 text-5xl font-black tracking-tight text-zinc-900 sm:text-6xl">
            Everything You Need,
            <span className="block bg-gradient-to-r from-zinc-600 to-zinc-900 bg-clip-text text-transparent">
              All in One Place
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600">
            Explore diverse channels covering AI, career growth, wellness, and more.
          </p>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {topics.map((topic, index) => (
            <div
              key={topic.name}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-zinc-300 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 30}ms`,
              }}
            >
              {/* Image Background */}
              <div className="relative h-48 overflow-hidden bg-zinc-100">
                {topic.image && (
                  <Image
                    src={topic.image}
                    alt={topic.name}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110">
                  {topic.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-zinc-900 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {topic.description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-4 flex items-center gap-2 text-zinc-900 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="text-sm font-semibold">Explore</span>
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="mb-6 text-lg text-zinc-600">
            Ready to unlock all channels and resources?
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('section') as HTMLElement
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-zinc-800 hover:shadow-2xl"
          >
            Join the Community
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
