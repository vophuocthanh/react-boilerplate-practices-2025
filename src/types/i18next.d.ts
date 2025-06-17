import 'react-i18next'

// Import các translation resources theo thứ tự alphabet
import type authEn from '@/locales/en/auth.json'
import type commonEn from '@/locales/en/common.json'
import type homeEn from '@/locales/en/home.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      auth: typeof authEn
      common: typeof commonEn
      home: typeof homeEn
    }
  }
}
