<template>
  <div class="app-wrapper">
    <navbar />
    <principal />
  </div>
</template>

<script>
import Principal from './components/Principal'
import Navbar from './components/Navbar'
export default {
  name: 'Layout',
  components: {
    Principal,
    Navbar
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
