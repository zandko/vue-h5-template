const { NODE_ENV, VUE_APP_SENTRY_ENABLED } = process.env
const PROD = NODE_ENV === 'production'
const plugins = []

if (PROD && VUE_APP_SENTRY_ENABLED === 'yes') {
  plugins.push([
    'try-catch-error-report',
    {
      expression: 'window.$sentry.log',
      needFilename: true,
      needLineNo: true,
      needColumnNo: false,
      needContext: true,
      exclude: ['node_modules']
    }
  ])
}
module.exports = {
  plugins,
  presets: ['@vue/cli-plugin-babel/preset']
}
