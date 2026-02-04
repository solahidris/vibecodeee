import { useState } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/landing/Footer'
import { Geist } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

function SubscribePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payment/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_email: user.email,
          customer_name: user.user_metadata?.full_name || user.email,
          user_id: user.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create subscription')
      }

      // Redirect to HitPay checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err) {
      console.error('Subscription error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <div className={`${geistSans.variable} min-h-screen bg-white font-sans`}>
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Join 500+ Active Members
          </div>
          <h1 className="mb-6 pb-4 text-5xl font-black text-zinc-900 sm:text-6xl lg:text-7xl">
            Unlock Your Full Potential
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-zinc-600 mx-auto max-w-3xl">
            Join Malaysia's most vibrant tech community. Get exclusive access to premium resources, expert mentorship, job opportunities, and daily insights that will accelerate your career growth.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant access after payment</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fresh content weekly</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits */}
          <div>
            {/* What You Get Section */}
            <div className="mb-12">
              <h2 className="mb-8 pb-4 text-3xl font-bold text-zinc-900">What You'll Get</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900">Exclusive Learning Resources</h3>
                    <p className="text-zinc-600">Access curated guides, tutorials, and premium content on web development, AI, and emerging technologies. Updated weekly with fresh material.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900">Daily Job Opportunities</h3>
                    <p className="text-zinc-600">Be the first to know about tech job openings, freelance gigs, and remote opportunities shared exclusively within the community.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900">AI Prompt Library</h3>
                    <p className="text-zinc-600">Access our growing collection of battle-tested AI prompts for ChatGPT, Claude, and other tools. Save hours with proven templates.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900">Network with Industry Experts</h3>
                    <p className="text-zinc-600">Connect with developers, designers, entrepreneurs, and tech leaders. Get mentorship, collaborate on projects, and grow your network.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100">
                    <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900">Daily Discussions & Support</h3>
                    <p className="text-zinc-600">Get instant help with coding challenges, career advice, and tech discussions. Active community responding 24/7.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900">Exclusive Webinars & Workshops</h3>
                    <p className="text-zinc-600">Monthly live sessions with industry professionals covering latest trends, tools, and techniques in tech.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100">
                    <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900">Project Showcases & Feedback</h3>
                    <p className="text-zinc-600">Share your projects and get constructive feedback from experienced developers. Learn from others' work and build your portfolio.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-zinc-900">Early Access to Tools & Features</h3>
                    <p className="text-zinc-600">Be the first to try new platform features, beta tools, and exclusive perks before the general public.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Highlights */}
            <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-8">
              <h3 className="mb-6 pb-4 text-2xl font-bold text-zinc-900">Why Members Love Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 flex-shrink-0 text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-zinc-700">"Best RM10 I spend every month. The job opportunities alone have paid back 100x." - <span className="font-semibold">Ahmad, Software Engineer</span></p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 flex-shrink-0 text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-zinc-700">"The AI prompts collection saved me countless hours. Incredible value!" - <span className="font-semibold">Sarah, Product Designer</span></p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 flex-shrink-0 text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-zinc-700">"Found my co-founder here. The network is invaluable." - <span className="font-semibold">David, Tech Entrepreneur</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Card */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-3xl border-2 border-zinc-900 bg-white p-10 shadow-2xl">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Most Popular Plan
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-6xl font-black text-zinc-900">RM10</span>
                  <span className="text-xl text-zinc-600">/month</span>
                </div>
                <p className="text-sm text-zinc-600">Less than a cup of coffee per day</p>
              </div>

              {/* Key Features */}
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-zinc-700">Unlimited access to all channels</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-zinc-700">Premium resources library</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-zinc-700">Daily job opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-zinc-700">AI prompt templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-zinc-700">Expert mentorship access</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-zinc-700">Monthly live webinars</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Subscribe Button */}
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="group w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-zinc-900 px-8 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-zinc-800 hover:shadow-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-4"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Join Community Now</span>
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-center text-sm text-zinc-500">
                🔒 Secure payment powered by HitPay • Instant access after payment
              </p>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-zinc-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-zinc-900">500+</div>
                    <div className="text-xs text-zinc-600">Active Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-zinc-900">50+</div>
                    <div className="text-xs text-zinc-600">Resources</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-zinc-900">24/7</div>
                    <div className="text-xs text-zinc-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default withAuth(SubscribePage)
