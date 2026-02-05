import { FormEvent, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
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
  mergeCourseProgress,
  needsProgressSync,
  parseCourseProgress,
  setLocalProgress,
} from '@/lib/courses/progress'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})


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

const resourceLinks = [
  {
    id: 'nextjs-mastery',
    title: 'Next.js Mastery',
    description:
      'Build production-ready apps with routing, data fetching, and deployment.',
    icon: '🧭',
    path: '/resources/nextjs-mastery',
    tag: 'Coming soon',
    highlights: ['8 modules', 'Capstone app', 'Best practices'],
    accent: 'from-emerald-200/60 via-white to-white',
    cta: 'Coming soon',
    filters: ['coding'],
    disabled: true,
  },
  {
    id: 'frontend-foundations',
    title: 'Frontend Foundations',
    description:
      'Design systems, accessibility, and responsive layouts that feel premium.',
    icon: '🖥️',
    path: '/resources/frontend-foundations',
    tag: 'Coming soon',
    highlights: ['UI systems', 'Accessibility', 'Responsive builds'],
    accent: 'from-rose-200/60 via-white to-white',
    cta: 'Coming soon',
    filters: ['coding'],
    disabled: true,
  },
  {
    id: 'backend-apis',
    title: 'Backend APIs',
    description:
      'Ship secure APIs with auth, rate limits, and clean data models.',
    icon: '🧩',
    path: '/resources/backend-apis',
    tag: 'Coming soon',
    highlights: ['REST + GraphQL', 'Auth flows', 'Rate limits'],
    accent: 'from-indigo-200/60 via-white to-white',
    cta: 'Coming soon',
    filters: ['coding'],
    disabled: true,
  },
  {
    id: 'ai-product-lab',
    title: 'AI Product Lab',
    description:
      'From idea to prototype: prompts, evals, and reliable UX patterns.',
    icon: '🧠',
    path: '/resources/ai-product-lab',
    tag: 'Coming soon',
    highlights: ['Prompt ops', 'Eval loops', 'UX patterns'],
    accent: 'from-sky-200/60 via-white to-white',
    cta: 'Coming soon',
    filters: ['coding'],
    disabled: true,
  },
  {
    id: 'devops-launchpad',
    title: 'DevOps Launchpad',
    description:
      'Deploy with confidence using CI/CD, observability, and infra basics.',
    icon: '🚀',
    path: '/resources/devops-launchpad',
    tag: 'Coming soon',
    highlights: ['CI/CD', 'Monitoring', 'Release playbooks'],
    accent: 'from-amber-200/60 via-white to-white',
    cta: 'Coming soon',
    filters: ['coding'],
    disabled: true,
  },
  {
    id: 'testing-strategy',
    title: 'Testing Strategy',
    description:
      'Unit, integration, and E2E testing habits for reliable shipping.',
    icon: '🧪',
    path: '/resources/testing-strategy',
    tag: 'Coming soon',
    highlights: ['Test plans', 'Mocks + fixtures', 'CI gates'],
    accent: 'from-teal-200/60 via-white to-white',
    cta: 'Coming soon',
    filters: ['coding'],
    disabled: true,
  },
  {
    id: 'crashcourse',
    title: 'Automate Boring Stuff with Python',
    description:
      'A quick-start series to automate boring tasks with Python + AI prompts.',
    icon: '⚡',
    path: '/resources/prompt/python',
    tag: 'Quick sprint',
    highlights: ['5 days', 'Automation drills', 'Python + AI'],
    accent: 'from-amber-200/60 via-white to-white',
    cta: 'Start Sprint',
    filters: ['crash'],
  },
  {
    id: 'basicprompt',
    title: 'Basic Prompting Course',
    description:
      'Five short lessons for clear, reliable prompts you can use right away.',
    icon: '✍️',
    path: '/resources/prompt/basic',
    tag: 'Foundations',
    highlights: ['5 lessons', 'Prompt templates', 'Self-checks'],
    accent: 'from-sky-200/60 via-white to-white',
    cta: 'Open Lessons',
    filters: ['crash'],
  },
]

