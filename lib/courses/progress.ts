import { aiDataScienceCourses } from '@/lib/courses/aiDataScienceCourses'
import { backendCourses } from '@/lib/courses/backendCourses'
import { careerDevopsCourses } from '@/lib/courses/careerDevopsCourses'
import { foundationCourses } from '@/lib/courses/foundationCourses'
import { frontendCourses } from '@/lib/courses/frontendCourses'

type CourseIdSource = { id: string }[]

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
