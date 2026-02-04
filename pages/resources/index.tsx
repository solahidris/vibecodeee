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

const resourceLinks = [
  {
    id: 'courses',
    title: 'Courses',
    description:
      'Structured learning lanes that build lasting developer fundamentals.',
    icon: '📚',
    path: '/resources/courses',
  },
  {
    id: 'crashcourse',
    title: '5-Day Crash Course',
    description:
      'A quick-start series to automate boring tasks with Python + AI prompts.',
    icon: '⚡',
    path: '/resources/crashcourse',
  },
  {
    id: 'basicprompt',
    title: 'Basic Prompting Course',
    description:
      'Five short lessons for clear, reliable prompts you can use right away.',
    icon: '✍️',
    path: '/resources/basicprompt',
  },
]

function ResourcesPage() {
  const router = useRouter()

  return (
    <div className={`${geistSans.variable} min-h-screen bg-gray-50 font-sans`}>
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
            Member Resources
          </h2>
          <p className="text-lg text-gray-600">
            Start here with the core courses and quick-start guides.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resourceLinks.map((resource) => (
            <Card key={resource.id} className="relative">
              <div className="mb-4 text-4xl">{resource.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {resource.title}
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                {resource.description}
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push(resource.path)}
              >
                Open
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

export default withAuth(ResourcesPage)
