const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
// module.exports = function override(config, env) {
//     config.resolve.alias = {
//         '@': resolve('src')
//     }
//     return config;
// }
module.exports = {
  webpack: function (config, env) {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      "@": path.resolve(__dirname, 'src/'),
    })
    // config.module.rules.unshift({
    //   test: /\.s[ac]ss$/i,
    //   use: [
    //     'style-loader',// Creates `style` nodes from JS strings
    //     'css-loader',// Translates CSS into CommonJS
    //     {
    //       loader: 'resolve-url-loader',
    //       options: { removeCR: true }
    //     },
    //     'sass-loader',// Compiles Sass to CSS
    //   ],
    // })
    return config;
  },
}