import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ReqView from './views/ReqView.vue'
import Editor from './views/Editor.vue'
import OrderForm from './views/OrderForm'
import {login} from './firebase'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor,
      meta: {
        requiresAuth: true
      }

    },
    {
      path: '/reqView',
      name: 'reqView',
      component: ReqView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orderForm',
      name: 'orderForm',
      component: OrderForm,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record =>record.meta.requiresAuth)){
    if(!login.currentUser){
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else{
      next()
    }
  } else if(to.matched.some(record=>record.meta.requiresGuest)){
    if(login.currentUser){
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
    next()
  }
})

export default router;