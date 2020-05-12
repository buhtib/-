<template>
	<view class="content">
		<shopIntro class="shopIntro"/>

		<view class="menu" :style="{height:height}">
			<view class="tabs">
				<van-sidebar :active-key="active" custom-class="sidebar">
					<van-sidebar-item
						:title="item.type"
						v-for="(item, i) in menuList"
						:key="i"
						custom-class="sidebar-item"
						:info="sidebarItemNum(item.items)"
						@click="sidebarItemClick(item, i)"
					/>
				</van-sidebar>
			</view>

			<view class="right-content">
				<scroll-view
					scroll-y
					scroll-with-animation
					:scroll-into-view="rightViewId"
					@scroll="scrollEvent"
					enable-back-to-top
				>
					<view
						v-for="parent in menuList"
						:key="parent.type_id"
						:id="'inToView' + parent.type_id"
					>
						<van-cell-group :border="false">
							<van-cell
								title-class="cell-title"
								custom-class="cell"
								:border="false"
							>
								<van-tag slot="title" type="primary" size="large">{{
									parent.type
								}}</van-tag>
							</van-cell>
						</van-cell-group>
						<van-card
							v-for="good in parent.items"
							:key="good.id"
							:num="good.num"
							:price="good.price"
							:desc="good.introduce"
							:title="good.name"
							:thumb="good.thumb"
							title-class="van-multi-ellipsis--l2 card-title font28"
							custom-class="card"
							lazy-load
							thumb-class="card-img"
							price-class="card-price font32"
							desc-class="card-desc van-multi-ellipsis--l2"
							thumb-mode="fill"
						>
							<view slot="footer"  class="u-margin-top-30 align-center justify-between">
								<view class="align-center">
									<view class="bold">规格:</view>
									<van-tag  >{{good.specification}}</van-tag>
								</view>
								<calculate-num :good="good" />
							</view>
						</van-card>
					</view>
				</scroll-view>
			</view>

			<van-toast id="van-toast" />

			<page-loading :loading="isPageLoading" />
		</view>
	</view>
</template>

<script>
// import { getStorelist } from "@/service/index";
import calculateNum from "@/components/calculateNum";
import menuList from "@/common/js/dataList";
import cart from "@/components/cart";
import shopIntro from '@/components/shop-intro'

export default {
	name: "menu",
	data() {
		return {
			isPageLoading: true,
			active: 0,
			menuList: [],
			// 右侧滚动view
			rightViewId: "",
			load: true,
			height:0
		};
	},
	components: {
		calculateNum,
		cart,
		shopIntro
	},
	onLoad() {
		// getApp().$vm.startLocation()
	},
	onShow() {
		// getApp().$vm.startLocation()
	},
	mounted() {
		this.getShopIntroHeight() 
		// getStorelist({ type: "querylist" }).then((res) => {
			this.isPageLoading = false;
			this.menuList = menuList;
			//获取本地缓存数据
			this.INIT_BUYCART();
			this.changeMenuList();
		// });
	},
	watch: {
		cartList() {
			this.changeMenuList();
		},
	},
	methods: {
		async getShopIntroHeight() {
			const shopIntroInfo  = await this.$u.getRect('.shopIntro')
			this.height = this.systemInfo.windowHeight - shopIntroInfo.height - 10 + 'px'
		},
		//购物车里的cartList数据变化时  改变menuList的数量 及计算总价和总数
		changeMenuList() {
			let { cartList } = this;
			let key = Object.keys(cartList);
			//清空时
			// if (key.length == 0) this.overlayShowOff();

			this.menuList.forEach((menu) => {
				menu.items.forEach((good) => {
					if (cartList[good.id]) {
						key.forEach((goodId) => {
							if (goodId == good.id) {
								good.num = cartList[goodId].num;
							}
						});
					} else {
						good.num = 0;
					}
				});
			});
		},
		//侧边栏的数字
		sidebarItemNum(items) {
			let num = 0;
			items.forEach((good) => {
				if (good.num) {
					num += good.num;
				}
			});
			if (num) {
				return num;
			}
		},
		//点击定位锚点
		sidebarItemClick(item, i) {
			this.rightViewId = "inToView" + this.menuList[i].type_id;
		},
		//滚动切换 slider active值
		scrollEvent(e) {
			const { pixelRatio, windowWidth } = uni.getSystemInfoSync();
			let {
				scrollLeft,
				scrollTop,
				scrollHeight,
				scrollWidth,
				deltaX,
				deltaY,
			} = e.detail;
			const { menuList } = this;
			let tabHeight = 0;
			if (this.load) {
				//获取每个块分类的top值
				for (let i = 0; i < menuList.length; i++) {
					let view = uni
						.createSelectorQuery()
						.select("#inToView" + menuList[i].type_id);
					view
						.fields(
							{
								size: true,
							},
							(data) => {
								menuList[i].top = tabHeight;
								tabHeight = tabHeight + data.height;
								menuList[i].bottom = tabHeight;
							}
						)
						.exec();
				}
				this.load = false;
			}

			scrollTop = scrollTop + 10;
			for (let i = 0; i < menuList.length; i++) {
				if (scrollTop > menuList[i].top && scrollTop < menuList[i].bottom) {
					this.active = i;
					return false;
				}
			}
		}
	},
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.van-card__content {
	flex-direction: column !important;
	justify-content: space-between !important;
}
.content {
	background-color: #f5f5f5;
}
.menu {
	box-sizing: border-box;
	display: flex;
	// height: ;
	overflow: hidden;
}
.tabs {
	width: 160rpx;
	height: 100%;
	overflow-y: auto;
}
.right-content {
	flex: 1;
	height: 100%;
	overflow-y: auto;
}
.right-content scroll-view {
	height: 100%;
}
.card-img {
	width: 164rpx !important;
	height: 164rpx !important;
}
</style>
