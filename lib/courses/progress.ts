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

export type ExerciseResultsByCourse = Record<string, ExerciseResults>

export type ExerciseAnswersByCourse = Record<string, ExerciseAnswers>

export type CourseProgressData = {
  backend?: Record<string, boolean>
  careerDevops?: Record<string, boolean>
  foundation?: Record<string, boolean>
  frontend?: Record<string, boolean>
  aiDataScience?: Record<string, boolean>
  crashcourse?: boolean[]
  basicprompt?: boolean[]
  exerciseResults?: ExerciseResultsByCourse
  exerciseAnswers?: ExerciseAnswersByCourse
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

const normalizeExerciseResultsByCourse = (
  value: unknown
): ExerciseResultsByCourse => {
  if (!isRecord(value)) return {}
  return Object.entries(value).reduce<ExerciseResultsByCourse>(
    (acc, [courseId, results]) => {
      const normalized = normalizeExerciseResults(results)
      if (normalized) {
        acc[courseId] = normalized
      }
      return acc
    },
    {}
  )
}

const normalizeExerciseAnswersByCourse = (
  value: unknown
): ExerciseAnswersByCourse => {
  if (!isRecord(value)) return {}
  return Object.entries(value).reduce<ExerciseAnswersByCourse>(
    (acc, [courseId, answers]) => {
      const normalized = normalizeExerciseAnswers(answers)
      if (normalized) {
        acc[courseId] = normalized
      }
      return acc
    },
    {}
  )
}

const normalizeCourseProgress = (value: CourseProgressData): CourseProgressData => {
  const exerciseResults = normalizeExerciseResultsByCourse(value.exerciseResults)
  const exerciseAnswers = normalizeExerciseAnswersByCourse(value.exerciseAnswers)

  return {
    ...value,
    exerciseResults: Object.keys(exerciseResults).length
      ? exerciseResults
      : undefined,
    exerciseAnswers: Object.keys(exerciseAnswers).length
      ? exerciseAnswers
      : undefined,
  }
}

export const parseCourseProgress = (value: unknown): CourseProgressData => {
  if (!value) return {}
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      if (parsed && typeof parsed === 'object') {
        return normalizeCourseProgress(parsed as CourseProgressData)
      }
    } catch {
      return {}
    }
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    return normalizeCourseProgress(value as CourseProgressData)
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

export const getProgressExerciseAnswers = (
  progressData: CourseProgressData,
  courseId: string
): ExerciseAnswers | null =>
  normalizeExerciseAnswers(progressData.exerciseAnswers?.[courseId])

export const getProgressExerciseResults = (
  progressData: CourseProgressData,
  courseId: string
): ExerciseResults | null =>
  normalizeExerciseResults(progressData.exerciseResults?.[courseId])

export const setProgressExerciseAnswers = (
  progressData: CourseProgressData,
  courseId: string,
  answers: ExerciseAnswers
): CourseProgressData => ({
  ...progressData,
  exerciseAnswers: {
    ...(progressData.exerciseAnswers ?? {}),
    [courseId]: answers,
  },
})

export const setProgressExerciseResults = (
  progressData: CourseProgressData,
  courseId: string,
  results: ExerciseResults
): CourseProgressData => ({
  ...progressData,
  exerciseResults: {
    ...(progressData.exerciseResults ?? {}),
    [courseId]: results,
  },
})

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
    const storedValue = stored[key]
    acc[key] =
      typeof storedValue === 'string' && storedValue.trim().length > 0
        ? storedValue
        : base[key]
    return acc
  }, {})
}

export const mergeExerciseResults = (
  base: ExerciseResults,
  stored: ExerciseResults | null
): ExerciseResults => {
  if (!stored) return base
  const priority: Record<ExerciseResultStatus, number> = {
    idle: 0,
    failed: 1,
    passed: 2,
  }
  return Object.keys(base).reduce<ExerciseResults>((acc, key) => {
    const baseResult = base[key]
    const storedResult = stored[key]
    if (!storedResult) {
      acc[key] = baseResult
      return acc
    }
    if (!baseResult) {
      acc[key] = storedResult
      return acc
    }
    acc[key] =
      priority[storedResult.status] >= priority[baseResult.status]
        ? storedResult
        : baseResult
    return acc
  }, {})
}

const mergeChecklistProgress = (
  server: boolean[] | undefined,
  local: boolean[] | undefined
): boolean[] | undefined => {
  if (!server && !local) return undefined
  const maxLen = Math.max(server?.length ?? 0, local?.length ?? 0)
  if (!maxLen) return undefined
  return Array.from({ length: maxLen }, (_, index) =>
    Boolean(server?.[index] || local?.[index])
  )
}

const mergeProgressLane = (
  server: Record<string, boolean> | undefined,
  local: Record<string, boolean> | undefined
): Record<string, boolean> => {
  const merged: Record<string, boolean> = {}
  for (const [key, value] of Object.entries(server ?? {})) {
    merged[key] = Boolean(value)
  }
  for (const [key, value] of Object.entries(local ?? {})) {
    merged[key] = Boolean(merged[key] || value)
  }
  return merged
}

