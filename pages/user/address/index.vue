<template>
    <view>
        <view class="u-padding-left-20 u-padding-right-20 address-content" v-if="siteList.length > 0">
            <view class="adress-content">
                <view
                    class="item shadow u-margin-top-20 u-margin-bottom-20 justify-between"
                    v-for="(res, index) in siteList"
                    :key="res.id"
                >
                    <view class="left">
                        <view class="top">
                            <view class="name">{{ res.name }}</view>
                            <view class="phone">{{ res.phone }}</view>
                            <view class="tag" v-if="res.default">
                                <text class="red">{{ res.default ? "默认" : "" }}</text>
                            </view>
                        </view>
                        <view class="bottom">
                            {{res.site}}
                        </view>
                    </view>
                    <view class="u-margin-left-20 flex justify-align-center">
                        <van-button type="default"  icon="delete" custom-style="color:red"
							@click="toDelSite(res)"></van-button>
                        <van-button type="default"  icon="edit" custom-style="color:#07c160"
							@click="toEditSite(res)"></van-button>
                    </view>
                </view>
            </view>
        </view>

		<u-empty text="没有收货地址哦,添加一个吧" mode="address" v-else></u-empty>

		<view class="add-btn">
			<van-button round icon="plus" type="primary" size="large"  @click="toAddSite">添加新地址</van-button>
		</view>
		<van-dialog id="van-dialog" confirm-button-color="#BE2026"/>
		<van-toast id="van-toast" />
    </view>
</template>

<script>
export default {
	data() {
		return {
            siteList: [],
            background: {
                backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
            }
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		getData() {
			this.siteList = [
				{
					id: 1,
					name: "游X",
					phone: "183****5523",
					default: true,
					site: "广东省深圳市宝安区 自由路66号广东省深圳市宝安区 自由路66号广东省深圳市宝安区 自由路66号广东省深圳市宝安区 自由路66号",
				},
				{
					id: 2,
					name: "李XX",
					phone: "183****5555",
					default: false,
					site: "广东省深圳市宝安区 翻身路xx号",
				},
				{
					id: 3,
					name: "王YY",
					phone: "153****5555",
					default: false,
					site: "广东省深圳市宝安区 平安路13号",
				},
				{
					id: 3,
					name: "王YY",
					phone: "153****5555",
					default: false,
					site: "广东省深圳市宝安区 平安路13号",
				},
				{
					id: 3,
					name: "王YY",
					phone: "153****5555",
					default: false,
					site: "广东省深圳市宝安区 平安路13号",
				},
				{
					id: 3,
					name: "王YY",
					phone: "153****5555",
					default: false,
					site: "广东省深圳市宝安区 平安路13号",
				},
				{
					id: 3,
					name: "王YY",
					phone: "153****5555",
					default: false,
					site: "广东省深圳市宝安区 平安路13号",
				},
				{
					id: 3,
					name: "王YY",
					phone: "153****5555",
					default: false,
					site: "广东省深圳市宝安区 平安路13号",
				},
				{
					id: 3,
					name: "王YY",
					phone: "153****5555",
					default: false,
					site: "广东省深圳市宝安区 平安路13号",
				},
				{
					id: 3,
					name: "王YY",
					phone: "153****5555",
					default: false,
					site: "广东省深圳市宝安区 平安路13号",
				},
			];
		},
		toDelSite(res) {
			this.$Dialog.confirm({
				title: '提示',
				message: '亲，是否确认删除改地址？',
				confirmButtonText:'删除'
			}).then(() => {
				this.$Toast('删除成功')
			});
		},
		toEditSite(res) {
			console.log(res);
			uni.navigateTo({
				url: "/pages/user/address/addOrEdit",
			});
		},
		toAddSite() {
			uni.navigateTo({
				url: "/pages/user/address/addOrEdit",
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.address-content {
	box-sizing: border-box;
	height: calc(100vh - 50px - var(--safe-area));
	overflow: auto;
	.item {
        display: flex;
		padding: 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;
			.phone {
				margin-left: 60rpx;
			}
			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;
				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color: rgb(49, 145, 253);
				}
				.red {
					background-color: red;
				}
			}
		}
		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
        }

	}
}
.add-btn {
	box-sizing: border-box;
	position: absolute;
	bottom:var(--safe-area);
	left: 0;
	width: 100%;
	padding: 0 20rpx;
}
</style>
