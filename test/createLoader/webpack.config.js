const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugun = require('html-webpack-plugin')

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
      // {
      //   test: /\.js$/,
      //   use: ['myLoader', 'testLoader']
      // }

      // loader 执行顺序
      // {
      //   test: /\.js$/,
      //   use: 'myLoader',
      //   enforce: 'pre'
      // },
      // {
      //   test: /\.js$/,
      //   use: 'normalLoader'
      // },
      // {
      //   test: /\.js$/,
      //   use: 'testLoader',
      //   enforce: 'post'
      // },

      // 同步/异步 loader
      // {
      //   test: /\.js$/,
      //   use: 'syncOrAsyncLoader'
      // },

      // 使用 loader 时传入参数
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'optionLoader',
      //       options: {
      //         name: 'optionLoader',
      //         needLog: true
      //       }
      //     }
      //   ]
      // },

      // 实现自己的 babel-loader
      {
        test: /\.js$/,
        use: [
          {
            loader: 'myBabelLoader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      },
      // 实现一个 md 文件转译 loader
      {
        test: /\.md$/,
        use: [
          {
            loader: 'mdCompileLoader',
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugun()
  ]
}