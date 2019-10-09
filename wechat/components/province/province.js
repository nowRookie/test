// components/province.js
let data = require("../../utils/province.js")

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    provinceList: data,
    cityList: data[0].children,
    areaList: data[0].children[0].children,
    province: [],
    city: [],
    area: [],
    value: [0, 0, 0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindChange: function(e) {
      const val = e.detail.value
      const value = this.data.value
      if (val[0] != value[0]) {
        this.setData({
          cityList: data[val[0]].children,
          areaList: data[val[0]].children[0].children,
          value: [val[0], 0, 0]
        })
      } else if (val[1] != value[1]) {
        this.setData({
          areaList: data[val[0]].children[val[1]].children,
          value: [val[0], val[1], 0]
        })
      } else if (val[2] != value[2]) {
        this.setData({
          value: val
        })
      }
    },
    ok() {
      const value = this.data.value
      const province = data[value[0]]
      const city = province.children[value[1]]
      const area = city.children[value[2]]
      this.triggerEvent("ok", {
        data: {
          province: {
            code: province.code,
            name: province.name
          },
          city: {
            code: city.code,
            name: city.name
          },
          area: {
            code: area.code,
            name: area.name
          }
        }
      })
    },
    cancel() {
      this.triggerEvent("cancel")
    }
  }
})