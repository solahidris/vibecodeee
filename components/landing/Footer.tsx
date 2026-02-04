import { useRouter } from 'next/router'

export function Footer() {
  const router = useRouter()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 shadow-lg transition-all duration-300 hover:scale-110">
                <span className="text-lg font-bold text-white">V</span>
              </div>
              <span className="text-2xl font-bold text-zinc-900">VibeCodeee</span>
            </div>
            <p className="mb-6 max-w-md text-zinc-600 leading-relaxed">
              A minimalist community for creators, learners, and innovators. Premium resources. Expert insights. Zero noise.
            </p>
            <div className="flex gap-4">
              <a
                href="https://tinyurl.com/a1-community"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white hover:scale-110"
                aria-label="Telegram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white hover:scale-110"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-8 text-sm font-bold uppercase tracking-wider text-zinc-900">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => router.push('/resources')}
                  className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
                >
                  Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/basicprompt')}
                  className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/profile')}
                  className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
                >
                  Profile
                </button>
              </li>
              <li>
                <a
                  href="https://tinyurl.com/a1-community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
                >
                  Telegram Community
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-8 text-sm font-bold uppercase tracking-wider text-zinc-900">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button className="text-zinc-600 transition-colors duration-300 hover:text-zinc-900">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-600">
              © {currentYear} VibeCodeee. All rights reserved.
            </p>
            <p className="text-sm text-zinc-500">
              Crafted with precision
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
