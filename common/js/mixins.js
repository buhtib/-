import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    computed:{
        ...mapState(['cartList', 'isIphoneX', 'wxCode', 'userInfo', 'phoneNumber', 'token', 'openid', 'is_super', 'codeTime', 'getCodeFlag', 'vuexForm', 'hasAddress', 'systemInfo'])
    },
    methods:{
        ...mapMutations(['setIsIphoneX', 'setWxCode', 'setUserInfo', 'setPhoneNumber', 'setOpenid', 'setToken', 'setIs_super', 'getUserInfo', 'ADD_CART', 'REDUCE_CART', 'INIT_BUYCART', 'CLEAR_CART', 'setCodeTime', 'setForm', 'setHasAddress', 'setSystemInfo', 'removeOneGood']),
        ...mapActions(['login', 'useraddress'])
    },
}