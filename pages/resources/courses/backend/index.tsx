import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { formatDate } from '@/lib/utils/formatters'
import { Geist } from 'next/font/google'
import { backendCourses } from '@/lib/courses/backendCourses'
import { fetchCourseSummaries } from '@/lib/courses/supabaseCourses'
import type { CourseSummary } from '@/lib/courses/types'
import {
  buildBackendProgress,
  CourseProgressData,
  getLocalProgress,
  parseCourseProgress,
  setLocalProgress,
} from '@/lib/courses/progress'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

function BackendCoursesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const supabase = useMemo(() => createClient(), [])
  const [progressData, setProgressData] = useState<CourseProgressData>({})
  const [courses, setCourses] = useState<CourseSummary[]>(backendCourses)
  const [loading, setLoading] = useState(true)
  const [syncError, setSyncError] = useState<string | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null)

  const backendProgress = useMemo(
    () => buildBackendProgress(progressData, courses),
    [progressData, courses]
  )

  const completedCount = courses.filter(
    (course) => backendProgress[course.id]
  ).length
  const completionPercent = Math.round(
    (completedCount / courses.length) * 100
  )

  useEffect(() => {
    let isMounted = true

    const loadCourses = async () => {
      if (!user?.id) return
      try {
        const data = await fetchCourseSummaries(supabase, 'backend')
        if (isMounted && data.length) {
          setCourses(data)
        }
      } catch (error) {
        console.error('Error loading courses:', error)
      }
    }

    void loadCourses()

    return () => {
      isMounted = false
    }
  }, [supabase, user?.id])

  useEffect(() => {
    let isMounted = true

    const loadProgress = async () => {
      if (!user?.id) {
        if (isMounted) setLoading(false)
        return
      }

      setLoading(true)
      try {
        const localProgress = getLocalProgress(user.id)
        const { data, error } = await supabase
          .from('profiles')
          .select('course_progress, updated_at')
          .eq('id', user.id)
          .maybeSingle()

        if (error) {
          throw error
        }

        const parsedProgress =
          data?.course_progress !== null && data?.course_progress !== undefined
            ? parseCourseProgress(data?.course_progress)
            : localProgress || {}

        if (data?.course_progress !== null && data?.course_progress !== undefined) {
          setLocalProgress(user.id, parsedProgress)
        }

        if (isMounted) {
          setProgressData(parsedProgress)
          setLastSyncedAt(data?.updated_at ?? null)
          setSyncError(null)
        }
      } catch (error) {
        console.error('Error loading course progress:', error)
        if (isMounted) {
          const fallbackProgress = user?.id
            ? getLocalProgress(user.id) || {}
            : {}
          setProgressData(fallbackProgress)
          setSyncError(
            'We could not sync your progress yet. Updates are stored locally for now.'
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadProgress()

    return () => {
      isMounted = false
    }
  }, [supabase, user?.id])

  const displayName =
    user?.user_metadata?.full_name || user?.email || 'Community Member'

  return (
    <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <button
            onClick={() => router.push('/resources/courses')}
            className="transition-colors hover:text-gray-900"
          >
            Courses
          </button>
          <span>/</span>
          <span className="text-gray-900">Backend &amp; Systems</span>
        </div>

        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Lane 3
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
            Backend &amp; Systems
          </h1>
          <p className="text-lg text-gray-600">
            Production-grade APIs, databases, and infrastructure fundamentals for{' '}
            {displayName}.
          </p>
        </div>

        {syncError && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
            {syncError}
          </div>
        )}

        <Card hover={false} className="mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">Your progress</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {loading
                  ? 'Loading your progress...'
                  : `${completedCount} of ${courses.length} completed`}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {lastSyncedAt
                  ? `Last synced ${formatDate(lastSyncedAt)}`
                  : 'Syncing will start after your first update.'}
              </p>
            </div>
            <div className="w-full max-w-sm">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{completionPercent}% complete</span>
                <span className="text-xs text-gray-400">
                  {loading ? 'Checking...' : 'Up to date'}
                </span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-zinc-900 transition-all"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          {courses.map((course, index) => {
            const isCompleted = backendProgress[course.id]

            return (
              <Card
                key={course.id}
                className={cn(
                  'transition-all',
                  isCompleted && 'border border-green-200 bg-green-50/50'
                )}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                      Course {String(course.number ?? index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-gray-900">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-semibold',
                        isCompleted
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      )}
                    >
                      {isCompleted ? 'Completed' : 'Not started'}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        router.push(`/resources/courses/backend/${course.id}`)
                      }
                    >
                      {isCompleted ? 'Review course' : 'Open course'}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-10">
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push('/resources/courses')}
          >
            Back to Courses
          </Button>
        </div>
      </main>
    </div>
  )
}

export default withAuth(BackendCoursesPage)
