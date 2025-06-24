import { createI18n } from 'vue-i18n'
import ja from './locales/ja.json'
import en from './locales/en.json'
import es from './locales/es.json'
import de from './locales/de.json'

const savedLocale = localStorage.getItem('lang')

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale || 'en', // 英語をデフォルトに
  fallbackLocale: 'en',
  messages: {
    ja,
    en,
    es,
    de,
  },
})
