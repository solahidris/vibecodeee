import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Navigation } from '@/components/landing/Navigation'
import { Footer } from '@/components/landing/Footer'

export default function PaymentSuccess() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="mb-6 text-5xl font-black text-zinc-900">
            Subscription Activated!
          </h1>
          <p className="mb-12 text-xl leading-relaxed text-zinc-600 mx-auto max-w-2xl">
            Your monthly subscription to the Telegram community has been successfully activated.
            You'll receive a confirmation email shortly.
          </p>

          {/* Info Card */}
          <div className="mx-auto max-w-md mb-12">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-zinc-900">Next Steps</h2>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white text-sm">
                    1
                  </div>
                  <p className="text-zinc-600">
                    Check your email for the Telegram invite link
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white text-sm">
                    2
                  </div>
                  <p className="text-zinc-600">
                    Join the community and introduce yourself
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white text-sm">
                    3
                  </div>
                  <p className="text-zinc-600">
                    Start exploring resources and connect with members
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://tinyurl.com/a1-community"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-zinc-800 hover:shadow-2xl"
            >
              Join Telegram Now
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <button
              onClick={() => router.push('/resources')}
              className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-300 bg-white px-8 py-4 text-lg font-semibold text-zinc-900 transition-all duration-300 hover:border-zinc-900"
            >
              Browse Resources
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
