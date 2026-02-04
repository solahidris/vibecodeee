import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils/cn'

const confettiPieces = [
  { x: 220, y: -200, rotate: 140, delay: 0, size: 10, color: '#f97316' },
  { x: 260, y: -160, rotate: 200, delay: 40, size: 12, color: '#22c55e' },
  { x: 180, y: -220, rotate: 90, delay: 80, size: 8, color: '#38bdf8' },
  { x: 300, y: -190, rotate: 160, delay: 120, size: 9, color: '#f43f5e' },
  { x: 240, y: -140, rotate: 210, delay: 160, size: 11, color: '#a855f7' },
  { x: 280, y: -240, rotate: 110, delay: 200, size: 7, color: '#facc15' },
  { x: 200, y: -150, rotate: 130, delay: 240, size: 8, color: '#14b8a6' },
  { x: 320, y: -210, rotate: 190, delay: 280, size: 10, color: '#fb7185' },
  { x: 260, y: -260, rotate: 150, delay: 320, size: 9, color: '#60a5fa' },
  { x: 210, y: -180, rotate: 230, delay: 360, size: 11, color: '#f472b6' },
  { x: 290, y: -170, rotate: 170, delay: 400, size: 8, color: '#34d399' },
  { x: 230, y: -230, rotate: 120, delay: 440, size: 10, color: '#f59e0b' },
]

const pieceStyle = (piece: (typeof confettiPieces)[number]) =>
  ({
    '--x': `${piece.x}px`,
    '--y': `${piece.y}px`,
    '--rotation': `${piece.rotate}deg`,
    '--delay': `${piece.delay}ms`,
    '--size': `${piece.size}px`,
    '--color': piece.color,
  }) as CSSProperties

export function ConfettiCannons({ burstKey }: { burstKey: number }) {
  return (
    <div
      key={burstKey}
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {confettiPieces.map((piece, index) => (
          <span
            key={`left-${index}`}
            className="confetti-piece confetti-left"
            style={pieceStyle(piece)}
          />
        ))}
        {confettiPieces.map((piece, index) => (
          <span
            key={`right-${index}`}
            className="confetti-piece confetti-right"
            style={pieceStyle(piece)}
          />
        ))}
      </div>
    </div>
  )
}

type ConfettiBurstProps = {
  burstKey: number
  className?: string
}

export function ConfettiBurst({ burstKey, className }: ConfettiBurstProps) {
  return (
    <div
      key={burstKey}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {confettiPieces.map((piece, index) => (
          <span
            key={`burst-left-${index}`}
            className="confetti-piece confetti-left"
            style={pieceStyle(piece)}
          />
        ))}
        {confettiPieces.map((piece, index) => (
          <span
            key={`burst-right-${index}`}
            className="confetti-piece confetti-right"
            style={pieceStyle(piece)}
          />
        ))}
      </div>
    </div>
  )
}

type CelebrationToastProps = {
  visible: boolean
  message: string | null
  onClose?: () => void
}

export function CelebrationToast({ visible, message, onClose }: CelebrationToastProps) {
  if (!visible || !message) return null

  return (
    <div
      className={cn(
        'fixed right-6 top-6 z-50 max-w-sm rounded-2xl border border-emerald-200 bg-white/95 px-5 py-4 text-sm text-emerald-900 shadow-lg backdrop-blur',
        'animate-toast-in'
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Topic passed
          </p>
          <p className="mt-1 text-base font-semibold text-emerald-900">{message}</p>
          <p className="mt-1 text-xs text-emerald-700/80">
            Keep the streak alive.
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-wide text-emerald-600 transition hover:text-emerald-900"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  )
}
