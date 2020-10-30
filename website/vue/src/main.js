import "@babel/polyfill";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

import { Message } from 'element-ui';
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css";

import "@/assets/css/elementUI.css";
import "@/assets/css/theme.css";
import "@/assets/css/index.css";

Vue.use(Element)
Vue.config.productionTip = false

const msgType = ["success", "error", "info", "warning"]
function msgFun(options) {
  if (document.getElementsByClassName('el-message').length !== 0) {
    Message.closeAll()
  }
  Message({
    ...options,
    showClose: true,
    duration: 8000
  })
}
msgType.forEach((item, index) => {
  msgFun[item] = (str, options) => {
    if (document.getElementsByClassName('el-message').length !== 0) {
      Message.closeAll()
    }
    Message({
      ...options,
      type: item,
      message: str,
      showClose: true,
      duration: 8000
    })
  }
})
Vue.prototype.$message = msgFun

// 封装组件
// function vueCom(vue, com) {
//   const Constructor = vue.extend(com)
//   const instance = new Constructor()
//   instance.$mount(document.createElement('div'))
//   document.body.appendChild(instance.$el)
//   return instance
// }
// import selectCom from "./components/wei/selectCom";
// import throughText from "./components/wei/throughText";
// Vue.use({
//   install(vue) {
//     // type = org(组织) | user(用户|默认值)
//     vue.prototype.$selectCom = (checked, type) => {
//       const instance = vueCom(vue, selectCom)
//       instance.checkedItems = checked || instance.checkedItems
//       instance.type = type || instance.type
//       instance.visible = true
//       return {
//         then: callback => {
//           if (callback && callback instanceof Function) instance.then = callback
//         }
//       }
//     }
//     vue.component('ThroughText', throughText)
//   }
// })

// 添加aixo拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response && error.response.status == 401) {
    Message({ type: "error", message: "登陆过期！" })
    sessionStorage.removeItem("token")
    location.href = '#/login'
  }
  return Promise.reject(error);
});
// 路由拦截
// router.beforeEach((to, from, next) => {
//   if (!sessionStorage.getItem("username") && !to.meta.noValidate) {
//     router.replace("/login");
//     next(false); //阻止路由跳转
//     return;
//   }
//   next(); //路由跳转
// })

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
