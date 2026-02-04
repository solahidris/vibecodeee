import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Geist } from 'next/font/google'
import { foundationCourses } from '@/lib/courses/foundationCourses'
import { backendCourses } from '@/lib/courses/backendCourses'
import { frontendCourses } from '@/lib/courses/frontendCourses'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const aiDataScienceCourses = [
  {
    id: 'ai-prompt-engineering',
    number: 25,
    title: 'AI Prompt Engineering',
    description: 'Frameworks for getting 10x better results from LLMs.',
  },
  {
    id: 'ai-chatbots',
    number: 26,
    title: 'Building AI Chatbots',
    description: 'Integrating OpenAI/Gemini APIs into your web apps.',
  },
  {
    id: 'vector-databases',
    number: 27,
    title: 'Vector Databases Basics',
    description: 'Understanding Pinecone/Chroma for AI memory.',
  },
  {
    id: 'langchain-intro',
    number: 28,
    title: 'LangChain Intro',
    description: 'Chaining AI tasks together for complex automation.',
  },
  {
    id: 'ai-agents',
    number: 29,
    title: 'AI Agents 101',
    description: 'Building autonomous bots that can use tools.',
  },
  {
    id: 'ml-intro',
    number: 30,
    title: 'Machine Learning Intro',
    description: 'Understanding the math and logic behind the hype.',
  },
]

const careerDevopsCourses = [
  {
    id: 'career-vercel-netlify-deploy',
    number: 31,
    title: 'Vercel & Netlify Deployment',
    description: 'From local code to a live URL in seconds.',
  },
  {
    id: 'career-cicd-github-actions',
    number: 32,
    title: 'CI/CD with GitHub Actions',
    description: 'Automating your testing and deployment.',
  },
  {
    id: 'career-linux-server-admin',
    number: 33,
    title: 'Linux Server Admin',
    description: 'Managing your own VPS (Ubuntu/Debian).',
  },
  {
    id: 'career-cybersecurity-web',
    number: 34,
    title: 'Cybersecurity for Web',
    description: 'Preventing SQL injection, XSS, and CSRF attacks.',
  },
  {
    id: 'career-uiux-non-designers',
    number: 35,
    title: 'UI/UX for Non-Designers',
    description: 'Making apps that don&apos;t look "ugly."',
  },
  {
    id: 'career-unit-testing-jest',
    number: 36,
    title: 'Unit Testing with Jest',
    description: 'Writing code that tests your code.',
  },
  {
    id: 'career-technical-interview-prep',
    number: 37,
    title: 'Technical Interview Prep',
    description: 'Cracking the coding interview and DSA basics.',
  },
  {
    id: 'career-freelancing-high-ticket',
    number: 38,
    title: 'Freelancing & High-Ticket Sales',
    description: 'Finding and closing 5-figure dev clients.',
  },
  {
    id: 'career-personal-brand',
    number: 39,
    title: 'Building a Personal Brand',
    description: 'Using Twitter/LinkedIn to get job offers.',
  },
  {
    id: 'career-vibe-coding-era',
    number: 40,
    title: 'The "Vibe Coding" Era',
    description: 'How to use AI coding assistants (Cursor/Claude) to build 10x faster.',
  },
]

function CoursesPage() {
  const router = useRouter()

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
                <Button
                  variant="secondary"
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
                <Button
                  variant="secondary"
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
                <Button variant="secondary" size="md" disabled>
                  Coming Soon
                </Button>
                <p className="text-xs text-gray-500">
                  We&apos;re mapping out the Lane 4 curriculum.
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
                <Button variant="secondary" size="md" disabled>
                  Coming Soon
                </Button>
                <p className="text-xs text-gray-500">
                  We&apos;re finalizing the Lane 5 curriculum.
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
