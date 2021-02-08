const version = new Date().getTime();
const webpack = require("webpack");

module.exports = {
  lintOnSave: false, //如果为false，就是取消eslint规则的检查
  configureWebpack: {
    devtool: "source-map",
    entry: ["@babel/polyfill", "./src/main.js"],
    output: {
      filename: `js/[name].${version}.js`,
      chunkFilename: `js/[name].${version}.js`,
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
  },
  transpileDependencies: [],
};
