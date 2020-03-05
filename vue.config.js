const path = require('path')
const SentryPlugin = require('@sentry/webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')
const version = require('./package.json').version

const {
  VUE_APP_TITLE,
  DEVSERVERPORT,
  NODE_ENV,
  VCONSOLE,
  SENTRY_ENABLED,
  SENTRY_PLUGIN_ENABLED
} = process.env

const resolve = dir => path.join(__dirname, dir)
const DEV = NODE_ENV === 'development'
const PROD = NODE_ENV === 'production'

module.exports = {
  publicPath: !DEV ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: DEV,
  productionSourceMap: PROD && SENTRY_ENABLED === 'yes' && SENTRY_PLUGIN_ENABLED === 'yes',
  devServer: {
    port: Number(DEVSERVERPORT),
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  pwa: {
    name: VUE_APP_TITLE,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: resolve('src/pwa/service-worker.js')
    }
  },
  configureWebpack: {
    name: VUE_APP_TITLE,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        resolve('src/styles/_variables.scss'),
        resolve('src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.plugin('__VERSION__')
      .use(new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(version)
      }))
      .end()

    if (!DEV) {
      config.plugin('loadshReplace')
        .use(new LodashWebpackPlugin())
        .end()
      // if (SENTRY_PLUGIN_ENABLED === 'no') {
      //   config.plugin('uglifyjs-webpack-plugin')
      //     .use(new UglifyJsPlugin({
      //       uglifyOptions: {
      //         compress: {
      //           drop_debugger: true,
      //           drop_console: true
      //         },
      //         warnings: false
      //       },
      //       sourceMap: false,
      //       parallel: true
      //     }))
      //     .end()
      // }
    }
    config.plugin('VConsolePlugin')
      .use(new VConsolePlugin({
        filter: [],
        enable: DEV && VCONSOLE === 'yes'
      }))
      .end()

    config.plugin('ProvidePlugin')
      .use(new webpack.ProvidePlugin({
        _: 'lodash'
      }))
      .end()

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(DEV, config => config.devtool('cheap-source-map'))

    config
      .when(!DEV,
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial'
                },
                elementUI: {
                  name: 'chunk-vantUI',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?vant(.*)/
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )

    if (!DEV) {
      if (PROD && SENTRY_ENABLED === 'yes' && SENTRY_PLUGIN_ENABLED === 'yes') {
        config.plugin('sentryPlugin')
          .use(new SentryPlugin({
            release: version,
            include: path.join(__dirname, './dist/static/js'),
            urlPrefix: '~/china-goods-h5/statis/js',
            ignore: ['node_modules']
          }))
          .end()
      }
    }
  }
}
