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