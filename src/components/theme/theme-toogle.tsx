import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/components/theme/theme-provider'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='relative transition-all duration-300 border border-gray-200 rounded-md h-9 w-9 hover:scale-110 bg-white/80 dark:bg-gray-800/80 dark:border-gray-700'
        >
          <Sun className='h-[1.2rem] w-[1.2rem] text-gray-900 dark:text-gray-100 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] text-gray-900 dark:text-gray-100 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='animate-in fade-in-80 zoom-in-95 slide-in-from-top-2'>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className='transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          <Sun className='w-4 h-4 mr-2' />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className='transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          <Moon className='w-4 h-4 mr-2' />
          <span>Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
