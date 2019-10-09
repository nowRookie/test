// components/select/select.js.js
Component({
  properties: {
    // 属性值可以在组件使用时指定
    array: {
      type: Array,
      value: [],
    },
    index: {
      type: Number,
      value: 0
    },
    placeholder: {
      type: String,
      value: "请选择"
    },
    style: {
      type: String,
      value: ""
    }
  },
  data: {
    // 这里是一些组件内部数据
    flag: false
  },
  ready() {},
  methods: {
    // 这里是一个自定义方法
    bindPickerChange: function(e) {
      this.setData({
        index: e.detail.value,
        flag: true
      }, () => {
        this.triggerEvent("onChange", {
          data: this.data.array[this.data.index]
        })
      })
    }
  }
})