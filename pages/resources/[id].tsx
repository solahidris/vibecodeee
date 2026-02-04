import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { formatDate } from '@/lib/utils/formatters'
import type { Resource } from '@/types'
import { Geist } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

function ResourceDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [resource, setResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchResource()
    }
  }, [id])

  const fetchResource = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching resource:', error)
        router.push('/resources')
      } else {
        setResource(data)
      }
    } catch (error) {
      console.error('Error:', error)
      router.push('/resources')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900"></div>
            <p className="mt-4 text-sm text-gray-600">Loading resource...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!resource) {
    return null
  }

  return (
    <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <button
            onClick={() => router.push('/resources')}
            className="transition-colors hover:text-gray-900"
          >
            Resources
          </button>
          <span>/</span>
          <span className="text-gray-900">{resource.title}</span>
        </div>

        {/* Resource Content */}
        <Card hover={false} className="mb-8">
          <div className="mb-6 text-6xl">{resource.icon || '📄'}</div>
          {resource.is_featured && (
            <div className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              Featured Resource
            </div>
          )}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
            {resource.title}
          </h1>
          <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
            <span className="rounded-full bg-gray-100 px-4 py-1.5 font-medium">
              {resource.category}
            </span>
            <span>{formatDate(resource.created_at)}</span>
            {resource.content_type && (
              <span className="capitalize">{resource.content_type}</span>
            )}
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">
              {resource.description || 'No description available for this resource.'}
            </p>
          </div>
          {resource.url && (
            <div className="mt-8">
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.open(resource.url!, '_blank')}
              >
                Access Resource
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Button>
            </div>
          )}
        </Card>

        {/* Back Button */}
        <Button
          variant="secondary"
          size="md"
          onClick={() => router.push('/resources')}
        >
          ← Back to All Resources
        </Button>
      </main>
    </div>
  )
}

export default withAuth(ResourceDetailPage)
