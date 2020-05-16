<template>
    <view class="content">
        <van-cell >
            <view class="justify-between">
                <view class="align-center justify-end u-font-30 bold color000" slot="title">
                    订单总数：<text class="colore6">{{20}}</text>
                </view>
                <view class="align-center justify-end u-font-40 bold color000">
                    合计：<text class="colore6">￥{{400}}</text>
                </view>
            </view>
        </van-cell>
        <view class=" align-center w-100">
            <view class="cu-form-group align-center  w-100">
				<view class="title">时间筛选</view>
				<picker mode="date" :value="params.start_time"  @change="pickerChange('start_time', $event)">
					<view class="picker align-center justify-end">
                        <view class="picker_text lh-1">{{params.start_time ? params.start_time : '开始时间'}}</view>
                        <van-icon name="arrow" class="u-margin-left-10" />
					</view>
				</picker>
                <picker mode="date" :value="params.end_time"  @change="pickerChange('end_time', $event)">
					<view class="picker align-center justify-end">
						<view class="picker_text lh-1">{{params.end_time ? params.end_time : '结束时间'}}</view>
                        <van-icon name="arrow" class="u-margin-left-10" />
					</view>
				</picker>
			</view>
        </view>


        <scroll-view scroll-y style="height: calc(100vh - 100px);width: 100%;" @scrolltolower="reachBottom"
			v-if="dataList.length > 0">
			<view class="page-box">
				<view class="order" v-for="(item, index) in dataList" :key="index" >
					<view @click="goDetail(item)" class="ripple">
                        <view class="top " >
                            <view class="left">
                                下单时间: <view class="u-font-20 color95">{{$u.timeFormat(Date.now(), 'yyy-mm-dd hh:MM:ss')}}</view>
                            </view>
                            <view class="right">{{ item.deal }}</view>
                        </view>
                        <van-divider />
                        <view class="item" v-for="(good, index) in item.goodsList" :key="index" >
                            <view class="content">
                                <view class="title u-line-2">{{ good.title }}</view>
                            </view>
                            <view class="right">
                                <view class="price">
                                    ￥{{ priceInt(good.price) }}
                                    <text class="decimal">.{{ priceDecimal(good.price) }}</text>
                                </view>
                                <view class="number">x{{ good.number }}</view>
                            </view>
                        </view>
                        <van-divider />
                        <view class="total ">
                            共{{ item.total }}件商品 
                            <text class="total-price u-margin-left-40">
                                合计:<text class="decimal custom-value">￥{{ item.totalPrice }}</text>
                            </text>
                        </view>
                    </view>
					<van-divider />
					<view class="bottom " style="margin-top:0">
						<van-button  @click.stop="sendOut"  type="warning" >确认发货</van-button>
					</view>
				</view>
				<u-loadmore :status="loadStatus" bgColor="#f2f2f2" ></u-loadmore>
			</view>
		</scroll-view>

		<u-empty text="暂无未发货订单" mode="data" v-else></u-empty>

        <van-dialog id="van-dialog" />
    </view>    
</template>

