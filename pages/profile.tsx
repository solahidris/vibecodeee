import { useState } from 'react'
import { withAuth } from '@/lib/auth/withAuth'
import { useAuth } from '@/contexts/AuthContext'
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

function ProfilePage() {
  const { user, signOut } = useAuth()
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
    </div>
  )
}

export default withAuth(ProfilePage)
