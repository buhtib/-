<template>
    <view class="page-content">
        <view  class="u-margin-top-30 u-margin-bottom-30 u-padding-left-20">
            <u-section title="收货人" :right="false" color="#07c160"></u-section>
        </view>
        <van-cell-group>
            <van-field
                :value="form.name"
                clearable
                label="姓名"
                placeholder="请输入真实姓名"
                @input="inputChange('name', '', $event)"
                title-width="50px"
                required/>
            <van-field
                :value="form.phone"
                clearable
                label="电话"
                title-width="50px"
                :maxlength="11"
                placeholder="手机号码"
                @input="inputChange('phone', '', $event)"
                type="number"
                required
                use-button-slot>
                <van-button slot="button" size="small" type="primary" plain v-if="getCodeFlag"
                @click="sendCode">
                    获取验证码</van-button>
                <van-button class="color20"  slot="button" size="small" 
                    type="primary" plain v-if="!getCodeFlag">{{codeTime}}s</van-button>
            </van-field>
            <van-field
                :value="form.code"
                clearable
                label="验证码"
                title-width="50px"
                :maxlength="4"
                placeholder="请输入验证码"
                @input="inputChange('code', '', $event)"
                required
                :border="false"
                use-button-slot>
            </van-field>
        </van-cell-group>

        <view  class="u-margin-top-30 u-margin-bottom-30 u-padding-left-20">
            <u-section title="收货地址" :right="false" color="#07c160"></u-section>
        </view>

        <van-cell-group>
            <van-cell title="地址选择" :value="form.address" is-link @click="popShow = !popShow" 
                value-class="van-ellipsis flex2" />
                <van-popup
                    :show="popShow"
                    position="bottom"
                    round
                    :close-on-click-overlay="false"
                    custom-style="height: 46%;" >
                    <van-area :area-list="areaList" @cancel="popShow = false" @confirm="changeAreaList"/>
                </van-popup>
            <van-field
                :value="form.detail_address"
                clearable
				type="textarea"
				autosize
                label="详细地址"
                placeholder="街道门牌、楼栋信息等"
                @input="inputChange('detail_address', '', $event)"
                title-width="70px"
                required/>
            <van-cell title="设置默认地址" :border="false">
                <van-switch :checked="form.default_address"  active-color="#07c160" 
                    @change="inputChange('default_address', '', $event)"/>
            </van-cell>
        </van-cell-group>

        <van-button 
            type="primary" block :loading="submitBtnLoading" 
            loading-type="spinner" class="submit-btn" @click="submit" :disabled="submitDisabled">保存</van-button>
        
        <van-dialog id="van-dialog" />

        <van-toast id="van-toast" />
    </view>
</template>

<script>
import { verifyphone, useraddress } from '@/service'
import columns from './region.js'
export default {
    data() {
        return {
            form:{
                opr:'query',
                name:'',
                phone:'',
                code:'',
                address:'',
                detail_address: '',
                default_address:true
            },
            chek:true,
            submitDisabled:false,
            popShow:false,
            areaList: columns,
            submitBtnLoading:false
        }
    },
    mounted() {
        this.getForm()
    },
    methods: {
        getForm() {
            useraddress(this.form, true).then(res=>{
                if(Object.keys(res.data).length) {
                    this.form.opr = 'update'
                    Object.assign(this.form, res.data)
                }else {
                    this.form.opr = 'add'
                }
            })
        },
        sendCode() {
            const { phone } = this.form;
            if( !phone ) {
                this.$Toast('请输入手机号码')
                return
            }
            if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone)) {
                this.$Toast("手机号有误");
                return;
            }
            this.setCodeTime()
            verifyphone({ phone:phone }).then(res=>{
                this.$Toast(res.msg)
            }).catch(res=>{
                this.$Toast(res.msg)
            })
        },
        inputChange(name, region, e ) {
            this.form[name] = region ? e.detail.value : e.detail
        },
        validate( value, msg ) {
            if( typeof(value) == 'string' && !value.trim() ) {
                this.$Dialog.alert({
                    title: '温馨提示',
                    message: msg
                })
                return false
            }else {
                return true
            }
        },
        changeAreaList(e) {
            let address = e.detail.values.map(item=>item.name)
            address = address.join('-')
            this.form.address = address
            // console.log(this.form.address);
            this.popShow = false
        },
        submit() {
            const { name, phone, code, address, detail_address, default_address } = this.form;
            console.log(this.form);
            
            if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone)) {
                this.$Toast("手机号有误");
                return;
            }
            if( this.validate(name, '请输入收货人姓名') && 
            this.validate(phone, '请输入手机号')  &&  
            this.validate(code, '请输入验证码')  &&  
            this.validate(address, '请选择地址') && 
            this.validate(detail_address, '请输入详细地址') ) {
                this.submitDisabled = true
                useraddress(this.form).then(res=>{
                    this.$Toast(res.msg)
                    setTimeout(uni.navigateBack, 800);
                    this.useraddress()
                }).catch(res=>{
                    this.$Toast(res.msg)
                }).finally(() => {
                    this.submitDisabled = false
                })
            }
        }
    }
}
</script>

<style lang="scss" >
    .submit-btn {
        position: absolute;
        bottom: var(--safe-area);
        width: 100%;
    }
    .flex2 {
        flex: 2!important;
    }
	.van-field__body--textarea.van-field__body--ios {
		// margin-top: 0 !important;
	}
</style>