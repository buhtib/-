
import server from '../utils/server'

// server.get
// server.post
//登录
export const login = params => server.login('small/login', params, true)

//获取列表
export const getStorelist = params => server.get('pb/storelist', params)

//支付提交订单
export const mobilePay = params => server.post("small/pay", params)

//查询订单
export const getOrderList = () => server.get("small/queryordercomplete")

//查询商家全部订单
export const getQueryorder = params => server.formPost("queryorder", params, true)

//删除订单
export const deleteOrderList = params => server.get("small/deleteorder", params)

//验证码
export const verifyphone = params => server.formPost("small/verifyphone", params)

//收货地址
export const useraddress = (params, flag = false) => server.formPost("small/useraddress", params, flag)

//今日订单 修改上菜状态 updateservestatus
export const updateservestatus = params => server.get('updateservestatus', params)


