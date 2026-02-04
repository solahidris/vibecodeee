import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  CourseDetail,
  CourseExercise,
  CourseLane,
  CourseSummary,
} from '@/lib/courses/types'

const COURSE_SUMMARY_FIELDS = 'id, lane, number, title, description, outcomes'
const COURSE_DETAIL_FIELDS =
  'id, lane, number, title, description, overview, outcomes, exercises'

type CourseRow = {
  id: string
  lane: string
  number: number | null
  title: string
  description: string | null
  overview?: string | null
  outcomes?: unknown
  exercises?: unknown
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const parseMaybeJson = (value: unknown): unknown => {
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

const ensureStringArray = (value: unknown): string[] => {
  const parsed = parseMaybeJson(value)
  if (!Array.isArray(parsed)) return []
  return parsed.filter((item) => typeof item === 'string') as string[]
}

const normalizeExpected = (value: unknown): CourseExercise['expected'] => {
  if (!isRecord(value)) {
    return { all: [], any: [] }
  }

  return {
    all: ensureStringArray(value.all),
    any: ensureStringArray(value.any),
  }
}

const normalizeExercise = (
  value: unknown,
  index: number
): CourseExercise | null => {
  if (!isRecord(value)) return null

  const id =
    typeof value.id === 'string' && value.id.trim().length > 0
      ? value.id
      : `exercise-${index + 1}`
  const title =
    typeof value.title === 'string' && value.title.trim().length > 0
      ? value.title
      : `Exercise ${index + 1}`

  return {
    id,
    title,
    instruction: typeof value.instruction === 'string' ? value.instruction : '',
    details: ensureStringArray(value.details),
    placeholder:
      typeof value.placeholder === 'string' ? value.placeholder : '',
    expected: normalizeExpected(value.expected),
    checkFor: ensureStringArray(value.checkFor),
    success: typeof value.success === 'string' ? value.success : 'Nice work.',
    failure: typeof value.failure === 'string' ? value.failure : 'Try again.',
  }
}

const normalizeExercises = (value: unknown): CourseExercise[] => {
  const parsed = parseMaybeJson(value)
  if (!Array.isArray(parsed)) return []
  return parsed
    .map((item, index) => normalizeExercise(item, index))
    .filter((exercise): exercise is CourseExercise => Boolean(exercise))
}

const normalizeSummary = (row: CourseRow): CourseSummary => {
  const outcomes = ensureStringArray(row.outcomes)
  return {
    id: row.id,
    lane: row.lane as CourseLane,
    number: row.number ?? null,
    title: row.title,
    description: row.description ?? '',
    outcomes: outcomes.length ? outcomes : undefined,
  }
}

const normalizeDetail = (row: CourseRow): CourseDetail => ({
  ...normalizeSummary(row),
  overview: row.overview ?? '',
  outcomes: ensureStringArray(row.outcomes),
  exercises: normalizeExercises(row.exercises),
})

export const fetchCourseSummaries = async (
  supabase: SupabaseClient,
  lane: CourseLane
): Promise<CourseSummary[]> => {
  const { data, error } = await supabase
    .from('courses')
    .select(COURSE_SUMMARY_FIELDS)
    .eq('lane', lane)
    .order('number', { ascending: true })

  if (error) {
    throw error
  }

  return (data ?? []).map((row) => normalizeSummary(row as CourseRow))
}

export const fetchCourseDetail = async (
  supabase: SupabaseClient,
  courseId: string
): Promise<CourseDetail | null> => {
  const { data, error } = await supabase
    .from('courses')
    .select(COURSE_DETAIL_FIELDS)
    .eq('id', courseId)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!data) return null

  return normalizeDetail(data as CourseRow)
}
