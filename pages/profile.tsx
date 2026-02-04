import { useState } from 'react'
import { withAuth } from '@/lib/auth/withAuth'
import { useAuth } from '@/contexts/AuthContext'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/router'
import { Header } from '@/components/layout/Header'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { formatDate } from '@/lib/utils/formatters'
import { Geist } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const TELEGRAM_GROUP_URL = 'https://t.me/+wKbaL8tiEZs4Y2E9'

function ProfilePage() {
  const { user, signOut } = useAuth()
  const { hasActiveSubscription, loading } = useUser()
  const router = useRouter()
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  return (
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
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active Member
                  </span>
                </div>
                <div className="text-gray-500">
                  Joined{' '}
                  {user?.created_at ? formatDate(user.created_at) : 'recently'}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Information */}
        <Card hover={false} className="mb-8">
          <h3 className="mb-8 pb-4 text-xl font-bold text-gray-900">
            Account Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <p className="text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <p className="text-gray-900">
                {user?.user_metadata?.full_name || 'Not provided'}
              </p>
            </div>
          </div>
        </Card>

        {/* Telegram Access Card - Only show if subscribed */}
        {!loading && hasActiveSubscription && (
          <Card hover={false} className="mb-8 border-2 border-green-200 bg-green-50">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.154.23.17.324.015.094.034.308.019.475z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold text-green-900">
                  Telegram Community Access
                </h3>
                <p className="mb-4 text-sm text-green-700">
                  You have an active subscription! Join our exclusive Telegram group to connect with the community and access premium content.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => window.open(TELEGRAM_GROUP_URL, '_blank')}
                  className="bg-green-600 text-white border-green-600 hover:bg-green-700"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.154.23.17.324.015.094.034.308.019.475z"/>
                  </svg>
                  Join Telegram Group
                </Button>
              </div>
            </div>
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
            {!loading && !hasActiveSubscription && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => router.push('/payment/subscribe')}
                className="bg-green-600 text-white border-green-600 hover:bg-green-700"
              >
                Subscribe to Join Telegram
              </Button>
            )}
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
    </div>
  )
}

export default withAuth(ProfilePage)
