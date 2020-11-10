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
  // 前台
  {
    path: "/frontend",
    name: "frontend",
    meta: {
      title: "前台"
    },
    component: () => import("@/views/frontend/index.vue"),
    children: [
      // 前台=>笔记分类
      {
        path: "classify",
        name: "classify",
        meta: {
          title: "笔记分类"
        },
        component: () => import("@/views/frontend/classify.vue"),
        children: []
      },
      // 前台=>笔记分页
      {
        path: "list",
        name: "list",
        meta: {
          title: "笔记分页"
        },
        component: () => import("@/views/frontend/list.vue"),
        children: []
      },
      // 前台=>笔记详情
      {
        path: "detail",
        name: "detail",
        meta: {
          title: "笔记详情"
        },
        component: () => import("@/views/frontend/detail.vue"),
        children: []
      },
    ]
  },
  // 后台
  {
    path: "/backend",
    name: "backend",
    meta: {
      title: "后台首页"
    },
    component: () => import("@/views/backend/index.vue"),
    children: [
      // 后台=>笔记列表
      {
        path: "noteList/:id",
        name: "noteList/:id",
        meta: {
          title: "后台=>笔记列表"
        },
        component: () => import("@/views/backend/note/noteList.vue"),
        children: [],
      },
      // 后台=>新建笔记
      {
        path: "newNote",
        name: "newNote",
        meta: {
          title: "新建笔记"
        },
        component: () => import("@/views/backend/note/newNote.vue"),
        children: [],
      },
      // 后台=>笔记详情
      {
        path: "noteDetail",
        name: "noteDetail",
        meta: {
          title: "笔记详情"
        },
        component: () => import("@/views/backend/note/noteDetail.vue"),
        children: [],
      },
      // 后台=>设置
      {
        path: "setting",
        name: "setting",
        meta: {
          title: "设置"
        },
        component: () => import("@/views/backend/setting/index.vue"),
        children: [
          // 后台=>设置=>笔记分类
          {
            path: "classify",
            name: "classify",
            meta: {
              title: "笔记分类"
            },
            component: () => import("@/views/backend/setting/classify.vue"),
            children: [],
          },
          // 后台=>设置=>主题
          {
            path: "theme",
            name: "theme",
            meta: {
              title: "主题"
            },
            component: () => import("@/views/backend/setting/theme.vue"),
            children: [],
          },
          // 后台=>设置=>修改密码
          {
            path: "password",
            name: "password",
            meta: {
              title: "修改密码"
            },
            component: () => import("@/views/backend/setting/password.vue"),
            children: [],
          },
          // 后台=>设置=>首页canvas
          {
            path: "homeCanvas",
            name: "homeCanvas",
            meta: {
              title: "首页canvas"
            },
            component: () => import("@/views/backend/setting/homeCanvas.vue"),
            children: [],
          },
        ],
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router