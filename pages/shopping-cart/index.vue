<template>
	<view>
		<u-gap height="6" bg-color="#f5f5f5"></u-gap>
		<van-cell title="操作">
			<view class="align-center justify-end">
				<van-button
					size="small"
					type="info"
					icon="edit"
					v-if="!editModel"
					@click="editModel = true"
					>编辑</van-button
				>
				<van-button
					size="small"
					type="info"
					icon="success"
					v-if="editModel"
					@click="editModel = false"
					>完成</van-button
				>
			</view>
		</van-cell>
		<u-gap height="6" bg-color="#f5f5f5"></u-gap>
		<cartList ref="cartList" :setIsSelectAll.sync="isSelectAll" @setCheckListLength="setCheckListLength"/>
		<u-gap height="6" bg-color="#f5f5f5"></u-gap>
		<van-submit-bar
			v-if="!editModel"
			:disabled="!checkListLength"
			:price="totalPrice"
			button-text="去结算"
			@submit="onSubmit"
			:loading="loading"
			button-class="submit-bar-btn font28"
			bar-class=" u-padding-left-20"
		>
			<van-checkbox :value="isSelectAll" @change="checkboxChange"
				>全选</van-checkbox
			>
		</van-submit-bar>

		<van-submit-bar
			v-if="editModel"
			:disabled="!checkListLength"
			button-text="删除"
			@submit="delSubmit"
			:loading="loading"
			button-class="submit-bar-btn font28"
			bar-class="u-padding-left-20 w-100 justify-between "
		>
			<van-checkbox :value="isSelectAll" @change="checkboxChange"
				>全选</van-checkbox
			>
		</van-submit-bar>

		<u-empty mode="car" v-if="Object.values(cartList).length == 0"></u-empty>
		<van-dialog id="van-dialog" />
		<van-toast id="van-toast" />
	</view>
</template>

<script>
import cartList from "./cartList";

export default {
	components: { cartList },
	data() {
		return {
			loading: false,
			editModel: false,
			isSelectAll: true,
			checkListLength:0
		};
	},
	watch: {
		totalNum: {
			handler() {
				this.setTabBarBadge();
			},
			immediate: true,
		},
	},
	onShow() {
		this.$refs.cartList.getCheckList();
		this.isSelectAll = true
		this.watchCheckboxChange()
	},
	computed: {
		totalPrice() {
			let totalPrice = 0;
			let values = Object.values(this.cartList);
			totalPrice = values.reduce(
				(total, currentValue) =>
					+total + +currentValue.price * +currentValue.num,
				0
			);
			return totalPrice.toFixed(2) * 100;
		},
		totalNum() {
			let num = 0;
			let values = Object.values(this.cartList);
			num = values.reduce(
				(total, currentValue) => +total + +currentValue.num,
				0
			);
			return num;
		},
		// canSubmit() {
		// 	const { is_super, totalPrice } = this;
		// 	if (is_super) {
		// 		return true;
		// 	} else {
		// 		if (totalPrice == 0) {
		// 			return true;
		// 		} else {
		// 			return false;
		// 		}
		// 	}
		// },
	},
	mounted() {
		this.setCheckListLength()
	},
	methods: {
		// delSubmitDisabled() {
		// 	console.log(!Object.values(this.$refs.cartList.checkList).length);
		// 	if(this.$refs.cartList && this.$refs.cartList.checkList) {

				
		// 		return !Object.values(this.$refs.cartList.checkList).length
		// 	}
		// },
		setCheckListLength() {
			this.checkListLength = Object.values(this.$refs.cartList.checkList).length
		},
		setTabBarBadge() {
			if (this.totalNum) {
				uni.setTabBarBadge({
					index: 2,
					text: this.totalNum.toString(),
				});
			} else {
				uni.removeTabBarBadge({ index: 2 });
			}
		},
		watchCheckboxChange() {
			this.isSelectAll
				? this.$refs.cartList.getCheckList()
				: this.$refs.cartList.clearAllCheckList();
		},
		checkboxChange(e) {
			this.isSelectAll = e.detail;
			this.watchCheckboxChange()
			this.setCheckListLength()
		},
		delSubmit() {
			this.$Dialog
				.confirm({
					title: "提示",
					message: "是否删除选中物品?",
				})
				.then(() => {
					this.delCheckedGoods();
					this.$Toast("删除成功");
				})
				.catch(() => {
				});
		},
		delCheckedGoods() {
			const { checkList } = this.$refs.cartList
			for (const key in checkList) {
				this.removeOneGood(checkList[key]);
			}
			this.$refs.cartList.clearAllCheckList()
		},
		onSubmit() {
			const { totalPrice } = this;
			this.loading = true;
			this.$Toast.success("提交订单成功");
			uni.navigateTo({
				url: `/pages/home/confirm-order/Index?totalPrice=${totalPrice}`,
				complete: () => {
					this.loading = false;
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped></style>
