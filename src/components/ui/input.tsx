import { cn } from '@/core/lib/utils'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  iconOnClick?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconOnClick, ...props }, ref) => {
    return (
      <div className='relative flex items-center'>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:ring-primary focus:ring-2 placeholder:text-slate-500 outline-none pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={iconOnClick}>
            {icon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
