<template>
    <view class="content" >
        <van-tabs :active="active"  sticky animated @change="activeChange">
            <van-tab title="全部" name="0">
                <all />
            </van-tab>
            <van-tab title="已付款" name="1">
                <Payed />
            </van-tab>
            <van-tab title="待发货" name="2">
                <waitSend />
            </van-tab>
            <van-tab title="已送达" name="3">
                <receiv />
            </van-tab>
        </van-tabs>
    
        <van-toast id="van-toast" />
    </view>
</template>

<script>
import All from './All'
import Payed from './Payed'
import waitSend from './waitSend'
import receiv from './receiv'
export default {
    components:{
        All,
        Payed,
        waitSend,
        receiv
    },
    data() {
        return {
            active:'0',
            info:0
        }
    },
    onLoad({active}) {
        this.active = active ? active : '0'
    },
    methods: {
        getOrderNum(info) {
            this.info = info
        },
        activeChange(e) {
            this.active = e.detail.name
        }
    },
}
</script>

<style lang="scss" >
</style>