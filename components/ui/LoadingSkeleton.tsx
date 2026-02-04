import { cn } from '@/lib/utils/cn'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'avatar'
}

export function LoadingSkeleton({ className, variant = 'text' }: LoadingSkeletonProps) {
  const variantStyles = {
    text: 'h-4 w-full rounded',
    card: 'h-40 w-full rounded-2xl',
    avatar: 'h-10 w-10 rounded-full',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]',
        variantStyles[variant],
        className
      )}
      style={{
        animation: 'shimmer 2s infinite',
      }}
    />
  )
}

export function ResourceCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <LoadingSkeleton variant="text" className="mb-4 h-6 w-3/4" />
      <LoadingSkeleton variant="text" className="mb-2 h-4 w-full" />
      <LoadingSkeleton variant="text" className="mb-4 h-4 w-5/6" />
      <div className="flex items-center gap-2">
        <LoadingSkeleton variant="text" className="h-3 w-16" />
        <LoadingSkeleton variant="text" className="h-3 w-20" />
      </div>
    </div>
  )
}
