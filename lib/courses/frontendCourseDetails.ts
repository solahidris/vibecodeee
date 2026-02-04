export type CourseExercise = {
  id: string
  title: string
  instruction: string
  details: string[]
  placeholder: string
  expected: {
    all?: string[]
    any?: string[]
  }
  checkFor: string[]
  success: string
  failure: string
}

export type FrontendCourseDetail = {
  id: string
  title: string
  description: string
  overview: string
  outcomes: string[]
  exercises: CourseExercise[]
}

export const frontendCourseDetails: Record<string, FrontendCourseDetail> = {
  'frontend-html5': {
    id: 'frontend-html5',
    title: 'HTML5 & Semantic Web',
    description:
      'Go beyond <div> tags with semantic landmarks, accessible forms, and metadata that helps users and search engines. Build page skeletons that read cleanly for people and bots.',
    overview:
      'Practice semantic HTML, accessibility, and metadata patterns that help both users and search engines. Each check is text-only validation.',
    outcomes: [
      'Structure pages with semantic landmarks and meaningful sections.',
      'Write accessible markup for images and form controls.',
      'Add basic SEO metadata with titles and descriptions.',
    ],
    exercises: [
      {
        id: 'html5-semantic-structure',
        title: 'Build a Semantic Page Skeleton',
        instruction:
          'Write a minimal HTML snippet that includes header, nav, main, and footer elements.',
        details: [
          'Use the semantic tags directly (no div replacements).',
          'Any order is fine as long as all tags are present.',
        ],
        placeholder: '<header>...</header>\n<nav>...</nav>\n<main>...</main>\n<footer>...</footer>',
        expected: {
          all: ['<\\s*header\\b', '<\\s*nav\\b', '<\\s*main\\b', '<\\s*footer\\b'],
        },
        checkFor: ['<header>', '<nav>', '<main>', '<footer>'],
        success: 'Great. That is a proper semantic skeleton.',
        failure: 'Include header, nav, main, and footer tags.',
      },
      {
        id: 'html5-accessible-image',
        title: 'Add an Accessible Image',
        instruction: 'Write an img tag with both src and alt text.',
        details: [
          'Alt text must be descriptive, not empty.',
          'Any image URL is fine.',
        ],
        placeholder: '<img src="/hero.jpg" alt="Product hero" />',
        expected: {
          all: [
            '<\\s*img\\b',
            'src\\s*=\\s*[^\\s>]+',
            'alt\\s*=\\s*[^\\s>]+',
          ],
        },
        checkFor: ['<img>', 'src="..."', 'alt="..."'],
        success: 'Nice. That image is accessible and informative.',
        failure: 'Include both src and a non-empty alt attribute.',
      },
      {
        id: 'html5-form-labels',
        title: 'Connect Labels to Inputs',
        instruction:
          'Create a label connected to an email input using for and id.',
        details: [
          'Use the value "email" for both the label for attribute and the input id.',
          'Add a type="email" if you want bonus clarity.',
        ],
        placeholder:
          '<label for="email">Email</label>\n<input id="email" type="email" />',
        expected: {
          all: [
            '<\\s*label[^>]*for\\s*=\\s*["\"]email["\"]',
            '<\\s*input[^>]*id\\s*=\\s*["\"]email["\"]',
          ],
          any: ['type\\s*=\\s*["\"]email["\"]', 'name\\s*=\\s*["\"]email["\"]'],
        },
        checkFor: ['label for="email"', 'input id="email"', 'type="email"'],
        success: 'Perfect. That label is properly connected.',
        failure: 'Make sure the label for and input id both use "email".',
      },
      {
        id: 'html5-seo-meta',
        title: 'Add SEO Metadata',
        instruction:
          'Write a title tag and a meta description tag for the page.',
        details: [
          'Use a short, descriptive title.',
          'Include a meta description with content text.',
        ],
        placeholder:
          '<title>Acme Store</title>\n<meta name="description" content="Shop modern essentials." />',
        expected: {
          all: [
            '<\\s*title\\b',
            '<\\s*meta[^>]*name\\s*=\\s*["\"]description["\"]',
            'content\\s*=\\s*[^\\s>]+',
          ],
        },
        checkFor: ['<title>', 'meta name="description"', 'content="..."'],
        success: 'Nice. Metadata helps with SEO and previews.',
        failure: 'Include both a title tag and a meta description with content.',
      },
    ],
  },
  'frontend-css-layouts': {
    id: 'frontend-css-layouts',
    title: 'CSS Flexbox & Grid',
    description:
      'Design resilient layouts with Flexbox and Grid, from nav bars to complex dashboards. Learn alignment, spacing, and responsive patterns that scale.',
    overview:
      'Use Flexbox and Grid to build stable, responsive layouts without extra wrapper divs. Each check is text-only validation.',
    outcomes: [
      'Create horizontal and vertical layouts with Flexbox.',
      'Define grid columns and spacing for consistent UI structure.',
      'Apply alignment and gap utilities that scale with content.',
    ],
    exercises: [
      {
        id: 'css-flex-container',
        title: 'Create a Flex Container',
        instruction:
          'Write CSS that sets a container to flex and spreads items apart.',
        details: [
          'Use display: flex.',
          'Use justify-content: space-between.',
        ],
        placeholder: '.toolbar {\n  display: flex;\n  justify-content: space-between;\n}',
        expected: {
          all: ['display\\s*:\\s*flex', 'justify-content\\s*:\\s*space-between'],
        },
        checkFor: ['display: flex', 'justify-content: space-between'],
        success: 'Great. That is a classic flex layout.',
        failure: 'Include display: flex and justify-content: space-between.',
      },
      {
        id: 'css-flex-align',
        title: 'Center Items on the Cross Axis',
        instruction: 'Write CSS that vertically centers items in a flex row.',
        details: [
          'Use align-items: center.',
          'The container should be a flex container.',
        ],
        placeholder: '.row {\n  display: flex;\n  align-items: center;\n}',
        expected: {
          all: ['display\\s*:\\s*flex', 'align-items\\s*:\\s*center'],
        },
        checkFor: ['display: flex', 'align-items: center'],
        success: 'Nice. Items are centered on the cross axis.',
        failure: 'Use align-items: center on a flex container.',
      },
      {
        id: 'css-grid-columns',
        title: 'Create a 3-Column Grid',
        instruction: 'Write CSS that defines a 3-column grid layout.',
        details: [
          'Set display: grid.',
          'Use repeat(3, 1fr) or three 1fr columns.',
        ],
        placeholder:
          '.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}',
        expected: {
          all: ['display\\s*:\\s*grid'],
          any: [
            'grid-template-columns\\s*:\\s*repeat\\(\\s*3\\s*,\\s*1fr\\s*\\)',
            'grid-template-columns\\s*:\\s*1fr\\s+1fr\\s+1fr',
          ],
        },
        checkFor: ['display: grid', 'grid-template-columns: repeat(3, 1fr)'],
        success: 'Perfect. Three columns set up.',
        failure: 'Add display: grid and a 3-column template.',
      },
      {
        id: 'css-grid-gap',
        title: 'Add Consistent Spacing',
        instruction: 'Add a gap to a grid or flex container.',
        details: [
          'Use the gap property with a numeric value.',
          'Any unit is acceptable (px, rem, etc.).',
        ],
        placeholder: '.cards {\n  display: grid;\n  gap: 16px;\n}',
        expected: {
          all: ['gap\\s*:\\s*\\d+'],
        },
        checkFor: ['gap: 16px'],
        success: 'Nice. Gap creates consistent spacing.',
        failure: 'Include a gap value like gap: 16px.',
      },
    ],
  },
  'frontend-tailwind-advanced': {
    id: 'frontend-tailwind-advanced',
    title: 'Advanced Tailwind CSS',
    description:
      'Move past utility basics with configuration, custom themes, and component patterns. Master plugins, variants, and dark mode strategies for production UIs.',
    overview:
      'Customize Tailwind to match a brand system and scale it across components. Each check is text-only validation.',
    outcomes: [
      'Extend Tailwind theme tokens for brand color systems.',
      'Enable plugins and dark mode configuration.',
      'Compose reusable component styles with @layer and @apply.',
    ],
    exercises: [
      {
        id: 'tailwind-extend-theme',
        title: 'Extend the Theme',
        instruction:
          'Add a brand color inside theme.extend.colors in tailwind.config.js.',
        details: [
          'Include theme, extend, and colors keys.',
          'Name the color "brand".',
        ],
        placeholder:
          'module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        brand: "#0f172a"\n      }\n    }\n  }\n}',
        expected: {
          all: ['theme\\s*:', 'extend\\s*:', 'colors\\s*:', 'brand'],
        },
        checkFor: ['theme', 'extend', 'colors', 'brand'],
        success: 'Great. Theme tokens are extended.',
        failure: 'Include theme.extend.colors.brand in the config.',
      },
      {
        id: 'tailwind-plugin',
        title: 'Enable a Tailwind Plugin',
        instruction:
          'Add a Tailwind plugin to the plugins array (like @tailwindcss/forms).',
        details: [
          'Use require(...) inside plugins.',
          'Any official Tailwind plugin name is fine.',
        ],
        placeholder:
          'module.exports = {\n  plugins: [require("@tailwindcss/forms")],\n}',
        expected: {
          all: ['plugins\\s*:', 'require\\s*\\(', 'tailwindcss'],
        },
        checkFor: ['plugins', 'require(...)', '@tailwindcss/...'],
        success: 'Nice. The plugin is registered.',
        failure: 'Add a plugin with require inside plugins: [ ... ].',
      },
      {
        id: 'tailwind-dark-mode',
        title: 'Set Up Dark Mode',
        instruction:
          'Configure dark mode to use the class strategy and show one dark: utility.',
        details: [
          'Set darkMode: "class" in config.',
          'Use a class like dark:bg-slate-900 in your snippet.',
        ],
        placeholder:
          'module.exports = {\n  darkMode: "class"\n}\n\n<div className="bg-white dark:bg-slate-900">...</div>',
        expected: {
          all: ['darkMode\\s*:\\s*["\"]class["\"]', 'dark:'],
        },
        checkFor: ['darkMode: "class"', 'dark:...'],
        success: 'Great. Dark mode is enabled and used.',
        failure: 'Include darkMode: "class" and a dark: utility.',
      },
      {
        id: 'tailwind-layer-apply',
        title: 'Create a Reusable Component Style',
        instruction:
          'Use @layer components and @apply to define a .card class.',
        details: [
          'The class name should be .card.',
          'Use @apply with at least two utilities.',
        ],
        placeholder:
          '@layer components {\n  .card {\n    @apply rounded-xl bg-white shadow;\n  }\n}',
        expected: {
          all: ['@layer\\s+components', '@apply', '\\.card'],
        },
        checkFor: ['@layer components', '.card', '@apply'],
        success: 'Nice. That is a reusable component pattern.',
        failure: 'Include @layer components, .card, and @apply.',
      },
    ],
  },
  'frontend-js-fundamentals': {
    id: 'frontend-js-fundamentals',
    title: 'JavaScript Fundamentals',
    description:
      'Build confidence in variables, functions, loops, and objects through practical UI examples. Strengthen the mental model behind events and data flow.',
    overview:
      'Practice the core JavaScript syntax used in every frontend codebase. Each check is text-only validation.',
    outcomes: [
      'Declare variables with let and const.',
      'Use loops and conditionals to control flow.',
      'Represent data with arrays and objects.',
    ],
    exercises: [
      {
        id: 'js-variables',
        title: 'Declare Variables',
        instruction: 'Write one let declaration and one const declaration.',
        details: [
          'Use both let and const.',
          'Any variable names are fine.',
        ],
        placeholder: 'let count = 0;\nconst appName = "Vibe";',
        expected: {
          all: ['\\blet\\b', '\\bconst\\b'],
        },
        checkFor: ['let', 'const'],
        success: 'Great. Both declarations are present.',
        failure: 'Include one let and one const.',
      },
      {
        id: 'js-for-loop',
        title: 'Write a For Loop',
        instruction: 'Create a for loop that counts from 0 to 4.',
        details: [
          'Use for (...) syntax.',
          'Include an increment operator.',
        ],
        placeholder: 'for (let i = 0; i < 5; i++) {\n  console.log(i)\n}',
        expected: {
          all: ['\\bfor\\s*\\(', '\\+\\+'],
        },
        checkFor: ['for (...)', 'i++'],
        success: 'Nice. Loop syntax looks correct.',
        failure: 'Include a for (...) loop with i++.',
      },
      {
        id: 'js-data-types',
        title: 'Use Arrays and Objects',
        instruction: 'Create one array and one object.',
        details: [
          'The array can hold any values.',
          'The object should include at least one key-value pair.',
        ],
        placeholder: 'const tags = ["ui", "ux"];\nconst user = { name: "Rae" };',
        expected: {
          all: ['\\[', '\\]', '\\{\\s*\\w+\\s*:', '\\bconst\\b'],
        },
        checkFor: ['[ ... ]', '{ key: value }'],
        success: 'Great. Both data types are represented.',
        failure: 'Include an array and an object literal.',
      },
      {
        id: 'js-if-statement',
        title: 'Write a Conditional',
        instruction: 'Write an if statement that checks a condition.',
        details: [
          'Use if (...) syntax.',
          'Include a comparison operator like === or !==.',
        ],
        placeholder: 'if (status === "ready") {\n  startApp()\n}',
        expected: {
          all: ['\\bif\\s*\\('],
          any: ['===', '!==', '>=', '<='],
        },
        checkFor: ['if (...)', '=== or !=='],
        success: 'Nice. Conditional logic is in place.',
        failure: 'Include an if statement with a comparison operator.',
      },
    ],
  },
  'frontend-es6': {
    id: 'frontend-es6',
    title: 'ES6+ Modern JS',
    description:
      'Use modern syntax like destructuring, modules, and template literals to write cleaner code. Practice promises and async/await for real-world data loading.',
    overview:
      'Level up to ES6+ syntax that modern frontend teams use daily. Each check is text-only validation.',
    outcomes: [
      'Write arrow functions for concise callbacks.',
      'Use destructuring and spread for cleaner data handling.',
      'Create async functions with await.',
    ],
    exercises: [
      {
        id: 'es6-arrow',
        title: 'Create an Arrow Function',
        instruction: 'Write an arrow function assigned to a const.',
        details: [
          'Use the => syntax.',
          'Any parameter names are fine.',
        ],
        placeholder: 'const add = (a, b) => a + b;',
        expected: {
          all: ['\\bconst\\b', '=>'],
        },
        checkFor: ['const', '=>'],
        success: 'Great. Arrow function syntax is correct.',
        failure: 'Include a const and the => arrow.',
      },
      {
        id: 'es6-destructuring',
        title: 'Use Destructuring',
        instruction: 'Destructure two values from an object or array.',
        details: [
          'Use const with destructuring assignment.',
          'Pick any variable names you like.',
        ],
        placeholder: 'const { id, title } = post;',
        expected: {
          all: ['\\bconst\\b'],
          any: [
            '\\{\\s*\\w+\\s*,\\s*\\w+\\s*\\}\\s*=',
            '\\[\\s*\\w+\\s*,\\s*\\w+\\s*\\]\\s*=',
          ],
        },
        checkFor: ['const', '{ a, b } = ... or [a, b] = ...'],
        success: 'Nice. Destructuring is applied.',
        failure: 'Use const with object or array destructuring.',
      },
      {
        id: 'es6-spread',
        title: 'Use the Spread Operator',
        instruction: 'Create a new array using spread syntax.',
        details: [
          'Use ... inside an array literal.',
          'Any variable names are fine.',
        ],
        placeholder: 'const next = [...items, "new"];',
        expected: {
          all: ['\\.\\.\\.', '\\['],
        },
        checkFor: ['...', '[ ... ]'],
        success: 'Great. Spread syntax is correct.',
        failure: 'Include ... inside an array literal.',
      },
      {
        id: 'es6-async-await',
        title: 'Create an Async Function',
        instruction: 'Write an async function that awaits a promise.',
        details: [
          'Include the async keyword.',
          'Use await inside the function body.',
        ],
        placeholder: 'async function loadData() {\n  const data = await fetchData()\n}',
        expected: {
          all: ['\\basync\\b', '\\bawait\\b'],
        },
        checkFor: ['async', 'await'],
        success: 'Nice. Async and await are both present.',
        failure: 'Include both async and await.',
      },
    ],
  },
  'frontend-react-components': {
    id: 'frontend-react-components',
    title: 'React: Components & Props',
    description:
      'Create reusable components, compose layouts, and pass data with props. Learn how to structure a component tree that stays readable.',
    overview:
      'Practice creating React components and passing data through props. Each check is text-only validation.',
    outcomes: [
      'Define reusable React components.',
      'Pass and render props in JSX.',
      'Destructure and default props safely.',
    ],
    exercises: [
      {
        id: 'react-component-basic',
        title: 'Create a Component with Props',
        instruction:
          'Write a component named Tag that renders props.label inside JSX.',
        details: [
          'Use props.label inside the returned JSX.',
          'Any wrapper element is fine.',
        ],
        placeholder: 'function Tag(props) {\n  return <span>{props.label}</span>\n}',
        expected: {
          all: ['\\bTag\\b', '\\bprops\\b', 'props\\.\\w+', '<\\w+'],
        },
        checkFor: ['Tag', 'props.label', 'JSX'],
        success: 'Great. Component and props are wired up.',
        failure: 'Use props.label inside JSX in a Tag component.',
      },
      {
        id: 'react-pass-props',
        title: 'Pass Props to a Component',
        instruction: 'Show a Tag component usage with a label prop.',
        details: [
          'Use JSX syntax.',
          'Pass label as a string.',
        ],
        placeholder: '<Tag label="New" />',
        expected: {
          all: ['<\\s*Tag', 'label\\s*='],
        },
        checkFor: ['<Tag>', 'label="..."'],
        success: 'Nice. Props are passed correctly.',
        failure: 'Include a <Tag ...> with a label prop.',
      },
      {
        id: 'react-destructure-props',
        title: 'Destructure Props',
        instruction:
          'Update the Tag component to destructure the label prop.',
        details: [
          'Destructure in the parameter list.',
          'Use the label variable inside JSX.',
        ],
        placeholder: 'const Tag = ({ label }) => <span>{label}</span>;',
        expected: {
          all: ['\\bTag\\b', '\\{\\s*label\\s*\\}'],
        },
        checkFor: ['{ label }', 'label in JSX'],
        success: 'Great. Props are destructured.',
        failure: 'Destructure label in the component parameters.',
      },
      {
        id: 'react-default-props',
        title: 'Set a Default Prop Value',
        instruction:
          'Provide a default value for label in the Tag component.',
        details: [
          'Use a default value in destructuring or defaultProps.',
          'Any default text is fine.',
        ],
        placeholder:
          'function Tag({ label = "New" }) {\n  return <span>{label}</span>\n}',
        expected: {
          all: ['\\bTag\\b'],
          any: ['label\\s*=\\s*["\"][^"\
]+["\"]', 'defaultProps'],
        },
        checkFor: ['label = "..."', 'defaultProps'],
        success: 'Nice. Default props are set.',
        failure: 'Add a default value for label or use defaultProps.',
      },
    ],
  },
  'frontend-react-state': {
    id: 'frontend-react-state',
    title: 'React: State & Effects',
    description:
      'Handle interactive UI with useState, useEffect, and derived state patterns. Learn to avoid common pitfalls like stale data and extra renders.',
    overview:
      'Practice the hooks that power dynamic React UIs. Each check is text-only validation.',
    outcomes: [
      'Declare component state with useState.',
      'Update state based on user actions.',
      'Run effects and clean them up when needed.',
    ],
    exercises: [
      {
        id: 'react-use-state',
        title: 'Create State with useState',
        instruction: 'Write a useState hook for a count value.',
        details: [
          'Use array destructuring.',
          'Initialize the state to 0.',
        ],
        placeholder: 'const [count, setCount] = useState(0);',
        expected: {
          all: ['useState\\s*\\('],
        },
        checkFor: ['useState(...)'],
        success: 'Great. State is initialized.',
        failure: 'Include a useState(...) declaration.',
      },
      {
        id: 'react-update-state',
        title: 'Update State',
        instruction: 'Call the state setter to increment count by 1.',
        details: [
          'Use the setter function.',
          'Any event handler is fine.',
        ],
        placeholder: 'setCount(count + 1);',
        expected: {
          all: ['setCount\\s*\\('],
        },
        checkFor: ['setCount(...)'],
        success: 'Nice. State updates are wired.',
        failure: 'Call the setter function like setCount(...).',
      },
      {
        id: 'react-use-effect',
        title: 'Use an Effect with Dependencies',
        instruction: 'Write a useEffect with a dependency array.',
        details: [
          'Include useEffect(() => { ... }, [deps]).',
          'The dependency array can include any variable.',
        ],
        placeholder: 'useEffect(() => {\n  document.title = count\n}, [count]);',
        expected: {
          all: ['useEffect\\s*\\(', '\\[[^\\]]*\\]'],
        },
        checkFor: ['useEffect(...)', '[deps]'],
        success: 'Great. Effect and deps are present.',
        failure: 'Include a useEffect call with a dependency array.',
      },
      {
        id: 'react-effect-cleanup',
        title: 'Add an Effect Cleanup',
        instruction: 'Return a cleanup function from useEffect.',
        details: [
          'Use return () => { ... } inside useEffect.',
          'Cleanup can be empty for this exercise.',
        ],
        placeholder:
          'useEffect(() => {\n  const id = setInterval(tick, 1000)\n  return () => clearInterval(id)\n}, []);',
        expected: {
          all: ['useEffect\\s*\\(', 'return\\s*\\(\\)\\s*=>'],
        },
        checkFor: ['return () => ...'],
        success: 'Nice. Cleanup function included.',
        failure: 'Return a cleanup function inside useEffect.',
      },
    ],
  },
  'frontend-nextjs-foundations': {
    id: 'frontend-nextjs-foundations',
    title: 'Next.js Foundations',
    description:
      'Understand file-based routing, layouts, and server rendering for SEO-friendly apps. Learn when to use SSR, SSG, and client-side rendering.',
    overview:
      'Cover the key building blocks of the Next.js pages router. Each check is text-only validation.',
    outcomes: [
      'Create pages with default exports.',
      'Link between routes with next/link.',
      'Fetch data server-side and set head metadata.',
    ],
    exercises: [
      {
        id: 'next-page-component',
        title: 'Create a Page Component',
        instruction:
          'Write a default-exported page component called Home.',
        details: [
          'Use export default function Home() {}.',
          'Return some JSX.',
        ],
        placeholder: 'export default function Home() {\n  return <main>Home</main>\n}',
        expected: {
          all: ['export\\s+default\\s+function', '<\\w+'],
        },
        checkFor: ['export default function', 'JSX return'],
        success: 'Great. Page component is ready.',
        failure: 'Include export default function and JSX.',
      },
      {
        id: 'next-link',
        title: 'Link Between Pages',
        instruction:
          'Import Link from next/link and create a link to /about.',
        details: [
          'Use the Link component in JSX.',
          'Include href="/about".',
        ],
        placeholder:
          'import Link from "next/link"\n\n<Link href="/about">About</Link>',
        expected: {
          all: ['next/link', '<\\s*Link', 'href\\s*='],
        },
        checkFor: ['next/link', '<Link href="/about">'],
        success: 'Nice. Link is set up correctly.',
        failure: 'Import Link and use it with href="/about".',
      },
      {
        id: 'next-getserversideprops',
        title: 'Fetch Data Server-Side',
        instruction:
          'Write a getServerSideProps function that returns props.',
        details: [
          'Use export async function getServerSideProps().',
          'Return an object with a props key.',
        ],
        placeholder:
          'export async function getServerSideProps() {\n  return { props: { time: Date.now() } }\n}',
        expected: {
          all: ['getServerSideProps', 'return\\s*\\{\\s*props'],
        },
        checkFor: ['getServerSideProps', 'return { props: ... }'],
        success: 'Great. Server-side props are returned.',
        failure: 'Include getServerSideProps with a props return.',
      },
      {
        id: 'next-head',
        title: 'Set Page Metadata',
        instruction: 'Import Head from next/head and set a title.',
        details: [
          'Use the Head component in JSX.',
          'Include a title tag inside.',
        ],
        placeholder:
          'import Head from "next/head"\n\n<Head>\n  <title>Store</title>\n</Head>',
        expected: {
          all: ['next/head', '<\\s*Head', '<\\s*title'],
        },
        checkFor: ['next/head', '<Head>', '<title>'],
        success: 'Nice. Head metadata is included.',
        failure: 'Import Head and add a title tag inside it.',
      },
    ],
  },
  'frontend-typescript': {
    id: 'frontend-typescript',
    title: 'TypeScript for Frontend',
    description:
      'Add strong typing to components, props, and API responses to catch bugs early. Learn interfaces, generics, and type narrowing you will use daily.',
    overview:
      'Apply TypeScript syntax that improves confidence in UI code. Each check is text-only validation.',
    outcomes: [
      'Define prop types for components.',
      'Annotate functions and return types.',
      'Use union types and typed hooks.',
    ],
    exercises: [
      {
        id: 'ts-props-interface',
        title: 'Define Component Props',
        instruction:
          'Create a type or interface with a label: string property.',
        details: [
          'Use either type or interface.',
          'Name can be ButtonProps or similar.',
        ],
        placeholder: 'type ButtonProps = {\n  label: string\n}',
        expected: {
          all: ['label\\s*:\\s*string'],
          any: ['\\binterface\\b', '\\btype\\b'],
        },
        checkFor: ['label: string', 'type or interface'],
        success: 'Great. Props are typed.',
        failure: 'Include label: string and use type or interface.',
      },
      {
        id: 'ts-function-annotation',
        title: 'Annotate a Function',
        instruction:
          'Write a function with number parameters and a number return type.',
        details: [
          'Include : number for parameters.',
          'Include a return type annotation.',
        ],
        placeholder: 'const sum = (a: number, b: number): number => a + b;',
        expected: {
          all: ['\\:\\s*number', '\\)\\s*:\\s*number'],
        },
        checkFor: ['a: number', '): number'],
        success: 'Nice. Function types are annotated.',
        failure: 'Add number annotations for params and return type.',
      },
      {
        id: 'ts-union-type',
        title: 'Create a Union Type',
        instruction: 'Define a type that allows multiple string literals.',
        details: [
          'Use the | operator in a type alias.',
          'Any string values are fine.',
        ],
        placeholder: 'type Status = "idle" | "loading" | "success";',
        expected: {
          all: ['\\btype\\s+\\w+', '\\|'],
        },
        checkFor: ['type', '|'],
        success: 'Great. Union type is defined.',
        failure: 'Use a type alias with | operators.',
      },
      {
        id: 'ts-typed-usestate',
        title: 'Type a useState Hook',
        instruction: 'Add a generic type to useState for a string value.',
        details: [
          'Use useState<string>(...).',
          'Any initial value is fine.',
        ],
        placeholder: 'const [name, setName] = useState<string>("");',
        expected: {
          all: ['useState<\\s*string\\s*>'],
        },
        checkFor: ['useState<string>'],
        success: 'Nice. The hook is typed.',
        failure: 'Add a generic type like useState<string>(...).',
      },
    ],
  },
  'frontend-performance': {
    id: 'frontend-performance',
    title: 'Web Performance',
    description:
      'Improve Core Web Vitals with smart loading, caching, and asset strategy. Speed up perceived performance with image, font, and bundle techniques.',
    overview:
      'Focus on quick wins that improve performance and Core Web Vitals. Each check is text-only validation.',
    outcomes: [
      'Lazy load non-critical assets.',
      'Prevent layout shift with explicit sizing.',
      'Load scripts and fonts in a performance-friendly way.',
    ],
    exercises: [
      {
        id: 'perf-lazy-image',
        title: 'Lazy Load an Image',
        instruction: 'Add loading="lazy" to an img tag.',
        details: [
          'Use an img element.',
          'Include loading="lazy".',
        ],
        placeholder: '<img src="/hero.jpg" loading="lazy" alt="Hero" />',
        expected: {
          all: ['<\\s*img\\b', 'loading\\s*=\\s*["\"]lazy["\"]'],
        },
        checkFor: ['<img>', 'loading="lazy"'],
        success: 'Great. Image lazy loading is enabled.',
        failure: 'Add loading="lazy" to the img tag.',
      },
      {
        id: 'perf-image-dimensions',
        title: 'Set Image Dimensions',
        instruction: 'Add width and height attributes to an img tag.',
        details: [
          'Include both width and height.',
          'Any numeric values are fine.',
        ],
        placeholder: '<img src="/hero.jpg" width="1200" height="800" alt="Hero" />',
        expected: {
          all: ['<\\s*img\\b', 'width\\s*=', 'height\\s*='],
        },
        checkFor: ['width', 'height'],
        success: 'Nice. Explicit dimensions reduce layout shift.',
        failure: 'Include both width and height attributes.',
      },
      {
        id: 'perf-defer-script',
        title: 'Defer Non-Critical JavaScript',
        instruction: 'Add defer or async to a script tag.',
        details: [
          'Use a script tag with a src attribute.',
          'Include either defer or async.',
        ],
        placeholder: '<script src="/analytics.js" defer></script>',
        expected: {
          all: ['<\\s*script\\b'],
          any: ['\\bdefer\\b', '\\basync\\b'],
        },
        checkFor: ['<script>', 'defer or async'],
        success: 'Great. Script loading is optimized.',
        failure: 'Add defer or async to a script tag.',
      },
      {
        id: 'perf-preload-font',
        title: 'Preload a Font',
        instruction: 'Add a preload link tag for a font file.',
        details: [
          'Use rel="preload" and as="font".',
          'Any font URL is fine.',
        ],
        placeholder:
          '<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />',
        expected: {
          all: [
            '<\\s*link\\b',
            'rel\\s*=\\s*["\"]preload["\"]',
            'as\\s*=\\s*["\"]font["\"]',
          ],
        },
        checkFor: ['rel="preload"', 'as="font"'],
        success: 'Nice. Preloading helps fonts render faster.',
        failure: 'Include rel="preload" and as="font" in a link tag.',
      },
    ],
  },
}

export const getFrontendCourseDetail = (courseId: string) =>
  frontendCourseDetails[courseId]
