import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Gradient Orbs */}
      <div className="absolute -top-24 left-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-400/20 via-purple-400/20 to-transparent blur-3xl animate-float"></div>
      <div className="absolute -bottom-24 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-blue-400/20 via-cyan-400/20 to-transparent blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Premium Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-200/50 bg-gradient-to-r from-violet-50/80 to-purple-50/80 px-5 py-2 text-sm font-medium text-violet-900 shadow-lg shadow-violet-100/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500"></span>
            </span>
            Welcome to the Community
          </div>

          {/* Main Heading - Extra Bold & Large */}
          <h1 className="mb-8 text-6xl font-black leading-[1.1] tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
            Connect, Learn,
            <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Grow Together
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-600 sm:text-2xl">
            Join an exclusive community of creators, learners, and innovators.
            Access premium resources, AI tools, and expert insights to accelerate your journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            {user ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/resources')}
                className="group relative overflow-hidden px-8 py-4 text-lg font-semibold shadow-2xl shadow-violet-500/30 transition-all hover:shadow-2xl hover:shadow-violet-500/40"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Go to Dashboard
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => router.push('/login')}
                  className="group relative overflow-hidden px-8 py-4 text-lg font-semibold shadow-2xl shadow-violet-500/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/40"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Journey
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="px-8 py-4 text-lg font-medium"
                >
                  Explore Features
                </Button>
              </>
            )}
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-purple-500"
                ></div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">Join 500+ members</p>
              <p className="text-sm text-gray-600">Growing every day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Scroll to explore</p>
          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
