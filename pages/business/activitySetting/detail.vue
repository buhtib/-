<template>
    <view class="content u-padding-top-10">
        <view class="u-margin-bottom-20">
            <van-cell :title="activitySettingDetailData.name" title-class="bold u-font-30"></van-cell>
        </view>

        <van-cell title="原价"  title-width="80px">
            <van-stepper :value="activitySettingDetailData.price" @change="stepperChange('price', $event)" :min="0"  button-size="100rpx" input-width="200rpx"/>
        </van-cell>
        <van-cell title="折后价" title-width="80px">
            <van-stepper :value="activitySettingDetailData.dis_price" @change="stepperChange('dis_price', $event)"  
                :min="0"  button-size="100rpx" input-width="200rpx"/>
        </van-cell>

        <van-button
			type="primary"
			block
			round
			:loading="submitBtnLoading"
			loading-type="spinner"
			class="submit-btn"
			@click="submit"
			>保存</van-button
		>

        <van-toast id="van-toast" />

		<van-dialog id="van-dialog" />

		<van-notify id="van-notify" />
    </view>
</template>

<script>
export default {
    data() {
        return {
            activitySettingDetailData:{},
            submitBtnLoading:false
        }
    },
    mounted() {
        this.activitySettingDetailData = getApp().globalData.activitySettingDetailData
    },
    methods: {
        stepperChange(name, e) {
            this.activitySettingDetailData[name] = e.detail
            this.watchPrice()
        },
        watchPrice() {
            const { dis_price,  price } = this.activitySettingDetailData
            if( dis_price >= price  && dis_price ) {
                this.$Dialog.alert({
                    message:'折扣价大于原价！',
                    showCancelButton:false
                }).then(()=>{
                    this.activitySettingDetailData.dis_price = this.activitySettingDetailData.price
                })
            }
        },
        submit() {
            const { dis_price,  price } = this.activitySettingDetailData
            if (!dis_price) {
                this.$Toast("折扣价格应大于0");
                return;
            }
            if (!price) {
                this.$Toast("原价格应大于0");
                return;
            }
			// this.submitBtnLoading = true
			// setTimeout(() => {
			// 	this.$Notify({ type: 'success', message: '保存成功',onClose:()=>{
			// 		this.submitBtnLoading = false
			// 		uni.navigateBack()
			// 	} });
			// }, 8000);
			// useraddress(this.form).then(res=>{
			//     this.$Toast(res.msg)
			//     setTimeout(uni.navigateBack, 800);
			// }).catch(res=>{
			//     this.$Toast(res.msg)
			// }).finally(() => {
			//     this.submitBtnLoading = false
			// })
		}
    }
}
</script>

<style lang="scss" scoped>

</style>