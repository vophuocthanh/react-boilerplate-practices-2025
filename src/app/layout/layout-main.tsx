import { type ReactNode } from 'react'

import SideBar from './side-bar'
import TopBar from './top-bar'

interface LayoutMainProps {
  children: ReactNode
}

const LayoutMain = ({ children }: LayoutMainProps) => {
  return (
    <div className='flex min-h-screen bg-gray-50 dark:bg-neutral-900'>
      <SideBar />
      <div className='flex flex-col flex-1 min-w-0'>
        <TopBar />
        <main className='flex-1 p-3 transition-colors duration-300'>{children}</main>
      </div>
    </div>
  )
}

export default LayoutMain
