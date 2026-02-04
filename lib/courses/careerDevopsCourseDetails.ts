export type CareerDevopsCourseDetail = {
  id: string
  title: string
  description: string
  overview: string
  outcomes: string[]
  outline: string[]
}

export const careerDevopsCourseDetails: Record<string, CareerDevopsCourseDetail> = {
  'career-vercel-netlify-deploy': {
    id: 'career-vercel-netlify-deploy',
    title: 'Vercel & Netlify Deployment',
    description: 'From local code to a live URL in seconds.',
    overview:
      'Ship frontends and full-stack apps from Git with deploy previews, environment variables, and custom domains. This outline is a preview while full lessons are in production.',
    outcomes: [
      'Deploy projects from a Git repository with production and preview builds.',
      'Configure build settings, environment variables, and secrets safely.',
      'Set up custom domains, redirects, and rollbacks with confidence.',
    ],
    outline: [
      'Choosing a platform: Vercel vs Netlify.',
      'Connecting Git and setting build commands.',
      'Environment variables and secret management.',
      'Preview deploys and branch-based workflows.',
      'Custom domains, redirects, and rollback strategy.',
    ],
  },
  'career-cicd-github-actions': {
    id: 'career-cicd-github-actions',
    title: 'CI/CD with GitHub Actions',
    description: 'Automating your testing and deployment.',
    overview:
      'Automate tests, linting, and deploys with repeatable workflows. This outline is a preview while exercises are being finalized.',
    outcomes: [
      'Create workflows that run on pull requests and main branch pushes.',
      'Cache dependencies to keep pipelines fast and reliable.',
      'Gate deploys with tests, checks, and secrets.',
    ],
    outline: [
      'Workflow anatomy: triggers, jobs, and steps.',
      'Testing and linting pipelines for PRs.',
      'Caching dependencies and artifacts.',
      'Managing secrets and environment variables.',
      'Deploying on main with approvals and rollbacks.',
    ],
  },
  'career-linux-server-admin': {
    id: 'career-linux-server-admin',
    title: 'Linux Server Admin',
    description: 'Managing your own VPS (Ubuntu/Debian).',
    overview:
      'Learn the essential commands and routines for running a VPS in production. This outline is a preview while labs are being built.',
    outcomes: [
      'Secure SSH access and manage users safely.',
      'Install, update, and monitor core services.',
      'Troubleshoot issues with logs and system tools.',
    ],
    outline: [
      'Provisioning a server and setting up SSH.',
      'Users, permissions, and sudo hygiene.',
      'Package updates, systemd, and service health.',
      'Firewalls, fail2ban, and basic hardening.',
      'Logs, backups, and recovery playbooks.',
    ],
  },
  'career-cybersecurity-web': {
    id: 'career-cybersecurity-web',
    title: 'Cybersecurity for Web',
    description: 'Preventing SQL injection, XSS, and CSRF attacks.',
    overview:
      'Protect your apps with practical defenses against the most common web threats. This outline is a preview while labs are being finalized.',
    outcomes: [
      'Identify common attack vectors and apply the right mitigation.',
      'Harden authentication, sessions, and input handling.',
      'Add security headers and policies that reduce risk.',
    ],
    outline: [
      'Threat modeling for web apps.',
      'SQL injection, XSS, and CSRF defenses.',
      'Auth, session security, and rate limiting.',
      'Security headers and CSP basics.',
      'Security checklists and ongoing monitoring.',
    ],
  },
  'career-uiux-non-designers': {
    id: 'career-uiux-non-designers',
    title: 'UI/UX for Non-Designers',
    description: 'Making apps that do not look "ugly."',
    overview:
      'Design with clarity using simple systems for spacing, type, and contrast. This outline is a preview while templates are being refined.',
    outcomes: [
      'Build a consistent layout system with spacing and alignment.',
      'Choose typography that improves readability and hierarchy.',
      'Apply color and contrast rules that improve usability.',
    ],
    outline: [
      'Visual hierarchy and spacing systems.',
      'Typography scales and pairing basics.',
      'Color palettes and contrast checks.',
      'Component consistency and states.',
      'Usability checks and quick iteration loops.',
    ],
  },
  'career-unit-testing-jest': {
    id: 'career-unit-testing-jest',
    title: 'Unit Testing with Jest',
    description: 'Writing code that tests your code.',
    overview:
      'Write reliable tests that protect your codebase as it grows. This outline is a preview while exercises are being built.',
    outcomes: [
      'Structure unit tests with clear arrange, act, assert patterns.',
      'Mock dependencies and isolate logic for predictable tests.',
      'Integrate test runs into CI for fast feedback.',
    ],
    outline: [
      'Test anatomy and naming conventions.',
      'Mocking functions, modules, and network calls.',
      'Async testing patterns and timers.',
      'Coverage, snapshots, and tradeoffs.',
      'Running tests in CI and gating merges.',
    ],
  },
  'career-technical-interview-prep': {
    id: 'career-technical-interview-prep',
    title: 'Technical Interview Prep',
    description: 'Cracking the coding interview and DSA basics.',
    overview:
      'Build confident problem-solving habits with core data structures and patterns. This outline is a preview while drills are being finalized.',
    outcomes: [
      'Recognize common problem patterns and apply the right strategy.',
      'Communicate tradeoffs using Big-O notation.',
      'Prepare for behavioral and system design prompts.',
    ],
    outline: [
      'Core data structures and Big-O review.',
      'Pattern practice: two pointers, sliding window, recursion.',
      'Graphs, trees, and dynamic programming basics.',
      'System design mini-patterns and tradeoffs.',
      'Behavioral prep and storytelling frameworks.',
    ],
  },
  'career-freelancing-high-ticket': {
    id: 'career-freelancing-high-ticket',
    title: 'Freelancing & High-Ticket Sales',
    description: 'Finding and closing 5-figure dev clients.',
    overview:
      'Position yourself, sell outcomes, and deliver premium projects. This outline is a preview while templates are in progress.',
    outcomes: [
      'Define a clear niche and value proposition.',
      'Run discovery calls that uncover business impact.',
      'Create proposals and pricing that protect scope.',
    ],
    outline: [
      'Positioning, niche selection, and proof points.',
      'Lead generation and warm outreach systems.',
      'Discovery calls and qualification frameworks.',
      'Proposal structure, pricing, and scope control.',
      'Delivery workflows, handoff, and retention.',
    ],
  },
  'career-personal-brand': {
    id: 'career-personal-brand',
    title: 'Building a Personal Brand',
    description: 'Using Twitter/LinkedIn to get job offers.',
    overview:
      'Turn your work into visibility with a repeatable content engine. This outline is a preview while examples are being curated.',
    outcomes: [
      'Build a profile that communicates your value quickly.',
      'Publish content that demonstrates expertise and credibility.',
      'Network consistently without burning out.',
    ],
    outline: [
      'Profile positioning and credibility signals.',
      'Content pillars and posting cadence.',
      'Showcasing case studies and wins.',
      'Networking, community, and outreach.',
      'Measuring impact and iterating strategy.',
    ],
  },
  'career-vibe-coding-era': {
    id: 'career-vibe-coding-era',
    title: 'The "Vibe Coding" Era',
    description: 'How to use AI coding assistants (Cursor/Claude) to build 10x faster.',
    overview:
      'Use modern AI tooling to accelerate delivery without sacrificing quality. This outline is a preview while workflows are being refined.',
    outcomes: [
      'Design prompt workflows that produce reliable output.',
      'Keep humans in the loop for review and safety.',
      'Build a repeatable AI-assisted development process.',
    ],
    outline: [
      'Prompting patterns for coding tasks.',
      'Agentic workflows and tool orchestration.',
      'Code review, testing, and guardrails.',
      'Speed vs quality tradeoffs and workflows.',
      'Building a personal AI productivity system.',
    ],
  },
}

export const getCareerDevopsCourseDetail = (courseId: string) =>
  careerDevopsCourseDetails[courseId]
