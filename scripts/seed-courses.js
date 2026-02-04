const fs = require('fs')
const path = require('path')
const vm = require('vm')
const ts = require('typescript')
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error(
    'Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.'
  )
  process.exit(1)
}

const root = path.resolve(__dirname, '..')

const loadModuleExports = (relativePath) => {
  const filePath = path.join(root, relativePath)
  const source = fs.readFileSync(filePath, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filePath,
  })

  const module = { exports: {} }
  const sandbox = {
    module,
    exports: module.exports,
    require,
    __dirname: path.dirname(filePath),
    __filename: filePath,
  }

  vm.runInNewContext(outputText, sandbox, { filename: filePath })
  return module.exports
}

const buildRecords = ({ courses, details, lane }) =>
  courses.map((course, index) => {
    const detail = details?.[course.id]
    return {
      id: course.id,
      lane,
      number: course.number ?? index + 1,
      title: course.title,
      description: course.description ?? detail?.description ?? null,
      overview: detail?.overview ?? null,
      outcomes: detail?.outcomes ?? [],
      exercises: detail?.exercises ?? [],
    }
  })

const chunk = (items, size) => {
  const batches = []
  for (let i = 0; i < items.length; i += size) {
    batches.push(items.slice(i, i + size))
  }
  return batches
}

const run = async () => {
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  })

  const { foundationCourses } = loadModuleExports(
    'lib/courses/foundationCourses.ts'
  )
  const { frontendCourses } = loadModuleExports(
    'lib/courses/frontendCourses.ts'
  )
  const { backendCourses } = loadModuleExports('lib/courses/backendCourses.ts')
  const { aiDataScienceCourses } = loadModuleExports(
    'lib/courses/aiDataScienceCourses.ts'
  )
  const { careerDevopsCourses } = loadModuleExports(
    'lib/courses/careerDevopsCourses.ts'
  )

  const { foundationCourseDetails } = loadModuleExports(
    'lib/courses/foundationCourseDetails.ts'
  )
  const { frontendCourseDetails } = loadModuleExports(
    'lib/courses/frontendCourseDetails.ts'
  )
  const { backendCourseDetails } = loadModuleExports(
    'lib/courses/backendCourseDetails.ts'
  )
  const { aiDataScienceCourseDetails } = loadModuleExports(
    'lib/courses/aiDataScienceCourseDetails.ts'
  )
  const { careerDevopsCourseDetails } = loadModuleExports(
    'lib/courses/careerDevopsCourseDetails.ts'
  )

  const records = [
    ...buildRecords({
      courses: foundationCourses,
      details: foundationCourseDetails,
      lane: 'foundation',
    }),
    ...buildRecords({
      courses: frontendCourses,
      details: frontendCourseDetails,
      lane: 'frontend',
    }),
    ...buildRecords({
      courses: backendCourses,
      details: backendCourseDetails,
      lane: 'backend',
    }),
    ...buildRecords({
      courses: aiDataScienceCourses,
      details: aiDataScienceCourseDetails,
      lane: 'ai-data-science',
    }),
    ...buildRecords({
      courses: careerDevopsCourses,
      details: careerDevopsCourseDetails,
      lane: 'career',
    }),
  ]

  let inserted = 0
  for (const batch of chunk(records, 20)) {
    const { error } = await supabase.from('courses').upsert(batch, {
      onConflict: 'id',
    })

    if (error) {
      console.error('Failed to upsert batch:', error)
      process.exit(1)
    }

    inserted += batch.length
  }

  console.log(`Seeded ${inserted} courses into Supabase.`)
}

run().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
