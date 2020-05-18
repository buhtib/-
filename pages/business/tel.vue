<template>
	<view class="u-padding-top-40 border-box">
        <van-cell-group>
            <van-field
                :value="form.phone"
                clearable
                label="电话"
                title-width="50px"
                :maxlength="11"
                placeholder="手机号码"
                @input="inputChange()"
                type="number"
                required
            >
            </van-field>

        </van-cell-group>
        <van-button 
            type="primary" block :loading="submitBtnLoading" 
            loading-type="spinner" class="submit-btn" @click="submit" >保存</van-button>

        <van-toast id="van-toast" />

        <van-notify id="van-notify" />
    </view>
</template>

<script>
export default {
	data() {
		return {
            tel: "",
            submitBtnLoading:false
		};
	},
	methods: {
        inputChange( e ) {
            this.tel = e.detail
        },
        submit() {
            const { tel } = this;
            
            if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(tel)) {
                this.$Toast("手机号有误");
                return;
            }
            this.$Notify({ type: 'success', message: '保存成功',onClose(){
                uni.navigateBack()
            } });
            
                // this.submitBtnLoading = true
                // setTimeout(() => {
                //     thifullReductions.submitBtnLoading = false
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
};
</script>

<style lang="scss" scoped>
    .submit-btn {
        position: fixed;
        left: 0;
        bottom: var(--safe-area);
        width: 100%;
    }
</style>
