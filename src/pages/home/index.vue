<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { testInteractor } from '@/core'
export default {
  name: 'Home',
  data() {
    return {
      chosenAddressId: undefined,
      list: [],
      query: {
        page: 1,
        count: 10
      }
    }
  },
  async created() {
    this.$bus.on('test-change', (item) => {
      this.getTestList(this.query)
    })
    this.getTestList({ page: 1, count: 10 })
  },
  methods: {
    onAdd() {
      this.$router.push({ name: 'CreateTest' })
    },
    onEdit(item, index) {
      this.$router.push({ name: 'EditTest', params: { id: item.id }})
    },
    async getTestList(query) {
      try {
        this.query = Object.assign({}, this.query, query)
        const { data, total } = await testInteractor.getTestList(
          this.query
        )
        this.listTotal = total
        if (this.query.page === 1) {
          this.list = data
        } else {
          this.list = [...this.list, ...data]
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
