var app = getApp();

//项目URL相同部分，减轻代码量，同时方便项目迁移
//这里因为我是本地调试，所以host不规范，实际上应该是你备案的域名信息
var host = app.host;

function axios({
  url,
  method = 'POST',
  data,
  header,
  success,
  fail
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: host + url,
      header: Object.assign({}, {
        "content-type": "application/json;charset=UTF-8"
      }, header),
      data,
      method,
      success: function (res) {
        success && success(res);
        resolve(res)
      },
      fail: function (err) {
        fail && fail(err);
        reject(err)
      },
    })
  })
}
//GET请求，不需传参，直接URL调用，
function getData(url, postData, doSuccess, doFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    data: postData || {},
    method: 'GET',
    success: function (res) {
      doSuccess(res.data);
    },
    fail: function () {
      doFail();
    },
  })
}

function getOpenId() {
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
      resolve({
        openId: data.openid,
        session_key: data.session_key
      })
    }).catch(err => {
      reject(err || "请求失败")
    })
  })
}

// 上传文件
function upload({
  url,
  files,
  name = 'files',
  params,
  success,
  fail
}) {
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
}

function chooseImage({
  count = 1,
  success,
  fail
} = {}) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count,
      success: function (res) {
        success && success(res)
        resolve(res)
      },
      fail(err) {
        fail && fail(err || "上传失败")
        reject(err || "上传失败")
      }
    })
  })
}

module.exports.api = host;
module.exports.getData = getData;
module.exports.axios = axios
module.exports.upload = upload

module.exports.chooseImage = chooseImage
module.exports.getOpenId = getOpenId