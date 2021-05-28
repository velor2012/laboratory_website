import Vue from 'vue'
import Vuex from 'vuex'
import cookie from "vue-cookies"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: (cookie as any).get('login'),
    user:(cookie as any).get('user'),
    token:(cookie as any).get('token'),
  },
  mutations: {
    login (state) {
      state.isLogin =true
    },
    logout (state) {
      state.isLogin =false
    },
    setUser (state,user) {
      state.user =user
    },
    setToken (state,token) {
      state.token =token
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    // 参数列表state指的是state数据
    IsLogin(state){
        return state.isLogin;
    },
    // 参数列表state指的是state数据
    getUser(state){
      return state.user;
    },
          // 参数列表state指的是state数据
    getToken(state){
      return state.token;
  },
    getHeader(state){
      return {Authorization:`Bearer ${state.token}`};
  }
},
})
