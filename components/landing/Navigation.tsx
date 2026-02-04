import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

export function Navigation() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="group flex items-center gap-2 transition-all duration-300 hover:opacity-80 cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
              <span className="text-lg font-bold text-white">V</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 transition-all duration-300 group-hover:tracking-tight">
              VibeCodeee
            </span>
          </button>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/payment/subscribe')}
                  className="hidden sm:inline-flex text-zinc-600 hover:text-zinc-900 transition-all duration-300 cursor-pointer font-normal"
                >
                  Telegram
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/resources')}
                  className="hidden sm:inline-flex text-zinc-600 hover:text-zinc-900 transition-all duration-300 cursor-pointer font-normal"
                >
                  Resources
                </Button>
                <button
                  onClick={() => router.push('/profile')}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  aria-label="Go to profile"
                >
                  <Avatar
                    src={user.user_metadata?.avatar_url}
                    name={user.user_metadata?.full_name || user.email}
                  />
                </button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => router.push('/login')}
                className="bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
