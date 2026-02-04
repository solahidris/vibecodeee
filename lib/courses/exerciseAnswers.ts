import type { CourseExercise } from '@/lib/courses/types'

const GENERIC_PLACEHOLDER_PATTERNS = [
  /type the command here/i,
  /type your answer/i,
  /type the answer/i,
  /enter your answer/i,
  /write your answer/i,
  /type here/i,
  /your answer/i,
  /add your answer/i,
  /answer here/i,
]

const extractExampleFromPlaceholder = (placeholder: string) => {
  const exampleMatch = placeholder.match(/example:\s*([\s\S]*)/i)
  if (exampleMatch) {
    return exampleMatch[1].trim()
  }
  return placeholder.trim()
}

export const getExerciseAnswerExample = (
  exercise: CourseExercise
): string | null => {
  const placeholder = exercise.placeholder?.trim()
  if (!placeholder) return null

  const candidate = extractExampleFromPlaceholder(placeholder)
  if (!candidate) return null

  if (GENERIC_PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(candidate))) {
    return null
  }

  return candidate
}

export const getExerciseAnswerChecklist = (exercise: CourseExercise): string[] =>
  (exercise.checkFor ?? []).map((item) => item.trim()).filter(Boolean)
