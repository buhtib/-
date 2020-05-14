<template>
    <view class="content">
        <view class="cu-form-group">
            <view class="title">姓名</view>
            <view class="color20 font28 w-70 t-align-r">{{businessOrderDetail.name}}</view>
        </view>
        <view class="cu-form-group">
            <view class="title">订单编号</view>
            <view class="color37 font28 w-70 t-align-r">{{businessOrderDetail.order_id}}</view>
        </view>
        <view class="cu-form-group">
            <view class="title">下单时间</view>
            <view class="color37 font28">{{calculateDate(businessOrderDetail.place_time)}}</view>
        </view>
        <view class="cu-form-group">
            <view class="title">订单状态</view>
            <view :class="businessOrderDetail.status ? 'color20' : 'colore6'" class=" font28">
                            {{businessOrderDetail.status  ? '已支付' : '未支付'}}</view>
        </view>
        <view class="cu-form-group">
            <view class="title">上菜状态</view>
            <view class="align-center">
                <view :style="{color: businessOrderDetail.serve_status ? '#1abc9c' : 'red'}" 
                        class=" font28">
                                {{businessOrderDetail.serve_status  ? '已送达' : '未送达'}}</view>
                <switch @change="selectDishStatusChange($event, businessOrderDetail)" 
                    :checked="businessOrderDetail.serve_status" style="margin-left:10px"/>
            </view>
        </view>
        <view class="cu-form-group">
            <view class="title">订单内容</view>
            <view class="w-70 color37 font28 w-70 t-align-r" 
                style="white-space:pre-wrap;text-align: right;">{{formatterItems()}}</view>
        </view>
        <view class="cu-form-group">
            <view class="title">收款</view>
            <view class="color20 font28 w-70 t-align-r">{{businessOrderDetail.total / 100}}</view>
        </view>
        <view class="cu-form-group">
            <view class="title">电话</view>
            <view class="color20 font28">
                {{businessOrderDetail.phone ? businessOrderDetail.phone : '无'}}</view>
        </view>
        <view class="cu-form-group">
            <view class="title">地址</view>
            <view class="color37 font28 w-70 t-align-r">
                {{businessOrderDetail.address ? businessOrderDetail.address : ''}}-{{businessOrderDetail.detail_address ? businessOrderDetail.detail_address : ''}}</view>
        </view>
    </view>
</template>

<script>
import { updateservestatus }  from '@/service'
export default {
    data() {
        return {
            businessOrderDetail:{},
            items:[]
        }
    },
    mounted() {
        this.businessOrderDetail = getApp().globalData.businessOrderDetail
        this.getItem()
    },
    methods: {
        getItem() {
            this.items = JSON.parse(this.businessOrderDetail.items)
        },
        calculateDate(place_time) {
            return new Date(place_time).format('yyyy-MM-dd hh:mm:ss')
        },
        selectDishStatusChange(e, { order_id }) {
            const dishStatus = e.detail.value
            console.log(dishStatus);
            let params = {
                order_id,
                serve_status:dishStatus ? 1 : 0
            }
            this.businessOrderDetail.serve_status = dishStatus
            updateservestatus(params)
        },
        formatterItems() {
            let allItemsString = ''
            const { items } = this
            if(items.length > 0) {
                allItemsString = items.map(({name, price, num}, index)=> 
                `${index+1}.${name} - 价格${price} - ${num}个`)
                allItemsString = allItemsString.join('\n')
            }
            console.log(allItemsString);
            
            return allItemsString
        },
    }
}
</script>

<style>

</style>