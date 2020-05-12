import {
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
    CLEAR_CART
} from '../config/mutationsNames'

import {setStore, getStore} from '../config/storeage'

export default {
	setSystemInfo(state, systemInfo) {
		state.systemInfo = systemInfo;
	},
	setIsIphoneX(state, isIphoneX) {
		state.isIphoneX = isIphoneX;
	},
	setWxCode(state, wxCode) {
		state.wxCode = wxCode;
	},
	setUserInfo(state, userInfo) {
		state.userInfo = userInfo;
		setStore('userInfo', userInfo)
	},
	setPhoneNumber(state, phoneNumber) {
		state.phoneNumber = phoneNumber;
	},
	setOpenid(state, openid) {
		state.openid = openid;
	},
	setToken(state, token) {
		state.token = token;
	},
	setIs_super(state, is_super) {
		state.is_super = is_super;
	},
	getUserInfo(state) {
		const userInfo = getStore('userInfo')
		// console.log(uni.getStorageSync('userInfo'), userInfo)
		const { token } = state
		if( token ) {
			//缓存中有用户信息时
			if( userInfo && Object.keys(userInfo).length > 0) {
				this.commit('setUserInfo', JSON.parse(userInfo))
				uni.reLaunch({
					url:"/pages/home/home"
				})
			}else {
				//缓存中没有用户信息时
				// 微信授权判断
				wx.getSetting({
					success: res => {
						// console.log(res.authSetting['scope.userInfo'], res)
						//已授权
						if (res.authSetting['scope.userInfo'] === true) {
							uni.reLaunch({
								url:"/pages/home/home"
							})
						}
						else{
							uni.reLaunch({
								url:"/pages/login/login"
							})
						}
					}
				})
			}
		}
	},
	setCodeTime(state, codeTime) {
		state.codeTime = 60
		state.getCodeFlag = false
		let timer = setInterval(()=>{
			state.codeTime--
			if(state.codeTime == 0) {
				clearInterval(timer)
				state.getCodeFlag = true
			}
		},1000)
	},
	setForm(state, vuexForm) {
		state.vuexForm = Object.assign(state.vuexForm, vuexForm);
	},
	setHasAddress(state, hasAddress) {
		state.hasAddress = hasAddress;
	},
	// 加入购物车
	[ADD_CART](state, { id ,name, introduce, src ,price ,type_id ,num, specification }) {
		let cart = state.cartList;

		if (num && cart[id]) {
			cart[id].num ++;
		} else {
			cart[id] = { id ,name, introduce, src ,price ,type_id ,num:1, specification };
		}
		state.cartList = {...cart};
		//存入localStorage
		setStore('buyCart', state.cartList);
	},
	// 移出购物车
	[REDUCE_CART](state, { id ,name, introduce, src ,price ,type_id ,num, specification }) {
		let cart = state.cartList;
	
		if (cart[id] && cart[id].num > 0) {
			cart[id].num--;
			
			if (cart[id].num == 0) {
				//商品数量为0，则清空当前商品的信息
				delete cart[id]
			}
		}
		state.cartList = {...cart};
		//存入localStorage
		setStore('buyCart', state.cartList);
	},
	//移除某个商品
	removeOneGood(state, { id ,name, introduce, src ,price ,type_id ,num, specification }) {
		let cart = state.cartList;
		delete cart[id]
		state.cartList = {...cart};
		//存入localStorage
		setStore('buyCart', state.cartList);
	},
	//网页初始化时从本地缓存获取购物车数据
	[INIT_BUYCART](state) {
		let initCart = getStore('buyCart');
		if (initCart) {
			state.cartList = JSON.parse(initCart);
		}
	},
	//清空当前商品的购物车信息
	[CLEAR_CART](state, id = '') {
		state.cartList = {}
		setStore('buyCart', {});
	}
}