// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ""
    },
    height: {
      type: Number,
      value: 400
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    ok() {
      this.triggerEvent("ok")
    },
    cancel() {
      this.triggerEvent("cancel")
    }
  }
})