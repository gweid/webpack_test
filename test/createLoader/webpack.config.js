const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: false,
  // context: path.resolve(__dirname, '.'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modules: ['node_modules', './myLoader']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['myLoader', 'testLoader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}