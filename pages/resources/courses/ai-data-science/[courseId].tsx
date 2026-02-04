import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CelebrationToast, ConfettiCannons } from '@/components/ui/Celebration'
import { cn } from '@/lib/utils/cn'
import { formatDate } from '@/lib/utils/formatters'
import { Geist } from 'next/font/google'
import { getAiDataScienceCourseDetail } from '@/lib/courses/aiDataScienceCourseDetails'
import { evaluateExercise } from '@/lib/courses/evaluateExercise'
import {
  getExerciseAnswerChecklist,
  getExerciseAnswerExample,
} from '@/lib/courses/exerciseAnswers'
import type {
  AiDataScienceCourseDetail,
  CourseExercise,
} from '@/lib/courses/aiDataScienceCourseDetails'
import { aiDataScienceCourses } from '@/lib/courses/aiDataScienceCourses'
import { fetchCourseDetail } from '@/lib/courses/supabaseCourses'
import {
  CourseProgressData,
  ExerciseResult,
  getLocalProgress,
  getLocalExerciseAnswers,
  getLocalExerciseResults,
  getProgressExerciseAnswers,
  getProgressExerciseResults,
  mergeCourseProgress,
  mergeExerciseAnswers,
  mergeExerciseResults,
  parseCourseProgress,
  setLocalExerciseAnswers,
  setLocalExerciseResults,
  setLocalProgress,
} from '@/lib/courses/progress'
import { useCelebration } from '@/hooks/useCelebration'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const buildInitialAnswers = (exercises: CourseExercise[]) =>
  exercises.reduce<Record<string, string>>((acc, exercise) => {
    acc[exercise.id] = ''
    return acc
  }, {})

const buildInitialResults = (exercises: CourseExercise[]) =>
  exercises.reduce<Record<string, ExerciseResult>>((acc, exercise) => {
    acc[exercise.id] = { status: 'idle', message: '' }
    return acc
  }, {})

