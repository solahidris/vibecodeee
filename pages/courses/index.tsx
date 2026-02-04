import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Geist } from 'next/font/google'
import { foundationCourses } from '@/lib/courses/foundationCourses'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

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
                      <p className="font-semibold text-gray-900">{course.title}</p>
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
                onClick={() => router.push('/courses/foundation')}
              >
                Open Lane
              </Button>
              <p className="text-xs text-gray-500">
                Progress syncs to your profile when you're signed in.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default withAuth(CoursesPage)
