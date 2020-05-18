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
        shangjia_latitude : 22.838966,
        shangjia_longitude : 108.219741
    },
    mutations: {
        ...mutations
    },
    actions
})

export default store
