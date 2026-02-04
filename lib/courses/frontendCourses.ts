export type FrontendCourse = {
  id: string
  number: number
  title: string
  description: string
}

export const frontendCourses: FrontendCourse[] = [
  {
    id: 'frontend-html5',
    number: 6,
    title: 'HTML5 & Semantic Web',
    description:
      'Go beyond <div> tags with semantic landmarks, accessible forms, and metadata that helps users and search engines. Build page skeletons that read cleanly for people and bots.',
  },
  {
    id: 'frontend-css-layouts',
    number: 7,
    title: 'CSS Flexbox & Grid',
    description:
      'Design resilient layouts with Flexbox and Grid, from nav bars to complex dashboards. Learn alignment, spacing, and responsive patterns that scale.',
  },
  {
    id: 'frontend-tailwind-advanced',
    number: 8,
    title: 'Advanced Tailwind CSS',
    description:
      'Move past utility basics with configuration, custom themes, and component patterns. Master plugins, variants, and dark mode strategies for production UIs.',
  },
  {
    id: 'frontend-js-fundamentals',
    number: 9,
    title: 'JavaScript Fundamentals',
    description:
      'Build confidence in variables, functions, loops, and objects through practical UI examples. Strengthen the mental model behind events and data flow.',
  },
  {
    id: 'frontend-es6',
    number: 10,
    title: 'ES6+ Modern JS',
    description:
      'Use modern syntax like destructuring, modules, and template literals to write cleaner code. Practice promises and async/await for real-world data loading.',
  },
  {
    id: 'frontend-react-components',
    number: 11,
    title: 'React: Components & Props',
    description:
      'Create reusable components, compose layouts, and pass data with props. Learn how to structure a component tree that stays readable.',
  },
  {
    id: 'frontend-react-state',
    number: 12,
    title: 'React: State & Effects',
    description:
      'Handle interactive UI with useState, useEffect, and derived state patterns. Learn to avoid common pitfalls like stale data and extra renders.',
  },
  {
    id: 'frontend-nextjs-foundations',
    number: 13,
    title: 'Next.js Foundations',
    description:
      'Understand file-based routing, layouts, and server rendering for SEO-friendly apps. Learn when to use SSR, SSG, and client-side rendering.',
  },
  {
    id: 'frontend-typescript',
    number: 14,
    title: 'TypeScript for Frontend',
    description:
      'Add strong typing to components, props, and API responses to catch bugs early. Learn interfaces, generics, and type narrowing you will use daily.',
  },
  {
    id: 'frontend-performance',
    number: 15,
    title: 'Web Performance',
    description:
      'Improve Core Web Vitals with smart loading, caching, and asset strategy. Speed up perceived performance with image, font, and bundle techniques.',
  },
]
