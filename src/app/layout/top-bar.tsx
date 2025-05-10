import { ThemeToggle } from '@/components/theme/theme-toogle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const TopBar = () => {
  const user = {
    name: 'Admin',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }

  return (
    <header className='z-10 flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur'>
      <h1 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100'>Dashboard</h1>
      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className='rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50'
              aria-label='Open user menu'
              tabIndex={0}
            >
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-40'>
            <DropdownMenuItem className='font-medium'>Profile</DropdownMenuItem>
            <DropdownMenuItem className='text-red-600 focus:text-red-700' onClick={() => {}}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default TopBar
