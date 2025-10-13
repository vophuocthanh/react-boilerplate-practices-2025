import { type ReactNode } from 'react'

import { Outlet } from 'react-router-dom'

import { cn } from '@/core/lib/utils'

import SideBar from './side-bar'
import TopBar from './top-bar'

interface LayoutMainProps {
  children?: ReactNode
}

const LayoutMain = ({ children }: LayoutMainProps) => {
  return (
    <div className='flex overflow-hidden flex-col h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      <TopBar />
      <div className='flex flex-1 min-h-0'>
        <SideBar />
        <main
          className={cn(
            'overflow-y-auto relative flex-1 transition-all duration-300',
            'bg-gradient-to-br from-slate-50/50 via-white/80 to-slate-100/50',
            'dark:from-slate-900/50 dark:via-slate-800/80 dark:to-slate-900/50',
            'backdrop-blur-sm'
          )}
        >
          {/* Background Pattern */}
          <div className='absolute inset-0 opacity-[0.02] dark:opacity-[0.05]'>
            <div
              className='w-full h-full'
              style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, #64748b 2px, transparent 0)`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          {/* Content Container */}
          <div className='relative z-10 p-6 h-full'>
            <div className='mx-auto max-w-none h-full'>
              {/* Page Content with Beautiful Container */}
              <div
                className={cn(
                  'rounded-2xl border min-h-[calc(100vh-140px)] border-white/20 dark:border-slate-700/30',
                  'shadow-2xl backdrop-blur-xl bg-white/70 dark:bg-slate-800/70',
                  'p-6 h-full transition-all duration-300 hover:shadow-3xl'
                )}
              >
                {children || <Outlet />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default LayoutMain
