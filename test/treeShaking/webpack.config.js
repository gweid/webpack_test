const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "gweid webpack"
    })
  ],
  optimization: {
    usedExports: true, // 是否开启 tree shaking，开发模式下需要配置开启，生产环境默认开启
    minimize: true, // 使用 treser 优化 js 代码
  }
}