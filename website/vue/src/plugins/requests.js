const files = require.context("../requests", false, /\.js$/);
const requests = {};
files.keys().forEach((url) => {
  let urlKey = url.replace(/\.\/(.*)\.js$/, "$1"); //文件名作为key
  let fileDefault = files(url).default; //export default 文件内容
  requests[urlKey] = fileDefault;
});
export default requests;
