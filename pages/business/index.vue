<template>
	<view class="content u-padding-30">
		<van-grid column-num="2" clickable>
			<van-grid-item :icon="item.icon" :text="item.name" v-for="(item, i) in dataLsit" :key="i" 
				icon-class="grid-item-icon" @click="goDetail(item.url)">
		</van-grid>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dataLsit: [
				{
					name: "未发货订单管理",
					url: "/pages/business/order/notSendOrders",
					icon: "/static/img/business/not-send-order.png",
				},
				{
					name: "全部订单查看",
					url: "/pages/business/order/allOrders",
					icon: "/static/img/business/all-order.png",
				},
				{
					name: "活动商品管理",
					url: "/pages/business/activitySetting/activitySetting",
					icon: "/static/img/business/activity.png",
				},
				{
					name: "满减设置",
					url: "/pages/business/fullReduction",
					icon: "/static/img/business/full-reduction.png",
				},
				{
					name: "商家电话设置",
					url: "/pages/business/tel",
					icon: "/static/img/business/tel.png",
				},
			],
		};
	},
	methods: {
		goDetail(url) {
			this.$u.route(url);
		},
	},
};
</script>

<style lang="scss" >
	.van-grid {
		border-radius: 20rpx !important;
		box-shadow: 0 2rpx 4rpx 0 rgba(0,0,0,0.50);
		background-color: #fff;

		.van-grid-item {
			height: 250rpx;
		}

		.van-grid-item__icon {
			font-size: 50px;
		}

		.van-grid-item__text {
			color: #000;
		}
	}

</style>
