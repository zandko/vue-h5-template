<template>
  <select-demo
    :columns="columns"
    @onConfirm="onConfirm"
  />
</template>

<script>
import SelectDemo from '@/components/Select'
export default {
  name: 'Select',
  components: {
    SelectDemo
  },
  data() {
    return {
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  },
  methods: {
    onConfirm(val) {
      console.log(val)
    }
  }
}
</script>
