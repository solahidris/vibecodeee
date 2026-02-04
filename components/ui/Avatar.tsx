import { getInitials } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/cn'

interface AvatarProps {
  src?: string | null
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  const sizeStyles = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-xl',
  }

  const initials = name ? getInitials(name) : '?'

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-full',
        sizeStyles[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-blue-500 font-semibold text-white">
          {initials}
        </div>
      )}
    </div>
  )
}
