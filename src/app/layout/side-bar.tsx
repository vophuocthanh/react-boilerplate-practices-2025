import { sidebarLinks } from '@/core/constants/general.const'
import useToggleSideBar from '@/core/store'
import { TSidebarLinks } from '@/models/types/general.type'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const router = useLocation()
  const { pathname } = router
  const { sidebarOpen, toggleSidebar } = useToggleSideBar()

  return (
    <div className={`px-4 py-4 bg-[#FCFCFC] ${sidebarOpen ? 'w-20' : 'w-64'} transition-width duration-300`}>
      <div className='flex items-center gap-2 mb-5'>
        <Link to='/' className={`flex items-center ${sidebarOpen ? 'justify-center' : 'gap-4 ml-10'}`}>
          {!sidebarOpen && (
            <img
              src={'https://adminvov1.vov.gov.vn/UploadImages/vov1/2016/thang_5/TCMR.jpg?w=100%'}
              alt='logo'
              className='w-24 h-10'
            />
          )}
        </Link>
        <button onClick={toggleSidebar} className={`ml-auto ${sidebarOpen ? 'mr-2' : ''}`}>
          {sidebarOpen ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <div>
        {sidebarLinks.map((link) => (
          <SidebarLink
            isActive={pathname.startsWith(link.path)}
            key={link.title}
            link={link}
            isCollapsed={sidebarOpen}
          />
        ))}
      </div>
    </div>
  )
}

interface ISidebarLinkProps {
  link: TSidebarLinks
  isActive: boolean
  isCollapsed: boolean
}

function SidebarLink({ link, isActive, isCollapsed }: ISidebarLinkProps) {
  return (
    <Link
      to={link.path}
      className={`flex items-center gap-4 font-medium text-base rounded-xl py-4 ${
        isCollapsed ? 'justify-center px-0' : 'px-10'
      } ${isActive ? 'bg-primary text-white' : 'hover:text-primary'} transition-all duration-300`}
    >
      <span>{link.icon}</span>
      {!isCollapsed && <span>{link.title}</span>}
    </Link>
  )
}

export default Sidebar
