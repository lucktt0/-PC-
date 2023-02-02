// 登陆注册小仓库

import { getValidateCode, getUserRegister, getUserLogin, getUserInfo, getUserLoginOut } from '@/api/index.js'

import { getToken, setToken, removeToken } from '@/utils/token.js'

const state = {
  code: '',
  token: getToken(),
  userMessage: {}
}
const mutations = {
  VALIDATECODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, userMessage) {
    state.userMessage = userMessage
  },
  // 清除本地数据
  CLEAR(state) {
    // 将仓库中的数据清空
    state.userMessage = {}
    state.token = ''
    // 将本地存储的数据清空
    removeToken()
  }
}
const actions = {
  // 获取验证码
  async validCode({ commit }, phone) {
    // 该接口将验证码返回,正常情况下,返回到用户手机,不用在仓库中存储
    let result = await getValidateCode(phone)
    if (result.code === 200) {
      commit('VALIDATECODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await getUserRegister(user)
    if (result.code === 200) {
      alert('注册成功!')
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 用户登录
  async userLogin({ commit }, user) {
    let result = await getUserLogin(user)
    // 服务器下发token, 用户唯一标识符
    // 之后要使用token找服务器要用户信息进行展示
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      // 持久化存储token
      setToken(result.data.token)
      alert('登录成功!')
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 获取用户登录信息
  async userInfo({ commit }) {
    let result = await getUserInfo()
    if (result.code === 200) {
      commit('USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failure'))
    }
  },
  // 用户退出登录
  async userLoginOut({ commit }) {
    // 向服务器发请求，通知服务器清除token
    let result = await getUserLoginOut()
    if (result.code === 200) {
      // actions里面不能操作state,只能提交给mutations修改state
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
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
