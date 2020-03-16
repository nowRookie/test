import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      noValidate: true
    },
    component: login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router