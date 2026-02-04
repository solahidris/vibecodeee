import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const benefits = [
  {
    icon: '🌟',
    title: 'Premium Content',
    description: 'Access exclusive resources, guides, and tools available only to members',
    features: ['Expert tutorials', 'Curated resources', 'Private workshops']
  },
  {
    icon: '🤝',
    title: 'Active Community',
    description: 'Connect and collaborate with passionate members from around the world',
    features: ['Daily discussions', 'Networking events', 'Peer support']
  },
  {
    icon: '📚',
    title: 'Continuous Learning',
    description: 'Stay ahead with the latest AI news, tools, and industry insights',
    features: ['Weekly updates', 'Industry trends', 'Skill development']
  },
]

export function Benefits() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 py-32">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute -left-48 top-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Heading */}
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            Member Benefits
          </span>
          <h2 className="mb-6 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Why Join Our Community?
          </h2>
          <p className="mx-auto mb-20 max-w-3xl text-xl leading-relaxed text-violet-100">
            Unlock exclusive benefits designed to accelerate your growth and connect you with like-minded individuals
          </p>

          {/* Benefits Grid */}
          <div className="grid gap-8 sm:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  {benefit.icon}
                </div>

                {/* Content */}
                <h3 className="mb-3 text-2xl font-bold text-white">
                  {benefit.title}
                </h3>
                <p className="mb-6 leading-relaxed text-violet-100">
                  {benefit.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 text-left">
                  {benefit.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-violet-100">
                      <svg className="h-5 w-5 flex-shrink-0 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-5xl font-black text-white">500+</div>
              <div className="text-lg text-violet-200">Active Members</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-black text-white">50+</div>
              <div className="text-lg text-violet-200">Resources Shared</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-black text-white">24/7</div>
              <div className="text-lg text-violet-200">Community Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
