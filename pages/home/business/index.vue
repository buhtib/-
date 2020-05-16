<template>
	<view class="content u-padding-30">
		<van-button
			hairline
			type="primary"
			size="large"
			v-for="(item, i) in dataLsit"
			:key="i"
			@click="goDetail(item.url)"
			custom-style="height: 200rpx;font-size:24px"
			custom-class=" bold u-margin-bottom-40"
		>
			{{ item.name }}
		</van-button>

	</view>
</template>

<script>
export default {
	data() {
		return {
			dataLsit: [
				{ name: "未发货订单管理", url: "/pages/home/business/order/notSendOrders" },
				{ name: "全部订单查看", url: "/pages/home/business/order/allOrders" },
				{ name: "活动商品管理", url: "/pages/home/business/activitySetting/activitySetting" },
				{ name: "满减设置", url: "/pages/home/business/fullReduction" },
				{ name: "商家电话设置", url: "/pages/home/business/tel" }
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

<style lang="scss" scoped></style>
