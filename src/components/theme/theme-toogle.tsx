import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/app/providers/theme-provider'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      className='relative transition-all duration-300 border border-gray-200 rounded-md h-9 w-9 hover:scale-110 bg-white/80 dark:bg-gray-800/80 dark:border-gray-700'
    >
      <Sun className='h-[1.2rem] w-[1.2rem] text-gray-900 dark:text-gray-100 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] text-gray-900 dark:text-gray-100 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
