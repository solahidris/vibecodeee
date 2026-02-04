import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Geist } from 'next/font/google'
import { foundationCourses } from '@/lib/courses/foundationCourses'
import { backendCourses } from '@/lib/courses/backendCourses'
import { frontendCourses } from '@/lib/courses/frontendCourses'
import { aiDataScienceCourses } from '@/lib/courses/aiDataScienceCourses'
import { careerDevopsCourses } from '@/lib/courses/careerDevopsCourses'
import {
  buildAiDataScienceProgress,
  buildBackendProgress,
  buildCareerDevopsProgress,
  buildFoundationProgress,
  buildFrontendProgress,
  CourseProgressData,
  getLocalProgress,
  parseCourseProgress,
  setLocalProgress,
} from '@/lib/courses/progress'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const mergeChecklistProgress = (
  server: boolean[] | undefined,
  local: boolean[] | undefined
): boolean[] | undefined => {
  if (!server && !local) return undefined
  const maxLen = Math.max(server?.length ?? 0, local?.length ?? 0)
  if (!maxLen) return undefined
  return Array.from({ length: maxLen }, (_, index) =>
    Boolean(server?.[index] || local?.[index])
  )
}

const mergeCourseProgress = (
  server: CourseProgressData,
  local: CourseProgressData
): CourseProgressData => {
  const merged: CourseProgressData = {
    foundation: foundationCourses.reduce<Record<string, boolean>>((acc, course) => {
      acc[course.id] = Boolean(
        server.foundation?.[course.id] || local.foundation?.[course.id]
      )
      return acc
    }, {}),
    frontend: frontendCourses.reduce<Record<string, boolean>>((acc, course) => {
      acc[course.id] = Boolean(
        server.frontend?.[course.id] || local.frontend?.[course.id]
      )
      return acc
    }, {}),
    backend: backendCourses.reduce<Record<string, boolean>>((acc, course) => {
      acc[course.id] = Boolean(
        server.backend?.[course.id] || local.backend?.[course.id]
      )
      return acc
    }, {}),
    aiDataScience: aiDataScienceCourses.reduce<Record<string, boolean>>(
      (acc, course) => {
        acc[course.id] = Boolean(
          server.aiDataScience?.[course.id] ||
            local.aiDataScience?.[course.id]
        )
        return acc
      },
      {}
    ),
    careerDevops: careerDevopsCourses.reduce<Record<string, boolean>>(
      (acc, course) => {
        acc[course.id] = Boolean(
          server.careerDevops?.[course.id] || local.careerDevops?.[course.id]
        )
        return acc
      },
      {}
    ),
  }

  const crashcourse = mergeChecklistProgress(
    server.crashcourse,
    local.crashcourse
  )
  if (crashcourse) {
    merged.crashcourse = crashcourse
  }

  const basicprompt = mergeChecklistProgress(
    server.basicprompt,
    local.basicprompt
  )
  if (basicprompt) {
    merged.basicprompt = basicprompt
  }

  return merged
}

const ProgressSummary = ({
  completed,
  total,
  syncing,
}: {
  completed: number
  total: number
  syncing: boolean
}) => {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
        Progress
      </p>
      <p className="mt-1 text-sm font-semibold text-gray-900">
        {`${completed} of ${total} completed`}
      </p>
      <div className="mt-2 h-1.5 w-full max-w-[200px] rounded-full bg-gray-200">
        <div
          className="h-1.5 rounded-full bg-zinc-900 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-400">
        {syncing ? 'Syncing progress...' : 'Up to date'}
      </p>
    </div>
  )
}

const needsProgressSync = (
  server: CourseProgressData,
  merged: CourseProgressData
): boolean => {
  for (const course of foundationCourses) {
    if (merged.foundation?.[course.id] && !server.foundation?.[course.id]) {
      return true
    }
  }

  for (const course of frontendCourses) {
    if (merged.frontend?.[course.id] && !server.frontend?.[course.id]) {
      return true
    }
  }

  for (const course of backendCourses) {
    if (merged.backend?.[course.id] && !server.backend?.[course.id]) {
      return true
    }
  }

  for (const course of aiDataScienceCourses) {
    if (
      merged.aiDataScience?.[course.id] &&
      !server.aiDataScience?.[course.id]
    ) {
      return true
    }
  }

  for (const course of careerDevopsCourses) {
    if (merged.careerDevops?.[course.id] && !server.careerDevops?.[course.id]) {
      return true
    }
  }

  const serverCrashcourse = server.crashcourse ?? []
  const mergedCrashcourse = merged.crashcourse ?? []
  for (let index = 0; index < mergedCrashcourse.length; index += 1) {
    if (mergedCrashcourse[index] && !serverCrashcourse[index]) {
      return true
    }
  }

  const serverBasicprompt = server.basicprompt ?? []
  const mergedBasicprompt = merged.basicprompt ?? []
  for (let index = 0; index < mergedBasicprompt.length; index += 1) {
    if (mergedBasicprompt[index] && !serverBasicprompt[index]) {
      return true
    }
  }

  return false
}

function CoursesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const supabase = useMemo(() => createClient(), [])
  const [progressData, setProgressData] = useState<CourseProgressData>({})
  const [syncing, setSyncing] = useState(true)

  const foundationProgress = useMemo(
    () => buildFoundationProgress(progressData),
    [progressData]
  )
  const frontendProgress = useMemo(
    () => buildFrontendProgress(progressData),
    [progressData]
  )
  const backendProgress = useMemo(
    () => buildBackendProgress(progressData),
    [progressData]
  )
  const aiDataScienceProgress = useMemo(
    () => buildAiDataScienceProgress(progressData),
    [progressData]
  )
  const careerDevopsProgress = useMemo(
    () => buildCareerDevopsProgress(progressData),
    [progressData]
  )

  const foundationCompleted = useMemo(
    () => Object.values(foundationProgress).filter(Boolean).length,
    [foundationProgress]
  )
  const frontendCompleted = useMemo(
    () => Object.values(frontendProgress).filter(Boolean).length,
    [frontendProgress]
  )
  const backendCompleted = useMemo(
    () => Object.values(backendProgress).filter(Boolean).length,
    [backendProgress]
  )
  const aiDataScienceCompleted = useMemo(
    () => Object.values(aiDataScienceProgress).filter(Boolean).length,
    [aiDataScienceProgress]
  )
  const careerDevopsCompleted = useMemo(
    () => Object.values(careerDevopsProgress).filter(Boolean).length,
    [careerDevopsProgress]
  )

  useEffect(() => {
    if (!user?.id) return

    const syncProgress = async () => {
      setSyncing(true)
      try {
        const localProgress = getLocalProgress(user.id) || {}
        setProgressData(localProgress)
        const { data, error } = await supabase
          .from('profiles')
          .select('course_progress')
          .eq('id', user.id)
          .maybeSingle()

        if (error) {
          throw error
        }

        const serverProgress =
          data?.course_progress !== null && data?.course_progress !== undefined
            ? parseCourseProgress(data.course_progress)
            : {}

        const mergedProgress = mergeCourseProgress(serverProgress, localProgress)
        setLocalProgress(user.id, mergedProgress)
        setProgressData(mergedProgress)

        if (needsProgressSync(serverProgress, mergedProgress)) {
          const { error: upsertError } = await supabase
            .from('profiles')
            .upsert(
              {
                id: user.id,
                course_progress: mergedProgress,
              },
              { onConflict: 'id' }
            )

          if (upsertError) {
            throw upsertError
          }
        }
      } catch (error) {
        console.error('Error syncing course progress:', error)
        const fallbackProgress = getLocalProgress(user.id) || {}
        setProgressData(fallbackProgress)
      } finally {
        setSyncing(false)
      }
    }

    void syncProgress()
  }, [supabase, user?.id])

  return (
    <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
            Courses
          </h2>
          <p className="text-lg text-gray-600">
            Structured learning lanes that build lasting developer fundamentals.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Lane 1
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  The Foundations
                </h3>
                <p className="text-base text-gray-600">
                  The must-haves every modern developer should feel confident with.
                  Start here before diving into advanced workflows.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                  {foundationCourses.map((course, index) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-gray-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {course.title}
                        </p>
                        <p className="text-gray-500">{course.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <ProgressSummary
                  completed={foundationCompleted}
                  total={foundationCourses.length}
                  syncing={syncing}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => router.push('/resources/courses/foundation')}
                >
                  Open Lane
                </Button>
                <p className="text-xs text-gray-500">
                  Progress syncs to your profile when you're signed in.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Lane 2
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  Frontend Mastery
                </h3>
                <p className="text-base text-gray-600">
                  A focused path for modern UI engineering, from semantic HTML to
                  performance-obsessed experiences.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                  {frontendCourses.map((course) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-gray-400">
                        {String(course.number).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {course.title}
                        </p>
                        <p className="text-gray-500">{course.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <ProgressSummary
                  completed={frontendCompleted}
                  total={frontendCourses.length}
                  syncing={syncing}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => router.push('/resources/courses/frontend')}
                >
                  Open Lane
                </Button>
                <p className="text-xs text-gray-500">
                  Progress syncs to your profile when you're signed in.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Lane 3
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  Backend &amp; Systems
                </h3>
                <p className="text-base text-gray-600">
                  A systems-first track covering runtimes, data stores, APIs,
                  security, and deployment workflows.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                  {backendCourses.map((course) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-gray-400">
                        {String(course.number).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {course.title}
                        </p>
                        <p className="text-gray-500">{course.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <ProgressSummary
                  completed={backendCompleted}
                  total={backendCourses.length}
                  syncing={syncing}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => router.push('/resources/courses/backend')}
                >
                  Open Lane
                </Button>
                <p className="text-xs text-gray-500">
                  Built for modern backend teams and solo builders alike.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Lane 4
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  AI & Data Science
                </h3>
                <p className="text-base text-gray-600">
                  Practical AI workflows, production-ready tooling, and the
                  fundamentals behind modern machine learning.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                  {aiDataScienceCourses.map((course) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-gray-400">
                        {String(course.number).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {course.title}
                        </p>
                        <p className="text-gray-500">{course.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <ProgressSummary
                  completed={aiDataScienceCompleted}
                  total={aiDataScienceCourses.length}
                  syncing={syncing}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={() =>
                    router.push('/resources/courses/ai-data-science')
                  }
                >
                  Open Lane
                </Button>
                <p className="text-xs text-gray-500">
                  Track your progress as you complete each AI course.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Lane 5
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  Career, DevOps & Pro Skills
                </h3>
                <p className="text-base text-gray-600">
                  The career-ready track covering deployment, security, testing,
                  and the business of being a developer.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                  {careerDevopsCourses.map((course) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-gray-400">
                        {String(course.number).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {course.title}
                        </p>
                        <p className="text-gray-500">{course.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <ProgressSummary
                  completed={careerDevopsCompleted}
                  total={careerDevopsCourses.length}
                  syncing={syncing}
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => router.push('/resources/courses/career')}
                >
                  Open Lane
                </Button>
                <p className="text-xs text-gray-500">
                  Deployment, security, and career growth essentials in one track.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default withAuth(CoursesPage)
