import { useContext } from 'react'

import isEqual from '@/core/configs/is-equal'

import { ThemeProviderContext } from './theme-constants'

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (isEqual(context, undefined)) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
