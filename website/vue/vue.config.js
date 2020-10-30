const version = new Date().getTime();
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    entry: ["@babel/polyfill", "./src/main.js"],
    output: {
      filename: `js/[name].${version}.js`,
      chunkFilename: `js/[name].${version}.js`
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  transpileDependencies: []
}