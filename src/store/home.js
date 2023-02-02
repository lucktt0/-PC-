// home模块小仓库

import { getCategoryList, getBannerList, getFloorList } from '@/api/index.js'

const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}

const mutations = {
  CATEGORYLIST(state, categoryList) {
    // mutations将数据转存到state中
    state.categoryList = categoryList
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}

const actions = {
  // 通过api接口函数的调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    const result = await getCategoryList()
    // 将获取到的数据转交给mutations处理
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  async bannerList({ commit }) {
    const result = await getBannerList()
    if (result.code === 200) {
      commit('BANNERLIST', result.data)
    }
  },
  async floorList({ commit }) {
    const result = await getFloorList()
    if (result.code === 200) {
      commit('FLOORLIST', result.data)
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
