import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { Card } from '@/components/ui/Card'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Geist } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const resourceFilters = [
  { id: 'all', label: 'All', helper: 'Everything' },
  { id: 'coding', label: 'Coding', helper: 'Courses only' },
  { id: 'crash', label: 'Crash Course', helper: 'Quick sprints' },
]

const resourceLinks = [
  {
    id: 'courses',
    title: 'Courses',
    description:
      'Structured learning lanes that build lasting developer fundamentals.',
    icon: '📚',
    path: '/resources/courses',
    tag: 'Core path',
    highlights: ['3 lanes', 'Structured', 'Self-paced'],
    accent: 'from-zinc-900/10 via-white to-white',
    cta: 'Open Courses',
    filters: ['coding'],
  },
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
    path: '/resources/crashcourse',
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
    path: '/resources/basicprompt',
    tag: 'Foundations',
    highlights: ['5 lessons', 'Prompt templates', 'Self-checks'],
    accent: 'from-sky-200/60 via-white to-white',
    cta: 'Open Lessons',
    filters: ['crash'],
  },
]

function ResourcesPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('all')

  const visibleResources = useMemo(() => {
    if (activeFilter === 'all') return resourceLinks
    return resourceLinks.filter((resource) =>
      resource.filters.includes(activeFilter)
    )
  }, [activeFilter])

  const availableResources = useMemo(
    () => visibleResources.filter((r) => !r.disabled),
    [visibleResources]
  )

  const comingSoonResources = useMemo(
    () => visibleResources.filter((r) => r.disabled),
    [visibleResources]
  )

  return (
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
                  onClick={() => router.push('/resources/courses')}
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

            <div className="space-y-4">
              <div className="rounded-xl bg-zinc-50 p-5 border border-zinc-100">
                <div className="mb-3 inline-flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Recommended path
                  </p>
                </div>
                <p className="text-base font-semibold text-zinc-900">
                  Foundations to Frontend to Backend
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  Build confidence one lane at a time.
                </p>
              </div>
              <div className="rounded-xl bg-zinc-50 p-5 border border-zinc-100">
                <div className="mb-3 inline-flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Quick wins
                  </p>
                </div>
                <p className="text-base font-semibold text-zinc-900">
                  Short sprints, real output
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  Short sprints with reusable templates.
                </p>
              </div>
              <div className="rounded-xl bg-zinc-900 p-5 border border-zinc-800">
                <div className="mb-3 inline-flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Member only
                  </p>
                </div>
                <p className="text-base font-semibold text-white">
                  Everything here is designed to be practical.
                </p>
                <p className="mt-1 text-sm text-zinc-300">
                  Pick a lane, ship a sprint, and keep the momentum going.
                </p>
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

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Filter
            </span>
            <div className="flex flex-wrap gap-2">
              {resourceFilters.map((filter) => {
                const isActive = activeFilter === filter.id
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    aria-pressed={isActive}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                      isActive
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                        : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div
            id="resource-grid"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {availableResources.map((resource, index) => (
              <div
                key={resource.id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg animate-fade-in-up"
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
                  className="w-full group/button"
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

        {comingSoonResources.length > 0 && (
          <section className="mt-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900">
                Explore the library
              </h2>
              <p className="text-sm text-zinc-600">
                Choose a path or jump into a quick-start.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comingSoonResources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg animate-fade-in-up opacity-60"
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
                    className="w-full"
                  >
                    {resource.cta}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default withAuth(ResourcesPage)
