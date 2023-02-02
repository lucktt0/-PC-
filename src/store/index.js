import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import home from './home.js'
import search from './search.js'
import detail from './detail.js'
import shopcart from './shopcart.js'
import user from './user.js'
import trade from './trade.js'

Vue.use(Vuex)

// modules:模块化vuex, 让每个模块拥有自己的state, mutations, actions, getters,当仓库数据
// 对外暴露store类的一个实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})
