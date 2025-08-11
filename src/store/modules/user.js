import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      userInfo: getInfo() || { token: null }
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj || { token: null }
      setInfo(obj)
    }
  },
  actions: {
    // 登录
    async login ({ commit }, data) {
      const res = await this.$http.post('/passport/login', data)
      commit('setUserInfo', res.data)
      return res
    },
    logout ({ commit }) {
      commit('setUserInfo') // 提交 mutation
    }
  },
  getters: {
    // 获取用户信息
    getUserInfo (state) {
      return state.userInfo
    },
    token (state) {
      return state.userInfo.token // 直接读取 userInfo 中的 token
    }
  }
}
