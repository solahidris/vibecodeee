import { useCallback, useEffect, useRef, useState } from 'react'

type CelebrationState = {
  visible: boolean
  message: string | null
}

type CelebrationOptions = {
  toastDuration?: number
  confettiDuration?: number
}

export const useCelebration = (options: CelebrationOptions = {}) => {
  const { toastDuration = 2600, confettiDuration = 1600 } = options
  const [toast, setToast] = useState<CelebrationState>({
    visible: false,
    message: null,
  })
  const [confettiVisible, setConfettiVisible] = useState(false)
  const [confettiKey, setConfettiKey] = useState(0)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current)
      toastTimer.current = null
    }
    if (confettiTimer.current) {
      clearTimeout(confettiTimer.current)
      confettiTimer.current = null
    }
  }, [])

  const trigger = useCallback(
    (message: string) => {
      clearTimers()
      setToast({ visible: true, message })
      setConfettiVisible(true)
      setConfettiKey((prev) => prev + 1)

      toastTimer.current = setTimeout(() => {
        setToast((current) => ({ ...current, visible: false }))
      }, toastDuration)

      confettiTimer.current = setTimeout(() => {
        setConfettiVisible(false)
      }, confettiDuration)
    },
    [clearTimers, confettiDuration, toastDuration]
  )

  const dismissToast = useCallback(() => {
    setToast((current) => ({ ...current, visible: false }))
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  return {
    toast,
    confettiVisible,
    confettiKey,
    trigger,
    dismissToast,
  }
}
