import * as React from 'react'

import { cn } from '@/core/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  iconOnClick?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconOnClick, ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && iconOnClick && (
          <div
            role='button'
            tabIndex={0}
            className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
            onClick={iconOnClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                iconOnClick()
              }
            }}
          >
            {icon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
