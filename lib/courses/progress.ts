import { foundationCourses } from '@/lib/courses/foundationCourses'

export type CourseProgressData = {
  foundation?: Record<string, boolean>
}

const emptyFoundationProgress = foundationCourses.reduce<Record<string, boolean>>(
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
