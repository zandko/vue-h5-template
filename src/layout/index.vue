<template>
  <div class="app-wrapper">
    <navbar />
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
