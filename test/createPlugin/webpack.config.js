const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UploadAssetPlugin = require('./plugins/uploadAssetPlugin')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin(),

    // 自定义的上传静态资源到服务器插件
    new UploadAssetPlugin({
      
    })
  ]
}