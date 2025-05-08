export type Language = 'en' | 'vi'
export type Namespace = 'common'

export const LANGUAGES: Record<Language, { name: string; flag: string }> = {
  en: {
    name: 'English',
    flag: '🇺🇸'
  },
  vi: {
    name: 'Tiếng Việt',
    flag: '🇻🇳'
  }
}
