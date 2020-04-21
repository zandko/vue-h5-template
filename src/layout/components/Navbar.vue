<template>
  <van-nav-bar
    :title="transferTitle || pageTitle"
    left-arrow
    :fixed="true"
    @click-left="onClickLeft"
  >
    <template #left>
      <van-icon name="arrow-left" size="22" />
    </template>
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
    },
    transferTitle() {
      let transferTitle = ''
      this.$bus.on('changePageTitle', (title) => {
        this.$nextTick(() => {
          transferTitle = title
        })
      })
      return transferTitle
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    onClickRight() {
      this.$router.push({ name: 'ComponentDemo' })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .van-icon-arrow-left {
    color: #333333;
  }

  .van-nav-bar__title {
    @include scw(17PX, #333333, bold);
  }
}
</style>
