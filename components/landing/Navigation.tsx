import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

export function Navigation() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="group flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30">
              <span className="text-lg font-bold text-white">V</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              VibeCodE
            </span>
          </button>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/resources')}
                  className="hidden sm:inline-flex"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/basicprompt')}
                  className="hidden sm:inline-flex"
                >
                  Courses
                </Button>
                <button
                  onClick={() => router.push('/profile')}
                  className="cursor-pointer transition-transform hover:scale-105"
                  aria-label="Go to profile"
                >
                  <Avatar
                    src={user.user_metadata?.avatar_url}
                    name={user.user_metadata?.full_name || user.email}
                    size="sm"
                  />
                </button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/basicprompt')}
                  className="hidden sm:inline-flex"
                >
                  Courses
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/login')}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push('/login')}
                  className="hidden sm:inline-flex shadow-lg shadow-violet-500/20"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
