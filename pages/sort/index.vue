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
						class="bg-f"
						:key="parent.type_id"
						:id="'inToView' + parent.type_id"
						@click="$u.route('/pages/good-detail/index')"
					>
						<view class="u-padding-20">
							<u-section :title="parent.type" :right="false" :color="$u.color['primary']"></u-section>
						</view>
						<u-gap height="10" bg-color="#f5f5f5"></u-gap>
						<view
							class="u-margin-top-20  u-padding-bottom-10 align-center van-hairline--bottom"
							v-for="(good, index) in parent.items"
							:key="index">
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
						<u-gap height="10" bg-color="#f5f5f5"></u-gap>
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
	.content {
		background-color: #f5f5f5;
		overflow: hidden;
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
			scroll-view {
				height: 100%;
			}
			.split {
				&::before {
					content: '/';
					display: inline-block;
					margin-left: 10rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
}
</style>
