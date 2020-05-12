<template>
    <view class="shopping-cart">
        <!-- <van-cell-group :border="false">
            <van-cell :border="false" title="lgt商城测试版" title-class="cell-title" custom-class="cell"/>
        </van-cell-group> -->
        <van-cell-group :border="false" >
            <van-cell :border="false" value="收货地址" is-link  :title="address" title-class="van-cell_title " custom-class="mb-cell"
                url="/pages/user/address/index"/>
        </van-cell-group>
        <van-cell-group :border="false" >
            <van-cell :border="false" title="商品清单" title-class="cell-title" custom-class="cell"/>
        </van-cell-group>
        <view class="goods-content">
            <scroll-view scroll-y scroll-with-animation >
                <block v-for="item in cartList" :key="item.id">
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

        <van-submit-bar
            :price="totalPrice"
            button-text="确认支付"
            @submit="onSubmit"
            :loading="loading"
            price-class="price-class"
            button-class="submit-bar-btn font28"/>

        <van-toast id="van-toast" />
    </view>
</template>

<script>
    import {setStore, getStore} from '../../../config/storeage'
    import { mobilePay } from '../../../service/index'

export default {
    data() {
        return {
            loading:false,
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
    onLoad({totalPrice}) {
        this.totalPrice = +totalPrice;
    },
    onShow() {
        this.getForm()
    },
    computed: {
        baseUrl() {
            return this.$baseUrl
        }
    },
    methods:{
        getForm() {
            const { name, phone, address, detail_address } = this.vuexForm
            if(name && phone && address && detail_address) {
                this.address = `姓名:${name}\n电话:${phone}\n地址:${address}-${detail_address}`
            }
        },
        onSubmit() {
            if(!this.hasAddress) {
                this.$Toast('请填写收货地址')
                return;
            }
            this.loading = true;
            const params = Object.values(this.cartList)
            mobilePay(params).then(({nonce_str, appid, prepay_id, sign, time_stamp, id})=>{
                this.id = id
                uni.requestPayment({
                    provider:"123",
                    orderInfo:"123",
                    timeStamp: time_stamp,
                    nonceStr:nonce_str,
                    package: prepay_id,
                    signType:"MD5",
                    paySign:sign,
                    success:(res)=> {
                        // console.log('支付成功');
                        this.CLEAR_CART()
                        uni.reLaunch({
                            url:'/pages/home/pay-result/Success'
                        })
                    },
                    fail:()=>{
                        uni.navigateTo({
                            url:`/pages/home/pay-result/Fail?id=${this.id}`
                        })
                    },
                    complete:()=> {
                        this.loading = false;
                    }
                })
            }).catch(()=>{
                uni.navigateTo({
                    url:`/pages/home/pay-result/Fail?id=${this.id}`
                })
            }).finally(()=>{
                this.loading = false;
            })
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
</style>