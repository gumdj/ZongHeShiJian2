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
    if (localStorage.getItem('token') !== null) {
      //动态获取路由
      let hasRoutes = store.state.menus.hasRoutes
      if (hasRoutes === false) {
        getRequest('/user/router').then(res => {
          //获取menuList
          store.commit('setMenuList', res)
          let newRoutes = router.options.routes
          res.forEach(menu => {
            if (menu.children) {
              menu.children.forEach(e => {
                let route = menuToRoute(e)
                if (route) {
                  newRoutes[0].children.push(route)
                }
              })
            }
          })
          router.matcher = new VueRouter({mode: 'history'}).matcher;
          router.options.routes = [
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
          newRoutes.forEach((i) => {
            router.addRoute(i)
          })
        })
        store.commit('changeRouteStatus', true)
      }
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
