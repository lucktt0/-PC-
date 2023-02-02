// search模块小仓库

import { getSearchInfo } from '@/api/index.js'
// state:仓库存储数据的地方
const state = {
  searchInfo: {}
}
// mutations: 修改state唯一地方(必须是同步的)
const mutations = {
  SEARCHINFO(state, searchInfo) {
    state.searchInfo = searchInfo
  }
}
// actions:书写自己的业务逻辑(修改数据时,需要提交mutations,无法直接修改),也可以处理异步
const actions = {
  async searchInfo({ commit }, params = {}) {
    // getSearchInfo在调用服务器数据时,至少传递一个参数(空对象)
    // params形参:当用户派发action时,第二个参数传递过来的,至少是一个空对象
    const result = await getSearchInfo(params)
    if (result.code === 200) {
      commit('SEARCHINFO', result.data)
    }
  }
}
// getters:理解为计算属性,用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
  // 当前形参state,为当前仓库中的state,并非大仓库中的state
  goodsList(state) {
    // state.searchInfo若服务器数据尚未返回,是一个空对象,下面的goodsList则会返回undefined
    return state.searchInfo.goodsList || []
  },
  attrsList(state) {
    return state.searchInfo.attrsList || []
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
