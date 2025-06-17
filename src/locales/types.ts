export type Language = 'en' | 'vi'

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
