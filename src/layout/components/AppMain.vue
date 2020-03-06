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
    keepAliveList(routes) {
      return []
    },
    key() {
      return this.$route.path
    }
  },
  created() {
    this.filterKeepAliveRouter(routes)
  },
  methods: {
    filterKeepAliveRouter(routes) {
      _(routes).forEach((route) => {
        if (route.meta && route.meta.keepAlive) {
          this.keepAliveList.push(route.name)
        }
        if (route.children && route.children.length) {
          this.filterKeepAliveRouter(route.children)
        }
      })
    }
  }
}
</script>
