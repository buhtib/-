import api from './api'
import Toast from '../wxcomponents/vant/toast/toast';
import store from '../store'
import Vue from 'vue'

export default {
    get(url, data = {}, isLoadingFlag = false) {
        isLoadingFlag && uni.showLoading({
            title:"加载中",
            mask:true
        })
        const RUEST = ()=>{
        const { token } = store.state
        
            return new Promise((resolve, reject) => {
                uni.request({
                    url:api.baseUrl + url,
                    data,
                    header: {"Cookie":`JSESSIONID=${token}`},
                    method:"GET",
                    success(res) {
                        if(res.statusCode == 200) {
                            if(res.data.code == -3) {                                
                                //TOKEN失效 重新抓取
                                Vue.prototype.$store.dispatch('login').then(res=>{
                                    RUEST()
                                })
                                return;
                            }
                            resolve(res.data)
                        }else {
                            reject(res.msg)
                            Toast(res.msg || '出现异常, 请重试')
                        }
                    },
                    fail(res) {
                        reject(res.msg)
                        Toast(res.msg || '出现异常, 请重试')
                    },
                    complete() {
                        uni.hideLoading()
                    }
                })
            })
        }
        return RUEST();
    },
    login(url, data = {}, isLoadingFlag = false) {
        isLoadingFlag && uni.showLoading({
            title:"加载中",
            mask:true
        })
        return new Promise((resolve, reject) => {
            uni.request({
                url:api.baseUrl + url,
                data,
                method:"POST",
                success(res) {
                    if(res.statusCode == 200) {
                        resolve(res.data)
                    }else {
                        reject(res.msg)
                        Toast(res.msg || '出现异常, 请重试')
                    }
                },
                fail(res) {
                    reject(res.msg)
                    Toast(res.msg || '出现异常, 请重试')
                },
                complete() {
                    uni.hideLoading()
                }
            })
        })
    },
    post(url, data = {}, isLoadingFlag = false) {
        isLoadingFlag && uni.showLoading({
            title:"加载中",
            mask:true
        })
        const RUEST = ()=>{
        const { token } = store.state 

            return new Promise((resolve, reject) => {
                uni.request({
                    url:api.baseUrl + url,
                    data,
                    header: {"Cookie":`JSESSIONID=${token}`},
                    method:"POST",
                    success(res) {
                        if(res.statusCode == 200) {
                            if(res.data.code == -3) {
                                //TOKEN失效 重新抓取
                                Vue.prototype.$store.dispatch('login').then(res=>{
                                    RUEST()
                                })
                                return;
                            }
                            resolve(res.data)
                        }else {
                            reject(res.msg)
                            Toast(res.msg || '出现异常, 请重试')
                        }
                    },
                    fail(res) {
                        reject(res.msg)
                        Toast(res.msg || '出现异常, 请重试')
                    },
                    complete() {
                        uni.hideLoading()
                    }
                })
            })
        }
        return RUEST();
    },
    formPost(url, data = {}, isLoadingFlag = false) {
        isLoadingFlag && uni.showLoading({
            title:"加载中",
            mask:true
        })
        const RUEST = ()=>{
        const { token } = store.state 

            return new Promise((resolve, reject) => {
                uni.request({
                    url:api.baseUrl + url,
                    data,
                    header: {"Cookie":`JSESSIONID=${token}`,'content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
                    method:"POST",
                    success(res) {
                        if(res.statusCode == 200) {
                            if(res.data.code == -3) {
                                //TOKEN失效 重新抓取
                                Vue.prototype.$store.dispatch('login').then(res=>{
                                    RUEST()
                                })
                                return;
                            }
                            resolve(res.data)
                        }else {
                            reject(res.msg)
                            Toast(res.msg || '出现异常, 请重试')
                        }
                    },
                    fail(res) {
                        reject(res.msg)
                        Toast(res.msg || '出现异常, 请重试')
                    },
                    complete() {
                        uni.hideLoading()
                    }
                })
            })
        }
        return RUEST();
    }
}