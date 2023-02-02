// trade小仓库

import { getUserAddressList, getTradePage } from '@/api/index.js'

const state = {
  address: [],
  orderlist: {}
}

const mutations = {
  USERADDRESSLIST(state, address) {
    state.address = address
  },
  TRADEPAGE(state, orderlist) {
    state.orderlist = orderlist
  }
}

const actions = {
  // 获取用户地址信息
  async userAddressList({ commit }) {
    let result = await getUserAddressList()
    if (result.code === 200) {
      commit('USERADDRESSLIST', result.data)
    }
  },
  // 获取商品清单数据
  async tradePage({ commit }) {
    let result = await getTradePage()
    if (result.code === 200) {
      commit('TRADEPAGE', result.data)
    }
  }
}

const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
