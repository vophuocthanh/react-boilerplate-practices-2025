import { useLocation, Link } from 'react-router-dom'

import { sidebarLinks } from '@/core/constants/general.const'
import { cn } from '@/core/lib/utils'
import useToggleSideBar from '@/core/store/features/sidebar'
const SideBar = () => {
  const location = useLocation()

  const { sidebarOpen } = useToggleSideBar()

  const isActiveLink = (linkPath: string) => location.pathname === `/admin/${linkPath}`

  return (
    <aside
      className={cn(
        'flex-col hidden transition-all duration-300 ease-in-out bg-white border-r border-gray-200 shadow-lg md:flex dark:bg-neutral-950 dark:border-neutral-800',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
      aria-label='Sidebar navigation'
    >
      <nav className={cn('flex-1 py-6 space-y-3', sidebarOpen ? 'px-4' : 'px-2')} role='navigation'>
        {sidebarLinks.map((link) => (
          <Link
            key={link.title}
            to={link.path}
            className={cn(
              'flex items-center gap-3 rounded-xl text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-105 group relative',
              sidebarOpen ? 'px-4 py-3' : 'px-3 py-3 justify-center',
              isActiveLink(link.path)
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:shadow-md'
            )}
            title={!sidebarOpen ? link.title : undefined}
          >
            <span className={cn('flex-shrink-0 transition-all duration-200', sidebarOpen ? 'w-5 h-5' : 'w-6 h-6')}>
              {link.icon}
            </span>
            {sidebarOpen && <span className='ml-2 transition-opacity duration-200'>{link.title}</span>}
            {!sidebarOpen && (
              <div className='absolute z-50 invisible px-3 py-2 ml-2 text-sm text-white transition-all duration-200 bg-gray-900 rounded-lg opacity-0 left-full group-hover:opacity-100 group-hover:visible whitespace-nowrap'>
                {link.title}
                <div className='absolute left-0 w-2 h-2 transform rotate-45 -translate-x-1 -translate-y-1/2 bg-gray-900 top-1/2'></div>
              </div>
            )}
          </Link>
        ))}
      </nav>
      <div
        className={cn(
          'mt-auto text-xs text-gray-400 select-none dark:text-gray-600 border-t border-gray-200 dark:border-neutral-800 transition-all duration-300',
          sidebarOpen ? 'p-4' : 'p-3 text-center'
        )}
      >
        {sidebarOpen ? (
          <>&copy; {new Date().getFullYear()} AdminPanel</>
        ) : (
          <div className='w-2 h-2 mx-auto bg-gray-400 rounded-full'></div>
        )}
      </div>
    </aside>
  )
}

export default SideBar
