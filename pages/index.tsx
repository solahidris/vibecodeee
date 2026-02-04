import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const topics = [
  { name: "General", icon: "💬" },
  { name: "Job Posting", icon: "💼" },
  { name: "Best Prompts", icon: "✨" },
  { name: "Fitness", icon: "💪" },
  { name: "Announcements", icon: "📢" },
  { name: "Shill", icon: "🚀" },
  { name: "Internal Career", icon: "📈" },
  { name: "AI/Coding Beginner", icon: "🤖" },
  { name: "AI News", icon: "📰" },
  { name: "Tips & Tricks", icon: "💡" },
  { name: "Tools", icon: "🛠️" },
];

export default function Home() {
  return (
    <div className={`${geistSans.variable} font-sans`}>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center">
            <div className="mb-6 inline-block rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-800">
              Private Community
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Join Our Exclusive
              <span className="block bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Telegram Community
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
              Connect with like-minded individuals, get access to premium content, and grow together in our vibrant community.
            </p>

            {/* CTA Button */}
            <a
              href="https://tinyurl.com/a1-community"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Join Now - RM10/month
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Topics Grid */}
          <div className="mt-24">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              What You'll Get Access To
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 text-4xl">{topic.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{topic.name}</h3>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-50 to-blue-50 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-24 rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 p-12 text-center text-white">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              Why Join Our Community?
            </h2>
            <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
              <div>
                <div className="mb-3 text-4xl">🌟</div>
                <h3 className="mb-2 text-xl font-semibold">Premium Content</h3>
                <p className="text-violet-100">Access exclusive tips, prompts, and resources</p>
              </div>
              <div>
                <div className="mb-3 text-4xl">🤝</div>
                <h3 className="mb-2 text-xl font-semibold">Active Community</h3>
                <p className="text-violet-100">Connect with passionate members daily</p>
              </div>
              <div>
                <div className="mb-3 text-4xl">📚</div>
                <h3 className="mb-2 text-xl font-semibold">Continuous Learning</h3>
                <p className="text-violet-100">Stay updated with AI news and tools</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center">
            <p className="mb-6 text-lg text-gray-600">
              Ready to level up? Join us today!
            </p>
            <a
              href="https://tinyurl.com/a1-community"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-gray-800 hover:shadow-xl"
            >
              Get Started Now
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
