'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface EncryptedTextProps {
  text: string
  encryptedClassName?: string
  revealedClassName?: string
  revealDelayMs?: number
  className?: string
}

const ENCRYPTION_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

export function EncryptedText({
  text,
  encryptedClassName = 'text-zinc-500',
  revealedClassName = 'text-zinc-900',
  revealDelayMs = 50,
  className,
}: EncryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [isRevealing, setIsRevealing] = useState(false)

  useEffect(() => {
    // Start revealing on mount
    setIsRevealing(true)

    // Scramble effect interval
    const scrambleInterval = setInterval(() => {
      if (!isRevealing) return

      setDisplayText((current) =>
        current
          .split('')
          .map((char, index) => {
            if (revealedIndices.has(index) || char === ' ' || char === '\n') {
              return char
            }
            return ENCRYPTION_CHARS[Math.floor(Math.random() * ENCRYPTION_CHARS.length)]
          })
          .join('')
      )
    }, 50)

    // Reveal characters one by one
    const revealTimeouts: NodeJS.Timeout[] = []
    text.split('').forEach((_, index) => {
      const timeout = setTimeout(() => {
        setRevealedIndices((prev) => new Set([...prev, index]))
        setDisplayText((current) => {
          const chars = current.split('')
          chars[index] = text[index]
          return chars.join('')
        })
      }, index * revealDelayMs)
      revealTimeouts.push(timeout)
    })

    // Cleanup
    return () => {
      clearInterval(scrambleInterval)
      revealTimeouts.forEach(clearTimeout)
    }
  }, [text, revealDelayMs, isRevealing])

  return (
    <span className={cn('inline-block', className)}>
      {displayText.split('').map((char, index) => (
        <span
          key={index}
          className={cn(
            'transition-all duration-300',
            revealedIndices.has(index) ? revealedClassName : encryptedClassName
          )}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
