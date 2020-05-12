<!-- 购物车 -->
<template>
	<view class="cart">
		<scroll-view scroll-y scroll-with-animation>
			<view
				class="good u-margin-top-20  u-padding-bottom-10 align-center"
				v-for="(good, index) in cartList"
				:key="index">
				<view class="u-padding-40" >
					<van-checkbox  :value="checkList[good.id] ? true : false"
						@change="checkboxChange(good, $event)"></van-checkbox>
				</view>
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
						<view class="u-font-22 van-ellipsis ">规格:<van-tag  >{{good.specification}}</van-tag></view>
						<view class="align-center justify-between ">
							<view class="u-font-30 bold colore6">&yen;{{ good.price }}</view>
							<calculate-num :good="good" />
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import calculateNum from "@/components/calculateNum";

export default {
	components: {
		calculateNum,
	},
	data() {
		return {
			checkList:{}
		};
	},
	methods: {
		watchCheckList() {
			const {checkList} = this
			let checkListLength = Object.values(checkList).length
			let cartListLength = Object.values(this.cartList).length
			if( checkListLength == cartListLength) {
				this.$emit('update:setIsSelectAll', true)
			}else {
				this.$emit('update:setIsSelectAll', false)
			}
		},
		getCheckList() {
			this.checkList = { ...this.cartList }
		},
		clearAllCheckList() {
			this.checkList = {}
			this.$emit('setCheckListLength')
		},
		checkboxChange(good, e) {
			const check = e.detail
			const {checkList} = this
			if( check ) {
				checkList[good.id] = good
			}else {
				delete checkList[good.id]
			}
			this.checkList = checkList
			this.$forceUpdate()
			this.watchCheckList()
			this.$emit('setCheckListLength')
		},
	},
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.cart {
	max-height: calc(100vh - 140px );
}
.cart scroll-view {
	max-height: calc(100vh - 140px );
}
.good {
	border-bottom: 1px solid #eee;
}
</style>
