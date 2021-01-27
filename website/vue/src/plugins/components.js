const files = require.context("../components", false, /\.vue$/);
const components = {};
files.keys().forEach((url) => {
  let urlKey = url.replace(/\.\/(.*)\.vue$/, "$1"); //文件名作为key
  let fileDefault = files(url).default; //export default 文件内容
  components[urlKey] = fileDefault;
});
export default components;
