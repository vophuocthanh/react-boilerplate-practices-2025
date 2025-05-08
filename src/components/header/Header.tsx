import { Link } from 'react-router-dom'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '#features' },
  { label: 'Tech Stack', to: '#tech-stack' },
  { label: 'Getting Started', to: '#getting-started' }
]

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800'>
      <nav className='container mx-auto flex items-center justify-between px-4 py-3'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2' tabIndex={0} aria-label='Home'>
          <span className='text-2xl font-bold text-blue-600 dark:text-blue-400'>ReactBoilerplate</span>
        </Link>
        {/* Navigation Links */}
        <ul className='flex gap-6 items-center'>
          {navLinks.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                className='text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1'
                tabIndex={0}
                aria-label={link.label}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Language Switcher */}
        <div className='flex items-center gap-4'>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  )
}

export default Header
