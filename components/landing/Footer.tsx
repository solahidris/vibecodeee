export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center sm:text-left">
            <h3 className="mb-1 text-lg font-bold text-gray-900">Community</h3>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <a
              href="https://tinyurl.com/a1-community"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gray-900"
            >
              Telegram Community
            </a>
            <span className="text-gray-300">|</span>
            <button className="transition-colors hover:text-gray-900">
              Privacy
            </button>
            <span className="text-gray-300">|</span>
            <button className="transition-colors hover:text-gray-900">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
