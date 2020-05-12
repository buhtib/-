<template>
    <van-popup :show="standardShow" position="bottom" z-index="108" round 
        :close-on-click-overlay="false" closeable 
        @close="$emit('update:standardShow', false)">
        <van-panel title="规格" desc="选择斤/箱"  use-footer-slot>
            <view class="standard-types">
                <van-button  plain size="small" 
                    :color="standard == '1斤' ? 'var(--color-red)' : 'var(--color-light-gray)'" 
                style="margin:0 40rpx" @click="changeStandardTypes('1斤')">1斤</van-button>
                <van-button  plain  size="small"
                    :color="standard == '1箱' ? 'var(--color-red)' : 'var(--color-light-gray)'" 
                    @click="changeStandardTypes('1箱')">1箱</van-button>
                <view><van-divider /></view>
                <view style="margin-right:60rpx"><calculate-num :good="goodItem" /></view>
            </view>
            <view slot="footer" class="justify-align-center" style="margin:20rpx 0">
            <van-button type="danger" round  color="var(--color-red)" 
                    @click="selectedOneGood" custom-class="selected-btn">选好了</van-button>
            </view>
        </van-panel>
    </van-popup>
</template>

<script>
    import calculateNum from './calculateNum'

    export default {
        components:{ calculateNum },
        props:['standardShow', 'goodItem'],
        data() {
            return {
                standard:'1斤'
            }
        },
        mounted() {
            if( this.goodItem.standard ) {
                this.standard = this.goodItem.standard
            }
        },
        methods: {
            changeStandardTypes(standard) {
                this.standard = standard
            },
            selectedOneGood() {
                if( !this.goodItem.num ) {
                    this.$Dialog.alert({
                        title: '提示',
                        message: '至少选择1件!',
                        zIndex:109
                    })
                }else {
                    console.log(this.standard);
                    
                    this.changeStandard({ good:this.goodItem, standard:this.standard })
                    this.$emit('update:standardShow', false)
                }
            }
        }
    }
</script>

<style lang="scss">
    .standard-types {
        margin: 40rpx 0;
    }

    .selected-btn {
        width: 300rpx;
    }
</style>