<template>
  <div id="app">
    <router-view />
    <ServiceWorkerUpdatePopup />
  </div>
</template>

<script>
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue'
export default {
  name: 'App',
  components: {
    ServiceWorkerUpdatePopup
  },
  created() {
    this.handleFocusOut()
    this.handleResize()
  },
  methods: {
    handleFocusOut() {
      document.addEventListener('focusout', () => {
        document.body.scrollTop = 0
      })
    },
    handleResize() {
      const clientHeight = document.documentElement.clientHeight
      const resizeHandler = () => {
        const tagName = document.activeElement.tagName
        if (tagName) {
          const inputBox = tagName === 'INPUT' || tagName === 'TEXTAREA'
          if (inputBox) {
            setTimeout(() => {
              document.activeElement.scrollIntoView()
            }, 0)
          }
        }
        const bodyHeight = document.documentElement.clientHeight
        const ele = document.getElementById('fixed-bottom')
        if (ele) {
          if (clientHeight > bodyHeight) ele.style.display = 'none'
          else ele.style.display = 'block'
        }
      }
      window.addEventListener('resize', resizeHandler)
    }
  }
}
</script>

<style lang="scss">
#app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
