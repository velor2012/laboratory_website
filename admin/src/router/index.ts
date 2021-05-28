import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "paperList",
    children:[
      {
        path: 'paperlist',
        name: 'PaperList',
        component: () => import(/* webpackChunkName: "about" */ '../views/paper/paperList.vue')
      },
      {
        path: 'userlist',
        name: 'userList',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/userList.vue')
      },
      {
        path: 'competitionlist',
        name: 'competitionList',
        component: () => import(/* webpackChunkName: "about" */ '../views/competition/competitionList.vue')
      },
      {
        path: 'patentlist',
        name: 'patentList',
        component: () => import(/* webpackChunkName: "about" */ '../views/patent/patentList.vue')
      },
      {
        path: 'projectlist',
        name: 'projectList',
        component: () => import(/* webpackChunkName: "about" */ '../views/project/projectList.vue')
      },
      { path: '/user/:id',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/user.vue')
    }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'LoginAndRegister',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginAndRegister.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  console.log(store.getters.getToken)
  // console.log(store.getters.IsLogin)
  if(to.path != '/login' && !store.getters.IsLogin){
    next({path:'/login'})
  }else if(to.path == '/login' && store.getters.IsLogin){
    next({path:'/'})
  }else{
    next()
  }
})
export default router
