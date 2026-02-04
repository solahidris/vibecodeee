import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Geist } from 'next/font/google'
import { backendCourses } from '@/lib/courses/backendCourses'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

function BackendCoursesPage() {
  const router = useRouter()

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
            A systems-first curriculum for production-grade APIs, data, and
            infrastructure fundamentals.
          </p>
        </div>

        <Card hover={false} className="mb-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">Lane focus</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                APIs, databases, authentication, and deployment
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Start with the Node.js event loop and wrap with Docker basics.
              </p>
            </div>
            <div className="text-sm text-gray-500">
              9 courses • 16-24
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          {backendCourses.map((course) => (
            <Card key={course.id} hover={false}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Course {String(course.number).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {course.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                    Coming soon
                  </span>
                  <Button variant="secondary" size="sm" disabled>
                    View outline
                  </Button>
                </div>
              </div>
            </Card>
          ))}
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
