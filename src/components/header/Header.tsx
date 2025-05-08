import { useState } from 'react'

import { Menu, X } from 'lucide-react'

import { LanguageSwitcher } from '@/components/language/language-switcher'
import Logo from '@/components/logo/logo'

const navLinks = [
  { label: 'Features', to: '#features' },
  { label: 'Tech Stack', to: '#tech-stack' },
  { label: 'Getting Started', to: '#getting-started' }
]

const handleSmoothScroll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, to: string) => {
  e.preventDefault()
  const el = document.querySelector(to)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className='fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800'>
      <nav className='container mx-auto flex items-center justify-between px-4 py-3'>
        <Logo />
        {/* Desktop nav */}
        <ul className='hidden md:flex gap-6 items-center'>
          {navLinks.map((link) => (
            <li key={link.to}>
              <button
                onClick={(e) => handleSmoothScroll(e, link.to)}
                className='bg-transparent border-none text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1 cursor-pointer'
                tabIndex={0}
                aria-label={link.label}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        {/* Language Switcher always visible */}
        <div className='flex items-center gap-4 ml-4'>
          <LanguageSwitcher />
        </div>
        {/* Mobile menu button */}
        <button
          className='md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className='w-7 h-7 text-gray-700 dark:text-gray-200' />
          ) : (
            <Menu className='w-7 h-7 text-gray-700 dark:text-gray-200' />
          )}
        </button>
      </nav>
      {/* Mobile nav menu */}
      {menuOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800 animate-fade-in'>
          <ul className='flex flex-col gap-2 p-4'>
            {navLinks.map((link) => (
              <li key={link.to}>
                <button
                  onClick={(e) => {
                    handleSmoothScroll(e, link.to)
                    setMenuOpen(false)
                  }}
                  className='w-full text-left bg-transparent border-none text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-2 cursor-pointer'
                  tabIndex={0}
                  aria-label={link.label}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style>{`html { scroll-behavior: smooth; }`}</style>
    </header>
  )
}

export default Header
