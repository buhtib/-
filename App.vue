
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
				uni.getLocation({
					type: 'wgs84',
						success: (res) => {
							// uni.showToast({
							// 	title: '开启定位成功',
							// 	mask: true
							// });
							// this.$Toast({
							// 	forbidClick:false,
							// 	message:''
							// })
					},
					fail() {
						uni.reLaunch({
							url:'/pages/no-location/index'
						})
					}
				})
				// uni.startLocationUpdateBackground({
				// 	success:(res)=> {
				// 		uni.onLocationChange((res)=>{
                //             this.$Dialog.close();
				// 			const { latitude, longitude } = res
				// 			this.$Toast(`经度${latitude}维度${longitude}`)
				// 			this.$Toast(this.calculationDistance(this.lat1, this.lng1, latitude, longitude))
				// 			if ( Number(this.calculationDistance(this.lat1, this.lng1, latitude, longitude)) >  1){
				// 				this.$Dialog({
				// 					message:'不能离指定位置大于1米',
				// 					showConfirmButton:false
				// 				})
				// 			}
				// 			// console.log('location change', res)
				// 		})
				// 	},
				// 	fail:(res)=>{
				// 		// uni.showToast({
				// 		// 	title:`开启后台定位失败,请开启定位到指定店家使用`,
				// 		// 	icon:'none'
				// 		// })
				// 		this.$Dialog({
				// 			message:'开启后台定位失败,请开启定位到指定店家的范围内使用',
				// 			// showConfirmButton:false,
				// 			// showCancelButton:false
				// 		})
				// 		console.log('开启后台定位失败', res)
				// 	}
				// })
			},
			
		},
		globalData: {
			orderDetail:[],
			businessOrderDetail:{},
			goodDetailData:{},
			activitySettingDetailData:{}
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
		color:#000;
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

	/* ==================
			表单
	==================== */

	.cu-form-group {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}

	.cu-form-group+.cu-form-group {
		border-top: 1upx solid #eee;
	}

	.cu-form-group .title {
		text-align: justify;
		padding-right: 30upx;
		font-size: 30upx;
		position: relative;
		height: 60upx;
		line-height: 60upx;
	}

	.cu-form-group input {
		flex: 1;
		font-size: 30upx;
		color: #555;
		padding-right: 20upx;
	}

	.cu-form-group>text[class*="cuIcon-"] {
		font-size: 36upx;
		padding: 0;
		box-sizing: border-box;
	}

	.cu-form-group textarea {
		margin: 32upx 0 30upx;
		height: 4.6em;
		width: 100%;
		line-height: 1.2em;
		flex: 1;
		font-size: 28upx;
		padding: 0;
	}

	.cu-form-group.align-start .title {
		height: 1em;
		margin-top: 32upx;
		line-height: 1em;
	}

	.cu-form-group picker {
		flex: 1;
		// padding-right: 40upx;
		overflow: hidden;
		position: relative;
	}

	.cu-form-group picker .picker {
		line-height: 100upx;
		font-size: 28upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		text-align: right;
	}

	.cu-form-group textarea[disabled],
	.cu-form-group textarea[disabled] .placeholder {
		color: transparent;
	}
</style>
