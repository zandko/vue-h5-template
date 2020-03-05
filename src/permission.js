import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import i18n from '@/lang'
// import { getToken } from '@/core/services/cache'
import { TITLE } from '@/constants/settings'

NProgress.configure({ showSpinner: false })

const getPageTitle = key => {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${TITLE}`
  }
  return `${TITLE}`
}

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  next()
  // const hasToken = getToken()

  // if (!hasToken) {
  //   next(`/login?redirect=${to.path}`)
  NProgress.done()
  // }
})

router.afterEach((to) => {
  NProgress.done()
  document.title = getPageTitle(to.meta.title)
})
