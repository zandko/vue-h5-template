<template>
  <div>
    <van-field
      v-model="value"
      readonly
      clickable
      name="picker"
      v-bind="$attrs"
      :label="label"
      :placeholder="placeholder"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" :overlay="overlay" :position="position">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="handleConfirmSelect"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Select',
  model: {
    prop: 'selectValue'
  },
  props: {
    label: {
      type: String,
      default: '选择器'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    columns: {
      type: Array,
      default: () => []
    },
    overlay: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom'
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: false
    },
    selectValue: {
      type: String
    }
  },
  data() {
    return {
      value: this.selectValue,
      showPicker: false
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
    handleConfirmSelect(value) {
      this.value = value
      this.showPicker = false
      this.$emit('confirm', value)
    }
  }
}
</script>
