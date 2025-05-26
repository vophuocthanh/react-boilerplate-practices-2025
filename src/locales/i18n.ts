import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import { enTranslation, viTranslation } from '@/locales'

import { type Language } from './types'

const resources = {
  en: {
    ...enTranslation
  },
  vi: {
    ...viTranslation
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: (localStorage.getItem('language') as Language) || 'en',
    defaultNS: 'common',
    debug: import.meta.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n
