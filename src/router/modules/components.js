import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: '/components/list',
  name: 'ComponentDemo',
  meta: {
    title: 'Components'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/pages/components-demo/index'),
      name: 'demoList',
      meta: { title: 'DemoList' }
    },
    {
      path: 'loading',
      component: () => import('@/pages/components-demo/loading'),
      name: 'LoadingDemo',
      meta: { title: 'Loading' }
    },
    {
      path: 'flyin',
      component: () => import('@/pages/components-demo/flyin'),
      name: 'FlyinDemo',
      meta: { title: 'Flyin' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/pages/components-demo/backToTop'),
      name: 'BackToTopDemo',
      meta: { title: 'BackToTop' }
    },
    {
      path: 'select',
      component: () => import('@/pages/components-demo/select'),
      name: 'SelectDemo',
      meta: { title: 'Select' }
    }
  ]
}

export default componentsRouter
