import { createI18n } from 'vue-i18n'
import ja from './locales/ja.json'
import en from './locales/en.json'
import es from './locales/es.json'
import de from './locales/de.json'

type LocaleType = 'ja' | 'en' | 'es' | 'de'

const savedLocale = localStorage.getItem('lang') as LocaleType | null

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale && ['ja', 'en', 'es', 'de'].includes(savedLocale) ? savedLocale : 'en',
  fallbackLocale: 'en',
  messages: {
    ja,
    en,
    es,
    de,
  },
})
