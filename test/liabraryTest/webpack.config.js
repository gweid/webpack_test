const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devtool: false,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'gweid-utils.js',
    // umd 指打包出来的东西既支持 amd，又支持 CommonJs，也支持浏览器直接使用
    // CommonJs 又分为社区 CommomJs 和 node 的 CommonJs
    // node 的 CommonJs：有 module 对象 和 module.exports
    libraryTarget: 'umd',
    library: 'gweidUtils', // 包名
    globalObject: 'this'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}