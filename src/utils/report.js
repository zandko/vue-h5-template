import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

class Report {
  instance
  Vue
  options

  constructor(Vue, options) {
    this.Vue = Vue
    this.options = options
  }

  static getInstance(Vue, options) {
    if (!this.instance) {
      this.instance = new Report(Vue, options)
      this.instance.install()
      this.instance.registerGlobalError()
    }
    return this.instance
  }

  install() {
    Sentry.init({
      dsn: this.options.dsn,
      integrations: [
        new Integrations.Vue({ Vue: this.Vue, attachProps: true })
      ],
      release: this.options.release,
      environment: this.options.environment
    })
  }

  setUser(userInfo) {
    Sentry.setUser(userInfo)
  }

  registerGlobalError() {
    window.addEventListener(
      'error',
      (event) => {
        const target = event.target || event.srcElement
        const isElementTarget =
          target instanceof HTMLScriptElement ||
          target instanceof HTMLLinkElement ||
          target instanceof HTMLImageElement
        if (!isElementTarget) {
          return false
        }
        const url = target.src || target.href
        this.log({
          error: new Error(`ResourceLoadError: ${url}`),
          type: 'resource load'
        })
      },
      true
    )
  }

  log(info) {
    Sentry.withScope((scope) => {
      Object.keys(info).forEach((key) => {
        if (key !== 'error') {
          scope.setExtra(key, info[key])
        }
      })
      Sentry.captureException(info.error || new Error(''))
    })
  }
}

export default Report
