import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { Card } from '@/components/ui/Card'
import { ResourceCardSkeleton } from '@/components/ui/LoadingSkeleton'
import { Header } from '@/components/layout/Header'
import { formatDate } from '@/lib/utils/formatters'
import type { Resource, Category } from '@/types'
import { Geist } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const categories: Category[] = [
  'General Discussion',
  'Job Opportunities',
  'Best Prompts',
  'Fitness & Wellness',
  'Announcements',
  'Showcase',
  'Career Growth',
  'AI Fundamentals',
  'AI News',
  'Tips & Tricks',
  'Tools & Resources',
  'Community Events',
]

function ResourcesPage() {
  const router = useRouter()
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    fetchResources()
  }, [selectedCategory])

  const fetchResources = async () => {
    setLoading(true)
    try {
      const url =
        selectedCategory === 'All'
          ? '/api/resources'
          : `/api/resources?category=${encodeURIComponent(selectedCategory)}`

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        setResources(data.resources)
      } else {
        console.error('Error fetching resources:', data.error)
      }
    } catch (error) {
      console.error('Error fetching resources:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
            Member Resources
          </h2>
          <p className="text-lg text-gray-600">
            Exclusive content and tools for community members
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-zinc-900 text-white shadow-md'
                  : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-zinc-900 text-white shadow-md'
                    : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <ResourceCardSkeleton key={i} />
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-500">
              No resources found in this category
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Card key={resource.id} className="relative">
                {resource.is_featured && (
                  <div className="absolute right-4 top-4 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                    Featured
                  </div>
                )}
                <div className="mb-4 text-4xl">{resource.icon || '📄'}</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {resource.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                  {resource.description || 'No description available'}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="rounded-full bg-gray-100 px-3 py-1">
                    {resource.category}
                  </span>
                  <span>{formatDate(resource.created_at)}</span>
                </div>
                {resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                  >
                    View Resource
                    <svg
                      className="h-4 w-4"
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
                  </a>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default withAuth(ResourcesPage)
