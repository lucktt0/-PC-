import requests from '@/utils/request.js'
import mockRequests from '@/utils/mockReauest.js'

// 将产品添加到购物车(获取更新某一个产品的个数)
export const getAddUpdateShopCart = function (skuId, skuNum) {
  return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}

// 获取banner(home首页轮播图接口)
export const getBannerList = function () {
  return mockRequests.get('/banner')
}

// 三级联动接口
export const getCategoryList = function () {
  return requests.get('/product/getBaseCategoryList')
}

// 获取购物车列表的数据
export const getCartList = function () {
  return requests({ url: '/cart/cartList', method: 'get' })
}

// 删除购物车某一个产品
export const delCartById = function (skuId) {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}

// 获取floor(home首页轮播图接口)
export const getFloorList = function () {
  return mockRequests.get('/floor')
}

// 获取产品详情信息的接口
export const getGoodsInfo = function (skuid) {
  return requests({ url: `/item/${skuid}`, method: 'get' })
}

// 获取搜索模块数据,注意:需要带参数
export const getSearchInfo = function (params) {
  // 该接口(获取搜索模块的数据),给服务器传递一个默认参数【至少是一个空对象】
  return requests({ url: '/list', method: 'post', data: params })
}

// 获取订单页面信息
export const getTradePage = function () {
  return requests({ url: '/order/auth/trade', method: 'get' })
}

// 切换商品状态
export const getUpdateCheckedById = function (skuId, isChecked) {
  return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}

// 获取用户地址信息
export const getUserAddressList = function () {
  return requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
}

// token校验获取用户登录信息
export const getUserInfo = function () {
  return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
}

// 用户登录
export const getUserLogin = function (data) {
  return requests({ url: '/user/passport/login', method: 'post', data })
}

// 用户退出登录
export const getUserLoginOut = function () {
  return requests({ url: '/user/passport/logout', method: 'get' })
}

// 用户注册
export const getUserRegister = function (data) {
  return requests({ url: '/user/passport/register', method: 'post', data })
}

// 获取验证码
export const getValidateCode = function (phone) {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}

// 提交订单至支付页面
export const getSubmitOrderToPay = function (tradeNo, data) {
  return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
}

// 获取订单支付信息
export const getOrderPayMessage = function (orderId) {
  return requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
}

// 查询订单支付状态
export const getPayStatus = function (orderId) {
  return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
}

// 获取我的订单页面信息
export const getMyOrderList = function (page, limit) {
  return requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
}
