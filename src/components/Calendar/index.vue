<template>
  <div>
    <van-field
      v-model="value"
      v-bind="$attrs"
      readonly
      clickable
      name="calendar"
      :label="label"
      :placeholder="placeholder"
      @click="showCalendar = true"
    />
    <van-calendar v-model="showCalendar" @confirm="handleConfirmCalendar" />
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  model: {
    prop: 'selectValue'
  },
  props: {
    label: {
      type: String,
      default: '日历'
    },
    placeholder: {
      type: String,
      default: '点击选择日期'
    },
    selectValue: {
      type: String
    }
  },
  data() {
    return {
      value: this.selectValue,
      showCalendar: false
    }
  },
  watch: {
    selectValue: function(newVal) {
      this.value = newVal
    },
    value(newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    handleConfirmCalendar(date) {
      this.value = `${date.getMonth() + 1}/${date.getDate()}`
      this.showCalendar = false
      this.$emit('confirm', date)
    }
  }
}
</script>
