import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const benefits = [
  {
    icon: '🌟',
    title: 'Premium Content',
    description: 'Access exclusive resources, guides, and tools available only to members',
  },
  {
    icon: '🤝',
    title: 'Active Community',
    description: 'Connect and collaborate with passionate members from around the world',
  },
  {
    icon: '📚',
    title: 'Continuous Learning',
    description: 'Stay ahead with the latest AI news, tools, and industry insights',
  },
]

export function Benefits() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Why Join Our Community?
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-600">
            Become part of something bigger and unlock your full potential
          </p>

          <div className="grid gap-12 sm:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="flex flex-col items-center"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="mb-6 text-6xl animate-float" style={{ animationDelay: `${index * 200}ms` }}>
                  {benefit.icon}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="max-w-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
