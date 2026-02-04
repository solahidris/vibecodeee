import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Topic } from '@/types'

const topics: Topic[] = [
  { name: 'General Discussion', icon: '💬', description: 'Connect and share ideas' },
  { name: 'Job Opportunities', icon: '💼', description: 'Career postings' },
  { name: 'Best Prompts', icon: '✨', description: 'AI prompt library' },
  { name: 'Fitness & Wellness', icon: '💪', description: 'Health & workout tips' },
  { name: 'Announcements', icon: '📢', description: 'Community updates' },
  { name: 'Showcase', icon: '🚀', description: 'Project highlights' },
  { name: 'Career Growth', icon: '📈', description: 'Development resources' },
  { name: 'AI Fundamentals', icon: '🤖', description: 'Learn from scratch' },
  { name: 'AI News', icon: '📰', description: 'Latest developments' },
  { name: 'Tips & Tricks', icon: '💡', description: 'Productivity hacks' },
  { name: 'Tools & Resources', icon: '🛠️', description: 'Essential tools' },
  { name: 'Community Events', icon: '🎉', description: 'Workshops & networking' },
]

export function TopicsGrid() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="features" className="relative py-32 overflow-hidden bg-white">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-zinc-100 border border-zinc-200 px-4 py-1.5 text-sm font-semibold text-zinc-700 transition-all duration-300 hover:border-zinc-300 hover:scale-105">
            Join the Telegram Community
          </span>
          <h2 className="mb-6 text-5xl font-black tracking-tight text-zinc-900 sm:text-6xl">
            What You'll Get
            <span className="block bg-gradient-to-r from-zinc-600 to-zinc-900 bg-clip-text text-transparent">
              Access To
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600">
            Exclusive channels, premium resources, and a vibrant community.
            <span className="block mt-2 text-zinc-500">All for RM10/month.</span>
          </p>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge Grid - Compact Layout */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
            {topics.map((topic, index) => (
              <div
                key={topic.name}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-900 hover:shadow-xl hover:shadow-zinc-900/5"
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
              >
                {/* Icon & Content */}
                <div className="flex items-start gap-4">
                  <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-base font-bold text-zinc-900 transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-sm text-zinc-600 line-clamp-1">
                      {topic.description}
                    </p>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute right-4 top-6 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
                  <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Key Benefits List */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 sm:p-12">
              <h3 className="mb-8 text-center text-2xl font-bold text-zinc-900">
                Plus, you get:
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Expert Resources</p>
                    <p className="text-sm text-zinc-600">Curated tools and guides</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Active Community</p>
                    <p className="text-sm text-zinc-600">Daily discussions & support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Weekly Updates</p>
                    <p className="text-sm text-zinc-600">Latest AI news & trends</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Networking Events</p>
                    <p className="text-sm text-zinc-600">Connect with members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://tinyurl.com/a1-community"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-zinc-800 hover:shadow-2xl"
          >
            Join Telegram Community
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-zinc-500">
            RM10/month · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
