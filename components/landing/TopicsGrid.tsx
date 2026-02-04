import { Card } from '@/components/ui/Card'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Topic } from '@/types'

const topics: Topic[] = [
  { name: 'General', icon: '💬' },
  { name: 'Job Posting', icon: '💼' },
  { name: 'Best Prompts', icon: '✨' },
  { name: 'Fitness', icon: '💪' },
  { name: 'Announcements', icon: '📢' },
  { name: 'Shill', icon: '🚀' },
  { name: 'Internal Career', icon: '📈' },
  { name: 'AI/Coding Beginner', icon: '🤖' },
  { name: 'AI News', icon: '📰' },
  { name: 'Tips & Tricks', icon: '💡' },
  { name: 'Tools', icon: '🛠️' },
]

export function TopicsGrid() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="features" className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            What You'll Get Access To
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore diverse topics and exclusive content curated for our community members
          </p>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {topics.map((topic, index) => (
            <Card
              key={topic.name}
              className="group relative overflow-hidden"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="mb-4 text-5xl transition-transform group-hover:scale-110">
                {topic.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{topic.name}</h3>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-50/50 to-blue-50/50 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
