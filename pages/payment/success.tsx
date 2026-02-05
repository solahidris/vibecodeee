import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { useAuth } from '@/contexts/AuthContext'
import { useUser } from '@/contexts/UserContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/landing/Footer'
import { Button } from '@/components/ui/Button'
import { Geist } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const TELEGRAM_GROUP_URL = 'https://t.me/+wKbaL8tiEZs4Y2E9'

function PaymentSuccessPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { hasActiveSubscription, loading: userLoading, refreshProfile } = useUser()
  const [activating, setActivating] = useState(false)
  const [activationError, setActivationError] = useState<string | null>(null)

  // Auto-activate subscription if webhook hasn't fired
  useEffect(() => {
    if (!user?.id || userLoading || activating) return

    // Wait 5 seconds for webhook to process
    const timeoutId = setTimeout(async () => {
      // Check if subscription is still not active
      await refreshProfile()

      if (!hasActiveSubscription) {
        console.log('Subscription not activated by webhook, attempting manual activation...')
        setActivating(true)
        setActivationError(null)

        try {
          const response = await fetch('/api/payment/manual-activate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: user.id }), // Use logged-in user's ID
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.error || 'Failed to activate subscription')
          }

          console.log('Subscription activated successfully:', data)
          // Refresh user data to update UI
          await refreshProfile()
        } catch (err) {
          console.error('Manual activation error:', err)
          setActivationError(err instanceof Error ? err.message : 'Failed to activate subscription')
        } finally {
          setActivating(false)
        }
      }
    }, 5000) // Wait 5 seconds

    return () => clearTimeout(timeoutId)
  }, [user?.id, hasActiveSubscription, userLoading, refreshProfile, activating])

  return (
    <div className={`${geistSans.variable} min-h-screen bg-white font-sans`}>
      <Header />

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

          <h1 className="mb-4 text-5xl font-black text-zinc-900">
            Payment Successful!
          </h1>
          <p className="mb-8 text-xl text-zinc-600 mx-auto max-w-2xl">
            Welcome to the VibeCodeee community! Your subscription is now active and you have full access to our exclusive Telegram group.
          </p>

          {/* Activation Status */}
          {activating && (
            <div className="mb-8 mx-auto max-w-md rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                <p className="text-sm text-blue-700">Activating your subscription...</p>
              </div>
            </div>
          )}

          {activationError && (
            <div className="mb-8 mx-auto max-w-md rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">
                {activationError}. Please contact support if the issue persists.
              </p>
            </div>
          )}

          {/* Main CTA - Join Telegram */}
          <div className="mb-12">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open(TELEGRAM_GROUP_URL, '_blank')}
              className="mb-4 bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800 transition-all duration-300 hover:scale-105"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.154.23.17.324.015.094.034.308.019.475z"/>
              </svg>
              Join Telegram Community Now
            </Button>
            <p className="text-sm text-zinc-500">
              Click above to join our exclusive Telegram group
            </p>
          </div>

          {/* What's Next Section */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-left mx-auto max-w-2xl">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-zinc-900">Join the Telegram Group</h3>
                  <p className="text-sm text-zinc-600">Click the button above to join our exclusive community on Telegram.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-zinc-900">Introduce Yourself</h3>
                  <p className="text-sm text-zinc-600">Say hi to the community and let us know what you're working on!</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-zinc-900">Explore Resources</h3>
                  <p className="text-sm text-zinc-600">Check out our premium resources, guides, and AI prompts in the channels.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-zinc-900">Stay Active</h3>
                  <p className="text-sm text-zinc-600">Participate in discussions, share insights, and network with industry experts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="md"
              onClick={() => router.push('/resources')}
            >
              Browse Resources
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => router.push('/profile')}
            >
              Go to Profile
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default withAuth(PaymentSuccessPage)
