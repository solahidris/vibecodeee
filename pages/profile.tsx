import { useState } from 'react'
import Head from 'next/head'
import { withAuth } from '@/lib/auth/withAuth'
import { useAuth } from '@/contexts/AuthContext'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/router'
import { Header } from '@/components/layout/Header'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { PhoneVerificationModal } from '@/components/ui/PhoneVerificationModal'
import { formatDate } from '@/lib/utils/formatters'
import { Geist } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const TELEGRAM_GROUP_URL = 'https://t.me/+wKbaL8tiEZs4Y2E9'

function ProfilePage() {
  const { user, signOut } = useAuth()
  const { hasActiveSubscription, loading, refreshProfile } = useUser()
  const router = useRouter()
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [showPhoneVerificationModal, setShowPhoneVerificationModal] = useState(false)

  return (
    <>
      <Head>
        <title>Your Profile - VibeCodeee | Manage Your Account</title>
        <meta name="description" content="Manage your VibeCodeee profile, subscription status, and account settings. Access the Telegram community and view your membership details." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Your Profile - VibeCodeee" />
      </Head>
      <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
        <Header />

        {/* Main Content */}
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
            Your Profile
          </h2>
          <p className="text-lg text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <Card hover={false} className="mb-8">
          <div className="flex items-start gap-6">
            <Avatar
              src={user?.user_metadata?.avatar_url}
              name={user?.user_metadata?.full_name || user?.email}
              size="lg"
            />
            <div className="flex-1">
              <h3 className="mb-1 text-2xl font-bold text-gray-900">
                {user?.user_metadata?.full_name || 'Community Member'}
              </h3>
              <p className="mb-4 text-gray-600">{user?.email}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  {!loading && hasActiveSubscription ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Community Member
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                      Free Access
                    </span>
                  )}
                </div>
                <div className="text-gray-500">
                  Joined{' '}
                  {user?.created_at ? formatDate(user.created_at) : 'recently'}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Telegram Community */}
        {!loading && (
          <Card hover={false} className="mb-8">
            <h3 className="mb-8 pb-4 text-xl font-bold text-gray-900">
              Telegram Community
            </h3>
            {hasActiveSubscription ? (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active Subscription
                  </span>
                </div>
                <p className="mb-6 text-gray-600 leading-relaxed">
                  You have full access to our exclusive Telegram community. Connect with quality members, access premium resources, daily job opportunities, and expert insights.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => window.open(TELEGRAM_GROUP_URL, '_blank')}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.154.23.17.324.015.094.034.308.019.475z"/>
                  </svg>
                  Open Telegram Group
                </Button>
              </div>
            ) : (
              <div>
                <p className="mb-4 text-gray-600 leading-relaxed">
                  Join Malaysia's most vibrant tech community. Get access to exclusive resources, job opportunities, expert mentorship, and connect with quality members.
                </p>
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">RM10</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => router.push('/payment/subscribe')}
                  >
                    Subscribe to Join Community
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => setShowPhoneVerificationModal(true)}
                    className="border border-gray-300"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Day 1 Supporter
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Actions */}
        <Card hover={false}>
          <h3 className="mb-8 pb-4 text-xl font-bold text-gray-900">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push('/resources')}
            >
              View Resources
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSignOutModal(true)}
            >
              Sign Out
            </Button>
          </div>
        </Card>
      </main>

      {/* Sign Out Confirmation Modal */}
      <ConfirmModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={signOut}
        title="Sign Out"
        message="Are you sure you want to sign out? You'll need to log in again to access your account."
        confirmText="Sign Out"
        cancelText="Cancel"
        confirmVariant="danger"
      />

        {/* Phone Verification Modal */}
        {user?.id && (
          <PhoneVerificationModal
            isOpen={showPhoneVerificationModal}
            onClose={() => setShowPhoneVerificationModal(false)}
            userId={user.id}
            onSuccess={refreshProfile}
          />
        )}
      </div>
    </>
  )
}

export default withAuth(ProfilePage)
