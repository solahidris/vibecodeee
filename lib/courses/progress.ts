import { aiDataScienceCourses } from '@/lib/courses/aiDataScienceCourses'
import { backendCourses } from '@/lib/courses/backendCourses'
import { careerDevopsCourses } from '@/lib/courses/careerDevopsCourses'
import { foundationCourses } from '@/lib/courses/foundationCourses'
import { frontendCourses } from '@/lib/courses/frontendCourses'

type CourseIdSource = { id: string }[]

export type ExerciseResultStatus = 'idle' | 'passed' | 'failed'

export type ExerciseResult = {
  status: ExerciseResultStatus
  message: string
}

export type ExerciseResults = Record<string, ExerciseResult>

export type ExerciseAnswers = Record<string, string>

export type CourseProgressData = {
  backend?: Record<string, boolean>
  careerDevops?: Record<string, boolean>
  foundation?: Record<string, boolean>
  frontend?: Record<string, boolean>
  aiDataScience?: Record<string, boolean>
  crashcourse?: boolean[]
  basicprompt?: boolean[]
}

const buildProgressMap = (
  courseIds: string[],
  laneProgress: Record<string, boolean> | undefined
): Record<string, boolean> =>
  courseIds.reduce<Record<string, boolean>>((acc, courseId) => {
    acc[courseId] = Boolean(laneProgress?.[courseId])
    return acc
  }, {})

const getCourseIds = (courses: CourseIdSource) => courses.map((course) => course.id)

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const normalizeExerciseResult = (value: unknown): ExerciseResult | null => {
  if (!isRecord(value)) return null
  const status = value.status
  if (status !== 'idle' && status !== 'passed' && status !== 'failed') {
    return null
  }
  return {
    status,
    message: typeof value.message === 'string' ? value.message : '',
  }
}

const normalizeExerciseResults = (value: unknown): ExerciseResults | null => {
  if (!isRecord(value)) return null
  const entries = Object.entries(value).reduce<ExerciseResults>((acc, [key, item]) => {
    const normalized = normalizeExerciseResult(item)
    if (normalized) {
      acc[key] = normalized
    }
    return acc
  }, {})
  return entries
}

const normalizeExerciseAnswers = (value: unknown): ExerciseAnswers | null => {
  if (!isRecord(value)) return null
  const entries = Object.entries(value).reduce<ExerciseAnswers>((acc, [key, item]) => {
    if (typeof item === 'string') {
      acc[key] = item
    }
    return acc
  }, {})
  return entries
}

export const parseCourseProgress = (value: unknown): CourseProgressData => {
  if (!value) return {}
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      if (parsed && typeof parsed === 'object') {
        return parsed as CourseProgressData
      }
    } catch {
      return {}
    }
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    return value as CourseProgressData
  }
  return {}
}

export const buildFoundationProgress = (
  progressData: CourseProgressData,
  courses: CourseIdSource = foundationCourses
): Record<string, boolean> =>
  buildProgressMap(getCourseIds(courses), progressData.foundation)

export const buildFrontendProgress = (
  progressData: CourseProgressData,
  courses: CourseIdSource = frontendCourses
): Record<string, boolean> =>
  buildProgressMap(getCourseIds(courses), progressData.frontend)

export const buildBackendProgress = (
  progressData: CourseProgressData,
  courses: CourseIdSource = backendCourses
): Record<string, boolean> =>
  buildProgressMap(getCourseIds(courses), progressData.backend)

export const buildAiDataScienceProgress = (
  progressData: CourseProgressData,
  courses: CourseIdSource = aiDataScienceCourses
): Record<string, boolean> =>
  buildProgressMap(getCourseIds(courses), progressData.aiDataScience)

export const buildCareerDevopsProgress = (
  progressData: CourseProgressData,
  courses: CourseIdSource = careerDevopsCourses
): Record<string, boolean> =>
  buildProgressMap(getCourseIds(courses), progressData.careerDevops)

const buildChecklistProgress = (
  value: unknown,
  length: number
): boolean[] => {
  const fallback = Array.from({ length }, () => false)

  if (!value) return fallback

  if (Array.isArray(value)) {
    return fallback.map((_, index) => Boolean(value[index]))
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    return fallback.map((_, index) => Boolean(record[index]))
  }

  return fallback
}

export const buildCourseChecklistProgress = (
  progressData: CourseProgressData,
  key: 'crashcourse' | 'basicprompt',
  length: number
): boolean[] => buildChecklistProgress(progressData[key], length)

export const getLocalProgress = (userId: string): CourseProgressData | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(`course_progress_${userId}`)
    if (!raw) return null
    return parseCourseProgress(raw)
  } catch {
    return null
  }
}

export const setLocalProgress = (userId: string, progress: CourseProgressData) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(
      `course_progress_${userId}`,
      JSON.stringify(progress)
    )
  } catch {
    // Ignore local storage errors
  }
}

export const getLocalExerciseAnswers = (
  userId: string,
  courseId: string
): ExerciseAnswers | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(
      `course_answers_${userId}_${courseId}`
    )
    if (!raw) return null
    return normalizeExerciseAnswers(JSON.parse(raw))
  } catch {
    return null
  }
}

export const setLocalExerciseAnswers = (
  userId: string,
  courseId: string,
  answers: ExerciseAnswers
) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(
      `course_answers_${userId}_${courseId}`,
      JSON.stringify(answers)
    )
  } catch {
    // Ignore local storage errors
  }
}

export const getLocalExerciseResults = (
  userId: string,
  courseId: string
): ExerciseResults | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(
      `course_results_${userId}_${courseId}`
    )
    if (!raw) return null
    return normalizeExerciseResults(JSON.parse(raw))
  } catch {
    return null
  }
}

export const setLocalExerciseResults = (
  userId: string,
  courseId: string,
  results: ExerciseResults
) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(
      `course_results_${userId}_${courseId}`,
      JSON.stringify(results)
    )
  } catch {
    // Ignore local storage errors
  }
}

export const mergeExerciseAnswers = (
  base: ExerciseAnswers,
  stored: ExerciseAnswers | null
): ExerciseAnswers => {
  if (!stored) return base
  return Object.keys(base).reduce<ExerciseAnswers>((acc, key) => {
    acc[key] = typeof stored[key] === 'string' ? stored[key] : base[key]
    return acc
  }, {})
}

export const mergeExerciseResults = (
  base: ExerciseResults,
  stored: ExerciseResults | null
): ExerciseResults => {
  if (!stored) return base
  return Object.keys(base).reduce<ExerciseResults>((acc, key) => {
    acc[key] = stored[key] ?? base[key]
    return acc
  }, {})
}
