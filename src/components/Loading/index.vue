<template>
  <transition>
    <div class="loader-layer active">
      <div v-if="type === 'animation'" class="loader-animation-c">
        <div class="cascade-bounce-in-one" :style="`background-color: ${color};`" />
        <div class="cascade-bounce-in-two" :style="`background-color: ${color};`">
          {{ message }}
        </div>
        <div class="cascade-bounce-in-three" :style="`background-color: ${color};`" />
      </div>
      <div v-else-if="type === 'sprite'" class="loader-icon-c">
        <div
          class="loader-icon"
          :style="{backgroundPositionY: -(positionY%7)*2.5 + 'rem'}"
        />
        <svg-icon
          icon-class="loading"
          class-name="loader-ellipse"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    color: {
      type: String,
      default: 'red'
    },
    message: {
      type: String,
      default: 'loading...'
    },
    type: {
      type: String,
      default: 'sprite' // sprite | animation
    }
  },
  data() {
    return {
      positionY: 0,
      timer: null
    }
  },
  mounted() {
    if (this.type === 'sprite') {
      this.timer = setInterval(() => {
        this.positionY++
      }, 600)
    }
  },
  beforeDestroy() {
    if (this.type === 'sprite') {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
.loader-layer {
  @include fixcc;
  @include minwh(120px, 120px);
  transition: all 0.6s;
  opacity: 0;
  visibility: hidden;
  filter: alpha(opacity=0);
}

.loader-layer.active {
  opacity: 1;
  visibility: visible;
  filter: alpha(opacity=100);
}

.loader-animation-c, .loader-icon-c {
  @include pcc;
  @include wh(100%, 100%);
  @include fcc();
  line-height: 120px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  .cascade-bounce-in-one,
  .cascade-bounce-in-two,
  .cascade-bounce-in-three {
    @include absolute(0, null, null, 0);
    @include wh(100%, 100%);
    @include scw(18px);
    opacity: 0.6;
    border-radius: 50%;
    animation: bounceIn 2s infinite ease-in-out;
  }
  .cascade-bounce-in-two {
    animation-delay: -0.8s;
  }
  .cascade-bounce-in-three {
    animation-delay: -1.8s;
  }
}

.loader-icon-c {
  width: 40px;
  height: 40px;
  overflow: inherit;
  .loader-icon {
    width: 100%;
    height: 100%;
    background: url('~@/assets/loading/loading.png') no-repeat 0 0;
    background-size: 40px auto;
    transform: translateY(0px);
    animation: bounce 0.8s infinite ease-in-out;
    z-index: 11;
  }
  .loader-ellipse {
    position: absolute;
    width: 52px;
    height: 52px;
    top: 36px;
    z-index: 10;
    animation: ellipse 0.8s infinite ease-in-out;
  }
}
</style>
