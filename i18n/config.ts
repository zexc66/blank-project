export const locales = ['ar', 'en', 'fr'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'ar'

export const isRTL = (locale: Locale) => locale === 'ar'