<template>
  <van-address-edit
    :area-list="areaList"
    show-postal
    show-delete
    show-set-default
    show-search-result
    :address-info="addressInfo"
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="handleCreateTest"
    @delete="handleDeleteTest"
    @change-detail="onChangeDetail"
  />
</template>

<script>
import { testInteractor } from '@/core'
import areaList from './area'
export default {
  name: 'Test',
  props: {},
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {
        name: '',
        tel: '',
        country: '',
        province: '',
        city: '',
        county: '',
        areaCode: '',
        postalCode: '',
        addressDetail: '',
        isDefault: false
      }
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    }
  },
  async created() {
    if (this.id) {
      await this.handleGetTest()
    }
  },
  methods: {
    async handleCreateTest(content) {
      try {
        if (this.id) {
          await testInteractor.updateTest(content)
        } else {
          await testInteractor.createTest(content)
        }
        this.$bus.emit('test-change')
        this.$router.go(-1)
      } catch (error) {
        console.log(error)
      }
    },
    async handleGetTest() {
      try {
        const test = await testInteractor.getTest(this.id)
        this.addressInfo = Object.assign({}, test)
      } catch (error) {
        console.log(error)
      }
    },
    async handleDeleteTest() {
      try {
        await testInteractor.deleteTest(this.id)
        this.$bus.emit('test-change')
        this.$router.go(-1)
      } catch (error) {
        console.log(error)
      }
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    }
  }

}
</script>
