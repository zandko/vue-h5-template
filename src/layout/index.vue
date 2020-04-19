<template>
  <div class="app-wrapper">
    <navbar v-if="!hideNav" />
    <app-main />
  </div>
</template>

<script>
import AppMain from './components/AppMain'
import Navbar from './components/Navbar'
export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  },
  computed: {
    hideNav() {
      return this.$route.meta.hideNav
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .mobile .fixed-header {
    width: 100%;
  }
</style>
