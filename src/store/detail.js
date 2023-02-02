// detail模块小仓库

import { getGoodsInfo, getAddUpdateShopCart } from '@/api/index.js'
// 封装游客身份模块uuid,生成一个随机字符串,之后不会发生改变
import { getUUID } from '@/utils/uuid_token.js'

const state = {
  goodsInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}

const mutations = {
  GOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}

const actions = {
  // 获取产品信息的action
  async goodsInfo({ commit }, skuid) {
    const result = await getGoodsInfo(skuid)
    if (result.code === 200) {
      commit('GOODSINFO', result.data)
    }
  },
  // 加入购物车/修改某一个产品的个数
  async addUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车后, 前台将数据带给服务器, 服务器写入数据成功, 并没有返回其他的数据, 只是返回code = 200, 代表此次操作成功
    // 因为没有返回其余数据,故不需要三连环存储数据
    const result = await getAddUpdateShopCart(skuId, skuNum)
    // async返回的是promise
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
  }
}

const getters = {
  // state.goodsInfo初始状态为空对象,空对象的categoryView属性值为undefined
  // 简化路径导航的数据
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  // 简化产品售卖属性的数据
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
