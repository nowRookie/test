import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: () => import("@/views/login.vue"),
    children: []
  },
  {
    path: "/",
    name: "index",
    meta: {
      title: "首页"
    },
    component: () => import("@/views/index.vue"),
    children: []
  },
  {
    path: "/backend",
    name: "backend",
    meta: {
      title: "后台首页"
    },
    component: () => import("@/views/backend/index.vue"),
    children: [
      {
        path: "wholeStackList",
        name: "wholeStackList",
        meta: {
          title: "走向全栈=>list"
        },
        component: () => import("@/views/backend/wholeStack/list.vue")
      },
      {
        path: "newNote",
        name: "newNote",
        meta: {
          title: "走向全栈=>新建笔记"
        },
        component: () => import("@/views/backend/wholeStack/newNote.vue")
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router