import axios from "axios"
import _ from "lodash"
import moment from "moment"

const api = process.env.VUE_APP_API_URL;

export default {}

// 手动上传文件
export function upload({ url, data }) {// data必须为数组
  return new Promise((resolve, reject) => {
    const api = process.env.VUE_APP_API_URL;
    let params = new FormData();
    _.map(data, unit => {
      params.append("files", unit);
    });
    axios({
      url: url ? url : api + "/fileUpload/carriersBusinessLicense",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: params
    }).then(res => {
      // if (res.status !== 200 || res.data.code != 0) {
      //   reject(
      //     res.statusText || res.data.message || "请求错误!"
      //   );
      //   return;
      // }
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function isObject(value) {
  return value === Object(value)
}

export function type(value) {
  let str = Object.prototype.toString.call(value)
  return str.match(/\[object (.*?)\]/)[1].toLowerCase()
}

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

export function dealDate(val) {
  return (val + "").slice(0, 4) +
    "-" +
    (val + "").slice(4, 6) +
    "-" +
    (val + "").slice(6)
}