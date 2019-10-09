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
            console.log(_this.data)
          });
        },
        fail() {}
      })
    },
    previewImage: function(e) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
      })
    },
    selectFile(files) {
      console.log(111)
      console.log('files', files)
      // 返回false可以阻止某次文件上传
    },
    uplaodFile(files) {
      console.log('upload files', files)
      // 文件上传的函数，返回一个promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('some error')
        }, 1000)
      })
    },
    uploadError(e) {
      console.log('upload error', e.detail)
    },
    uploadSuccess(e) {
      console.log('upload success', e.detail)
    },

  }
})