<template>
    <view class="content">
        <view class="cu-form-group font30 color000" style="font-size:30rpx">
            <view class="title">订单总数：<text class="color20">{{total}}</text></view>
            <view class="w-70 " 
                style="white-space:pre-wrap;text-align: right;">总额： 
                <text class="color20">{{totalPrice / 100}}</text> </view>
        </view>
        <van-search
            :value="params.search_name"
            placeholder="手机尾号查询"
            show-action
            background="#4fc08d"
            shape="round"
            cancel-class="colorfff"
            @search="search"
            @cancel="onCancel" />
        <view class=" align-center w-100">
            <view class="cu-form-group align-center  w-100">
				<view class="title">时间筛选</view>
				<picker mode="date" :value="params.start_time"  @change="pickerChange('start_time', $event)">
					<view class="picker align-center justify-end">
                        <view class="picker_text">{{params.start_time ? params.start_time : '开始时间'}}</view>
                        <icon class="iconfont iconright start_icon"></icon>
					</view>
				</picker>
                <picker mode="date" :value="params.end_time"  @change="pickerChange('end_time', $event)">
					<view class="picker align-center justify-end">
						<view class="picker_text">{{params.end_time ? params.end_time : '结束时间'}}</view>
                        <icon class="iconfont iconright"></icon>
					</view>
				</picker>
			</view>
        </view>
        <navigator v-for="(item, i) in dataList" :key="i" class="list uni-inline-item" @tap="goDeatil(item)"
			hover-start-time="100" hover-class="navigator-hover">
            <view class="middle uni-column flex1 align-stretch">
                <view class="top uni-row  ">
                    <view class="top-left uni-inline-item">
                        <view class=" mr20 van-ellipsis name color37">
                            姓名:<text class="color20">{{item.name}}</text></view>
                    </view>
                    <view class="top-right van-ellipsis  name" >
                        电话:<text class="color20">{{item.phone ? item.phone : '无'}}</text>
                    </view>
                </view>
                <view class="bottom ">
                    <view class="bottom-left  w-40 van-ellipsis name ">
                        收款: <text class="color20"> {{ item.total / 100 }}</text>
                    </view>
                    <view class="bottom-right  w-60 van-ellipsis name">
                        时间: {{ calculateDate(item.place_time) }}
                    </view>
                </view>
            </view>
        </navigator>

        <!-- <uni-load-more :status="loadStatus" v-if="dataList.length > 0"></uni-load-more>
        <view v-if="dataList.length == 0" class="no-data">暂无数据</view> -->
    </view>    
</template>

<script>
    import { getQueryorder }  from '@/service'
    export default {
        data() {
            return {
                dataList:[],
                params: {
                    type:'all',
                    start_time:'',
                    end_time:'',
                    search_name:'',
                    page_num:1,
                    page_size:10
                },
                total:0,
                totalPrice:0,
                loadStatus:"more"
            }
        },
        mounted() {
            this.getNowTime()
            this.getDataList()
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
            onReachBottom() {
                if(this.dataList.length >= this.total) {
                    this.loadStatus = 'noMore'
                    return;
                }
                this.params.page_num++
                this.loadStatus = 'loading'
                this.getDataList(this.params.search_name, false)
            },
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
            goDeatil(item) {
                getApp().globalData.businessOrderDetail = item
                uni.navigateTo({
                    url:"/pages/business/detail"
                })
            }
        },
    }
</script>

<style lang="scss" >
    .mr20 {
        margin-right: 20rpx;
    }
    page {
        height: 100vh;
    }
    .content {
        .project-list {
            // height: 100%;
            // overflow-y: auto;
        }
        .list {
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            height: 140rpx;
            padding: 10rpx 30rpx;
            background-color: #fff;
            border-top: 1px solid #E6E6E6;
        }
        .middle {
            /* width: 50%; */
            height: 100%;
            justify-content: space-between;
            overflow: hidden;
        }
        .top {
            display: flex;
            margin-top: 10rpx;
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            margin-top: 20rpx;
        }
        .top-left {
            display: flex;
            width: 60%;
        }
        .name {
            font-size:32rpx;
            font-weight:500;
        }
        .status {
            min-width:66rpx;
            height:28rpx;
            line-height: 28rpx;
            text-align: center;
            background:rgba(187,190,190,1);
            border-radius:14rpx;
            font-size: 22rpx;
            color: #fff;
        }
        .top-right {
            width: 40%;
            text-align: right;
        }
        .bottom-right {
            text-align: right;
        }
        .icon {
            color: #BBBEBE;
            font-size: 50rpx;
        }
        .no-data {
            display: flex;
            justify-content: center;
            margin-top: 20rpx;
            font-size: 28rpx;
        }

        .cu-form-group {
            margin-bottom: 10px;
        }
    }
</style>