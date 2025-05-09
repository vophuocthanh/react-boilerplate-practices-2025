import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { useClickOutside } from '@/hooks/use-click-outside'
import { LANGUAGES, type Language } from '@/locales/types'

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
    setIsOpen(false)
  }

  return (
    <div className='relative' ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
        aria-label={t('common.language')}
      >
        <span>{LANGUAGES[i18n.language as Language]?.flag}</span>
        <span className='hidden sm:inline'>{LANGUAGES[i18n.language as Language]?.name}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          >
            <div className='py-1' role='menu' aria-orientation='vertical'>
              {Object.entries(LANGUAGES).map(([code, { name, flag }]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as Language)}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
                    i18n.language === code
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  role='menuitem'
                >
                  <span>{flag}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
