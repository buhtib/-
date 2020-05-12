<template>
	<view class="pay column align-center border-box">
        <van-image width="130rpx" height="130rpx" round fit="cover"
                    src="/static/img/pay-success.png" />
		<view class="pay-type_text font36">支付成功啦!</view>

		<view class="pay-bottom justify-between align-center border-box">
            <van-button round  color="#F0F2F5" @click="goOrder"
                        custom-class="pay-bottom_l_btn pay-bottom_btn">查看订单</van-button>
            <van-button round color="var(--color-red)"  @click="goHome"
                        custom-class="pay-bottom_r_btn pay-bottom_btn">返回首页</van-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
            
		}
    },
    methods: {
        goOrder() {
            uni.reLaunch({
                url:`/pages/user/my-order/Index`,
            })
        },
        goHome() {
            uni.reLaunch({
                url:'/pages/home/home'
            })
        }
    }
};
</script>

<style lang="scss">
    page {
        padding-top: var(--m-10);
    }
    .pay {
        padding-top: 152rpx;
        height: 100%;
        background-color: var(--bg-white);
    }
    .pay-type_text {
        margin-top: var(--m-20);
        color: var(--color-black);
    }
    .pay-bottom{
        width: 100%;
        padding: 100rpx 96rpx 0;
    }
    .pay-bottom_btn {
        width: 256rpx;
        height: 80rpx;
        font-size: 32rpx !important;
    }
    .pay-bottom_l_btn {
        color: var(--color-black) !important;
    }
    .pay-bottom_r_btn {
        color: var(--color-white) !important;
    }
</style>
