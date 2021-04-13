# wbepack 学习

## webpack 认知

* webpack 是什么
* wbepack 的打包原则
* webpack 的模块化

## webpack 基本配置

* 入口配置
* 出口配置
* loader 使用
* html-webpack-plugin
* devServer
* 更多...

```js
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
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```