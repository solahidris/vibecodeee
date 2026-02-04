import { cn } from '@/lib/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all',
        hover && 'hover:-translate-y-1 hover:shadow-md hover:ring-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
