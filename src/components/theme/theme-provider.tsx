import { useEffect, useState } from 'react'

import { isEqual } from 'lodash'

import {
  THEME_DARK,
  THEME_LIGHT,
  THEME_SYSTEM,
  Theme,
  ThemeProviderProps,
  ThemeProviderContext
} from './theme-constants'

export function ThemeProvider({
  children,
  defaultTheme = THEME_SYSTEM,
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme)

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

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export { useTheme } from './theme-hooks'
