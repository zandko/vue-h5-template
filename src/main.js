import Vue from 'vue'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/icons'
import App from '@/App.vue'
import '@/permission'
import '@/pwa/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import Report from '@/utils/report'
import { initPlatform } from '@/utils'
import bus from '@/utils/bus'
import filters from '@/filters'
import i18n, { VueVantLocales } from '@/lang'

VueVantLocales()
initPlatform()

Vue.config.productionTip = false

const { NODE_ENV, SENTRY_ENABLED } = process.env
const PROD = NODE_ENV === 'production'

if (PROD && SENTRY_ENABLED === 'yes') {
  const { SENTRY_DSN } = process.env
  const sentry = Report.getInstance(Vue, {
    dsn: SENTRY_DSN,
    release: __VERSION__,
    environment: 'Prod'
  })

  window.$sentry = sentry

  Vue.config.errorHandler = (error, vm, info) => {
    window.$sentry.log({
      error,
      type: 'vue errorHandler',
      vm,
      info
    })
  }
}

Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName])
})

Vue.use(Vant)
  .use(bus)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
