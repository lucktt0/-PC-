// shopcart模块小仓库

import { getCartList, getUpdateCheckedById, delCartById } from '@/api/index.js'

const state = {
  cartList: []
}

const mutations = {
  CARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  // 获取购物车数据的action
  async cartList({ commit }) {
    const result = await getCartList()
    if (result.code === 200) {
      commit('CARTLIST', result.data)
    }
  },
  // 修改商品的勾选状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    const result = await getUpdateCheckedById(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
  },
  // 删除购物车某一个商品
  async deleteCartById({ commit }, skuId) {
    const result = await delCartById(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
  },
  // 删除购物车中选中的商品
  deleteAllCartById({ dispatch, getters }) {
    // context:小仓库,commit【提交mutations修改state】  getters【计算属性】  dispatch【派发action】
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let result = item.isChecked === 1 ? dispatch('deleteCartById', item.skuId) : ''
      // 将每一次返回的promise添加到数组中
      PromiseAll.push(result)
    })
    // 只要数组中的promise都成功, 结果即为成功;若有一个失败,返回即为失败
    return Promise.all(PromiseAll)
  },
  // 修改全选商品的状态
  updateAllCartChecked({ dispatch, getters }, isChecked) {
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let result = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      PromiseAll.push(result)
    })
    return Promise.all(PromiseAll)
  }
}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
