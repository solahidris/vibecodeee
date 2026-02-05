import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'

const benefits = [
  {
    icon: '🌟',
    title: 'Premium Content',
    description: 'Access exclusive resources, guides, and tools available only to members',
    features: ['Expert tutorials', 'Curated resources', 'Private workshops'],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80'
  },
  {
    icon: '🤝',
    title: 'Active Community',
    description: 'Connect and collaborate with passionate members from around the world',
    features: ['Daily discussions', 'Networking events', 'Peer support'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80'
  },
  {
    icon: '📚',
    title: 'Continuous Learning',
    description: 'Stay ahead with the latest AI news, tools, and industry insights',
    features: ['Weekly updates', 'Industry trends', 'Skill development'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80'
  },
]

export function Benefits() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="relative overflow-hidden py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Heading */}
          <span className="mb-4 inline-block rounded-full border border-zinc-200/80 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-zinc-700 transition-all duration-300 hover:border-zinc-300">
            Member Benefits
          </span>
          <h2 className="mb-6 text-5xl font-black tracking-tight text-zinc-900 sm:text-6xl">
            Why Join Our Community?
          </h2>
          <p className="mx-auto mb-20 max-w-3xl text-xl leading-relaxed text-zinc-600">
            Unlock exclusive benefits designed to accelerate your growth
          </p>

          {/* Benefits Grid */}
          <div className="grid gap-8 sm:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-sm ring-1 ring-zinc-200/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-zinc-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Image Background */}
                <div className="relative h-72 overflow-hidden bg-white">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"></div>

                  {/* Icon on Image */}
                  <div className="absolute bottom-8 left-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-white/90 backdrop-blur-sm text-4xl transition-transform duration-300 group-hover:scale-110">
                    {benefit.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative -mt-4 bg-white p-8 text-left">
                  <h3 className="mb-3 text-2xl font-bold text-zinc-900">
                    {benefit.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-zinc-600">
                    {benefit.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {benefit.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-zinc-600">
                        <svg className="h-5 w-5 flex-shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid gap-8 rounded-3xl border border-zinc-200/80 bg-white/70 backdrop-blur-sm p-12 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-5xl font-black text-zinc-900">Quality</div>
              <div className="text-lg text-zinc-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-black text-zinc-900">50+</div>
              <div className="text-lg text-zinc-600">Resources Shared</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-black text-zinc-900">24/7</div>
              <div className="text-lg text-zinc-600">Community Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
