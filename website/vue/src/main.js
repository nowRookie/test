import "@babel/polyfill";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css";

import "@/assets/css/elementUI.css";
import "github-markdown-css";
import "@/assets/css/theme.css";
import "@/assets/css/index.css";
import "@/assets/css/other.css";

Vue.use(Element)
Vue.config.productionTip = false

import components from "@/plugins/components.js"
Vue.use(components)

import elementMsg from "@/plugins/elementMsg"
Vue.use(elementMsg)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
