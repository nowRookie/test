module.exports = {
  configureWebpack: {
    devtool: "source-map",
    entry: ["@babel/polyfill", "./src/main.js"]
  },
  transpileDependencies: []
}