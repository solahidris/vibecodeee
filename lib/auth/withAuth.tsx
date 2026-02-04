import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'

/**
 * Higher-Order Component for protecting routes
 * Redirects unauthenticated users to /login
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function ProtectedRoute(props: P) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading && !user) {
        // Store the intended destination
        const returnUrl = router.asPath
        router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`)
      }
    }, [user, loading, router])

    // Show loading state while checking auth
    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600"></div>
            <p className="mt-4 text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      )
    }

    // Don't render the component if user is not authenticated
    if (!user) {
      return null
    }

    // Render the protected component
    return <Component {...props} />
  }
}
