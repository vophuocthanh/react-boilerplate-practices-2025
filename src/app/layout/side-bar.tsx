import { useLocation, Link } from 'react-router-dom'

import Logo from '@/components/logo/logo'
import { sidebarLinks } from '@/core/constants/general.const'
import { cn } from '@/core/lib/utils'

const SideBar = () => {
  const location = useLocation()

  return (
    <aside
      className='flex-col hidden w-64 h-screen transition-colors duration-300 bg-white border-r border-gray-200 shadow-sm md:flex dark:bg-neutral-950 dark:border-neutral-800'
      aria-label='Sidebar navigation'
    >
      <div className='flex items-center justify-center h-16 border-b border-gray-200 dark:border-neutral-800'>
        <Logo />
      </div>
      <nav className='flex-1 px-2 py-4 space-y-2' role='navigation'>
        {sidebarLinks.map((link) => (
          <Link
            key={link.title}
            to={link.path}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50',
              location.pathname.startsWith(link.path)
                ? 'bg-blue-500 text-white font-semibold'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800'
            )}
            aria-current={location.pathname.startsWith(link.path) ? 'page' : undefined}
            tabIndex={0}
          >
            <span className='w-5 h-5'>{link.icon}</span>
            {link.title}
          </Link>
        ))}
      </nav>
      <div className='p-4 mt-auto text-xs text-gray-400 select-none dark:text-gray-600'>
        &copy; {new Date().getFullYear()} AdminPanel
      </div>
    </aside>
  )
}

export default SideBar
