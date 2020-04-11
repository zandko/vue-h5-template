<template>
  <keep-alive :include="keepAliveList">
    <router-view :key="key" />
  </keep-alive>
</template>

<script>
import { routes } from '@/router'
export default {
  name: 'Principal',
  computed: {
    keepAliveList() {
      return this.filterKeepAliveRouter(routes)
    },
    key() {
      return this.$route.path
    }
  },
  methods: {
    filterKeepAliveRouter(routes) {
      const keepAliveList = []
      const filterRouter = (routes2) => {
        _(routes2).forEach((route) => {
          if (route.meta && route.meta.keepAlive) keepAliveList.push(route.name)
          if (route.children && route.children.length) filterRouter(route.children)
        })
        return keepAliveList
      }
      return filterRouter(routes)
    }
  }
}
</script>
