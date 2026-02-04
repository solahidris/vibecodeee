import type { CourseDetail, CourseExercise } from '@/lib/courses/types'

export type { CourseExercise }

export type CareerDevopsCourseDetail = CourseDetail

export const careerDevopsCourseDetails: Record<string, CareerDevopsCourseDetail> = {
  'career-vercel-netlify-deploy': {
    id: 'career-vercel-netlify-deploy',
    title: 'Vercel & Netlify Deployment',
    description: 'From local code to a live URL in seconds.',
    overview:
      'Ship frontends and full-stack apps from Git with deploy previews, environment variables, and custom domains. Each check validates the key ideas in your answer.',
    outcomes: [
      'Deploy projects from a Git repository with production and preview builds.',
      'Configure build settings, environment variables, and secrets safely.',
      'Set up custom domains, redirects, and rollbacks with confidence.',
    ],
    exercises: [
      {
        id: 'deploy-connect-git',
        title: 'Connect a Git Repository',
        instruction: 'Write a short note describing connecting a Git repo to Vercel or Netlify.',
        details: [
          'Mention Git and the repository.',
          'Include either Vercel or Netlify in your answer.',
        ],
        placeholder: 'Connect the Git repo to Vercel to enable deploys.',
        expected: {
          all: ['git', 'repo'],
          any: ['vercel', 'netlify'],
        },
        checkFor: ['git', 'repo', 'vercel/netlify'],
        success: 'Nice. That is the standard Git-to-deploy workflow.',
        failure: 'Include Git, the repo, and Vercel or Netlify.',
      },
      {
        id: 'deploy-build-command',
        title: 'Set the Build Command',
        instruction: 'Write the build command you would set for a Next.js app.',
        details: ['Use npm, yarn, or pnpm.', 'Include the word build.'],
        placeholder: 'npm run build',
        expected: {
          all: ['build'],
          any: ['npm\\s+run\\s+build', 'yarn\\s+build', 'pnpm\\s+build'],
        },
        checkFor: ['npm/yarn/pnpm build'],
        success: 'Perfect. That is a valid build command.',
        failure: 'Use a build command like npm run build, yarn build, or pnpm build.',
      },
      {
        id: 'deploy-env-var',
        title: 'Add an Environment Variable',
        instruction: 'Give a CLI command to add an environment variable.',
        details: ['Use vercel env add or netlify env:set.'],
        placeholder: 'vercel env add NEXT_PUBLIC_API_URL',
        expected: {
          all: ['env'],
          any: ['vercel\\s+env\\s+add', 'netlify\\s+env:set'],
        },
        checkFor: ['vercel env add', 'netlify env:set'],
        success: 'Great. That is the right workflow for secrets.',
        failure: 'Try vercel env add or netlify env:set with a key name.',
      },
    ],
  },
  'career-cicd-github-actions': {
    id: 'career-cicd-github-actions',
    title: 'CI/CD with GitHub Actions',
    description: 'Automating your testing and deployment.',
    overview:
      'Automate tests, linting, and deploys with repeatable workflows. Each check validates the key YAML tokens.',
    outcomes: [
      'Create workflows that run on pull requests and main branch pushes.',
      'Cache dependencies to keep pipelines fast and reliable.',
      'Gate deploys with tests, checks, and secrets.',
    ],
    exercises: [
      {
        id: 'cicd-trigger',
        title: 'Trigger on Push and PRs',
        instruction: 'Write a YAML snippet that runs on push and pull_request.',
        details: ['Include on:, push, and pull_request.'],
        placeholder: 'on:\n  push:\n  pull_request:',
        expected: {
          all: ['on', 'push', 'pull_request'],
        },
        checkFor: ['on', 'push', 'pull_request'],
        success: 'Correct. That will run on both events.',
        failure: 'Include on with push and pull_request triggers.',
      },
      {
        id: 'cicd-cache',
        title: 'Cache Dependencies',
        instruction: 'Add an actions/cache step with a path.',
        details: ['Mention actions/cache and a path.'],
        placeholder: 'uses: actions/cache@v4\nwith:\n  path: ~/.npm',
        expected: {
          all: ['actions/cache', 'path'],
        },
        checkFor: ['actions/cache', 'path'],
        success: 'Nice. Caching keeps builds fast.',
        failure: 'Include actions/cache and a path entry.',
      },
      {
        id: 'cicd-secrets',
        title: 'Use a Secret',
        instruction: 'Reference a secret named DEPLOY_TOKEN in a step.',
        details: ['Use the secrets context syntax.'],
        placeholder: 'DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}',
        expected: {
          all: ['secrets', 'DEPLOY_TOKEN'],
          any: [
            '\\$\\{\\{\\s*secrets\\.DEPLOY_TOKEN\\s*\\}\\}',
            'secrets\\.DEPLOY_TOKEN',
          ],
        },
        checkFor: ['secrets.DEPLOY_TOKEN'],
        success: 'Perfect. That is the right secrets syntax.',
        failure: 'Reference secrets.DEPLOY_TOKEN in your answer.',
      },
    ],
  },
  'career-linux-server-admin': {
    id: 'career-linux-server-admin',
    title: 'Linux Server Admin',
    description: 'Managing your own VPS (Ubuntu/Debian).',
    overview:
      'Learn the essential commands and routines for running a VPS in production. Each check validates the core commands.',
    outcomes: [
      'Secure SSH access and manage users safely.',
      'Install, update, and monitor core services.',
      'Troubleshoot issues with logs and system tools.',
    ],
    exercises: [
      {
        id: 'linux-add-user',
        title: 'Create a Sudo User',
        instruction: 'Write commands to create a new user and grant sudo.',
        details: ['Use adduser/useradd and usermod or gpasswd.'],
        placeholder: 'sudo adduser deploy && sudo usermod -aG sudo deploy',
        expected: {
          all: ['adduser|useradd', '(usermod|gpasswd)', 'sudo'],
        },
        checkFor: ['adduser/useradd', 'usermod/gpasswd', 'sudo'],
        success: 'Great. That is the standard sudo user setup.',
        failure: 'Include adduser/useradd and usermod or gpasswd with sudo.',
      },
      {
        id: 'linux-ufw',
        title: 'Enable the Firewall',
        instruction: 'Allow SSH with UFW and enable it.',
        details: ['Use ufw allow OpenSSH and ufw enable.'],
        placeholder: 'sudo ufw allow OpenSSH && sudo ufw enable',
        expected: {
          all: ['ufw', 'allow', 'openssh', 'enable'],
        },
        checkFor: ['ufw allow OpenSSH', 'ufw enable'],
        success: 'Nice. That locks down the server safely.',
        failure: 'Include ufw allow OpenSSH and ufw enable.',
      },
      {
        id: 'linux-systemctl',
        title: 'Check a Service',
        instruction: 'Use systemctl to check a service status.',
        details: ['Use systemctl status <service>.'],
        placeholder: 'sudo systemctl status nginx',
        expected: {
          all: ['systemctl', 'status'],
        },
        checkFor: ['systemctl status'],
        success: 'Correct. That is the standard status check.',
        failure: 'Use systemctl status with a service name.',
      },
    ],
  },
  'career-cybersecurity-web': {
    id: 'career-cybersecurity-web',
    title: 'Cybersecurity for Web',
    description: 'Preventing SQL injection, XSS, and CSRF attacks.',
    overview:
      'Protect your apps with practical defenses against the most common web threats. Each check looks for the core security idea.',
    outcomes: [
      'Identify common attack vectors and apply the right mitigation.',
      'Harden authentication, sessions, and input handling.',
      'Add security headers and policies that reduce risk.',
    ],
    exercises: [
      {
        id: 'security-parameterized',
        title: 'Use a Parameterized Query',
        instruction: 'Write a query that uses a placeholder parameter.',
        details: ['Include SELECT and a placeholder like $1 or ?.'],
        placeholder: 'SELECT * FROM users WHERE email = $1',
        expected: {
          all: ['select', 'where'],
          any: ['\\$1', '\\?'],
        },
        checkFor: ['SELECT', '$1/?'],
        success: 'Nice. Placeholders prevent SQL injection.',
        failure: 'Include SELECT and a placeholder like $1 or ?.',
      },
      {
        id: 'security-csrf',
        title: 'Add a CSRF Token',
        instruction: 'Describe adding a CSRF token to a form.',
        details: ['Include the words csrf and token.'],
        placeholder: 'Add a hidden input with the csrf token.',
        expected: {
          all: ['csrf', 'token'],
        },
        checkFor: ['csrf', 'token'],
        success: 'Correct. Tokens help block CSRF.',
        failure: 'Mention csrf and token in your answer.',
      },
      {
        id: 'security-headers',
        title: 'Set a Security Header',
        instruction: 'Name one security header you would set.',
        details: ['Examples: Content-Security-Policy, X-Frame-Options, HSTS.'],
        placeholder: 'Content-Security-Policy: default-src \'self\'',
        expected: {
          any: [
            'content-security-policy',
            'x-frame-options',
            'strict-transport-security',
            'referrer-policy',
          ],
        },
        checkFor: ['CSP/X-Frame-Options/HSTS'],
        success: 'Great. Security headers reduce attack surface.',
        failure: 'Name a known security header like CSP or HSTS.',
      },
    ],
  },
  'career-uiux-non-designers': {
    id: 'career-uiux-non-designers',
    title: 'UI/UX for Non-Designers',
    description: 'Making apps that do not look "ugly."',
    overview:
      'Design with clarity using simple systems for spacing, type, and contrast. Each check validates the core rule of thumb.',
    outcomes: [
      'Build a consistent layout system with spacing and alignment.',
      'Choose typography that improves readability and hierarchy.',
      'Apply color and contrast rules that improve usability.',
    ],
    exercises: [
      {
        id: 'uiux-spacing',
        title: 'Define a Spacing Scale',
        instruction: 'Write a spacing scale using 4px or 8px increments.',
        details: ['Include at least three values.'],
        placeholder: '4px, 8px, 16px, 24px',
        expected: {
          all: ['16px'],
          any: ['4px', '8px'],
        },
        checkFor: ['4px/8px', '16px'],
        success: 'Nice. A spacing scale keeps layouts consistent.',
        failure: 'Include 16px and either 4px or 8px.',
      },
      {
        id: 'uiux-type-scale',
        title: 'Create a Type Scale',
        instruction: 'Write a simple type scale with a base and two steps.',
        details: ['Include 16px and 24px or 32px.'],
        placeholder: '16px, 20px, 24px',
        expected: {
          all: ['16px'],
          any: ['24px', '32px'],
        },
        checkFor: ['16px', '24px/32px'],
        success: 'Great. That is a readable type scale.',
        failure: 'Include 16px and a larger step like 24px or 32px.',
      },
      {
        id: 'uiux-contrast',
        title: 'State the Contrast Minimum',
        instruction: 'Write the minimum contrast ratio for body text.',
        details: ['Use 4.5:1.'],
        placeholder: 'Minimum contrast ratio: 4.5:1',
        expected: {
          all: ['4\\.5\\s*:\\s*1'],
        },
        checkFor: ['4.5:1'],
        success: 'Correct. That is the WCAG AA minimum.',
        failure: 'Use the 4.5:1 contrast ratio in your answer.',
      },
    ],
  },
  'career-unit-testing-jest': {
    id: 'career-unit-testing-jest',
    title: 'Unit Testing with Jest',
    description: 'Writing code that tests your code.',
    overview:
      'Write reliable tests that protect your codebase as it grows. Each check validates the Jest pattern.',
    outcomes: [
      'Structure unit tests with clear arrange, act, assert patterns.',
      'Mock dependencies and isolate logic for predictable tests.',
      'Integrate test runs into CI for fast feedback.',
    ],
    exercises: [
      {
        id: 'jest-skeleton',
        title: 'Write a Test Skeleton',
        instruction: 'Create a Jest skeleton using describe and it or test.',
        details: ['Use describe and it/test.'],
        placeholder: "describe('sum', () => { it('adds', () => {}) })",
        expected: {
          all: ['describe'],
          any: ['\\bit\\b', '\\btest\\b'],
        },
        checkFor: ['describe', 'it/test'],
        success: 'Nice. That is a valid Jest skeleton.',
        failure: 'Include describe and it/test in your answer.',
      },
      {
        id: 'jest-mock',
        title: 'Mock a Function',
        instruction: 'Create a mock function using Jest.',
        details: ['Use jest.fn().'],
        placeholder: 'const fetchUser = jest.fn()',
        expected: {
          all: ['jest\\.fn'],
        },
        checkFor: ['jest.fn()'],
        success: 'Correct. That is a Jest mock function.',
        failure: 'Use jest.fn() to create a mock.',
      },
      {
        id: 'jest-run',
        title: 'Run the Tests',
        instruction: 'Write a command to run Jest tests.',
        details: ['Use npm test, npx jest, yarn test, or pnpm test.'],
        placeholder: 'npx jest',
        expected: {
          any: [
            'npm\\s+test',
            'npx\\s+jest',
            'yarn\\s+test',
            'pnpm\\s+test',
          ],
        },
        checkFor: ['npm test', 'npx jest', 'yarn test', 'pnpm test'],
        success: 'Great. That will run your tests.',
        failure: 'Use npm test, npx jest, yarn test, or pnpm test.',
      },
    ],
  },
  'career-technical-interview-prep': {
    id: 'career-technical-interview-prep',
    title: 'Technical Interview Prep',
    description: 'Cracking the coding interview and DSA basics.',
    overview:
      'Build confident problem-solving habits with core data structures and patterns. Each check validates a key concept.',
    outcomes: [
      'Recognize common problem patterns and apply the right strategy.',
      'Communicate tradeoffs using Big-O notation.',
      'Prepare for behavioral and system design prompts.',
    ],
    exercises: [
      {
        id: 'interview-big-o',
        title: 'State a Big-O',
        instruction: 'Write the Big-O for array index access.',
        details: ['Use O(1).'],
        placeholder: 'O(1)',
        expected: {
          all: ['O\\(1\\)'],
        },
        checkFor: ['O(1)'],
        success: 'Correct. Array index access is O(1).',
        failure: 'Use O(1) for array index access.',
      },
      {
        id: 'interview-pattern',
        title: 'Name a Pattern',
        instruction: 'Name a common coding interview pattern.',
        details: ['Examples: two pointers, sliding window, BFS, DFS.'],
        placeholder: 'Two pointers',
        expected: {
          any: [
            'two\\s*pointers',
            'sliding\\s*window',
            '\\bbfs\\b',
            '\\bdfs\\b',
            'binary\\s*search',
          ],
        },
        checkFor: ['two pointers', 'sliding window', 'BFS/DFS'],
        success: 'Nice. That pattern shows up often.',
        failure: 'Name a pattern like two pointers or BFS/DFS.',
      },
      {
        id: 'interview-steps',
        title: 'Outline Your Steps',
        instruction: 'List the steps: clarify, plan, code, test.',
        details: ['Include all four words.'],
        placeholder: 'Clarify, plan, code, test.',
        expected: {
          all: ['clarify', 'plan', 'code', 'test'],
        },
        checkFor: ['clarify', 'plan', 'code', 'test'],
        success: 'Great. That is a solid interview flow.',
        failure: 'Include clarify, plan, code, and test.',
      },
    ],
  },
  'career-freelancing-high-ticket': {
    id: 'career-freelancing-high-ticket',
    title: 'Freelancing & High-Ticket Sales',
    description: 'Finding and closing 5-figure dev clients.',
    overview:
      'Position yourself, sell outcomes, and deliver premium projects. Each check validates the core sales habit.',
    outcomes: [
      'Define a clear niche and value proposition.',
      'Run discovery calls that uncover business impact.',
      'Create proposals and pricing that protect scope.',
    ],
    exercises: [
      {
        id: 'freelance-value-prop',
        title: 'Write a Value Proposition',
        instruction: 'Write a one-line value proposition using the word help.',
        details: ['Include help and an outcome verb like increase or reduce.'],
        placeholder: 'I help SaaS teams reduce churn with onboarding redesigns.',
        expected: {
          all: ['help'],
          any: ['increase', 'reduce', 'grow', 'improve', 'boost', 'save'],
        },
        checkFor: ['help', 'outcome verb'],
        success: 'Nice. That communicates value clearly.',
        failure: 'Include help and an outcome word like increase or reduce.',
      },
      {
        id: 'freelance-discovery',
        title: 'Ask Discovery Questions',
        instruction: 'List two discovery questions about budget and timeline.',
        details: ['Include both budget and timeline.'],
        placeholder: 'What is your budget? What is your timeline?',
        expected: {
          all: ['budget', 'timeline'],
        },
        checkFor: ['budget', 'timeline'],
        success: 'Great. Those questions clarify fit fast.',
        failure: 'Include both budget and timeline.',
      },
      {
        id: 'freelance-proposal',
        title: 'Outline Proposal Sections',
        instruction: 'Name key sections in a proposal.',
        details: ['Include scope and either timeline or pricing.'],
        placeholder: 'Scope, timeline, pricing',
        expected: {
          all: ['scope'],
          any: ['timeline', 'pricing', 'price', 'cost'],
        },
        checkFor: ['scope', 'timeline/pricing'],
        success: 'Nice. That is a strong proposal structure.',
        failure: 'Include scope and timeline or pricing.',
      },
    ],
  },
  'career-personal-brand': {
    id: 'career-personal-brand',
    title: 'Building a Personal Brand',
    description: 'Using Twitter/LinkedIn to get job offers.',
    overview:
      'Turn your work into visibility with a repeatable content engine. Each check validates a simple branding habit.',
    outcomes: [
      'Build a profile that communicates your value quickly.',
      'Publish content that demonstrates expertise and credibility.',
      'Network consistently without burning out.',
    ],
    exercises: [
      {
        id: 'brand-headline',
        title: 'Write a Headline',
        instruction: 'Write a headline in the format "I help X do Y".',
        details: ['Include the words I help.'],
        placeholder: 'I help founders ship faster with better onboarding.',
        expected: {
          all: ['i\\s+help'],
        },
        checkFor: ['I help'],
        success: 'Great. That is clear positioning.',
        failure: 'Use the phrase "I help" in your headline.',
      },
      {
        id: 'brand-cadence',
        title: 'Set a Posting Cadence',
        instruction: 'Describe a weekly posting cadence.',
        details: ['Include a number and the word week.'],
        placeholder: 'Post 3 times per week.',
        expected: {
          all: ['week'],
          any: ['\\b1\\b', '\\b2\\b', '\\b3\\b', '\\b4\\b', '\\b5\\b'],
        },
        checkFor: ['number', 'week'],
        success: 'Nice. Consistency builds trust over time.',
        failure: 'Include a number and the word week.',
      },
      {
        id: 'brand-cta',
        title: 'Write a Connection CTA',
        instruction: 'Write a simple call to action to connect.',
        details: ['Include connect, DM, or message.'],
        placeholder: 'Connect with me if you are hiring.',
        expected: {
          any: ['connect', '\\bdm\\b', 'message'],
        },
        checkFor: ['connect/DM/message'],
        success: 'Perfect. That makes it easy to respond.',
        failure: 'Include connect, DM, or message in your CTA.',
      },
    ],
  },
  'career-vibe-coding-era': {
    id: 'career-vibe-coding-era',
    title: 'The "Vibe Coding" Era',
    description: 'How to use AI coding assistants (Cursor/Claude) to build 10x faster.',
    overview:
      'Use modern AI tooling to accelerate delivery without sacrificing quality. Each check validates a safe workflow step.',
    outcomes: [
      'Design prompt workflows that produce reliable output.',
      'Keep humans in the loop for review and safety.',
      'Build a repeatable AI-assisted development process.',
    ],
    exercises: [
      {
        id: 'vibe-prompt-structure',
        title: 'Structure a Prompt',
        instruction: 'Write a prompt structure including context, constraints, and output.',
        details: ['Include the words context, constraints, and output.'],
        placeholder: 'Context: ...\nConstraints: ...\nOutput: ...',
        expected: {
          all: ['context', 'constraints', 'output'],
        },
        checkFor: ['context', 'constraints', 'output'],
        success: 'Nice. Clear prompts drive better results.',
        failure: 'Include context, constraints, and output.',
      },
      {
        id: 'vibe-guardrails',
        title: 'Add Guardrails',
        instruction: 'State a guardrail that includes review or tests.',
        details: ['Mention review or tests/testing.'],
        placeholder: 'Always run tests and do a code review.',
        expected: {
          any: ['review', 'tests', 'testing'],
        },
        checkFor: ['review/tests'],
        success: 'Correct. Guardrails keep quality high.',
        failure: 'Mention review or tests in your answer.',
      },
      {
        id: 'vibe-tool',
        title: 'Name a Tool',
        instruction: 'Name one AI coding tool you would use.',
        details: ['Examples: Cursor, Claude, Copilot.'],
        placeholder: 'Cursor',
        expected: {
          any: ['cursor', 'claude', 'copilot', 'chatgpt', 'codeium'],
        },
        checkFor: ['Cursor/Claude/Copilot'],
        success: 'Great. That tool fits the workflow.',
        failure: 'Name a tool like Cursor, Claude, or Copilot.',
      },
    ],
  },
}

export const getCareerDevopsCourseDetail = (courseId: string) =>
  careerDevopsCourseDetails[courseId]
