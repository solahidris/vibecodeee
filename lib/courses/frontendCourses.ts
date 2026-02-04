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
    description: 'Beyond <div> tags; accessibility and SEO structure.',
  },
  {
    id: 'frontend-css-layouts',
    number: 7,
    title: 'CSS Flexbox & Grid',
    description: 'Mastering modern layouts without the headaches.',
  },
  {
    id: 'frontend-tailwind-advanced',
    number: 8,
    title: 'Advanced Tailwind CSS',
    description: 'Custom configurations, plugins, and dark mode.',
  },
  {
    id: 'frontend-js-fundamentals',
    number: 9,
    title: 'JavaScript Fundamentals',
    description: 'Variables, loops, and data types.',
  },
  {
    id: 'frontend-es6',
    number: 10,
    title: 'ES6+ Modern JS',
    description: 'Arrow functions, destructuring, and asynchronous code (async/await).',
  },
  {
    id: 'frontend-react-components',
    number: 11,
    title: 'React: Components & Props',
    description: 'The building blocks of the UI.',
  },
  {
    id: 'frontend-react-state',
    number: 12,
    title: 'React: State & Effects',
    description: 'Managing dynamic data with useState and useEffect.',
  },
  {
    id: 'frontend-nextjs-foundations',
    number: 13,
    title: 'Next.js Foundations',
    description: 'Server-side rendering and routing for modern SEO.',
  },
  {
    id: 'frontend-typescript',
    number: 14,
    title: 'TypeScript for Frontend',
    description: 'Adding "type safety" to catch bugs before they happen.',
  },
  {
    id: 'frontend-performance',
    number: 15,
    title: 'Web Performance',
    description: 'Core Web Vitals, lazy loading, and image optimization.',
  },
]
