import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type LoadingProps = {
  className?: string
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Loading({ className, text = 'Loading...', size = 'md' }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      <span className={cn('text-muted-foreground', textSizes[size])}>{text}</span>
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Loading size="lg" text="Loading authorization..." />
      </div>
    </div>
  )
}
