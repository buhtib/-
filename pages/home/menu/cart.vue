  <!-- 购物车 -->
<template>
  <view class="cart" >
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <view class="header">
        <view class="title">购物车</view>
        <van-button size="small" type="danger" icon="delete" @click="clearCart">清空</van-button>
      </view>
    <scroll-view scroll-y scroll-with-animation>
      <view class="van-hairline--bottom"  v-for="(good, id) in cartList" :key="id">
        <view class="item ">
          <view class="van-ellipsis name">{{good.name}}</view>
          <view class="price">&yen;{{good.price}}</view>
          <calculate-num :good="good" />
        </view>
        <view class="standard">规格：{{good.standard || ''}}</view>
      </view>
    </scroll-view>
  </view>

</template>

<script>
  import calculateNum from './calculateNum'

  export default {
    name:"cart",
    components:{
      calculateNum
    },
    methods: {
      //清除购物车
      clearCart(){
        this.$Dialog.confirm({
          title: '提示',
          message: '是否确定清空购物车?'
        }).then(() => {
          this.CLEAR_CART();
        }).catch(() => {
          this.$Toast('已取消');
        });
        
      },
    },
  }
</script>

<style lang="scss">
.cart {
  max-height: 600rpx;
}
.cart scroll-view{
  max-height: 500rpx;
}
.header {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90rpx;
  padding: 20rpx 30rpx;
  background-color: #eceff1;
}
.title {
  font-size: 30rpx;
  color: #666;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  padding-bottom: 10rpx;
  background-color: #fff;
}
.standard {
  padding: 0 30rpx 30rpx;
}
.name {
  width: 55%;
}
.price {
  color: #ee0a24;
}
</style>