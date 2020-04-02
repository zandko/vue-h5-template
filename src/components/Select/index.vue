<template>
  <div>
    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      :label="label"
      :placeholder="placeholder"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" :overlay="overlay" :position="position">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Select',
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
    }
  },
  data() {
    return {
      value: '',
      showPicker: false
    }
  },
  methods: {
    onConfirm(value) {
      this.value = value
      this.showPicker = false
      this.$emit('onConfirm', value)
    }
  }
}
</script>
