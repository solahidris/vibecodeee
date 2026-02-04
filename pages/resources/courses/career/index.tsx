import { useRouter } from 'next/router'
import { withAuth } from '@/lib/auth/withAuth'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Geist } from 'next/font/google'
import { careerDevopsCourses } from '@/lib/courses/careerDevopsCourses'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

function CareerDevopsCoursesPage() {
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
          <span className="text-gray-900">Career, DevOps &amp; Pro Skills</span>
        </div>

        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Lane 5
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
            Career, DevOps &amp; Pro Skills
          </h1>
          <p className="text-lg text-gray-600">
            The career-ready track covering deployment, security, testing, and
            the business of being a developer.
          </p>
        </div>

        <Card hover={false} className="mb-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">Lane focus</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                Ship, secure, and sell your work
              </p>
              <p className="mt-2 text-sm text-gray-500">
                From Vercel launches to interviews and client work.
              </p>
            </div>
            <div className="text-sm text-gray-500">10 courses • 31-40</div>
          </div>
        </Card>

        <div className="grid gap-6">
          {careerDevopsCourses.map((course) => (
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
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Outline preview
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      router.push(`/resources/courses/career/${course.id}`)
                    }
                  >
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

export default withAuth(CareerDevopsCoursesPage)
