import axios from "axios"
import _ from "lodash"

import moment from "moment"

const api = process.env.VUE_APP_API_URL;

export default {}

// 下载二进制文件
export function downloadBlob({ name, ieName, url, method, data, params, type } = {}) {
  const options = method === "get" ? getOptions({
    method: "get",
    url,
    responseType: "blob",
    params
  }) : getOptions({
    method: "post",
    url,
    responseType: "blob",
    data
  });
  return new Promise((resolve, reject) => {
    axios(options).then(res => {
      //这里res.data是返回的blob对象,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
      var blob = new Blob([res.data], {
        type: type ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      });
      var downloadElement = document.createElement("a");
      var href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, name || ieName);
      } else {
        downloadElement.download = ieName || name; //下载后文件名
      }
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
      resolve()
    }).catch(err => {
      reject(err)
    });
  })
}

// 手动上传文件，data必须为[File]数组
export function upload({ url, data, params, name, headers }) {
  return new Promise((resolve, reject) => {
    let fileData = new FormData();
    _.map(data, unit => {
      fileData.append(name || "files", unit);
    });
    _.map(params, (value, key) => {
      fileData.append(key, value);
    });
    axios({
      url: url ? api + url : api + "/fileUpload/carriersBusinessLicense",
      method: "post",
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data"
      },
      data: fileData
    }).then(res => {
      resolve({ success: true, error: false, message: "请求成功", res: res, data: res.data.data })
    }).catch(err => {
      reject({ success: false, error: true, message: "请求错误" })
    })
  })
}

// 判断是否为对象
export function isObject(value) {
  return value === Object(value)
}

// 类型判断(可以细致区分date、array等等)
export function typeOf(value) {
  let str = Object.prototype.toString.call(value)
  return str.match(/\[object (.*?)\]/)[1].toLowerCase()
}

// 获取axios请求配置
export function getOptions(options) {
  return {
    ...options,
    url: api + options.url,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/Json; charset=UTF-8",
      "X-Authorization": "Bearer" + sessionStorage.getItem("token")
    }
  }
}

// 处理20190101这种8位数的时间
export function dealDate({ value, format } = {}) {
  let str = (value + "").slice(0, 4) +
    "-" +
    (value + "").slice(4, 6) +
    "-" +
    (value + "").slice(6)
  return format ? moment(str).format(format) : str
}

export function calculate({ value, format }) {
  let formater = format || "YYYY-MM-DD";
  return moment(value).format(formater);
}