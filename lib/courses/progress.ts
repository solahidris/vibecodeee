import { foundationCourses } from '@/lib/courses/foundationCourses'
import { frontendCourses } from '@/lib/courses/frontendCourses'

export type CourseProgressData = {
  foundation?: Record<string, boolean>
  frontend?: Record<string, boolean>
  crashcourse?: boolean[]
  basicprompt?: boolean[]
}

const emptyFoundationProgress = foundationCourses.reduce<Record<string, boolean>>(
  (acc, course) => {
    acc[course.id] = false
    return acc
  },
  {}
)

const emptyFrontendProgress = frontendCourses.reduce<Record<string, boolean>>(
  (acc, course) => {
    acc[course.id] = false
    return acc
  },
  {}
)

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
  progressData: CourseProgressData
): Record<string, boolean> => {
  const foundationProgress = progressData.foundation ?? {}
  return Object.keys(emptyFoundationProgress).reduce<Record<string, boolean>>(
    (acc, courseId) => {
      acc[courseId] = Boolean(foundationProgress[courseId])
      return acc
    },
    {}
  )
}

export const buildFrontendProgress = (
  progressData: CourseProgressData
): Record<string, boolean> => {
  const frontendProgress = progressData.frontend ?? {}
  return Object.keys(emptyFrontendProgress).reduce<Record<string, boolean>>(
    (acc, courseId) => {
      acc[courseId] = Boolean(frontendProgress[courseId])
      return acc
    },
    {}
  )
}

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
