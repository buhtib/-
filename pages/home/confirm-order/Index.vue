<template>
    <view class="shopping-cart">
        <van-cell-group :border="false" >
            <van-cell :border="false" value="收货地址" is-link  :title="address" title-class="van-cell_title " custom-class="mb-cell"
                url="/pages/user/address/index"/>
        </van-cell-group>
        <van-cell-group :border="false" >
            <van-cell :border="false" title="商品清单" title-class="cell-title" custom-class="cell"/>
        </van-cell-group>
        <view class="goods-content">
            <scroll-view scroll-y scroll-with-animation >
                <view
                    class="good u-margin-top-20  u-padding-bottom-10 align-center "
                    v-for="(good, index) in dataList"
                    :key="index">
                    <view class="justify-center flex1" style="height:140rpx">
                        <view class="u-margin-right-20">
                            <van-image
                                width="140rpx"
                                height="140rpx"
                                fit="cover"
                                src="https://lgts.mynatapp.cc/management?id=banner1&type=sm&suffix=jpg"
                            />
                        </view>

                        <view class=" justify-between column flex1 border-box u-padding-right-20" >
                            <view class="u-font-28 van-ellipsis ">{{ good.name }}</view>
                            <view class="align-center justify-between ">
                                <view class="u-font-30 bold colore6 align-center">
                                    &yen;{{ good.price }}
                                    <text class="u-font-26 color6b split">{{good.specification}}</text>
                                </view>
                                <view>✖ {{ good.num }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <van-submit-bar
            :price="totalPrice"
            button-text="确认支付"
            @submit="onSubmit"
            :loading="loading"
            price-class="price-class"
            button-class="submit-bar-btn font28"
            bar-class=" custom-submit-bar-height"/>

        <van-toast id="van-toast" />
    </view>
</template>

<script>
    import {setStore, getStore} from '@/config/storeage'
    import { mobilePay } from '@/service/index'

export default {
    data() {
        return {
            loading:false,
            dataList:[],
			params:{
				provider:"",
                orderInfo:{},
                timeStamp:Date.now(),
                nonceStr:"",
                package:"",
                signType:"",
                paySign:""
            },
            totalPrice:0,
            id:'',
            address:''
        }
    },
    onLoad(options) {
        //购物车进入
        if(options.totalPrice) {
            this.totalPrice = +options.totalPrice;
            this.dataList = Object.values(this.checkList)
        }else {
            // // 商品详情进入
            const good = getApp().globalData.goodDetailData
            this.totalPrice = (+good.price * +good.num) * 100;
            this.dataList = [good]
        }
    },
    onShow() {
        this.getForm()
    },
    methods:{
        getForm() {
            const { name, phone, address, detail_address } = this.addressForm
            if(name && phone && address && detail_address) {
                this.address = `姓名:${name}\n电话:${phone}\n地址:${address}-${detail_address}`
            }
        },
        onSubmit() {
            uni.requestSubscribeMessage({
                tmplIds: ['SLSBnIs9l2baTkYyA_t-7ps2pUo_IFQlifw4Nuu3RqA'],
                success (res) { 
                    console.log('success', res);
                },
                fail(res) {
                    console.log('fail' , res);
                    
                }
            })
        //     if(!this.hasAddress) {
        //         this.$Toast('请填写收货地址')
        //         return;
        //     }
        //     this.loading = true;
        //     const params = Object.values(this.cartList)
        //     mobilePay(params).then(({nonce_str, appid, prepay_id, sign, time_stamp, id})=>{
        //         this.id = id
        //         uni.requestPayment({
        //             provider:"123",
        //             orderInfo:"123",
        //             timeStamp: time_stamp,
        //             nonceStr:nonce_str,
        //             package: prepay_id,
        //             signType:"MD5",
        //             paySign:sign,
        //             success:(res)=> {
        //                 // console.log('支付成功');
        //                 this.CLEAR_CART()
        //                 uni.reLaunch({
        //                     url:'/pages/home/pay-result/Success'
        //                 })
        //             },
        //             fail:()=>{
        //                 uni.navigateTo({
        //                     url:`/pages/home/pay-result/Fail?id=${this.id}`
        //                 })
        //             },
        //             complete:()=> {
        //                 this.loading = false;
        //             }
        //         })
        //     }).catch(()=>{
        //         uni.navigateTo({
        //             url:`/pages/home/pay-result/Fail?id=${this.id}`
        //         })
        //     }).finally(()=>{
        //         this.loading = false;
        //     })
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
        padding: 0 20rpx calc(138rpx + var(--safe-area));
        overflow: hidden;
        .van-cell_title {
            flex: 2;
        }
        .mb-cell {
            white-space: pre-wrap;
        }
        .van-submit-bar__text{
            box-sizing: border-box;
            padding-left: var(--m-40);
            text-align: left;
            color: var(--color-red);
            font-size: 32rpx;
        }
	}
	.goods-content {
        height: 100%;
        background-color: #fff;
	}
	.goods-content scroll-view{
        height:100%;
    }
    .good {
        border-bottom: 1px solid #eee;

        .split {
            &::before {
                content: '/';
                display: inline-block;
                margin-left: 10rpx;
                margin-right: 10rpx;
            }
        }
    }
</style>