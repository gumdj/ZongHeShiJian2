import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList: [],
        hasRoutes: false
    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },
        changeRouteStatus(state, hasRoutes) {
            state.hasRoutes = hasRoutes
        },
        resetState: (state) => {
            state.menuList = []
            state.hasRoutes = false
        }
    },
    actions: {
    },
    modules: {
    }
}
