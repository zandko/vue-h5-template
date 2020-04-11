import Vue from 'vue'
import { getLanguage } from '@/core/services/cache'
import { Locale } from 'vant'
import VueI18n from 'vue-i18n'

import vantZhLocale from 'vant/lib/locale/lang/zh-CN'
import vantEnLocale from 'vant/lib/locale/lang/en-US'

import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh'
}

export const VueVantLocales = (lang = getLocale()) => {
  switch (lang) {
    case 'zh':
      Locale.use('zh-CN', vantZhLocale)
      break
    case 'en':
      Locale.use('en-US', vantEnLocale)
      break
  }
}
VueVantLocales()

export default new VueI18n({
  locale: getLocale(),
  fallbackLocale: getLocale(),
  messages
})
