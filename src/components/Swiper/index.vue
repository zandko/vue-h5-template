<template>
  <van-swipe :autoplay="autoplay" @change="handleChangeSwiper">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" @click="handleClickSwiper(image)">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    autoplay: {
      type: Number,
      default: 3000
    },
    images: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleChangeSwiper(index) {
      this.$emit('change', index)
    },
    handleClickSwiper(image) {
      this.$emit('click', image)
    }
  }
}
</script>
