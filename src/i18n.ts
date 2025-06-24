import { createI18n } from 'vue-i18n'
import ja from './locales/ja.json'
import en from './locales/en.json'
import es from './locales/es.json'
import de from './locales/de.json'

const defaultLocale = 'en'

let savedLocale = defaultLocale
if (typeof window !== 'undefined') {
  savedLocale = localStorage.getItem('lang') || defaultLocale
}

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: defaultLocale,
  messages: { ja, en, es, de },
})
