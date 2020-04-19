import Vue from 'vue'
import dsbridge from 'dsbridge'
import NATIVE_ERROR_CODE_MAP from '@/constants/native-error-code'

export class NativeService {
  instance

  static getInstance() {
    if (!this.instance) {
      this.instance = new NativeService()
    }
    return this.instance
  }

  testDsbridge(params, onSuccess) {
    const cb = async(errCode) => {
      const msg = NATIVE_ERROR_CODE_MAP[errCode]

      Vue.prototype.$toast(msg)

      if (errCode !== 6000) {
        this.errorReport(msg, 'testDsbridge', params)
      } else {
        await onSuccess()
      }
    }

    dsbridge.call('testDsbridge', params, cb)
  }

  // 调用 native 接口出错向 sentry 发送错误信息
  errorReport(errorMsg, methodName, params) {
    if (window.$sentry) {
      const errorInfo = {
        error: new Error(errorMsg),
        type: 'callNative',
        methodName,
        params: JSON.stringify(params)
      }
      window.$sentry.log(errorInfo)
    }
  }
}
