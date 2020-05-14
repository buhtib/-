import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import mutations from './mutations'
import actions from './actions'

const store = new Vuex.Store({
    state: {
        systemInfo:{},
        // 加入购物车的商品列表
        cartList: {},
        checkList:{},
        isIphoneX:false,
        wxCode:'',
        userInfo:{},
        phoneNumber:'',
        token:'',
        openid:'',
        is_super:'',
        codeTime:60, 
        getCodeFlag:true,
        hasAddress:false,
        addressForm:{
            name:'',
            phone:'',
            address:'',
            detail_address: ''
        },
        lat1 : 22.620075225830078,
        lng1 : 114.04234313964844
    },
    mutations: {
        ...mutations
    },
    actions
})

export default store
