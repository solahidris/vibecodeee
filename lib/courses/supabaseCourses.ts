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
  outcomes?: string[] | null
  exercises?: CourseExercise[] | null
}

const normalizeSummary = (row: CourseRow): CourseSummary => ({
  id: row.id,
  lane: row.lane as CourseLane,
  number: row.number ?? null,
  title: row.title,
  description: row.description ?? '',
  outcomes: row.outcomes ?? undefined,
})

const normalizeDetail = (row: CourseRow): CourseDetail => ({
  ...normalizeSummary(row),
  overview: row.overview ?? '',
  outcomes: row.outcomes ?? [],
  exercises: row.exercises ?? [],
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
