<template>
    <view>
        <van-submit-bar
            :disabled="canSubmit"
            :price="totalPrice"
            button-text="去结算"
            @submit="onSubmit"
            :loading="loading"
            button-class="submit-bar-btn font28"
            bar-class="custom-submit-bar-height">
            <van-row gutter="20">
                <van-col offset="4">
                    <van-goods-action-icon
                        :icon="
                            totalNum > 0
                                ? '/static/img/car_active.png'
                                : '/static/img/car.png'
                        "
                        text="购物车"
                        :info="totalNum"
                        icon-class="cart-icon"
                        @click="seeInCart"
                    />
                </van-col>
            </van-row>

            <!-- <van-transition :show="cartShow" name="fade-up"> -->
            <cart slot="top" v-if="cartShow && totalNum > 0" />
            <!-- </van-transition> -->
        </van-submit-bar>

        <van-overlay
				:show="overlayShow && totalNum > 0"
				@click="overlayShowOff"
			/>
			
		<van-dialog id="van-dialog" />
    </view>
</template>

<script>
import cart from "@/components/cart";

export default {
    components:{cart},
    data() {
        return {
			//控制购物车显示
            cartShow: false,
			//遮罩层
			overlayShow: false,
			loading: false,
        }
	},
	watch: {
		totalNum(totalNum) {
			if( !totalNum ) {
				this.overlayShow = false
				this.cartShow = false
			} 
		}
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
		canSubmit() {
			const { is_super, totalPrice } = this;
			if (is_super) {
				return true;
			} else {
				if (totalPrice == 0) {
					return true;
				} else {
					return false;
				}
			}
		},
    },
    methods: {
		overlayShowOff() {
			this.cartShow = false;
			this.overlayShow = false;
		},
		seeInCart() {
			if (!this.totalNum) return;
			if (this.cartShow && this.overlayShow) {
				this.overlayShowOff();
				return;
			}
			this.cartShow = true;
			this.overlayShow = true;
		},
		onSubmit() {
			const { totalPrice } = this;
			this.loading = true;
			this.$Toast.success("提交订单成功");
			uni.navigateTo({
				url: `/pages/home/confirm-order/Index?totalPrice=${totalPrice}`,
				complete: () => {
					this.loading = false;
					this.overlayShowOff();
				},
			});
		},
    },
}
</script>

<style lang="scss" scoped>

</style>