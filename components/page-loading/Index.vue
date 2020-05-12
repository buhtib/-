
<!-- 页面初始化整个loading -->
<template>
  <view class="page-loading" v-if="loading">
    <van-loading  color="#1989fa" vertical>
      <view slots="default">加载中...</view>
    </van-loading>
  </view>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">

</style>