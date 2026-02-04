export type FoundationCourse = {
  id: string
  title: string
  description: string
}

export const foundationCourses: FoundationCourse[] = [
  {
    id: 'terminal-command-line',
    title: 'Terminal & Command Line Mastery',
    description:
      'Moving beyond the mouse; navigation, file manipulation, and power-user shortcuts.',
  },
  {
    id: 'git-essentials',
    title: 'Git Essentials',
    description: 'Local version control: init, add, commit, and status.',
  },
  {
    id: 'github-collaboration',
    title: 'GitHub & Collaboration',
    description: 'Remote repos: push, pull, forking, and handling Pull Requests.',
  },
  {
    id: 'merge-conflicts',
    title: 'Solving Merge Conflicts',
    description: 'A dedicated deep dive into the "scariest" part of Git.',
  },
  {
    id: 'markdown-for-devs',
    title: 'Markdown for Devs',
    description: 'Writing professional Documentation and README files.',
  },
]
