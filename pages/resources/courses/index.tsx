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
import { fetchCourseSummaries } from '@/lib/courses/supabaseCourses'
import type { CourseSummary } from '@/lib/courses/types'
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

const mergeProgressLane = (
  server: Record<string, boolean> | undefined,
  local: Record<string, boolean> | undefined
): Record<string, boolean> => {
  const merged: Record<string, boolean> = {}
  for (const [key, value] of Object.entries(server ?? {})) {
    merged[key] = Boolean(value)
  }
  for (const [key, value] of Object.entries(local ?? {})) {
    merged[key] = Boolean(merged[key] || value)
  }
  return merged
}

const mergeCourseProgress = (
  server: CourseProgressData,
  local: CourseProgressData
): CourseProgressData => {
  const merged: CourseProgressData = {
    foundation: mergeProgressLane(server.foundation, local.foundation),
    frontend: mergeProgressLane(server.frontend, local.frontend),
    backend: mergeProgressLane(server.backend, local.backend),
    aiDataScience: mergeProgressLane(server.aiDataScience, local.aiDataScience),
    careerDevops: mergeProgressLane(server.careerDevops, local.careerDevops),
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
  const hasNewProgress = (
    serverLane: Record<string, boolean> | undefined,
    mergedLane: Record<string, boolean> | undefined
  ) =>
    Object.entries(mergedLane ?? {}).some(
      ([key, value]) => value && !serverLane?.[key]
    )

  if (hasNewProgress(server.foundation, merged.foundation)) return true
  if (hasNewProgress(server.frontend, merged.frontend)) return true
  if (hasNewProgress(server.backend, merged.backend)) return true
  if (hasNewProgress(server.aiDataScience, merged.aiDataScience)) return true
  if (hasNewProgress(server.careerDevops, merged.careerDevops)) return true

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
  const [laneCourses, setLaneCourses] = useState<{
    foundation: CourseSummary[]
    frontend: CourseSummary[]
    backend: CourseSummary[]
    aiDataScience: CourseSummary[]
    careerDevops: CourseSummary[]
  }>({
    foundation: foundationCourses,
    frontend: frontendCourses,
    backend: backendCourses,
    aiDataScience: aiDataScienceCourses,
    careerDevops: careerDevopsCourses,
  })

  const foundationProgress = useMemo(
    () => buildFoundationProgress(progressData, laneCourses.foundation),
    [progressData, laneCourses.foundation]
  )
  const frontendProgress = useMemo(
    () => buildFrontendProgress(progressData, laneCourses.frontend),
    [progressData, laneCourses.frontend]
  )
  const backendProgress = useMemo(
    () => buildBackendProgress(progressData, laneCourses.backend),
    [progressData, laneCourses.backend]
  )
  const aiDataScienceProgress = useMemo(
    () => buildAiDataScienceProgress(progressData, laneCourses.aiDataScience),
    [progressData, laneCourses.aiDataScience]
  )
  const careerDevopsProgress = useMemo(
    () => buildCareerDevopsProgress(progressData, laneCourses.careerDevops),
    [progressData, laneCourses.careerDevops]
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
    let isMounted = true

    const loadCourses = async () => {
      if (!user?.id) return
      try {
        const [
          foundation,
          frontend,
          backend,
          aiDataScience,
          careerDevopsPrimary,
        ] = await Promise.all([
          fetchCourseSummaries(supabase, 'foundation'),
          fetchCourseSummaries(supabase, 'frontend'),
          fetchCourseSummaries(supabase, 'backend'),
          fetchCourseSummaries(supabase, 'ai-data-science'),
          fetchCourseSummaries(supabase, 'career'),
        ])

        const careerDevops =
          careerDevopsPrimary.length > 0
            ? careerDevopsPrimary
            : await fetchCourseSummaries(supabase, 'career-devops')

        if (!isMounted) return

        setLaneCourses({
          foundation: foundation.length ? foundation : foundationCourses,
          frontend: frontend.length ? frontend : frontendCourses,
          backend: backend.length ? backend : backendCourses,
          aiDataScience: aiDataScience.length ? aiDataScience : aiDataScienceCourses,
          careerDevops: careerDevops.length ? careerDevops : careerDevopsCourses,
        })
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
                  {laneCourses.foundation.map((course, index) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-gray-400">
                        {String(course.number ?? index + 1).padStart(2, '0')}
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
                  total={laneCourses.foundation.length}
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
                  {laneCourses.frontend.map((course, index) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-gray-400">
                        {String(course.number ?? index + 1).padStart(2, '0')}
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
                  total={laneCourses.frontend.length}
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
                  {laneCourses.backend.map((course, index) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-gray-400">
                        {String(course.number ?? index + 1).padStart(2, '0')}
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
                  total={laneCourses.backend.length}
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
                  {laneCourses.aiDataScience.map((course, index) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-gray-400">
                        {String(course.number ?? index + 1).padStart(2, '0')}
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
                  total={laneCourses.aiDataScience.length}
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
                  {laneCourses.careerDevops.map((course, index) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-semibold text-gray-400">
                        {String(course.number ?? index + 1).padStart(2, '0')}
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
                  total={laneCourses.careerDevops.length}
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
