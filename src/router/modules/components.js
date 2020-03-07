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
    }
  ]
}

export default componentsRouter
