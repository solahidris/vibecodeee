import type { CourseExercise } from '@/lib/courses/types'

type EvaluationResult = {
  passed: boolean
  message: string
}

const LENIENT_HINT_MATCH_RATIO = 0.4
const TOKEN_MATCH_RATIO = 0.6

const STOP_TOKENS = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'by',
  'for',
  'from',
  'in',
  'of',
  'on',
  'or',
  'the',
  'to',
  'with',
])

const normalizeForMatch = (value: string) =>
  value
    .toLowerCase()
    .replace(/[`"'()[\]{}]/g, ' ')
    .replace(/[^a-z0-9<>\-_/.:]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const stripRegexTokens = (pattern: string) =>
  pattern
    .replace(/\\b/g, ' ')
    .replace(/\\s\+/g, ' ')
    .replace(/\\s\*/g, ' ')
    .replace(/\\./g, '.')
    .replace(/\\\//g, '/')
    .replace(/[\\^$*+?.()|[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getHints = (exercise: CourseExercise) => {
  if (exercise.checkFor?.length) {
    return exercise.checkFor.filter(Boolean)
  }

  const patterns = [...(exercise.expected.all ?? []), ...(exercise.expected.any ?? [])]
  return patterns.map(stripRegexTokens).filter(Boolean)
}

const extractTokens = (value: string) => {
  const tokens = new Set<string>()
  const lower = value.toLowerCase()

  const flags = lower.match(/--?[a-z0-9-]+/g) ?? []
  for (const token of flags) {
    tokens.add(token)
  }

  const bigO = lower.match(/o\([^)]+\)/g) ?? []
  for (const token of bigO) {
    tokens.add(token)
  }

  const numbers = lower.match(/\d+(?:\.\d+)?(?::\d+(?:\.\d+)?)?/g) ?? []
  for (const token of numbers) {
    tokens.add(token)
  }

  const words = lower.match(/[a-z0-9]+/g) ?? []
  for (const token of words) {
    if (STOP_TOKENS.has(token)) continue
    if (token.length < 2) continue
    tokens.add(token)
  }

  return [...tokens]
}

const matchesStructuralHint = (hint: string, input: string) => {
  const trimmed = hint.trim()
  const lowerHint = trimmed.toLowerCase()

  if (lowerHint.includes('```') || lowerHint.includes('code block')) {
    return /```|~~~/m.test(input)
  }

  if (/\[[^\]]+\]\([^)]+\)/.test(trimmed) || lowerHint.includes('](http')) {
    return /\[[^\]]+\]\([^)]+\)/i.test(input)
  }

  if (/^#/.test(trimmed)) {
    return /^#{1,6}\s+\S+/m.test(input)
  }

  if (/^-\s/.test(trimmed) || lowerHint.includes('bullet')) {
    return /^\s*[-*+]\s+\S+/m.test(input)
  }

  const tagMatch = trimmed.match(/<\s*([a-z0-9-]+)/i)
  if (tagMatch) {
    const tag = tagMatch[1]
    if (new RegExp(`<\\s*${tag}\\b`, 'i').test(input)) {
      return true
    }
  }

  const attributeMatches = [
    ...trimmed.matchAll(/([a-zA-Z-]+)\s*=\s*["'][^"']*["']|([a-zA-Z-]+)\s*=\s*\.{3}/g),
  ]

  if (attributeMatches.length) {
    const elementMatch = trimmed.match(/\b(label|input|img|meta|link|script)\b/i)
    if (elementMatch && !new RegExp(`<\\s*${elementMatch[1]}\\b`, 'i').test(input)) {
      return false
    }

    for (const match of attributeMatches) {
      const attribute = (match[1] ?? match[2])?.toLowerCase()
      if (attribute && new RegExp(`${attribute}\\s*=`, 'i').test(input)) {
        return true
      }
    }
  }

  return false
}

const cleanVariant = (value: string) =>
  value
    .trim()
    .replace(/^[('"`]+|[)'"`]+$/g, '')
    .replace(/\.+$/g, '')

const expandHintVariants = (hint: string) => {
  const base = hint.trim()
  if (!base) return []

  const variants = new Set<string>()
  variants.add(base)

  const withCleaned = cleanVariant(base)
  if (withCleaned) variants.add(withCleaned)

  if (/\s+or\s+/i.test(base)) {
    base.split(/\s+or\s+/i).forEach((part) => {
      const cleaned = cleanVariant(part)
      if (cleaned) variants.add(cleaned)
    })
  }

  if (!/https?:\/\//i.test(base) && /[a-z0-9]\/[a-z0-9]/i.test(base)) {
    base.split('/').forEach((part) => {
      const cleaned = cleanVariant(part)
      if (cleaned) variants.add(cleaned)
    })
  }

  return [...variants].filter(Boolean)
}

const matchesVariant = (
  variant: string,
  inputLower: string,
  normalizedInput: string,
  rawInput: string
) => {
  if (!variant) return false
  if (matchesStructuralHint(variant, rawInput)) return true

  const lowerVariant = variant.toLowerCase()
  if (inputLower.includes(lowerVariant)) return true

  const normalizedVariant = normalizeForMatch(variant)
  if (normalizedVariant && normalizedInput.includes(normalizedVariant)) return true

  const tokens = extractTokens(variant)
  if (!tokens.length) return false

  const matches = tokens.filter(
    (token) => inputLower.includes(token) || normalizedInput.includes(token)
  ).length

  const required = Math.max(1, Math.ceil(tokens.length * TOKEN_MATCH_RATIO))
  return matches >= required
}

const matchesHint = (hint: string, input: string) => {
  const inputLower = input.toLowerCase()
  const normalizedInput = normalizeForMatch(input)
  const variants = expandHintVariants(hint)

  return variants.some((variant) =>
    matchesVariant(variant, inputLower, normalizedInput, input)
  )
}

const passesLenientCheck = (input: string, exercise: CourseExercise) => {
  const hints = getHints(exercise)
  if (!hints.length) return false

  const matched = hints.filter((hint) => matchesHint(hint, input)).length
  const required = Math.max(1, Math.ceil(hints.length * LENIENT_HINT_MATCH_RATIO))
  return matched >= required
}

export const evaluateExercise = (
  input: string,
  exercise: CourseExercise
): EvaluationResult => {
  const trimmed = input.trim()
  if (!trimmed) {
    return {
      passed: false,
      message: 'Add your answer first, then submit again.',
    }
  }

  const patternsAll = exercise.expected.all ?? []
  const patternsAny = exercise.expected.any ?? []
  const matchesAll = patternsAll.every((pattern) =>
    new RegExp(pattern, 'im').test(trimmed)
  )
  const matchesAny =
    patternsAny.length === 0 ||
    patternsAny.some((pattern) => new RegExp(pattern, 'im').test(trimmed))

  const passed = matchesAll && matchesAny
  if (passed || passesLenientCheck(trimmed, exercise)) {
    return {
      passed: true,
      message: exercise.success,
    }
  }

  return {
    passed: false,
    message: exercise.failure,
  }
}
