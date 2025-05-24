import * as React from 'react'
import { useCallback, useId } from 'react'

import { cn } from '@/core/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  iconOnClick?: () => void
  iconLabel?: string
  label?: string
  error?: string
  helperText?: string
  containerClassName?: string
  required?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      icon,
      iconOnClick,
      iconLabel = 'Icon button',
      label,
      error,
      helperText,
      containerClassName,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          iconOnClick?.()
        }
      },
      [iconOnClick]
    )

    const inputClassName = cn(
      'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      // Base styles using CSS variables
      'border-[var(--border-primary)] text-[var(--text-primary)]',
      'hover:border-[var(--border-secondary)]',
      'focus-visible:border-[var(--border-focus)]',
      // Error styles
      error && [
        'border-[var(--error-primary)] text-[var(--error-primary)]',
        'hover:border-[var(--error-secondary)]',
        'focus-visible:border-[var(--error-secondary)] focus-visible:ring-[var(--error-primary)]'
      ],
      // Required styles
      required && [
        'border-[var(--error-primary)]',
        'hover:border-[var(--error-secondary)]',
        'focus-visible:border-[var(--error-secondary)] focus-visible:ring-[var(--error-primary)]'
      ],
      // Icon padding
      icon && 'pr-12',
      className
    )

    const iconWrapperClassName = cn(
      'absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer',
      'hover:opacity-80 transition-opacity',
      // Base styles using CSS variables
      'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]',
      // Error styles
      error && ['text-[var(--error-primary)] hover:text-[var(--error-secondary)]']
    )

    const labelClassName = cn(
      'flex items-center gap-1 mb-2 text-sm font-medium leading-none',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      // Base styles using CSS variables
      'text-[var(--text-secondary)]'
    )

    const helperTextClassName = cn(
      'mt-1 text-sm',
      // Base styles using CSS variables
      'text-[var(--text-tertiary)]'
    )

    const renderInput = () => (
      <input
        type={type}
        className={inputClassName}
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        {...props}
      />
    )

    const renderIcon = () => {
      if (!icon || !iconOnClick) return null

      return (
        <div
          role='button'
          tabIndex={0}
          aria-label={iconLabel}
          className={iconWrapperClassName}
          onClick={iconOnClick}
          onKeyDown={handleKeyDown}
        >
          {icon}
        </div>
      )
    }

    const renderLabel = () => {
      if (!label) return null

      return (
        <label htmlFor={inputId} className={labelClassName}>
          {label}
          {required && <span className='text-[var(--error-primary)]'>*</span>}
        </label>
      )
    }

    const renderError = () => {
      if (!error) return null

      return (
        <p id={errorId} className='mt-1 text-sm font-medium text-[var(--error-primary)]'>
          {error}
        </p>
      )
    }

    const renderHelperText = () => {
      if (!helperText) return null

      return (
        <p id={helperId} className={helperTextClassName}>
          {helperText}
        </p>
      )
    }

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {renderLabel()}
        <div className='relative'>
          {renderInput()}
          {renderIcon()}
        </div>
        {renderError()}
        {renderHelperText()}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
