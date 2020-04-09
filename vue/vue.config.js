const version = new Date().getTime();

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    entry: ["@babel/polyfill", "./src/main.js"],
    output: {
      filename: `js/[name].${version}.js`,
      chunkFilename: `js/[name].${version}.js`
    },
  },
  transpileDependencies: []
}