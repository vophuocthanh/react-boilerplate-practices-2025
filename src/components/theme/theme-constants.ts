import { createContext } from 'react'

export const THEME_DARK = 'dark'
export const THEME_LIGHT = 'light'
export const THEME_SYSTEM = 'system'

export type Theme = 'dark' | 'light' | 'system'

export type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const initialState: ThemeProviderState = {
  theme: THEME_SYSTEM,
  setTheme: () => null
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
