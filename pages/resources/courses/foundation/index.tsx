import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
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
import { foundationCourses } from '@/lib/courses/foundationCourses'
import { fetchCourseSummaries } from '@/lib/courses/supabaseCourses'
import type { CourseSummary } from '@/lib/courses/types'
import {
  buildFoundationProgress,
  CourseProgressData,
  getLocalProgress,
  parseCourseProgress,
  setLocalProgress,
} from '@/lib/courses/progress'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

function FoundationPage() {
  const router = useRouter()
  const { user } = useAuth()
  const supabase = useMemo(() => createClient(), [])
  const [progressData, setProgressData] = useState<CourseProgressData>({})
  const [courses, setCourses] = useState<CourseSummary[]>(foundationCourses)
  const [loading, setLoading] = useState(true)
  const [syncError, setSyncError] = useState<string | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null)

  const foundationProgress = useMemo(
    () => buildFoundationProgress(progressData, courses),
    [progressData, courses]
  )

  const courseCount = courses.length
  const completedCount = courses.filter(
    (course) => foundationProgress[course.id]
  ).length
  const completionPercent = Math.round(
    (completedCount / courseCount) * 100
  )

  useEffect(() => {
    let isMounted = true

    const loadCourses = async () => {
      if (!user?.id) return
      try {
        const data = await fetchCourseSummaries(supabase, 'foundation')
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
    <>
      <Head>
        <title>Foundation Courses - VibeCodeee | Build Your Tech Fundamentals</title>
        <meta name="description" content="Master the fundamentals of programming with our foundation courses. Learn essential concepts, tools, and best practices to kickstart your tech journey." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Foundation Courses - VibeCodeee" />
        <meta property="og:description" content="Master the fundamentals of programming with our foundation courses." />
      </Head>
      <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
        <Header />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <button
            onClick={() => router.push('/resources#courses')}
            className="transition-colors hover:text-gray-900"
          >
            Resources
          </button>
          <span>/</span>
          <span className="text-gray-900">The Foundations</span>
        </div>

        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Lane 1
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
            The Foundations
          </h1>
          <p className="text-lg text-gray-600">
            The must-haves for every developer, personalized for {displayName}.
          </p>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <Card hover={false} className="flex h-full flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Lane snapshot
            </p>
            <p className="text-3xl font-semibold text-gray-900">
              {courseCount} core courses
            </p>
            <p className="text-sm text-gray-600">
              A focused sequence that builds confident, repeatable developer
              habits.
            </p>
          </Card>
          <Card hover={false} className="flex h-full flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Practice loop
            </p>
            <p className="text-3xl font-semibold text-gray-900">
              Learn by doing
            </p>
            <p className="text-sm text-gray-600">
              Every course includes hands-on exercises with instant checks so you
              can build muscle memory.
            </p>
          </Card>
          <Card hover={false} className="flex h-full flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Track momentum
            </p>
            <p className="text-3xl font-semibold text-gray-900">
              Progress that sticks
            </p>
            <p className="text-sm text-gray-600">
              Your completion status is saved locally and synced to your account
              when you are signed in.
            </p>
          </Card>
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
                  : `${completedCount} of ${courseCount} completed`}
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

        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Toolkit
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-gray-900">
            Build your everyday developer stack
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            These are the tools and workflows you will use in almost every
            project. Master them once and reuse them everywhere.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              'Terminal navigation',
              'Command chaining',
              'Git commits',
              'Branching',
              'GitHub collaboration',
              'Merge conflict recovery',
              'Markdown docs',
              'README structure',
            ].map((item) => (
              <span
                key={item}
                className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {courses.map((course, index) => {
            const isCompleted = foundationProgress[course.id]

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
                      Topic {String(course.number ?? index + 1).padStart(2, '0')}
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
                        router.push(`/resources/courses/foundation/${course.id}`)
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

        <div className="mt-12">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              FAQs
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">
              Common questions before you start
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: 'Do I need experience to start?',
                answer:
                  'No. This lane is designed to be friendly for new developers while still giving experienced builders a clean, structured refresh.',
              },
              {
                question: 'Can I take the courses out of order?',
                answer:
                  'Yes. The sequence is recommended, but you can jump to any course whenever you want.',
              },
              {
                question: 'Will my progress be saved?',
                answer:
                  'Your progress is stored locally and synced to your account when you are signed in.',
              },
              {
                question: 'What should I do after Foundations?',
                answer:
                  'Once you finish, move on to the next lane to deepen project skills and start building real-world workflows.',
              },
            ].map((faq) => (
              <Card key={faq.question} hover={false}>
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Card hover={false} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Ready to begin?
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                Pick a course and start building momentum today.
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Start at course one for the full sequence or jump to a topic you
                need right now.
              </p>
            </div>
            <Button
              variant="secondary"
              size="md"
              onClick={() => router.push('/resources#courses')}
            >
              Back to Resources
            </Button>
          </Card>
        </div>

        </main>
      </div>
    </>
  )
}

export default withAuth(FoundationPage)