function ResourcesPage() {
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

  const [mentorshipForm, setMentorshipForm] = useState({
    nickname: '',
    phone: '',
    skillLevel: '',
    goal: ''
  })

  const handleMentorshipSubmit = (e: FormEvent) => {
    e.preventDefault()

    const message = `Hi! I'm interested in mentorship:

Nickname: ${mentorshipForm.nickname}
Phone: ${mentorshipForm.phone}
Skill Level: ${mentorshipForm.skillLevel}
Goal: ${mentorshipForm.goal}

Looking forward to connecting!`

    const whatsappNumber = '60182934765'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleMentorshipChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setMentorshipForm({
      ...mentorshipForm,
      [e.target.name]: e.target.value
    })
  }

  const availableResources = useMemo(
    () => resourceLinks.filter((r) => !r.disabled && r.filters.includes('coding')),
    []
  )

  const promptTemplateResources = useMemo(
    () => resourceLinks.filter((r) => !r.disabled && r.filters.includes('crash')),
    []
  )

  const comingSoonResources = useMemo(
    () => resourceLinks.filter((r) => r.disabled),
    []
  )

  const showCourses = true

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
          aiDataScience: aiDataScience.length
            ? aiDataScience
            : aiDataScienceCourses,
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
    <>
      <Head>
        <title>Member Resources - VibeCodeee | Courses, Guides & Learning Paths</title>
        <meta name="description" content="Access exclusive member resources including structured courses, AI prompting guides, coding tutorials, and career development content. Start learning today." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Member Resources - VibeCodeee" />
        <meta property="og:description" content="Access exclusive member resources including courses, guides, and learning paths." />
      </Head>
      <div
        className={`${geistSans.variable} relative min-h-screen overflow-hidden bg-[#f7f7f8] font-sans`}
      >
        <Header />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-72 w-72 rounded-full bg-zinc-200/70 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40" />
      </div>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <section className="relative mb-14 overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.6)] backdrop-blur animate-fade-in-up">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffffff,transparent_55%)]" />
          <div className="pointer-events-none absolute -right-20 top-12 h-48 w-48 rounded-full bg-zinc-900/5 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
                Member Library
              </div>
              <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
                Member Resources
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-zinc-600">
                Start with a structured lane, then ship quick wins with short,
                focused sprints.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Structured lanes', 'Short sprints', 'Reusable prompts'].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    requestAnimationFrame(() =>
                      document
                        .getElementById('courses')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    )
                  }}
                >
                  Start with Courses
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() =>
                    document
                      .getElementById('resource-grid')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Browse Library
                </Button>
              </div>
            </div>

          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                Available Now
              </h2>
              <p className="text-sm text-zinc-600">
                Start learning with these ready-to-use resources.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Curated for members
            </div>
          </div>

          {showCourses && (
            <div id="courses" className="mb-12 scroll-mt-28">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">Courses</h3>
                  <p className="text-sm text-zinc-600">
                    Choose a lane and keep track of your progress.
                  </p>
                </div>
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
                        The must-haves every modern developer should feel
                        confident with. Start here before diving into advanced
                        workflows.
                      </p>

                      <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                        {laneCourses.foundation.map((course, index) => (
                          <div key={course.id} className="flex items-start gap-3">
                            <span className="mt-0.5 text-xs font-semibold text-gray-400">
                              {String(course.number ?? index + 1).padStart(
                                2,
                                '0'
                              )}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {course.title}
                              </p>
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
                        Progress syncs to your profile when you&apos;re signed in.
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
                        A focused path for modern UI engineering, from semantic
                        HTML to performance-obsessed experiences.
                      </p>

                      <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                        {laneCourses.frontend.map((course, index) => (
                          <div key={course.id} className="flex items-start gap-3">
                            <span className="mt-0.5 text-xs font-semibold text-gray-400">
                              {String(course.number ?? index + 1).padStart(
                                2,
                                '0'
                              )}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {course.title}
                              </p>
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
                        Progress syncs to your profile when you&apos;re signed in.
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
                        A systems-first track covering runtimes, data stores,
                        APIs, security, and deployment workflows.
                      </p>

                      <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                        {laneCourses.backend.map((course, index) => (
                          <div key={course.id} className="flex items-start gap-3">
                            <span className="mt-0.5 text-xs font-semibold text-gray-400">
                              {String(course.number ?? index + 1).padStart(
                                2,
                                '0'
                              )}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {course.title}
                              </p>
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
                        Practical AI workflows, production-ready tooling, and
                        the fundamentals behind modern machine learning.
                      </p>

                      <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                        {laneCourses.aiDataScience.map((course, index) => (
                          <div key={course.id} className="flex items-start gap-3">
                            <span className="mt-0.5 text-xs font-semibold text-gray-400">
                              {String(course.number ?? index + 1).padStart(
                                2,
                                '0'
                              )}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {course.title}
                              </p>
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
                        The career-ready track covering deployment, security,
                        testing, and the business of being a developer.
                      </p>

                      <div className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                        {laneCourses.careerDevops.map((course, index) => (
                          <div key={course.id} className="flex items-start gap-3">
                            <span className="mt-0.5 text-xs font-semibold text-gray-400">
                              {String(course.number ?? index + 1).padStart(
                                2,
                                '0'
                              )}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {course.title}
                              </p>
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
                        Deployment, security, and career growth essentials in one
                        track.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div
            id="resource-grid"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {availableResources.map((resource, index) => (
              <div
                key={resource.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">
                    {resource.icon}
                  </span>
                  <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                    {resource.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-zinc-600 mb-4">
                  {resource.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {resource.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-md bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-500"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push(resource.path)}
                  className="mt-auto w-full group/button"
                >
                  {resource.cta}
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {promptTemplateResources.length > 0 && (
          <section className="mt-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900">
                Prompt Templates
              </h2>
              <p className="text-sm text-zinc-600">
                Quick-start courses with ready-to-use prompts and templates.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {promptTemplateResources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">
                      {resource.icon}
                    </span>
                    <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                      {resource.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-zinc-600 mb-4">
                    {resource.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {resource.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-md bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-500"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => router.push(resource.path)}
                    className="mt-auto w-full group/button"
                  >
                    {resource.cta}
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {comingSoonResources.length > 0 && (
          <section className="mt-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900">
                Coming Soon
              </h2>
              <p className="text-sm text-zinc-600">
                New courses and resources launching soon.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comingSoonResources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg animate-fade-in-up opacity-60"
                  style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">
                      {resource.icon}
                    </span>
                    <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                      {resource.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-zinc-600 mb-4">
                    {resource.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {resource.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-md bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-500"
                      >
                        {highlight}
                      </span>
                  ))}
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    disabled
                    className="mt-auto w-full"
                  >
                    {resource.cta}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mentorship Section */}
        <section className="mt-24 border-t border-zinc-200 pt-16">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-900 mb-3">
                Looking for Mentorship?
              </h2>
              <p className="text-lg text-zinc-600">
                Connect with experienced mentors to accelerate your learning journey
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleMentorshipSubmit} className="space-y-6">
                {/* Nickname */}
                <div>
                  <label htmlFor="nickname" className="block text-sm font-medium text-zinc-900 mb-2">
                    Nickname *
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    required
                    value={mentorshipForm.nickname}
                    onChange={handleMentorshipChange}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all"
                    placeholder="Your nickname"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={mentorshipForm.phone}
                    onChange={handleMentorshipChange}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all"
                    placeholder="+60 12-345 6789"
                  />
                </div>

                {/* Skill Level */}
                <div>
                  <label htmlFor="skillLevel" className="block text-sm font-medium text-zinc-900 mb-2">
                    Skill Level *
                  </label>
                  <select
                    id="skillLevel"
                    name="skillLevel"
                    required
                    value={mentorshipForm.skillLevel}
                    onChange={handleMentorshipChange}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all"
                  >
                    <option value="">Select your skill level</option>
                    <option value="Beginner">Beginner - Just starting out</option>
                    <option value="Intermediate">Intermediate - Some experience</option>
                    <option value="Advanced">Advanced - Looking to level up</option>
                  </select>
                </div>

                {/* Goal */}
                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-zinc-900 mb-2">
                    Your Goal *
                  </label>
                  <textarea
                    id="goal"
                    name="goal"
                    required
                    value={mentorshipForm.goal}
                    onChange={handleMentorshipChange}
                    rows={4}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 transition-all resize-none"
                    placeholder="What do you want to achieve? What areas need guidance?"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                  >
                    Contact Admin
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>
        </main>
      </div>
    </>
  )
}

export default withAuth(ResourcesPage)
