<template>
  <van-pagination
    v-model="listQuery.currentPage"
    :total-items="listQuery.total"
    :items-per-page="listQuery.pageSize"
    @change="handleChangeCurrentPage"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    listQuery: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleChangeCurrentPage(current) {
      this.$emit('change', current)
    }
  }
}
</script>
