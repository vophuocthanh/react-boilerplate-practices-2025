import { type ReactNode } from 'react'

import { Outlet } from 'react-router-dom'

import Header from '@/components/header-nav/header-nav'
import { FooterSection } from '@/pages/home/components/footer-section'

interface LayoutClientProps {
  children?: ReactNode
}

export default function LayoutClient({ children }: LayoutClientProps) {
  return (
    <>
      <Header />
      <main className='pt-[64px]'>{children || <Outlet />}</main>
      <FooterSection />
    </>
  )
}
