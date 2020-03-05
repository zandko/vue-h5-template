import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/pages/redirect/index')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/pages/home/index'),
        name: 'Home',
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'create',
        component: () => import('@/pages/test/index'),
        name: 'CreateTest',
        meta: { title: '添加地址' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/pages/test/index'),
        name: 'EditTest',
        meta: { title: '修改地址', keepAlive: true }
      },
      {
        path: 'move-dot',
        component: () => import('@/pages/move-dot/index'),
        name: 'MoveDot',
        meta: { title: '飞入购物车', keepAlive: true }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
