<template>
	<view class="content u-padding-top-10">
		<view class="u-margin-bottom-20">
			<van-cell
				:title="totalNumTitle(businessOrderDetail.total)"
                title-class="u-font-30 bold"
			>
                <view class="align-center justify-end u-font-40 bold color000">
                    合计<text class="colore6">￥{{businessOrderDetail.totalPrice}}</text>
                </view>
			</van-cell>
		</view>
		<view v-for="(item, i) in items" :key="i" class="u-margin-bottom-20">
			<van-cell title="图片"  title-class="u-font-30 bold">
                <image :src="item.goodsUrl" class="img"></image>
			</van-cell>
			<van-cell title="名字" :value="item.title" title-class="u-font-30 bold" title-width="80px" 
                value-class="u-font-30  custom-value"/>
			<van-cell title="规格" :value="item.type" title-class="u-font-30 bold"  
                value-class="u-font-30  custom-value"/>
			<van-cell title="价格" :value="item.price" title-class="u-font-30 bold"  
                value-class="u-font-30  custom-value"/>
			<van-cell title="数量" :value="'x' + item.number" title-class="u-font-30 bold"  
                value-class="u-font-30  custom-value"/>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			businessOrderDetail: {},
			items: [],
		};
	},
	mounted() {
		this.businessOrderDetail = getApp().globalData.businessOrderDetail;
		this.getItem();
	},
	methods: {
		totalNumTitle(totalNum) {
			return `共计${totalNum}件商品`;
		},
		totalPriceTitle(totalPrice) {
			return `合计￥${totalPrice}`;
		},
		getItem() {
			this.items = this.businessOrderDetail.goodsList;
		},
	},
};
</script>

<style lang="scss" >
    .img {
        width: 200rpx;
        height: 200rpx;
    }
    .custom-value {
        color: #000 !important;
    }
</style>
