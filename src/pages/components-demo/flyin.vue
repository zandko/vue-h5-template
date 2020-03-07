<template>
  <div>
    <van-card
      v-for="item in 3"
      :key="item"
      num="2"
      price="2.00"
      desc="机不可失，失不再来..."
      title="ipad 大促销"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    >
      <div slot="footer">
        <van-button size="mini" @click="addToCart">加入购物车</van-button>
      </div>
    </van-card>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon id="buycar" icon="cart-o" text="购物车" :info="productNum" @click="onClickIcon" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
      <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
    </van-goods-action>
    <flyin v-if="balls.length" :el-left="elLeft" :el-top="elTop" :balls="balls" />
  </div>
</template>

<script>
import Flyin from '@/components/Flyin'

export default {
  name: 'FlyinDemo',
  components: {
    Flyin
  },
  data() {
    return {
      balls: [],
      elLeft: 0,
      elTop: 0,
      productNum: 5
    }
  },
  methods: {
    onClickIcon() {
      this.$toast('请点击列表加入购物车测试！')
    },
    onClickButton() {
      this.$toast('请点击列表加入购物车测试！')
    },
    addToCart() {
      this.productNum = this.productNum + 1
      this.elLeft = event.target.getBoundingClientRect().left
      this.elTop = event.target.getBoundingClientRect().top
      this.balls = [...this.balls, true]
    }
  }
}
</script>
