<template>
  <div class="demo-wrapper">
    <div v-for="item in components" :key="item.name" class="demo">
      <div>
        {{ item.title }}
      </div>
      <div>
        <van-button size="mini" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="handleToPage(item.name)">查看</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import components from '@/enum/components'
export default {
  name: 'ComponentsDemo',
  data() {
    return {
      components: components.$getValues()
    }
  },
  methods: {
    handleToPage(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-wrapper {
  @include flex;
  background-color: #f2f2f2;
}
.demo {
  @include wh(100%, 50px);
  @include fj(space-between);
  margin-top: 20px;
  padding: 0 20px 0 20px;
  line-height: 50px;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .01), 0 6px 12px 0 rgba(0, 0 ,0, .06);
}
</style>
