// components/autocomplete/autocomplete.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // visible: {
    //   type: Boolean,
    //   value: false
    // },
    placeholder: {
      type: String,
      value: "请输入"
    },
    key: {
      type: String,
      value: ""
    },
    array: {
      type: Array,
      value: []
    },
    inputStyle: {
      type: String,
      value: ""
    },
    listsStyle: {
      type: String,
      value: ""
    },
    listStyle: {
      type: String,
      value: ""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: "",
    flag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      this.setData({
        value: e.detail.value
      }, () => {
        this.triggerEvent("input", e.detail.value)
      })
    },
    onBlur(e) {
      // setTimeout(() => {
      //   console.log("flag====", this.data.flag)
      //   if (this.data.flag) return
      //   this.triggerEvent("blur", e.detail.value)
      // }, 300)
    },
    returnBlur() {
      this.setData({
        flag: true
      })
    },
    choose(e) {
      const data = e.currentTarget.dataset.list
      this.setData({
        flag: false,
        value: data[this.properties.key]
      }, () => {
        this.triggerEvent("ok", data)
      })
    }
  }
})