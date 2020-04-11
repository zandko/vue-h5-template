<template>
  <div>
    <select-demo
      v-model="value"
      :columns="columns"
      @confirm="onConfirm"
    />
    <CalendarDemo v-model="value2" @confirm="onConfirm" />
  </div>
</template>

<script>
import SelectDemo from '@/components/Select'
import CalendarDemo from '@/components/Calendar'
export default {
  name: 'Select',
  components: {
    SelectDemo,
    CalendarDemo
  },
  data() {
    return {
      value: '杭州',
      value2: '7/6',
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
