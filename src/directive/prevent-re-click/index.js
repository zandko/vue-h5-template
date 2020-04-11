import preventReClick from './preventReClick'

const install = function(Vue) {
  Vue.directive('preventReClick', preventReClick)
}

preventReClick.install = install
export default preventReClick
