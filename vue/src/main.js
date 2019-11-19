import "@babel/polyfill";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

import { Message } from 'element-ui';
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css";

import "@/assets/css/index.scss";

Vue.use(Element)
Vue.config.productionTip = false

// 添加aixo拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status == 401) {
    Message({ type: "error", message: "登陆过期！" })
    sessionStorage.removeItem("token")
    location.href = '#/login'
  }
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
