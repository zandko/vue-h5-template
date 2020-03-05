import axios from 'axios'
import store from '@/store'
import { Toast, Dialog } from 'vant'
import { getToken } from '../cache'
import RESTFUL_ERROR_CODE_MAP from '@/constants/restful_error_code'

function errorReport(url, error, requestOptions, response) {
  if (window.$sentry) {
    const errorInfo = {
      error: typeof error === 'string' ? new Error(error) : error,
      type: 'request',
      requestUrl: url,
      requestOptions: JSON.stringify(requestOptions)
    }

    if (response) {
      errorInfo.response = JSON.stringify(response)
    }

    window.$sentry.log(errorInfo)
  }
}

const DEFAULT_OPTIONS = {
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
  headers: {
    timestamp: new Date().getTime(),
    'Content-Type': 'application/json;chareset=UTF-8'
  }
}

const responseLog = (response) => {
  if (process.env.NODE_ENV === 'development') {
    const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )},${Math.round(Math.random() * 255)})`
    console.log(
      '%c┍------------------------------------------------------------------┑',
      `color:${randomColor};`
    )
    console.log('| 请求地址：', response.config.url)
    console.log('| 请求参数：', response.config.data ? JSON.parse(response.config.data) : {})
    console.log('| 返回数据：', response.data)
    console.log(
      '%c┕------------------------------------------------------------------┙',
      `color:${randomColor};`
    )
  }
}

const instance = axios.create(DEFAULT_OPTIONS)

instance.interceptors.request.use(
  (config) => {
    Toast.loading({
      duration: 0,
      message: '加载中...',
      forbidClick: true
    })
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  (error) => {
    Toast.clear()
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    Toast.clear()
    responseLog(response)
    const code = response.data.code
    const msg = RESTFUL_ERROR_CODE_MAP[code]
    if (msg) {
      Toast(response.data.message || msg)
      if (code === 401) {
        Dialog.confirm({
          message: response.data.message || msg
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(response.data.message || msg))
    } else {
      return response
    }
  },
  (thrown) => {
    Toast(thrown.message || 'Error')
    setTimeout(() => {
      Toast.clear()
    }, 500)
    return Promise.reject(thrown)
  }
)

export default async function(options) {
  const { url } = options
  const requestOptions = Object.assign({}, options)

  try {
    const { data, data: { errno, errmsg }} = await instance.request(requestOptions)
    if (errno) {
      errorReport(url, errmsg, requestOptions, data)
      throw new Error(errmsg)
    }
    return data
  } catch (err) {
    errorReport(url, err, requestOptions)
    throw err
  }
}
