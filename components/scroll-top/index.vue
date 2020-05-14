<template>
    <view class="scroll-top bg-f justify-align-center" @tap="$emit('goTop')"> 
        <van-icon name="arrow-up" size="50rpx" color="#fff"></van-icon>
    </view>
</template>

<script>
export default {
}
</script>

<style>
    .scroll-top {
        position: fixed;
        bottom: calc(40rpx + var(--safe-area));
        right: 20rpx;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .4);
        z-index: 12;
    }
</style>