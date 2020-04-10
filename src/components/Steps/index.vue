<template>
  <van-steps :active="active">
    <van-step v-for="step in steps" :key="step">{{ step }}</van-step>
  </van-steps>
</template>

<script>
export default {
  name: 'Setps',
  props: {
    active: {
      type: Number,
      default: 0
    },
    steps: {
      type: Array,
      default: () => []
    }
  }
}
</script>
