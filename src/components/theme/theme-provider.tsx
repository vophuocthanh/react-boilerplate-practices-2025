import { isEqual } from 'lodash'
import { createContext, useContext, useEffect, useState } from 'react'

const THEME_DARK = 'dark'
const THEME_LIGHT = 'light'
const THEME_SYSTEM = 'system'
type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: THEME_SYSTEM,
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

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

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (isEqual(context, undefined)) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
