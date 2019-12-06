// components/identityCard/index.js
Component({

  /**
   * 页面的初始数据
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    description: {
      type: String,
      value: ""
    },
    theme: {
      type: String,
      value: ""
    },
  },
  data: {
    files: [],
    currentImage: ""
  },
  ready() {},
  methods: {
    chooseImage: function(e) {
      var _this = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        count: 1,
        success: function(res) {
          console.log("chooseImage res=====", res)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.setData({
            files: res.tempFilePaths,
            currentImage: res.tempFilePaths[0]
          }, () => {
            // console.log(_this.data)
            if (_this.data.uploadIdCard) {
              _this.triggerEvent('uploadIdCard', { ref: _this.id, key: _this.data.key })
            } else if (_this.data.upload) {
              _this.triggerEvent('upload', { ref: _this.id, key: _this.data.key, fileType: _this.data.fileType })
            }
          });
        },
        fail() {}
      })
    },
  }
})