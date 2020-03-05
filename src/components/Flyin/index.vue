<template>
  <div>
    <transition
      v-for="(item,index) in balls"
      :key="index.id"
      appear
      @after-appear="afterEnter"
      @before-appear="beforeEnter"
    >
      <div v-show="item" class="flyin">
        <img class="cutout" :src="cutout" alt="">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Flyin',
  props: {
    elLeft: {
      type: Number,
      default: 0
    },
    elTop: {
      type: Number,
      default: 0
    },
    cutout: {
      type: String,
      default: 'https://img.yzcdn.cn/vant/ipad.jpeg'
    },
    balls: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.transform = `translate3d(${this.elLeft - 30}px,${this.elTop - 100}px , 0)`
      el.style.opacity = 0
    },
    afterEnter(el) {
      const badgePosition = document
        .getElementById('buycar')
        .getBoundingClientRect()
      el.style.transform = `translate3d(${badgePosition.left + 30}px,${badgePosition.top - 30}px,0)`
      el.style.transition = 'transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)'
      el.style.transition = 'transform .88s linear'
      this.$emit('update:balls', this.balls.map(item => false))
      el.style.opacity = 1
      el.addEventListener('transitionend', () => {
        el.style.display = 'none'
        this.listenInCart()
      })
      el.addEventListener('webkitAnimationEnd', () => {
        el.style.display = 'none'
        this.listenInCart()
      })
    },
    listenInCart() {
      document.getElementById('buycar').classList.add('flyin-to-cart')
      setTimeout(() => {
        document.getElementById('buycar').classList.remove('flyin-to-cart')
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.flyin {
  position: fixed;
  z-index: 100;
  top: 1rem;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  .cutout {
    animation: 0.88s flyin ease-in-out;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
}
</style>
