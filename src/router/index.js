import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {getRequest} from "../axios";
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' || localStorage.getItem('token')) {
    //动态获取路由
    let hasRoutes = store.state.menus.hasRoutes
    if (hasRoutes === false) {
      getRequest('/user/nav').then(res => {
        //获取menuList
        store.commit('setMenuList', res.obj)
        let newRoutes = router.options.routes
        res.obj.forEach(menu => {
          if (menu.children) {
            menu.children.forEach(e => {
              let route = menuToRoute(e)
              if (route) {
                newRoutes[0].children.push(route)
                console.log(newRoutes[0])
              }
            })
          }
        })
        router.matcher = new VueRouter({mode: 'history'}).matcher;
        newRoutes.forEach((i) => {
          router.addRoute(i)
        })
      })
      hasRoutes = true
      store.commit('changeRouteStatus', hasRoutes)
    }
    next()
  } else {
    next({name: 'Login'})
  }
})

const menuToRoute = (menu) => {
  if (!menu.component) {
    return null
  }
  let route = {
    name: menu.name,
    path: menu.path,
    component: () => import('../views/' + menu.component + '.vue'),
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }
  return route
}

export default router
