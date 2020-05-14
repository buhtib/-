
<template>
    <view class="shop-intro u-padding-20">
        <!-- <image class="shop-img shadow img-cover" src="/static/img/shop-img.jpg"></image> -->
        <view class="justify-between">
            <view class="u-font-30 bold">阿木兴韩式炸鸡 (西乡塘店)</view>
            <van-tag type="danger" size="medium" >营业中</van-tag>
        </view>
        
        <view class="u-font-20 color95 u-margin-top-20 u-margin-bottom-20">
            公告: 尊敬的顾客, 你好。要是收到包装的损坏的食品，请务第一时间致电我们，我们会给你满意的答复，谢谢</view>
        <view class="u-font-20 color95 u-margin-top-10 u-margin-bottom-10" @click="call">
            <van-tag type="primary" size="medium" plain >商家电话:{{tel}}</van-tag>
        </view>
        <view>
            <van-tag plain type="danger" style="margin-right:10rpx">15减6</van-tag>
            <van-tag plain type="danger" style="margin-right:10rpx">23减9</van-tag>
            <van-tag plain type="danger" style="margin-right:10rpx">35减15</van-tag>
            <van-tag plain type="danger">60减20</van-tag>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            tel:'13388888888'
        }
    },
    methods: {
        call() {
            uni.makePhoneCall({
                phoneNumber: this.tel
            });
        }
    },
}
</script>

<style lang="scss" scoped>
    .shop-intro {
        position: relative;
        width: 710rpx;
        min-height: 200rpx;
        margin: 10rpx  auto 20rpx;
        border-radius: 20rpx;
        background-color: #fff;
        .shop-img {
            position: absolute;
            right: 20rpx;
            top: -20rpx;
            width: 80rpx;
            height: 80rpx;
            border-radius: 10rpx;
        }
        .van-tag {
            margin-right: 10rpx !important;
        }
    }
</style>