function AiDataScienceCoursePage() {
  const router = useRouter()
  const { user } = useAuth()
  const supabase = useMemo(() => createClient(), [])
  const [progressData, setProgressData] = useState<CourseProgressData>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [syncError, setSyncError] = useState<string | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null)
  const [course, setCourse] = useState<AiDataScienceCourseDetail | null>(null)
  const [courseLoading, setCourseLoading] = useState(true)
  const { toast, confettiVisible, confettiKey, trigger, dismissToast } =
    useCelebration()

  const courseId = router.isReady
    ? Array.isArray(router.query.courseId)
      ? router.query.courseId[0]
      : router.query.courseId
    : null

  const exercises = course?.exercises ?? []
  const [answers, setAnswers] = useState(() => buildInitialAnswers(exercises))
  const [results, setResults] = useState(() => buildInitialResults(exercises))
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({})

  const aiProgress = useMemo(
    () => progressData.aiDataScience ?? {},
    [progressData]
  )

  const courseIndex = useMemo(() => {
    if (!course) return null
    if (course.number !== null && course.number !== undefined) {
      return String(course.number).padStart(2, '0')
    }
    const match = aiDataScienceCourses.find((item) => item.id === course.id)
    return match ? String(match.number).padStart(2, '0') : null
  }, [course])

  const passedCount = useMemo(
    () => Object.values(results).filter((result) => result.status === 'passed').length,
    [results]
  )

  const percentComplete = exercises.length
    ? Math.round((passedCount / exercises.length) * 100)
    : 0

  const courseCompleted = course ? aiProgress[course.id] : false
  const allPassed = exercises.length > 0 && passedCount === exercises.length

  const toggleAnswer = (exerciseId: string) => {
    setShowAnswers((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }))
  }

  useEffect(() => {
    if (!router.isReady || !courseId) return
    let isMounted = true

    const loadCourse = async () => {
      setCourseLoading(true)
      try {
        const data = await fetchCourseDetail(supabase, courseId)
        if (isMounted) {
          if (data) {
            setCourse(data as AiDataScienceCourseDetail)
          } else {
            setCourse(getAiDataScienceCourseDetail(courseId) ?? null)
          }
        }
      } catch (error) {
        console.error('Error loading course detail:', error)
        if (isMounted) {
          setCourse(getAiDataScienceCourseDetail(courseId) ?? null)
        }
      } finally {
        if (isMounted) {
          setCourseLoading(false)
        }
      }
    }

    void loadCourse()

    return () => {
      isMounted = false
    }
  }, [courseId, router.isReady, supabase])

  useEffect(() => {
    if (!course) return
    const initialAnswers = buildInitialAnswers(exercises)
    const initialResults = buildInitialResults(exercises)

    const progressAnswers = getProgressExerciseAnswers(progressData, course.id)
    const progressResults = getProgressExerciseResults(progressData, course.id)

    let mergedAnswers = mergeExerciseAnswers(initialAnswers, progressAnswers)
    let mergedResults = mergeExerciseResults(initialResults, progressResults)

    if (user?.id) {
      const storedAnswers = getLocalExerciseAnswers(user.id, course.id)
      const storedResults = getLocalExerciseResults(user.id, course.id)
      mergedAnswers = mergeExerciseAnswers(mergedAnswers, storedAnswers)
      mergedResults = mergeExerciseResults(mergedResults, storedResults)
    }

    setAnswers(mergedAnswers)
    setResults(mergedResults)
  }, [course, exercises, progressData, user?.id])

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

        const serverProgress =
          data?.course_progress !== null && data?.course_progress !== undefined
            ? parseCourseProgress(data?.course_progress)
            : {}

        const mergedProgress = mergeCourseProgress(
          serverProgress,
          localProgress || {}
        )

        if (data?.course_progress !== null && data?.course_progress !== undefined) {
          setLocalProgress(user.id, mergedProgress)
        }

        if (isMounted) {
          setProgressData(mergedProgress)
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

  const saveProgress = async (nextProgress: CourseProgressData) => {
    if (!user?.id) return

    setSaving(true)
    try {
      setLocalProgress(user.id, nextProgress)
      const { error } = await supabase.from('profiles').upsert(
        {
          id: user.id,
          course_progress: nextProgress,
        },
        { onConflict: 'id' }
      )

      if (error) {
        throw error
      }

      const now = new Date().toISOString()
      setLastSyncedAt(now)
      setSyncError(null)
    } catch (error) {
      console.error('Error saving course progress:', error)
      setLocalProgress(user.id, nextProgress)
      setSyncError(
        'We could not sync your progress yet. Updates are stored locally for now.'
      )
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (!course || !user?.id) return
    if (!allPassed || courseCompleted) return

    const nextAiProgress = {
      ...(progressData.aiDataScience ?? {}),
      [course.id]: true,
    }

    const nextProgressData = {
      ...progressData,
      aiDataScience: nextAiProgress,
    }

    setProgressData(nextProgressData)
    void saveProgress(nextProgressData)
  }, [allPassed, course, courseCompleted, progressData, user?.id])

  const handleCheck = (exerciseId: string, index: number) => {
    const exercise = exercises.find((item) => item.id === exerciseId)
    if (!exercise) return

    const wasPassed = results[exerciseId]?.status === 'passed'
    const evaluation = evaluateExercise(answers[exerciseId] ?? '', exercise)

    if (evaluation.passed && !wasPassed) {
      const stepLabel = `Step ${String(index + 1).padStart(2, '0')}`
      trigger(`${stepLabel}: ${exercise.title}`)
    }

    setResults((prev) => {
      const next: Record<string, ExerciseResult> = {
        ...prev,
        [exerciseId]: {
          status: evaluation.passed ? 'passed' : 'failed',
          message: evaluation.message,
        },
      }
      if (user?.id && course?.id) {
        setLocalExerciseResults(user.id, course.id, next)
        setProgressData((current) => {
          const updated = mergeCourseProgress(current, {
            exerciseResults: { [course.id]: next },
            exerciseAnswers: { [course.id]: answers },
          })
          void saveProgress(updated)
          return updated
        })
      }
      return next
    })
  }

  if (!router.isReady || courseLoading) {
    return (
      <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
        <Header />
        <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <Card hover={false}>
            <p className="text-sm font-semibold text-gray-500">Loading course...</p>
            <p className="mt-2 text-gray-600">
              Pulling the details for your course now.
            </p>
          </Card>
        </main>
      </div>
    )
  }

  if (!course) {
    return (
      <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
        <Header />
        <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <Card hover={false}>
            <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
            <p className="mt-2 text-gray-600">
              We could not find that course. Head back to the AI &amp; Data
              Science lane and choose another one.
            </p>
            <div className="mt-6">
              <Button
                variant="secondary"
                onClick={() => router.push('/resources/courses/ai-data-science')}
              >
                Back to AI &amp; Data Science
              </Button>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
      <Header />
      <CelebrationToast
        visible={toast.visible}
        message={toast.message}
        onClose={dismissToast}
      />
      {confettiVisible && <ConfettiCannons burstKey={confettiKey} />}

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <button
            onClick={() => router.push('/resources/courses')}
            className="transition-colors hover:text-gray-900"
          >
            Courses
          </button>
          <span>/</span>
          <button
            onClick={() => router.push('/resources/courses/ai-data-science')}
            className="transition-colors hover:text-gray-900"
          >
            AI &amp; Data Science
          </button>
          <span>/</span>
          <span className="text-gray-900">{course.title}</span>
        </div>

        <div className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Lane 4
            </div>
            {courseIndex && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                Course {courseIndex}
              </span>
            )}
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
            {course.title}
          </h1>
          <p className="text-lg text-gray-600">{course.description}</p>
          <p className="mt-4 max-w-3xl text-base text-gray-600">
            {course.overview}
          </p>

          <div className="mt-6 max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-900">What you will practice</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
              {course.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
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
                {passedCount} of {exercises.length} checks passed
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {courseCompleted || allPassed
                  ? 'Course complete. Nice work.'
                  : 'Pass every check to complete this course.'}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                {lastSyncedAt
                  ? `Last synced ${formatDate(lastSyncedAt)}`
                  : 'Syncing will start after your first update.'}
              </p>
            </div>
            <div className="w-full max-w-sm">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{percentComplete}% complete</span>
                <span className="text-xs text-gray-400">
                  {saving ? 'Saving...' : loading ? 'Checking...' : 'Up to date'}
                </span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-zinc-900 transition-all"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          {exercises.map((exercise, index) => {
            const result = results[exercise.id]
            const isPassed = result?.status === 'passed'
            const isFailed = result?.status === 'failed'
            const answerExample = getExerciseAnswerExample(exercise)
            const answerChecklist = getExerciseAnswerChecklist(exercise)
            const hasAnswer =
              Boolean(answerExample) || answerChecklist.length > 0
            const showAnswer = Boolean(showAnswers[exercise.id])

            return (
              <Card
                key={exercise.id}
                hover={false}
                className={cn(
                  'border border-transparent',
                  isPassed && 'border-green-200 bg-green-50/40'
                )}
              >
                <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                      Step {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                      {exercise.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-700">
                      {exercise.instruction}
                    </p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-600">
                      {exercise.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <label className="text-sm font-semibold text-gray-900">
                      Your input
                    </label>
                    <textarea
                      value={answers[exercise.id] ?? ''}
                      onChange={(event) => {
                        const value = event.target.value
                        setAnswers((prev) => {
                          const next = { ...prev, [exercise.id]: value }
                          if (user?.id && course?.id) {
                            setLocalExerciseAnswers(user.id, course.id, next)
                          }
                          return next
                        })
                      }}
                      onKeyDown={(event) => {
                        if (event.isComposing) return
                        if (
                          event.key === 'Enter' &&
                          (event.metaKey || event.ctrlKey)
                        ) {
                          event.preventDefault()
                          handleCheck(exercise.id, index)
                        }
                      }}
                      placeholder={exercise.placeholder}
                      rows={4}
                      className="mt-3 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleCheck(exercise.id, index)}
                      >
                        Submit
                      </Button>
                      {hasAnswer && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAnswer(exercise.id)}
                        >
                          {showAnswer ? 'Hide answer' : 'Show answer'}
                        </Button>
                      )}
                      {(isPassed || isFailed) && (
                        <span
                          className={cn(
                            'rounded-full px-3 py-1 text-xs font-semibold',
                            isPassed && 'bg-green-100 text-green-700',
                            isFailed && 'bg-amber-100 text-amber-700'
                          )}
                        >
                          {isPassed ? 'Passed' : 'Try again'}
                        </span>
                      )}
                    </div>
                    {hasAnswer && showAnswer && (
                      <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-sm text-amber-900">
                        {answerExample && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                              Example answer
                            </p>
                            <pre className="mt-2 whitespace-pre-wrap break-words rounded-lg bg-white/70 p-3 text-xs text-amber-900 shadow-sm">
                              {answerExample}
                            </pre>
                          </div>
                        )}
                        {answerChecklist.length > 0 && (
                          <div className={cn(answerExample && 'mt-3')}>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                              Answer key
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-800">
                              {answerChecklist.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    {(isPassed || isFailed) && (
                      <p
                        className={cn(
                          'mt-3 text-sm',
                          isPassed ? 'text-green-700' : 'text-amber-700'
                        )}
                        role="status"
                        aria-live="polite"
                      >
                        {result?.message}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push('/resources/courses/ai-data-science')}
          >
            Back to AI &amp; Data Science
          </Button>
          <Button variant="ghost" size="md" onClick={() => router.push('/resources/courses')}>
            Back to Courses
          </Button>
        </div>
      </main>
    </div>
  )
}

export default withAuth(AiDataScienceCoursePage)
