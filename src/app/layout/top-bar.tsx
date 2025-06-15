import { SquareArrowLeftIcon, SquareArrowRightIcon } from '@/assets/icons'
import Logo from '@/components/logo/logo'
import { ThemeToggle } from '@/components/theme/theme-toogle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useToggleSideBar from '@/core/store/features/sidebar'

const TopBar = () => {
  const user = {
    name: 'Admin',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }

  const { sidebarOpen, toggleSidebar } = useToggleSideBar()

  return (
    <header className='relative z-20 flex items-center justify-between h-16 px-6 border-b shadow-sm border-gray-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleSidebar}
          title={sidebarOpen ? 'Thu gọn sidebar' : 'Mở rộng sidebar'}
        >
          {sidebarOpen ? <SquareArrowLeftIcon size={20} /> : <SquareArrowRightIcon size={20} />}
        </Button>

        <div className='transition-all duration-200 hover:scale-105'>
          <Logo />
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <div className='transition-all duration-200 hover:scale-105'>
          <ThemeToggle />
        </div>

        <div className='w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-neutral-600' />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='relative w-10 h-10 transition-all duration-300 rounded-full group hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950 dark:hover:to-purple-950 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-500/20 hover:shadow-lg'
              aria-label='Open user menu'
            >
              <div className='relative'>
                <Avatar className='w-8 h-8 transition-all duration-300 border-2 border-transparent shadow-md group-hover:border-gradient-to-br group-hover:from-blue-400 group-hover:to-purple-400 group-hover:shadow-lg'>
                  <AvatarImage src={user.avatar} alt={user.name} className='rounded-full' />
                  <AvatarFallback className='text-sm font-semibold text-white bg-gradient-to-br from-blue-500 to-purple-600'>
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white dark:border-neutral-950 rounded-full shadow-sm animate-pulse'></div>
                <div className='absolute inset-0 transition-all duration-300 rounded-full bg-gradient-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:to-purple-400/20'></div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-56 p-2 mt-3 border shadow-xl border-gray-200/50 dark:border-neutral-800/50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-xl'
            sideOffset={5}
          >
            <div className='px-3 py-3 mb-2 border-b border-gray-100 rounded-lg dark:border-neutral-800 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30'>
              <div className='flex items-center gap-3'>
                <Avatar className='w-10 h-10 shadow-md'>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className='text-sm font-semibold text-white bg-gradient-to-br from-blue-500 to-purple-600'>
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-sm font-semibold text-gray-900 dark:text-gray-100'>{user.name}</p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>Administrator</p>
                </div>
              </div>
            </div>
            <DropdownMenuItem className='font-medium text-gray-700 transition-all duration-200 rounded-lg cursor-pointer dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/50 dark:hover:to-indigo-950/50 focus:bg-gradient-to-r focus:from-blue-50 focus:to-indigo-50 dark:focus:from-blue-950/50 dark:focus:to-indigo-950/50'>
              <span className='flex items-center gap-2'>👤 Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='font-medium text-red-600 transition-all duration-200 rounded-lg cursor-pointer hover:text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 dark:hover:from-red-950/50 dark:hover:to-rose-950/50 focus:bg-gradient-to-r focus:from-red-50 focus:to-rose-50 dark:focus:from-red-950/50 dark:focus:to-rose-950/50'
              onClick={() => {}}
            >
              <span className='flex items-center gap-2'>🚪 Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default TopBar
