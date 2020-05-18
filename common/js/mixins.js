import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    computed:{
        ...mapState(['cartList', 'isIphoneX', 'wxCode', 'userInfo', 'phoneNumber', 'token', 'openid', 'is_super', 'codeTime', 'getCodeFlag', 'addressForm', 'hasAddress', 'systemInfo', 'checkList', 'shangjia_latitude', 'shangjia_longitude'])
    },
    methods:{
        ...mapMutations(['setIsIphoneX', 'setWxCode', 'setUserInfo', 'setPhoneNumber', 'setOpenid', 'setToken', 'setIs_super', 'getUserInfo', 'ADD_CART', 'REDUCE_CART', 'INIT_BUYCART', 'CLEAR_CART', 'setCodeTime', 'setForm', 'setHasAddress', 'setSystemInfo', 'removeOneGood', 'addOneCheckGood', 'removeOneCheckGood',
        'setCheckList']),
        ...mapActions(['login', 'useraddress'])
    },
}