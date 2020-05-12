<template>
	<view class="wrap">
		<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom"
			v-if="orderList.length > 0">
			<view class="page-box">
				<view class="order" v-for="(res, index) in orderList" :key="res.id">
					<view class="top">
						<view class="left">
							<view class="store">线上商城</view>
							<view class="u-font-20 color95">{{$u.timeFormat(Date.now(), 'yyy-mm-dd hh:MM:ss')}}</view>
						</view>
						<view class="right">{{ res.deal }}</view>
					</view>
					<van-divider />
					<view class="item" v-for="(item, index) in res.goodsList" :key="index">
						<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
						<view class="content">
							<view class="title u-line-2">{{ item.title }}</view>
							<view class="type">{{ item.type }}</view>
							<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
						</view>
						<view class="right">
							<view class="price">
								￥{{ priceInt(item.price) }}
								<text class="decimal">.{{ priceDecimal(item.price) }}</text>
							</view>
							<view class="number">x{{ item.number }}</view>
						</view>
					</view>
					<van-divider />
					<view class="total">
						共{{ totalNum(res.goodsList) }}件商品 合计:
						<text class="total-price">
							￥{{ priceInt(totalPrice(res.goodsList)) }}.
							<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
						</text>
					</view>
				</view>
				<u-loadmore :status="loadStatus" bgColor="#f2f2f2" ></u-loadmore>
			</view>
		</scroll-view>

		<u-empty text="亲,您还没有相关的订单哦,可以去看看有哪些想买的" mode="data" v-if="orderList.length == 0">
			<van-button slot="bottom" type="default" plain
				@click="$u.route({ url:'pages/home/home', type:'switchTab' })">去首页</van-button>
		</u-empty>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderList: [],
			dataList: [
				{
					id: 1,
					store: '夏日流星限定贩卖',
					deal: '交易成功',
					goodsList: [
						{
							goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
							title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
							type: '灰色;M',
							deliveryTime: '付款后30天内发货',
							price: '348.58',
							number: 2
						},
						{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
							title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
							type: '45cm;S',
							deliveryTime: '付款后30天内发货',
							price: '135.00',
							number: 1
						}
					]
				},
				{
					id: 2,
					store: '江南皮革厂',
					deal: '交易失败',
					goodsList: [
						{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
							title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
							type: '粉色;M',
							deliveryTime: '付款后7天内发货',
							price: '128.05',
							number: 1
						}
					]
				},
				{
					id: 3,
					store: '三星旗舰店',
					deal: '交易失败',
					goodsList: [
						{
							goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
							title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
							type: '4K，广色域',
							deliveryTime: '保质5年',
							price: '1998',
							number: 3
						},
						{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
							title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
							type: '容量大，速冻',
							deliveryTime: '保质5年',
							price: '2354',
							number: 1
						}
					]
				},
				{
					id: 4,
					store: '三星旗舰店',
					deal: '交易失败',
					goodsList: [
						{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
							title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
							type: '4K，广色域',
							deliveryTime: '珍藏10年好酒',
							price: '1543',
							number: 3
						},
						{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
							title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
							type: '一打',
							deliveryTime: '口感好',
							price: '120',
							number: 1
						}
					]
				},
				{
					id: 5,
					store: '三星旗舰店',
					deal: '交易成功',
					goodsList: [
						{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
							title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
							type: '识别效率高',
							deliveryTime: '使用方便',
							price: '451',
							number: 9
						}
					]
				}
			],
			loadStatus: 'loadmore'
		};
	},
	mounted() {
		this.getOrderList();
	},
	computed: {
		// 价格小数
		priceDecimal() {
			return val => {
				if (val !== parseInt(val)) return val.slice(-2);
				else return '00';
			};
		},
		// 价格整数
		priceInt() {
			return val => {
				if (val !== parseInt(val)) return val.split('.')[0];
				else return val;
			};
		}
	},
	methods: {
		// 总价
		totalPrice(item) {
			let price = 0;
			item.map(val => {
				price += parseFloat(val.price);
			});
			return price.toFixed(2);
		},
		// 总件数
		totalNum(item) {
			let num = 0;
			item.map(val => {
				num += val.number;
			});
			return num;
		},
		reachBottom() {
            this.loadStatus = "loading"
            setTimeout(() => {
                this.getOrderList();
            }, 1200);
		},
		// 页面数据
		getOrderList() {
			for(let i = 0; i < 5; i++) {
				let index = this.$u.random(0, this.dataList.length - 1);
				let data = JSON.parse(JSON.stringify(this.dataList[index]));
				data.id = this.$u.guid();
				this.orderList.push(data);
			}
			this.loadStatus = "loadmore"
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
	@import './common.scss';
</style>
