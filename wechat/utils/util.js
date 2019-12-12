var app = getApp();

var host = app.host;
module.exports = {
  // axios方法
  axios({
    url,
    method = 'POST',
    data,
    header,
    success,
    fail
  } = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: host + url,
        header: Object.assign({}, {
          "content-type": "application/json;charset=UTF-8"
        }, header),
        data,
        method,
        success: function(res) {
          success && success(res);
          resolve(res)
        },
        fail: function(err) {
          fail && fail(err);
          reject(err)
        },
      })
    })
  },
  // 上传文件
  upload({
    url,
    files,
    name = 'files',
    params,
    success,
    fail
  } = {}) {
    return new Promise((resolve, reject) => {
      if (files instanceof Array) {
        Promise.all(files.map(unit => {
          wx.uploadFile({
            url,
            filePath: unit,
            name,
            formData: params,
            header: {
              "Content-Type": "multipart/form-data"
            },
            success(res) {
              return res
            },
            fail(err) {
              fail && fail(err || "上传失败")
              reject(err || "上传失败")
            }
          })
        })).then(arr => {
          resolve(arr)
        })
      } else {
        wx.uploadFile({
          url: url,
          filePath: files,
          name: name || 'file',
          formData: params,
          success(res) {
            success && success(res)
            resolve(res)
          },
          fail(err) {
            fail && fail(err || "上传失败")
            reject(err || "上传失败")
          }
        })
      }
    })
  },
  // 选择图片
  chooseImage({
    count = 1,
    success,
    fail
  } = {}) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        count,
        success: function(res) {
          success && success(res)
          resolve(res)
        },
        fail(err) {
          fail && fail(err || "上传失败")
          reject(err || "上传失败")
        }
      })
    })
  },
  getOpenId() {
    return new Promise((resolve, reject) => {
      axios({
        url: "/wechat/getOpenId",
        method: "get",
        data: {
          code: wx.getStorageSync('code')
        }
      }).then(res => {
        let data = res.data.data ? JSON.parse(res.data.data) : ""
        if (data == "") {
          reject("请求失败！")
          return
        }
        wx.setStorageSync('openid', data.openid)
        wx.setStorageSync('session_key', data.session_key)
        resolve(res)
      }).catch(err => {
        reject(err || "请求失败")
      })
    })
  }
}