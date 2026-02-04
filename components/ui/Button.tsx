import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'

  const variantStyles = {
    primary:
      'bg-zinc-900 text-white shadow-md hover:bg-zinc-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'border-2 border-zinc-300 bg-white text-zinc-900 hover:border-zinc-900 hover:bg-zinc-50',
    ghost: 'bg-transparent text-zinc-700 hover:bg-zinc-100',
    danger:
      'bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
