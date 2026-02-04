import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Topic } from '@/types'

const topics: Topic[] = [
  { name: 'General Discussion', icon: '💬', description: 'Connect and share ideas with the community' },
  { name: 'Job Opportunities', icon: '💼', description: 'Discover career opportunities and postings' },
  { name: 'Best Prompts', icon: '✨', description: 'Curated collection of effective AI prompts' },
  { name: 'Fitness & Wellness', icon: '💪', description: 'Health tips and workout inspiration' },
  { name: 'Announcements', icon: '📢', description: 'Stay updated with community news' },
  { name: 'Showcase', icon: '🚀', description: 'Share your projects and achievements' },
  { name: 'Career Growth', icon: '📈', description: 'Internal career development resources' },
  { name: 'AI Fundamentals', icon: '🤖', description: 'Learn AI and coding from scratch' },
  { name: 'AI News', icon: '📰', description: 'Latest trends and developments in AI' },
  { name: 'Tips & Tricks', icon: '💡', description: 'Pro tips to boost your productivity' },
  { name: 'Tools & Resources', icon: '🛠️', description: 'Essential tools for creators' },
  { name: 'Community Events', icon: '🎉', description: 'Join workshops and networking sessions' },
]

export function TopicsGrid() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="features" className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700">
            Exclusive Access
          </span>
          <h2 className="mb-6 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl">
            Everything You Need,
            <span className="block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              All in One Place
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Explore diverse channels covering AI, career growth, wellness, and more.
            Each designed to help you learn, grow, and connect.
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
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-500/10"
              style={{
                animationDelay: `${index * 30}ms`,
              }}
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-50 via-purple-50/50 to-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              {/* Shine Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/0 via-white/50 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              {/* Icon */}
              <div className="mb-5 text-5xl transition-transform duration-300 group-hover:scale-110">
                {topic.icon}
              </div>

              {/* Content */}
              <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-violet-700">
                {topic.name}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {topic.description}
              </p>

              {/* Arrow Icon */}
              <div className="mt-4 flex items-center gap-2 text-violet-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <span className="text-sm font-semibold">Explore</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="mb-6 text-lg text-gray-600">
            Ready to unlock all channels and resources?
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('section') as HTMLElement
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-violet-500/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/40"
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
