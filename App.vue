
<script>
	import { setStore, getStore } from './config/storeage';
	
	export default {
		onLaunch: function() {
			this.CLEAR_CART()
			this.getSystemInfo()
			// this.login().then(res=>{
			// 	this.getUserInfo()
			// 	this.useraddress()
			// })
		},
		onShow: function() {
			// this.getUserInfo()
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			getSystemInfo() {
				const systemInfo = uni.getSystemInfoSync();
				this.setSystemInfo(systemInfo)
				const model = systemInfo.model;
				if (model.search('iPhone X') != -1) {
					this.setIsIphoneX(true);
				}
			},
			//后台持续定位功能
			startLocation() {
				uni.startLocationUpdateBackground({
					success:(res)=> {
						uni.onLocationChange((res)=>{
                            this.$Dialog.close();
							const { latitude, longitude } = res
							// this.$Toast(`经度${latitude}维度${longitude}`)
							this.$Toast(this.calculationDistance(this.lat1, this.lng1, latitude, longitude))
							if ( Number(this.calculationDistance(this.lat1, this.lng1, latitude, longitude)) >  1){
								this.$Dialog({
									message:'不能离指定位置大于1米',
									showConfirmButton:false
								})
							}
							// console.log('location change', res)
						})
					},
					fail:(res)=>{
						// uni.showToast({
						// 	title:`开启后台定位失败,请开启定位到指定店家使用`,
						// 	icon:'none'
						// })
						this.$Dialog({
							message:'开启后台定位失败,请开启定位到指定店家的位置使用',
							showConfirmButton:false
						})
						console.log('开启后台定位失败', res)
					}
				})
			},
			// 计算两地之间的距离（lat1, lng1为商家经纬度  lat2， lng2为实时定位的经纬度）
			calculationDistance(lat1, lng1, lat2, lng2) {
				var radLat1 = lat1 * Math.PI / 180.0;
				var radLat2 = lat2 * Math.PI / 180.0;
				var a = radLat1 - radLat2;
				var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000) / 10000;
				return s * 1000
			}
		},
		globalData: {
			orderDetail:[],
			businessOrderDetail:{}
		}
	}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import "./common/css/common.css";
	@import "./common/css/css-var.css";
	@import "./wxcomponents/vant/common/index.wxss";
	@import "./common/css/vant-common.css";
	
	/* 字体样式 */
	.iconfont {
		font-size: 44rpx;
		color: #1989fa;
	}
	
	page {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		/* min-height: 100%; */
		background-color: #f5f5f5;
		-webkit-overflow-scrolling: touch;/* ios 平滑滚动*/
	}
	
	.content {
		box-sizing: border-box;
		min-height: 100%;
		padding-bottom: env(safe-area-inset-bottom);
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;/* ios 平滑滚动*/
	}

	/* 小程序所有组件初始化样式 box-sizing: border-box */
	/* view,scroll-view,swiper,swiper-item,movable-area,movable-view,cover-view,cover-image,icon,text,rich-text,progress,button,checkbox-group,checkbox,form,input,label,picker,picker-view,radio-group,radio,slider,switch,textarea,navigator,functional-page-navigator,image,video,camera,live-player,live-pusher,map,canvas,open-data,web-view,ad{
		box-sizing: border-box;
	} */

	/* #ifdef MP-BAIDU */
	page {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}


	/* .input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	} */
</style>
