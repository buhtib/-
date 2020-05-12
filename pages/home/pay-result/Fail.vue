<template>
	<view class="pay column align-center border-box">
        <van-image width="130rpx" height="130rpx" round fit="cover"
                    src="/static/img/pay-fail.png" />
		<view class="pay-type_text font36">支付失败!</view>

		<view class="pay-bottom justify-between align-center border-box">
            <van-button round  color="#F0F2F5" @click="goHome"
                        custom-class="pay-bottom_l_btn pay-bottom_btn">返回首页</van-button>
            <van-button round color="var(--color-red)"  @click="goConfirmOrder"
                        custom-class="pay-bottom_r_btn pay-bottom_btn">继续支付</van-button>
		</view>
	</view>
</template>

<script>
import { deleteOrderList } from '../../../service/index'
export default {
	data() {
		return {
            
		}
    },
    onLoad({id}) {
        deleteOrderList({id})
    },
    methods: {
        goConfirmOrder() {
            uni.navigateBack()
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
