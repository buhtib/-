import { login, useraddress  } from "../service/index";

export default {
	login() {
        return new Promise((resolve, reject)=>{
            uni.login({
                success:({code})=> {
                    //存储code
                    this.commit('setWxCode', code)
                    //获取token
                    login({code}).then(res=>{
                        const { token, openid = '', is_super  } = res.data; 
                        this.commit('setToken', token)
                        this.commit('setOpenid', openid)
                        this.commit('setIs_super', is_super)
                        resolve(code)
                    })
                }
            })
        })
    },
    useraddress() {
        return new Promise((resolve, reject)=>{
            useraddress(this.form).then(res=>{
                resolve(res)
                if(Object.keys(res.data).length) {
                    this.commit('setHasAddress', true)
                    this.commit('setForm', res.data)
                }else {
                    this.commit('setForm', {
                        name:'',
                        phone:'',
                        address:'',
                        detail_address: ''
                    })
                    this.commit('setHasAddress', false)
                }
            })
        })
    }
}