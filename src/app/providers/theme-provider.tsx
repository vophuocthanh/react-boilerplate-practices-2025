import { useEffect, useState } from 'react'

import {
  THEME_DARK,
  THEME_LIGHT,
  THEME_SYSTEM,
  type Theme,
  type ThemeProviderProps,
  ThemeProviderContext
} from '@/components/theme/theme-constants'
import isEqual from '@/core/configs/is-equal'

export function ThemeProvider({
  children,
  defaultTheme = THEME_SYSTEM,
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme
    if (savedTheme) return savedTheme

    if (defaultTheme !== THEME_SYSTEM) return defaultTheme

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT
  })

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove(THEME_LIGHT, THEME_DARK)

    if (isEqual(theme, THEME_SYSTEM)) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    if (theme !== THEME_SYSTEM) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? THEME_DARK : THEME_LIGHT
      const root = window.document.documentElement
      root.classList.remove(THEME_LIGHT, THEME_DARK)
      root.classList.add(newTheme)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export { useTheme } from '@/components/theme/theme-hooks'
