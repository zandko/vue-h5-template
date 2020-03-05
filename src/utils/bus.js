import Vue from 'vue'

const bus = new Vue({
  methods: {
    on(event, callback) {
      this.$on(event, callback)
      return this
    },

    once(event, callback) {
      this.$once(event, callback)
      return this
    },

    off(event, callback) {
      this.$off(event, callback)
      return this
    },

    emit(event, ...args) {
      this.$emit(event, ...args)
      return this
    }
  }
})

export default {
  install(vue) {
    Object.defineProperty(vue.prototype, '$bus', {
      get: () => bus
    })
  }
}
