//挂载公共方法
import Vue from 'vue'
import server from '../../utils/server'
import Toast from '../../wxcomponents/vant/toast/toast';
import Notify from '../../wxcomponents/vant/notify/notify';
import Dialog  from '../../wxcomponents/vant/dialog/dialog';

Toast.setDefaultOptions({
    forbidClick:true
})
Dialog.setDefaultOptions({
    zIndex:101
})
Vue.prototype.$Toast = Toast
Vue.prototype.$Notify = Notify
Vue.prototype.$Dialog = Dialog 
Vue.prototype.$get = server.get
Vue.prototype.$post = server.post