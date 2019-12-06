// components/carNumber/carNumber.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: Number,
      value: 80
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    visibleKeyboard: false,
    isNumberKB: false, //是否为数字键盘
    tapNum: false, //数字键是否可点击
    disableKey: "1234567890港澳学挂",
    keyboardNumber: "1234567890ABCDEFGHJKLMNPQRSTUVWXYZ港澳学挂",
    keyboard1: "京沪粤津冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘桂琼渝川贵云藏陕甘青宁新",
    inputPlates: {
      index0: "",
      index1: "",
      index2: "",
      index3: "",
      index4: "",
      index5: "",
      index6: "",
      index7: ""
    },
    carNumber: "",
    inputOnFocusIndex: "",
    flag: false //判断:新能源true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 切换新能源
    switchNew(e) {
      let flag = e.target.dataset.flag
      this.setData({
        flag,
        inputOnFocusIndex: "0",
        inputPlates: {
          index0: "",
          index1: "",
          index2: "",
          index3: "",
          index4: "",
          index5: "",
          index6: "",
          index7: ""
        },
        visibleKeyboard: true,
        tapNum: false,
        isNumberKB: false
      }, () => {
        this.checkedKeyboard()
      })
    },
    // 输入框点击
    inputClick: function(t) {
      console.log("%%%%%%%%%%", this.data.inputOnFocusIndex)
      var that = this;
      that.setData({
        inputOnFocusIndex: this.data.inputOnFocusIndex == "" ? "0" : this.data.inputOnFocusIndex,
        visibleKeyboard: true
      })
      "0" == this.data.inputOnFocusIndex ? that.setData({
        tapNum: false,
        isNumberKB: false
      }) : "1" == this.data.inputOnFocusIndex ? that.setData({
        tapNum: false,
        isNumberKB: true
      }) : that.setData({
        tapNum: true,
        isNumberKB: true
      });

    },

    //键盘点击事件
    tapKeyboard: function(t) {
      t.target.dataset.index;
      var a = t.target.dataset.val;
      switch (this.data.inputOnFocusIndex) {
        case "0":
          this.setData({
            "inputPlates.index0": a,
            inputOnFocusIndex: "1"
          });
          break;
        case "1":
          this.setData({
            "inputPlates.index1": a,
            inputOnFocusIndex: "2"
          });
          break;
        case "2":
          this.setData({
            "inputPlates.index2": a,
            inputOnFocusIndex: "3"
          });
          break;
        case "3":
          this.setData({
            "inputPlates.index3": a,
            inputOnFocusIndex: "4"
          });
          break;
        case "4":
          this.setData({
            "inputPlates.index4": a,
            inputOnFocusIndex: "5"
          });
          break;
        case "5":
          this.setData({
            "inputPlates.index5": a,
            inputOnFocusIndex: "6"
          });
          break;
        case "6":
          this.setData({
            "inputPlates.index6": a,
            inputOnFocusIndex: "7"
          });
          break;
        case "7":
          this.setData({
            "inputPlates.index7": a,
            inputOnFocusIndex: this.data.flag ? "8" : "7"
          });
          break;
      }
      this.checkedKeyboard();
    },
    //键盘关闭按钮点击事件
    tapSpecBtn: function(t) {
      var a = this,
        e = t.target.dataset.index;
      if (0 == e) {
        switch (parseInt(this.data.inputOnFocusIndex)) {
          case 0:
            this.setData({
              "inputPlates.index0": "",
              inputOnFocusIndex: "0"
            });
            break;
          case 1:
            this.setData({
              "inputPlates.index0": "",
              inputOnFocusIndex: "0"
            });
            break;
          case 2:
            this.setData({
              "inputPlates.index1": "",
              inputOnFocusIndex: "1"
            });
            break;
          case 3:
            this.setData({
              "inputPlates.index2": "",
              inputOnFocusIndex: "2"
            });
            break;
          case 4:
            this.setData({
              "inputPlates.index3": "",
              inputOnFocusIndex: "3"
            });
            break;
          case 5:
            this.setData({
              "inputPlates.index4": "",
              inputOnFocusIndex: "4"
            });
            break;
          case 6:
            this.setData({
              "inputPlates.index5": "",
              inputOnFocusIndex: "5"
            });
            break;
          case 7:
            this.setData({
              "inputPlates.index6": "",
              inputOnFocusIndex: "6"
            });
            break;
          case 8:
            this.setData({
              "inputPlates.index7": "",
              inputOnFocusIndex: "7"
            });
            break;
        }
        this.checkedKeyboard();
      } else {
        this.triggerEvent("close", this.data.carNumber)
        1 == e && a.setData({
          visibleKeyboard: false,
          isNumberKB: false
        });
      }
    },
    //键盘切换
    checkedKeyboard: function() {
      var carNumber = this.data.inputPlates.index0 + this.data.inputPlates.index1 + this.data.inputPlates.index2 + this.data.inputPlates.index3 + this.data.inputPlates.index4 + this.data.inputPlates.index5 + this.data.inputPlates.index6 + this.data.inputPlates.index7
      setTimeout(() => {
        if (this.data.flag && this.data.inputOnFocusIndex == "8" || !this.data.flag && this.data.inputOnFocusIndex == "7") {
          this.setData({
            carNumber,
            visibleKeyboard: false
          })
          this.triggerEvent("close", this.data.carNumber)
          return
        }
        this.setData({
          carNumber
        })
      }, 0)
      console.log("####", this.data.inputOnFocusIndex)
      var t = this;
      "0" == this.data.inputOnFocusIndex ? t.setData({
        tapNum: false,
        isNumberKB: false
      }) : "1" == this.data.inputOnFocusIndex ? t.setData({
        tapNum: false,
        isNumberKB: true
      }) : this.data.inputOnFocusIndex.length > 0 && t.setData({
        tapNum: true,
        isNumberKB: true
      });
    }
  }
})