<template>
    <view class="content u-padding-10">
        <van-cell :title="item.name" is-link @click="goDetail(item)"
            v-for="(item, i) in dataList" :key="i" title-class="bold u-font-30">
            <view class="align-center justify-end">
                <view class=" colore6 bold u-font-30 u-margin-right-20" >
                    ￥{{item.dis_price}}
                </view>
                <view class=" colorae  u-font-24  delete-line" >
                    ￥{{item.price}}
                </view>
            </view>
        </van-cell>
    </view>
</template>

<script>
import dataList from '@/common/js/dataList'
export default {
    data() {
        return {
            dataList: [
				{
					id: this.$u.guid(),
					dis_price: 20,
					price: 45,
					introduce: "好吃吃",
					name: "韭菜鸡蛋" + this.$u.guid(6),
					specification: "500g/一包",
					thumb:
						"https://lgts.mynatapp.cc/management?id=banner1&type=sm&suffix=jpg",
				},
				{
					id: this.$u.guid(),
					dis_price: 20,
					price: 45,
					introduce: "好吃吃",
					name: "韭菜鸡蛋" + this.$u.guid(6),
					specification: "500g/一包",
					thumb:
						"//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg",
				},
				{
					id: this.$u.guid(),
					dis_price: 20,
					price: 45,
					introduce: "好吃吃",
					name: "韭菜鸡蛋" + this.$u.guid(6),
					specification: "500g/一包",
					thumb:
						"//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg",
				},
				{
					id: this.$u.guid(),
					dis_price: 20,
					price: 45,
					introduce: "好吃吃",
					name: "韭菜鸡蛋" + this.$u.guid(6),
					specification: "500g/一包",
					thumb:
						"//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg",
				},
			]
        }
    },
    methods: {
        goDetail(item) {
            getApp().globalData.activitySettingDetailData = item
            this.$u.route('pages/business/activitySetting/detail')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>