<template>
	<view class="login column align-center">
        <van-image width="220rpx" height="220rpx"  
                    src="/static/img/logo.png" />
		<view class="logintxt font40">lgt商城测试版</view>

		<view class="login-bottom column align-center">
            <van-button color="#40b3f4" round custom-class="login-button"
                        open-type="getUserInfo" @getuserinfo="getUserinfoAction">微信授权</van-button>
			<view class="logintxt">该操作需要您的授权</view>
		</view>
	</view>
</template>

<script>

export default {
	data() {
		return {
            
		};
	},
	methods: {
        /**
         * 获取用户登录信息
         */
        getUserinfoAction (e) {
            //点击拒绝
            if (!e.detail.userInfo) {
                this.openSetting()
                //点击允许
            }else {
                this.wxLogin(e.detail.userInfo)
            }
        },
        wxLogin(userInfo) {
            //存储用户信息
            this.setUserInfo(userInfo)
            this.login().then(res=>{
                uni.switchTab({
                    url:"/pages/home/home"
                })
            })
        },
        //拒绝授权再次弹出的授权，，跳转设置页面授权  openSetting要在showModal中调用
        openSetting() {
            uni.showModal({
                title: '警告',
                content: '小程序需要您的微信授权才能使用哦~ 请点击确定按钮再次设置授权；错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮',
                success:(res)=> {
                    //用户点击确定
                    if (res.confirm) {
                        uni.openSetting({
                            success:(res)=> {
                                console.log(res)
                                //这里是授权成功之后 填写你重新获取数据的js
                                if (res.authSetting["scope.userInfo"] === true) {
                                    this.wxLogin()
                                }
                            }
                        })
                        //用户点击取消
                    } else if (res.cancel) {

                    }
                }
            })
        },
    }
};
</script>

<style lang="scss">
.login {
	padding-top: 120rpx;
}
.logintxt {
    margin-top: var(--m-20);
	color: var(--color-black);
}
.login-bottom{
	padding: 500rpx 0 0;
}
.login-bottom .login-button {
    width: 500rpx;
}
</style>
