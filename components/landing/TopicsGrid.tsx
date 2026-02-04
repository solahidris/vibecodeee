import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Topic } from '@/types'

const topics: Topic[] = [
  { name: 'General Discussion', icon: '💬' },
  { name: 'Job Opportunities', icon: '💼' },
  { name: 'Best Prompts', icon: '✨' },
  { name: 'Fitness & Wellness', icon: '💪' },
  { name: 'Announcements', icon: '📢' },
  { name: 'Showcase', icon: '🚀' },
  { name: 'Career Growth', icon: '📈' },
  { name: 'AI Fundamentals', icon: '🤖' },
  { name: 'AI News', icon: '📰' },
  { name: 'Tips & Tricks', icon: '💡' },
  { name: 'Tools & Resources', icon: '🛠️' },
  { name: 'Community Events', icon: '🎉' },
]

// Split topics into 3 rows for marquee
const row1 = topics.slice(0, 4)
const row2 = topics.slice(4, 8)
const row3 = topics.slice(8, 12)

function MarqueeRow({ items, reverse = false }: { items: Topic[]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden py-4">
      <div
        className={`flex gap-4 ${
          reverse ? 'animate-marquee-right' : 'animate-marquee-left'
        }`}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items, ...items].map((topic, index) => (
          <div
            key={`${topic.name}-${index}`}
            className="flex-shrink-0 flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-6 py-3 shadow-sm transition-all duration-300 hover:border-zinc-900 hover:shadow-md"
          >
            <span className="text-2xl">{topic.icon}</span>
            <span className="text-sm font-semibold text-zinc-900 whitespace-nowrap">
              {topic.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TopicsGrid() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="features" className="relative py-32 overflow-hidden bg-white">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-zinc-100 border border-zinc-200 px-4 py-1.5 text-sm font-semibold text-zinc-700 transition-all duration-300 hover:border-zinc-300 hover:scale-105">
            Join the Telegram Community
          </span>
          <h2 className="mb-6 text-5xl font-black tracking-tight text-zinc-900 sm:text-6xl">
            What You'll Get
            <span className="block bg-gradient-to-r from-zinc-600 to-zinc-900 bg-clip-text text-transparent">
              Access To
            </span>
          </h2>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* 3-Part Marquee */}
          <div className="space-y-4">
            <MarqueeRow items={row1} />
            <MarqueeRow items={row2} reverse />
            <MarqueeRow items={row3} />
          </div>

          {/* And Many More */}
          <div className="mt-8 text-center">
            <p className="text-xl font-semibold text-zinc-500">
              and many more...
            </p>
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

      {/* Marquee CSS Animations */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 20s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
