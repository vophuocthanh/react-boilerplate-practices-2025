import { type ReactNode } from 'react'

import { Outlet } from 'react-router-dom'

import SideBar from './side-bar'
import TopBar from './top-bar'

interface LayoutMainProps {
  children?: ReactNode
}

const LayoutMain = ({ children }: LayoutMainProps) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-neutral-900'>
      <TopBar />
      <div className='flex flex-1 min-h-0'>
        <SideBar />
        <main className='flex-1 bg-[#EBEEF8] p-3 transition-colors duration-300 overflow-y-auto'>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}

export default LayoutMain
