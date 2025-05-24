import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/core/lib/utils'

import { buttonVariants } from './button-variants'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild = false, children, iconStart, iconEnd, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp disabled={loading} className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {iconStart && <span className='mr-2'>{iconStart}</span>}
        {loading && <Loader2 data-testid='loader' className='w-4 h-4 mr-2 animate-spin' />}
        {children}
        {iconEnd && <span className='ml-2'>{iconEnd}</span>}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button }
