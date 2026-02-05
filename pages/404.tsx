import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/landing/Footer'
import { Button } from '@/components/ui/Button'
import { Geist } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export default function Custom404() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Page Not Found - VibeCodeee</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to VibeCodeee homepage or explore our resources." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Page Not Found - VibeCodeee" />
      </Head>
      <div className={`${geistSans.variable} min-h-screen bg-white font-sans`}>
        <Header />

      <main className="mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 404 Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="text-9xl font-black text-zinc-100">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-20 w-20 text-zinc-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="mb-4 text-5xl font-black text-zinc-900">
            Page Not Found
          </h1>
          <p className="mb-8 text-xl text-zinc-600 mx-auto max-w-2xl">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/')}
            >
              Go Home
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-zinc-200">
            <p className="mb-4 text-sm font-semibold text-zinc-900">
              Quick Links
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <a
                href="/"
                className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
              >
                Home
              </a>
              <span className="text-zinc-300">•</span>
              <a
                href="/resources"
                className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
              >
                Resources
              </a>
              <span className="text-zinc-300">•</span>
              <a
                href="/payment/subscribe"
                className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
              >
                Telegram Community
              </a>
              <span className="text-zinc-300">•</span>
              <a
                href="/contact"
                className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>

        <Footer />
      </div>
    </>
  )
}
