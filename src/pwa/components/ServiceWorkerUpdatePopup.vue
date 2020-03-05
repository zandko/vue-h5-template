<script>
export default {
  name: 'ServiceWorkerUpdatePopup',
  data() {
    return {
      refreshing: false,
      notificationText: 'New content is available!',
      refreshButtonText: 'Refresh',
      registration: null
    }
  },
  created() {
    // Listen for swUpdated event and display refresh notification as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  },
  methods: {
    showRefreshUI(event) {
      const h = this.$createElement
      this.registration = event.detail
      this.$notify.info({
        title: 'Update available',
        message: h('div', { class: 'sw-update-popup' }, [
          this.notificationText,
          h('br'),
          h('button', {
            on: {
              click: e => {
                e.preventDefault()
                this.refreshApp()
              }
            }
          }, this.refreshButtonText)
        ]),
        position: 'bottom-right',
        duration: 0
      })
    },
    refreshApp() {
    // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) return
      this.registration.waiting.postMessage('skipWaiting')
    }
  },
  // eslint-disable-next-line vue/require-render-return
  render() {
    // Avoid warning for missing template
  }
}
</script>

<style lang="scss" scoped>
.sw-update-popup > button {
  margin-top: 0.5em;
  padding: 0.25em 1.5em;
}
</style>
