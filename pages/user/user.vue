<template>
	<view class="content">
		<view class="u-padding-20 u-margin-bottom-10 user-av  justify-between align-center relative">
			<van-image
				use-error-slot
				width="140rpx"
				height="140rpx"
				fit="cover"
				round
				:src="avatarUrl"
			>
			</van-image>
			<view class="column  justify-between w-60 u-margin-left-20 u-margin-right-20 user-content">
				<view class="u-line-1 bold u-font-34">{{ nickName }}</view>
				<view class="u-line-1 color95">身份：顾客</view>
			</view>
			<van-button
				plain
				type="primary"
				open-type="getUserInfo"
				@getuserinfo="getUserinfoAction"
				size="small"
				class="refresh-info_btn"
				>更新</van-button
			>
		</view>
		<view class="order">
			<van-cell
				is-link
				title="我的订单"
				link-type="navigateTo"
				url="/pages/user/my-order/Index" >
			</van-cell>

			<view class="u-margin-top-20 u-margin-bottom-20">
				<van-grid :gutter="10" :column-num="3" clickable>
					<van-grid-item  text="已付款" link-type="navigateTo" url="/pages/user/my-order/Index?active=1">
						<van-icon name="/static/img/payed.png" color="#07c160" slot="icon" />
					</van-grid-item>
					<van-grid-item  text="待发货" link-type="navigateTo" url="/pages/user/my-order/Index?active=2" >
						<van-icon name="/static/img/wait.png" color="#07c160" slot="icon" />
					</van-grid-item>
					<van-grid-item  text="已送达" link-type="navigateTo" url="/pages/user/my-order/Index?active=3">
						<van-icon name="/static/img/arrive.png" color="#07c160" slot="icon" />
					</van-grid-item>
				</van-grid>
			</view>
		</view>
		<u-gap height="10" bg-color="#f5f5f5"></u-gap>
		<view class="cell-group">
			<van-cell-group :border="false" >
				<van-cell
					:border="false"
					is-link
					title="我的收货地址"
					link-type="navigateTo"
					url="/pages/user/address/index"
				>
					<van-icon name="location" color="#07c160" slot="icon" class="u-margin-right-10"/>
				</van-cell>
				<u-gap height="10" bg-color="#f5f5f5"></u-gap>
				<van-cell
					:border="false"
					is-link
					title="商家设置中心"
					link-type="navigateTo"
					url="/pages/business/index"
				>
					<van-icon name="shop-o" color="#07c160" slot="icon" class="u-margin-right-10"/>
				</van-cell>
			</van-cell-group>
		</view>
	</view>
</template>

<script>
import { setStore, getStore } from "../../config/storeage";

export default {
	data() {
		return {
			avatarUrl: "",
			nickName: "",
		};
	},
	watch: {
		userInfo: {
			handler(userInfo) {
				// console.log(userInfo)
				this.avatarUrl = userInfo.avatarUrl;
				this.nickName = userInfo.nickName;
			},
			immediate: true,
			deep: true,
		},
	},
	mounted() {
		// console.log(this.userInfo)
	},
	methods: {
		getUserinfoAction(e) {
			//存储用户信息
			this.setUserInfo(e.detail.userInfo);
		},
	},
};
</script>

<style lang="scss">
.content {
	margin-top: var(--m-10);

	.user-av {
		background: url('https://lgts.mynatapp.cc/management?id=user-bg&type=sm&suffix=jpg') 100% 100%;
		background-position: center top;
		min-height: 400rpx;
		.user-content {
			width: 340rpx;
			height: 100rpx;
		}
	}

	.order {
		position: absolute;
		top: 340rpx;
		left: 20rpx;
		width: 710rpx;
		min-height: 200rpx;
		border-radius: 20rpx;
		box-shadow: 0px 0px 16rpx 0px rgba(0,0,0,0.25);
		background-color: #fff;
	}

	.cell-group {
		margin-top: calc( 126px - 20rpx );
	}
}
</style>
