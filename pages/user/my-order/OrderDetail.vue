<template>
    <view class="shopping-cart">
        <view class="goods-content">
            <scroll-view scroll-y scroll-with-animation >
                <block v-for="item in dataList" :key="item.id">
                    <van-card
                        :num="item.num"  :price="item.price" :desc="item.introduce"
                        :title="item.name" :thumb="baseUrl + item.src" 
                        title-class="van-multi-ellipsis--l2 card-title font28"
                        custom-class="card"  lazy-load thumb-class="card-img" price-class="card-price font32"
                        desc-class="card-desc van-multi-ellipsis--l2" thumb-mode="fill">
                    </van-card>
                </block>
            </scroll-view>
        </view>
    </view>
</template>

<script>

export default {
    data() {
        return {
            dataList:getApp().globalData.orderDetail
        }
    },
    computed: {
        baseUrl() {
            return this.$baseUrl
        }
    }
}
</script>

<style lang="scss" >
    page {
        padding-top: var(--m-10);
    }
	.shopping-cart {
        box-sizing: border-box;
		height: calc(100% - 128rpx - 30rpx);
        // height: 100%;
        padding: 0 20rpx;
        overflow: hidden;
	}
	.goods-content {
		height: calc(100vh - 128rpx - var(--cell-height) - 60rpx);
	}
	.goods-content scroll-view{
        height:100%;
    }
    .card {
        min-height: 140rpx;
    }
    .card-img {
        width: 164rpx !important;
        height: 164rpx !important;
    }
    .shopping-cart .van-submit-bar__text{
        box-sizing: border-box;
        padding-left: var(--m-40);
        text-align: left;
        color: var(--color-red);
        font-size: 32rpx;
    }
</style>