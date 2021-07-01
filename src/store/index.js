import Vue from 'vue'
import Vuex from 'vuex'

import menus from "./modules/menus"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_USERNAME: (state, username) => {
      state.username = username
      localStorage.setItem('username', username)
    }
  },
  actions: {
  },
  modules: {
    menus
  }
})
