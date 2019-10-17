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
      if (res.status !== 200 || res.data.code != 0) {
        reject(
          res.statusText || res.data.message || "请求错误!"
        );
        return;
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}