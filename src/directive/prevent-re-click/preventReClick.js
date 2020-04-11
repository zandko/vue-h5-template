export default {
  bind: function(el, binding) {
    function clickHandler(e) {
      if (el.contains(e.target)) {
        el.classList.add('van-button--disabled')
        el.disabled = true
        setTimeout(() => {
          el.classList.remove('van-button--disabled')
          el.disabled = false
        }, 1500)
        return false
      }
      if (binding.expression) binding.value(e)
    }
    el.__vueClickOutside__ = clickHandler
    document.addEventListener('click', clickHandler)
  },
  unbind(el, _binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
