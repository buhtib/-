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
				<view class="justify-center flex1" style="height:140rpx" 
				@click="$u.route('/pages/good-detail/index')">
					<view class="u-margin-right-20">
						<van-image
							width="140rpx"
							height="140rpx"
							fit="cover"
							src="https://lgts.mynatapp.cc/management?id=banner1&type=sm&suffix=jpg"
						/>
					</view>

					<view class=" justify-between column flex1 border-box u-padding-right-20" >
						<view class="u-font-28 van-multi-ellipsis--l2 ">{{ good.name }}</view>
						<view class="align-center justify-between " @click.stop="false">
							<view class="u-font-30 bold colore6 align-center">
								&yen;{{ good.price }}
								<text class="u-font-26 color6b split">{{good.specification}}</text>
							</view>
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
			
		};
	},
	methods: {
		checkboxChange(good, e) {
			const check = e.detail
			const {checkList} = this
			if( check ) {
				this.addOneCheckGood(good)
			}else {
				this.removeOneCheckGood(good)
			}
			this.$forceUpdate()
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
	.split {
		&::before {
			content: '/';
			display: inline-block;
			margin-left: 10rpx;
			margin-right: 10rpx;
		}
	}
}
</style>