const mergeExerciseAnswersByCourse = (
  server: ExerciseAnswersByCourse,
  local: ExerciseAnswersByCourse
): ExerciseAnswersByCourse => {
  const merged: ExerciseAnswersByCourse = { ...server }
  for (const [courseId, localAnswers] of Object.entries(local)) {
    const baseAnswers = server[courseId] ?? {}
    const mergedAnswers: ExerciseAnswers = { ...baseAnswers }
    for (const [exerciseId, answer] of Object.entries(localAnswers)) {
      if (typeof answer === 'string' && answer.trim().length > 0) {
        mergedAnswers[exerciseId] = answer
      }
    }
    merged[courseId] = mergedAnswers
  }
  return merged
}

const mergeExerciseResultsByCourse = (
  server: ExerciseResultsByCourse,
  local: ExerciseResultsByCourse
): ExerciseResultsByCourse => {
  const merged: ExerciseResultsByCourse = { ...server }
  const priority: Record<ExerciseResultStatus, number> = {
    idle: 0,
    failed: 1,
    passed: 2,
  }
  for (const [courseId, localResults] of Object.entries(local)) {
    const baseResults = server[courseId] ?? {}
    const mergedResults: ExerciseResults = { ...baseResults }
    for (const [exerciseId, result] of Object.entries(localResults)) {
      const baseResult = baseResults[exerciseId]
      if (!baseResult) {
        mergedResults[exerciseId] = result
        continue
      }
      mergedResults[exerciseId] =
        priority[result.status] >= priority[baseResult.status]
          ? result
          : baseResult
    }
    merged[courseId] = mergedResults
  }
  return merged
}

export const mergeCourseProgress = (
  server: CourseProgressData,
  local: CourseProgressData
): CourseProgressData => {
  const merged: CourseProgressData = {
    foundation: mergeProgressLane(server.foundation, local.foundation),
    frontend: mergeProgressLane(server.frontend, local.frontend),
    backend: mergeProgressLane(server.backend, local.backend),
    aiDataScience: mergeProgressLane(server.aiDataScience, local.aiDataScience),
    careerDevops: mergeProgressLane(server.careerDevops, local.careerDevops),
  }

  const crashcourse = mergeChecklistProgress(
    server.crashcourse,
    local.crashcourse
  )
  if (crashcourse) {
    merged.crashcourse = crashcourse
  }

  const basicprompt = mergeChecklistProgress(
    server.basicprompt,
    local.basicprompt
  )
  if (basicprompt) {
    merged.basicprompt = basicprompt
  }

  const serverResults = normalizeExerciseResultsByCourse(server.exerciseResults)
  const localResults = normalizeExerciseResultsByCourse(local.exerciseResults)
  const mergedResults = mergeExerciseResultsByCourse(serverResults, localResults)
  if (Object.keys(mergedResults).length) {
    merged.exerciseResults = mergedResults
  }

  const serverAnswers = normalizeExerciseAnswersByCourse(server.exerciseAnswers)
  const localAnswers = normalizeExerciseAnswersByCourse(local.exerciseAnswers)
  const mergedAnswers = mergeExerciseAnswersByCourse(serverAnswers, localAnswers)
  if (Object.keys(mergedAnswers).length) {
    merged.exerciseAnswers = mergedAnswers
  }

  return merged
}

export const needsProgressSync = (
  server: CourseProgressData,
  merged: CourseProgressData
): boolean => {
  const hasNewProgress = (
    serverLane: Record<string, boolean> | undefined,
    mergedLane: Record<string, boolean> | undefined
  ) =>
    Object.entries(mergedLane ?? {}).some(
      ([key, value]) => value && !serverLane?.[key]
    )

  if (hasNewProgress(server.foundation, merged.foundation)) return true
  if (hasNewProgress(server.frontend, merged.frontend)) return true
  if (hasNewProgress(server.backend, merged.backend)) return true
  if (hasNewProgress(server.aiDataScience, merged.aiDataScience)) return true
  if (hasNewProgress(server.careerDevops, merged.careerDevops)) return true

  const serverCrashcourse = server.crashcourse ?? []
  const mergedCrashcourse = merged.crashcourse ?? []
  for (let index = 0; index < mergedCrashcourse.length; index += 1) {
    if (mergedCrashcourse[index] && !serverCrashcourse[index]) {
      return true
    }
  }

  const serverBasicprompt = server.basicprompt ?? []
  const mergedBasicprompt = merged.basicprompt ?? []
  for (let index = 0; index < mergedBasicprompt.length; index += 1) {
    if (mergedBasicprompt[index] && !serverBasicprompt[index]) {
      return true
    }
  }

  const priority: Record<ExerciseResultStatus, number> = {
    idle: 0,
    failed: 1,
    passed: 2,
  }

  const serverResults = normalizeExerciseResultsByCourse(server.exerciseResults)
  const mergedResults = normalizeExerciseResultsByCourse(merged.exerciseResults)

  for (const [courseId, results] of Object.entries(mergedResults)) {
    const serverCourse = serverResults[courseId] ?? {}
    for (const [exerciseId, result] of Object.entries(results)) {
      const serverResult = serverCourse[exerciseId]
      const serverPriority = serverResult
        ? priority[serverResult.status]
        : 0
      if (priority[result.status] > serverPriority) {
        return true
      }
    }
  }

  return false
}
