<template>
	<scroll-view
		scroll-y
		style="height: 100%; width: 100%;"
		@scrolltolower="reachBottom"
		:scroll-top="scrollTop"
		scroll-anchoring
		scroll-with-animation
		@scroll="scroll"
	>
		<u-swiper
			id="swiper"
			:list="list"
			:effect3d="true"
			interval="5000"
			title
			height="400"
			@click="swiperItemClick()"
		></u-swiper>

		<view class="page-box">
			<view
				class="order bg-f shadow u-margin-top-30 u-margin-bottom-30"
				v-for="(item, index) in dataList"
				:key="item.id"
			>	
				<view class="sp-good" @click="$u.route('/pages/good-detail/index')">
					<good-special-block />
				</view>
				<van-image
					width="100%"
					height="160"
					image-class="img"
					lazy-load
					@click="$u.route('/pages/good-detail/index')"
					src="https://lgts.mynatapp.cc/management?id=banner2&type=sm&suffix=jpg"
					fit="cover"
				/>
				<view class="u-padding-20 column " >
					<view class="column" @click="$u.route('/pages/good-detail/index')">
						<view class="u-font-30 bold u-line-2">
							{{item.name}}
						</view>
						<view class="align-center u-margin-top-20">
							规格:<van-tag  >{{item.specification}}</van-tag>
						</view>
					</view>
					<view class="bottom align-center justify-between u-margin-top-30">
						<view class="align-center">
							<view class=" colore6 bold u-font-30 u-margin-right-20" >
								￥{{item.price}}
							</view>
							<view class=" colorae  u-font-24  delete-line" >
								￥{{item.dis_price}}
							</view>
						</view>

						<calculateNum :good="item"/>

					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
		</view>

		<scrollTop @goTop="goTop"/>
	</scroll-view>
</template>

<script>
import calculateNum from '@/components/calculateNum'
export default {
	components:{calculateNum},
	data() {
		return {
			scrollTop:0,
			old:{
				scrollTop:0
			},
			list: [
				{
					image: "https://lgts.mynatapp.cc/management?id=banner1&type=sm&suffix=jpg",
					title: "补水洗面奶活动1",
				},
				{
					image: "https://lgts.mynatapp.cc/management?id=banner2&type=sm&suffix=jpg",
					title: "爽肤水活动2",
				},
				{
					image: "https://lgts.mynatapp.cc/management?id=banner3&type=sm&suffix=jpg",
					title: "爽肤水活动3",
				},
				{
					image: "https://lgts.mynatapp.cc/management?id=banner4&type=sm&suffix=jpg",
					title: "爽肤水活动4",
				},
				{
					image: "https://lgts.mynatapp.cc/management?id=banner5&type=sm&suffix=jpg",
					title: "爽肤水活动5",
				},
			],
			dataList: [
				{
					id: this.$u.guid(),
					price: 20,
					dis_price: 45,
					introduce: "好吃吃",
					name: "韭菜鸡蛋" + this.$u.guid(6),
					specification: "500g/一包",
					thumb:
						"https://lgts.mynatapp.cc/management?id=banner1&type=sm&suffix=jpg",
				},
				{
					id: this.$u.guid(),
					price: 20,
					dis_price: 45,
					introduce: "好吃吃",
					name: "韭菜鸡蛋" + this.$u.guid(6),
					specification: "500g/一包",
					thumb:
						"//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg",
				},
				{
					id: this.$u.guid(),
					price: 20,
					dis_price: 45,
					introduce: "好吃吃",
					name: "韭菜鸡蛋" + this.$u.guid(6),
					specification: "500g/一包",
					thumb:
						"//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg",
				},
				{
					id: this.$u.guid(),
					price: 20,
					dis_price: 45,
					introduce: "好吃吃",
					name: "韭菜鸡蛋" + this.$u.guid(6),
					specification: "500g/一包",
					thumb:
						"//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg",
				},
			],
			loadStatus: "loadmore",
		};
	},
	mounted() {
		this.changeMenuList();
	},
	watch: {
		cartList() {
			this.changeMenuList();
		},
	},
	methods: {
		//购物车里的cartList数据变化时  改变List的数量 及计算总价和总数
		changeMenuList() {
			let { cartList } = this;
			let key = Object.keys(cartList);
			
			this.dataList.forEach((good) => {
				if (cartList[good.id] && cartList) {
					key.forEach((goodId) => {
						if (goodId == good.id) {
							good.num = cartList[goodId].num;
						}
					});
				} else {
					good.num = 0;
				}
			});
		},
		swiperItemClick(index) {
			this.$u.route({ url: `/pages/home/activity/activity${index + 1}` });
		},
		scroll(e) {
			this.old.scrollTop = e.detail.scrollTop
		},	
		goTop() {
			this.scrollTop = this.old.scrollTop
            this.$nextTick(()=>{
                this.scrollTop = 0
            });
		},
		reachBottom() {
			this.loadStatus = "loading";
			setTimeout(() => {
				this.dataList = [...this.dataList, this.dataList[0]];
				loadStatus: "loadmore";
				this.changeMenuList()
			}, 1200);
		},
	},
};
</script>

<style lang="scss">
.page-box {
	box-sizing: border-box;
	padding: 0 20rpx calc(100rpx + var(--safe-area));
	.order {
		position: relative;
		min-height: 400rpx;
		border-radius: 20rpx;

		.img {
			border-radius: 20rpx 20rpx 0 0;
			width: 99%;
			margin: 0 auto ;
		}

		.sp-good {
			position: absolute;
			right: 40rpx;
			top: 0;
			z-index: 10;
		}
	}
}
</style>