<script>
    // import { getQueryorder }  from '@/service'
    export default {
        data() {
            return {
                dataList: [
                    {
                        id: 1,
                        total:3,
                        totalPrice:88,
                        deal: '交易成功',
                        goodsList: [
                            {
                                goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
                                title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
                                type: '灰色;M',
                                price: '348.58',
                                number: 2
                            },
                            {
                                goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
                                title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
                                type: '45cm;S',
                                price: '135.00',
                                number: 1
                            }
                        ]
                    },
                    {
                        id: 2,
                        total:3,
                        totalPrice:88,
                        deal: '交易失败',
                        goodsList: [
                            {
                                goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
                                title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
                                type: '粉色;M',
                                price: '128.05',
                                number: 1
                            }
                        ]
                    },
                    {
                        id: 3,
                        total:3,
                        totalPrice:88,
                        deal: '交易失败',
                        goodsList: [
                            {
                                goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
                                title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
                                type: '4K，广色域',
                                price: '1998',
                                number: 3
                            },
                            {
                                goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
                                title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
                                type: '容量大，速冻',
                                price: '2354',
                                number: 1
                            }
                        ]
                    },
                    {
                        id: 4,
                        total:3,
                        totalPrice:88,
                        deal: '交易失败',
                        goodsList: [
                            {
                                goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
                                title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
                                type: '4K，广色域',
                                price: '1543',
                                number: 3
                            },
                            {
                                goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
                                title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
                                type: '一打',
                                price: '120',
                                number: 1
                            }
                        ]
                    },
                    {
                        id: 5,
                        total:3,
                        totalPrice:88,
                        deal: '交易成功',
                        goodsList: [
                            {
                                goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
                                title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
                                type: '识别效率高',
                                price: '451',
                                number: 9
                            }
                        ]
                    }
                ],
                params: {
                    type:'all',
                    start_time:'',
                    end_time:'',
                    search_name:'',
                    page_num:1,
                    page_size:10
                },
                total:0,
                loadStatus: 'loadmore'
            }
        },
        mounted() {
            this.getNowTime()
            this.getOrderList()
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
            getNowTime() {
                this.params.start_time = `${new Date().format('yyyy-MM-dd')}`
                this.params.end_time = `${new Date().format('yyyy-MM-dd')}`
            },
            getDataList(search_name = "", isSearch = false) {
                this.params.search_name = search_name
                getQueryorder(this.params).then(res =>{
                    uni.stopPullDownRefresh()
                    let data = res.data
                    this.totalPrice = res.sum
                    if(isSearch) {
                        this.dataList = data
                    }else {
                        this.dataList = this.dataList.concat(data) 
                    }
                    this.total = res.total
                    if(data.length  ==  0) {
                        uni.showToast({title:'暂无数据', icon:"none"})
                    }
                    this.loadStatus = 'more'
                    if(this.dataList.length >= this.total) {
                        this.loadStatus = 'noMore'
                    }
                }).catch(()=>{
                    this.loadStatus = 'more'
                    if(this.dataList.length >= this.total) {
                        this.loadStatus = 'noMore'
                    }
                })
            },
            calculateDate(place_time) {
                return new Date(place_time).format('MM-dd hh:mm:ss')
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
                    this.dataList.push(data);
                }
                this.loadStatus = "loadmore"
            },
            // onReachBottom() {
            //     if(this.dataList.length >= this.total) {
            //         this.loadStatus = 'noMore'
            //         return;
            //     }
            //     this.params.page_num++
            //     this.loadStatus = 'loading'
            //     this.getDataList(this.params.search_name, false)
            // },
            onPullDownRefresh() {
                this.dataList = []
                this.params.page_num = 1
                this.params.search_name = ''
                this.getDataList('')
            },
            search(e) {
                this.params.page_num = 1
                this.getDataList(e.detail, true)
            },
            onCancel() {
                this.params.search_name = ''
                this.getDataList('', true)
            },
            watchStartDateAndEndDate(){
                const {  start_time , end_time }  = this.params
                if(new Date(end_time) - new Date(start_time) >= 0) {
                    return true
                }else {
                    uni.showToast({title:'结束时间不能小于开始时间', icon:"none"})
                    return false
                }
            },
            pickerChange(type, e) {
                this.params[type] = e.detail.value
                const {  start_time , end_time }  = this.params
                start_time && end_time && this.watchStartDateAndEndDate() && this.getDataList(this.params.search_name, true)
			},
            goDetail(item) {
                getApp().globalData.businessOrderDetail = item
                uni.navigateTo({
                    url:"/pages/home/business/order/detail"
                })
            },
            sendOut() {
                this.$Dialog.alert({
                    message:'是否确认收货?'
                }).then(()=>{
                    
                })
            }
        },
    }
</script>

<style lang="scss" >
    .content {
        .custom-value {
            color: #ee0a24 !important;
        }
    }
    @import '../../../user/my-order/common.scss';
</style>