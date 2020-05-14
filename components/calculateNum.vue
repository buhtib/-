<template>
	<view class="calculate-num">
		<van-transition :show="goodNum" name="slide-left">
			<view @click.stop="removeOutCart()">
				<van-icon name="/static/img/delete.png" size="44rpx" />
			</view>
		</van-transition>

		<van-transition :show="goodNum" name="slide-left">
			<view class="cart_num font30">{{ goodNum }}</view>
		</van-transition>

		<view class="add_icon" @click.stop="addToCart()">
			<van-icon name="/static/img/add.png" size="44rpx" />
		</view>
	</view>
</template>

<script>
export default {
	name: "calculateNum",
	props: ["good"],
	data() {
		return {
			goodNum:0
		}
	},
	watch: {
		good: {
			handler() {
				this.goodNum = this.good.num
			},
			immediate: true
		}
	},
	methods: {
		removeOutCart() {
			if (this.goodNum > 0) {
				this.REDUCE_CART(this.good);
			}
		},
		addToCart() {
			this.ADD_CART(this.good);
		},
	},
};
</script>

<style lang="scss">
.calculate-num {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.cart_num {
	min-width: 40rpx;
	text-align: center;
}
</style>
