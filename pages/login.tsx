import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { Geist } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export default function Login() {
  const { user, loading, signInWithGoogle } = useAuth()
  const router = useRouter()
  const returnUrl = (router.query.returnUrl as string) || '/resources'

  useEffect(() => {
    // Redirect if already logged in
    if (user && !loading) {
      router.push(returnUrl)
    }
  }, [user, loading, router, returnUrl])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Sign In - VibeCodeee | Access Your Premium Membership</title>
        <meta name="description" content="Sign in to your VibeCodeee account to access exclusive member resources, courses, and community features." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Sign In - VibeCodeee" />
      </Head>
      <div className={`${geistSans.variable} font-sans`}>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600">
              Sign in to access exclusive member content
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl bg-white p-8 shadow-lg shadow-gray-200/50">
            <button
              onClick={signInWithGoogle}
              className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-gray-900 shadow-md shadow-gray-200/50 ring-1 ring-gray-200 transition-all hover:shadow-lg hover:shadow-gray-300/50 hover:ring-gray-300"
            >
              {/* Google Icon */}
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="h-px flex-1 bg-gray-200"></div>
              <div className="px-4 text-xs text-gray-500">Secure authentication</div>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Info */}
            <p className="text-center text-xs leading-relaxed text-gray-500">
              By continuing, you agree to access member-only resources and exclusive content.
            </p>
          </div>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
