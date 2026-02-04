import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()

      // Get the code from URL parameters
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.hash || window.location.search
      )

      if (error) {
        console.error('Error during auth callback:', error.message)
        router.push('/login?error=auth_failed')
        return
      }

      if (data.session) {
        // Successfully authenticated, redirect to resources
        router.push('/resources')
      } else {
        // No session, redirect to login
        router.push('/login')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600"></div>
        <p className="mt-4 text-sm text-gray-600">Completing sign in...</p>
      </div>
    </div>
  )
}
