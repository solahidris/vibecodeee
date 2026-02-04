export type CareerDevopsCourse = {
  id: string
  number: number
  title: string
  description: string
}

export const careerDevopsCourses: CareerDevopsCourse[] = [
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
    description: 'Making apps that don\'t look "ugly."',
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
    description:
      'How to use AI coding assistants (Cursor/Claude) to build 10x faster.',
  },
]
