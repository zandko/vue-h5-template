<template>
  <van-nav-bar
    :title="pageTitle"
    :left-arrow="pageTitle !== '首页'"
    :right-text="pageTitle === '首页' ? '组件测试' : ''"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <div v-if="pageTitle === '首页'" slot="left">
      <van-dropdown-menu>
        <van-dropdown-item v-model="language" :options="langOption" />
      </van-dropdown-menu>
    </div>
  </van-nav-bar>
</template>

<script>
import { VueVantLocales } from '@/lang'
export default {
  name: 'Navbar',
  data() {
    return {
      langOption: [
        { text: '中文', value: 'zh' },
        { text: 'English', value: 'en' }
      ]
    }
  },
  computed: {
    language: {
      get() {
        return this.$store.state.app.language
      },
      set(val) {
        VueVantLocales(val)
        this.$i18n.locale = val
        this.$store.dispatch('app/SetLanguage', val)
      }
    },
    pageTitle() {
      return this.$route.meta.title
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$router.push({ name: 'ComponentDemo' })
    }
  }
}
</script>
