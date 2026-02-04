export type CourseLane =
  | 'foundation'
  | 'frontend'
  | 'backend'
  | 'ai-data-science'
  | 'career'
  | 'career-devops'

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

export type CourseSummary = {
  id: string
  title: string
  description: string
  number?: number | null
  lane?: CourseLane
  outcomes?: string[]
}

export type CourseDetail = CourseSummary & {
  overview: string
  outcomes: string[]
  exercises: CourseExercise[]
}
