import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

import './mock'

import {getRequest, postRequest, deleteRequest, putRequest} from "./axios"

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.config.productionTip = false
Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
