<template>
	<view class="page-content">
		<u-swiper :list="list" height="600" interval="5000" @click="preImg"></u-swiper>
		<view class="u-padding-30 column bg-f">
			<view class="u-font-30 bold u-line-2">
				{{ good.name }}
			</view>
			<view class="bottom align-center justify-between u-margin-top-20">
				<view class="align-center ">
					规格:<van-tag>{{ good.specification }}</van-tag>
				</view>
				<view class="align-center">
					<view class="colore6 bold u-font-40 u-margin-right-20">
						￥{{ good.price }}
					</view>
					<view class="colorae u-font-24 delete-line">
						￥{{ good.dis_price }}
					</view>
				</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#f5f5f5"></u-gap>

		<van-tabs animated color="#ee0a24" line-width="100%">
			<van-tab title="商品详情">
				<view class="intro u-padding-20  u-margin-top-20">
					<u-section title="介绍" :right="false"></u-section>
					<view class="intro u-margin-top-20"> {{ good.introduce }} </view>
				</view>
				<van-image
					width="100%"
                    fit="widthFix"
                    height="400"
					src="https://lgts.mynatapp.cc/management?id=banner1&type=sm&suffix=jpg"
                    @click="$util.preImg('https://lgts.mynatapp.cc/management?id=banner1&type=sm&suffix=jpg')"
					lazy-load
				/>
				<van-image
					width="100%"
                    fit="widthFix"
                    height="400"
					src="https://lgts.mynatapp.cc/management?id=banner2&type=sm&suffix=jpg"
					lazy-load
				/>
				<van-image
					width="100%"
                    fit="widthFix"
                    height="400"
					src="https://lgts.mynatapp.cc/management?id=banner3&type=sm&suffix=jpg"
					lazy-load
				/>
				<van-image
					width="100%"
                    fit="widthFix"
                    height="400"
					src="https://lgts.mynatapp.cc/management?id=banner4&type=sm&suffix=jpg"
					lazy-load
				/>
				<van-image
					width="100%"
                    fit="widthFix"
                    height="400"
					src="https://lgts.mynatapp.cc/management?id=banner5&type=sm&suffix=jpg"
					lazy-load
				/>
			</van-tab>
		</van-tabs>

		<view class="fixed-bottom justify-between align-center u-padding-left-30 u-padding-right-40" 
			style="height:70px;border-top:1rpx solid #eee">
			<view class="flex align-center">
				<navigator 
				open-type="switchTab"
				url="/pages/home/home"
				class="column justify-around align-center u-padding-right-30 u-padding-left-30" 
				style="height:50px;">
					<van-icon name="/static/tabbar/home.png" size="30"/>
					<view>去首页</view>
				</navigator>
				<navigator 
				open-type="switchTab"
				url="/pages/shopping-cart/index"
				class="column justify-align-center u-padding-right-30 u-padding-left-30 u-margin-left-10"  
				style="height:50px;">
					<van-icon name="/static/tabbar/cart.png" size="30" :info="totalNum"/>
					<view>购物车</view>
				</navigator>
			</view>
			<calculateNum :good="good"/>
		</view>
	</view>
</template>

<script>
import calculateNum from "@/components/calculateNum";

export default {
	components: {
		calculateNum
	},
	data() {
		return {
			list: [
				{
					image:
						"https://lgts.mynatapp.cc/management?id=banner1&type=sm&suffix=jpg",
				},
				{
					image:
						"https://lgts.mynatapp.cc/management?id=banner2&type=sm&suffix=jpg",
				},
				{
					image:
						"https://lgts.mynatapp.cc/management?id=banner3&type=sm&suffix=jpg",
				},
			],
			good: {
				id: this.$u.guid(),
				price: 20.2,
				dis_price: 45,
				introduce:
					"粉底是施用于整个面部来起修饰和遮盖作用的一种美容化妆品。其最基本作用是颜面的修饰，它可以对面部进行肤色补正、修正质感、遮盖皮肤上的雀斑和肝斑等色素沉着，改善皮肤的粗糙感。另外，它还可以散射紫外线，防止过量的紫外线对皮肤的伤害。根据剂型可以分为以粉体为主的固体粉底制品、乳化型粉底制品和油水分散型粉底制品。人们可根据自身肤质选用适宜的粉底。",
				name: "韭菜鸡蛋" + this.$u.guid(6),
				specification: "500g",
				thumb:
					"https://lgts.mynatapp.cc/management?id=banner1&type=sm&suffix=jpg",
			}
		};
	},
	computed: {
		totalNum() {
			let num = 0;
			let values = Object.values(this.cartList);
			num = values.reduce(
				(total, currentValue) => +total + +currentValue.num,
				0
			);
			return num;
        }
	},
	mounted() {
		this.changGoodNum()
	},
	watch: {
		cartList() {
			this.changGoodNum();
		},
	},
	methods: {
		changGoodNum() {
			let { cartList, good } = this;
			let key = Object.keys(cartList);
			if (cartList[good.id]) {
				key.forEach((goodId) => {
					if (goodId == good.id) {
						good.num = cartList[goodId].num;
					}
				});
			} else {
				good.num = 0;
			}
			this.good = good
			this.$forceUpdate();
		},
        preImg(index) {
            const list = this.list.map(item=>item.image)
            this.$util.preImg(list[index], list)
        },
		onSubmit() {
			getApp().globalData.goodDetailData = this.good
			this.$Toast.success("提交订单成功");
			this.$u.route({
				url: '/pages/home/confirm-order/Index'
			})
		},
	},
};
</script>

<style lang="scss">
page {
	position: relative;

	.intro {
		text-indent: 1em;
	}
}

.page-content {
	// margin-bottom: 132rpx;
	padding-bottom: calc(env(safe-area-inset-bottom) + 74px);
	.van-custom-btn {
		padding: 0 30px;
		white-space: nowrap;
	}
}
</style>
