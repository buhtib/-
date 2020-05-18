<template>
    <view style="margin-top:var(--status-bar-height)">
        <u-empty text="应用需要授权使用定位信息" mode="address">
            <view slot="bottom" class="column justify-align-center">
                <!-- <view class="u-font-20 colorae">应用需要授权使用定位信息</view> -->
                <view class="u-font-22 colorae u-margin-bottom-10 u-margin-top-10">
                    请点击右上角三个点检查是否开启"设置- 隐私 - 位置信息", 并且选择允许</view>
                <view class="u-font-26 colorae">若你确认定位服务已开启, 请尝试 
                    <text style="color:var(--color-blue)" class="bold u-margin-left-20 u-font-28" 
                    @click="startLocation">刷新</text>
                </view>
            </view>
        </u-empty>

        <van-toast id="van-toast" />
    </view>
</template>

<script>
export default {
    methods:{
        startLocation() {
            uni.getLocation({
                type: 'gcj02',
                success: (res) => {
                    this.$u.route({
                        type:'reLaunch',
                        url:'pages/home/home'
                    })
                    console.log(res)
                },
                fail:()=> {
                    this.$Toast({
                        forbidClick:false,
                        message:'重试失败, 请检查是否开启定位'
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>