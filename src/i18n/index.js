import { createI18n } from 'vue-i18n'
import common from './locales/zh-cn/common'
import common_en from './locales/en/common'
const getMessage = modules => {
  return Object.entries(modules).reduce((module, [path, mod]) => {
    const moduleName = path.replace(/^\.\/locales\/[\w-]+\/(.*)\.\w+$/, '$1')
    module[moduleName] = mod.default
    return module
  }, {})
}

export default createI18n({
  locale: localStorage.getItem('locale') || 'cn',
  messages: {
    cn: {
      ...getMessage(import.meta.globEager('./locales/zh-cn/**/*.js')),
      ...common
    },
    en: {
      ...getMessage(import.meta.globEager('./locales/en/**/*.js')),
      ...common_en
    }
  },
  legacy: false,
  globalInjection: true,
})
