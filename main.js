import Vue from 'vue'
import App from './App'
import util from './utils/util'
import baseUrl from './utils/api'
import uView from "uview-ui";
import pageLoading from '@/components/page-loading/Index';
import scrollTop from '@/components/scroll-top';
Vue.component('page-loading', pageLoading)
Vue.component('scroll-top', scrollTop)
import mixins from './common/js/mixins'
import store from './store'
import './common/js/public'

Vue.mixin(mixins)
Vue.use(uView);

Vue.prototype.$store = store
Vue.prototype.$util = util
Vue.prototype.$baseUrl = baseUrl.baseImgUrl

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    store,
    ...App
})
app.$mount()
