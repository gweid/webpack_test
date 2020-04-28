const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离 css, 将 css 从 js 中抽离出来，减少 js 体积，有利于减少页面加载时间
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css
const webpack = require('webpack')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin') // pwa
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin') // 动态使用 cdn
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
// const AutodllWebpackPlugin = require('autodll-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包时先清空 dist 目录 webpack4 之后这样引入

// css 公共配置
function commentCss(mode) {
  let option = []

  // 只在生产环境进行 css 抽离，便于在开发环境中使用 HMR
  switch (mode) {
    case 'development':
      option.push('style-loader')
      break

    case 'production':
      option.push({
        loader: MiniCssExtractPlugin.loader, // 抽离 css
        options: {
          // 抽离 css 一定要在这里配置 publicPath，不然 CSS 里面的图片路径是以 CSS 目录为根目录的
          publicPath: '../',
          hot: true,
        },
      })
      break
  }

  // 配合 autoprefixer 做自动添加前缀
  option.push(...['css-loader', 'postcss-loader'])

  return option
}

module.exports = (env, options) => {
  const MODE = options.mode // 获取 webpack4 的 mode 值

  return {
    entry: ['./src/js/index.js', './src/index.html'], // 加 index.html 主要是 html 修改不会热替换

    output: {
      // filename: 'js/bundle.[contenthash:8].js', // 出口文件名 使用 hash 值
      filename:
        MODE === 'development'
          ? 'js/bundle.[hash:8].js'
          : 'js/bundle.[contenthash:8].js', // contenthash: 文件 hash，根据文件来生成 hash
      path: path.resolve(__dirname, 'dist'), // 全局路径
      publicPath: MODE === 'development' ? '/dist/' : '', // 所有资源引入公共路径前缀
    },

    devServer: {
      publicPath: '/dist/',
      // 要运行的目录 只是在内存中编译打包，不指向真正的目录
      contentBase: path.resolve(__dirname, 'dist'),
      compress: true, // 启动 gzip 压缩
      // progress: true, // 显示进度条
      port: 3000,
      open: true,
      hot: true, // 打开 HMR 模块热替换
    },

    // source-map 源码映射
    /**
     * [inline | hidden | eval-][nosource-][cheap-[module-]]source-map
     * inline-source-map 内联在bundle.js   速度快
     * hidden-source-map 外部 .map 只有错误代码原因，不能映射到源码的错误位置
     * eval-source-map   内联
     * cheap-source-map  错误代码信息和源代码位置，精确到行，更快
     */
    /**
     * 开发环境  考虑：速度快，调试友好
     *    速度快（eval>inline>cheap>...） cheap-eval-source-map
     *    调试友好 module 这个会将 loader 的source map 加入
     *    所以综合 开发环境使用  cheap-module-eval-source-map / eval-source-map 这个调试更加友好，速度回慢一点(有很多脚手架使用这个)
     *
     * 生产环境  考虑：source-map 体积小,而且是外部  源代码需不需要隐藏？是否需要调试友好？
     *    综合： cheap-module-source-map / source-map 这个调试更加友好 / 或者不需要 source-map 用 none
     *
     * 脚手架工具 Vue Cli 在开发环境用的是 eval-source-map; 在生产环境用的是 source-map
     */
    devtool: MODE === 'development' ? 'cheap-module-eval-source-map' : 'none',

    // 主要用于 cdn 引入的包, 忽略打包
    // externals: {
    //     // 要忽略的库名---npm 包名
    //     jquery: "jQuery"
    // },

    module: {
      rules: [
        {
          oneOf: [
            {
              // 使用这个要将 url-loader 的引入规范改为 CommonJS
              test: /\.(html|htm)$/,
              loader: 'html-withimg-loader', // 主要将 html 中使用 img 标签引入的图片使用动态路径 <img src="./aa.jpg">
            },
            {
              test: /\.css$/,
              use: [...commentCss(MODE)],
            },
            {
              test: /\.scss$/,
              use: [...commentCss(MODE), 'sass-loader'],
            },
            {
              test: /\.(jpg|png|gif)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    esModule: false, // 将 url-loader 使用 es6 的引入改为 CommonJS
                    limit: 8 * 1024, // 小于 8k 将转换为 base64, 不应该将过大的图片转换为 base64，这样会增加图片体积
                    name: '[name]_[hash:8].[ext]',
                    outputPath: 'images', // 输出到 dist 下哪个目录
                  },
                },
              ],
            },
            {
              test: /\.js/,
              exclude: /node_modules/, // 排除 node_modules
              use: [
                /**
                 * 使用 thread-loader 多进程编译
                 * 进程启动要 600ms，进程通讯也要开销，所以一般给 babel 使用，或者打包时间短的不建议使用
                 */
                // 'thread-loader',
                {
                  loader: 'babel-loader',
                  options: {
                    // 预设：指示 babel 做怎么样的兼容性处理
                    // 这只能做一些基本的，类似 promise es7 之类的语法还需要额外处理
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          // useBuiltIns: 'usage'   按需加载
                          useBuiltIns: 'usage',
                          // corejs: 3   指定 corejs 版本
                          corejs: {
                            version: 3,
                          },
                          // targets    具体兼容到哪个浏览器
                          targets: {
                            chrome: '58',
                            firefox: '40',
                            ie: '9',
                            edge: '17',
                            safari: '10',
                          },
                        },
                      ],
                    ],
                    // 开启 babel 缓存，第二次打包时，会读取之前的缓存，优化打包速度
                    cacheDirectory: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    plugins: [
      // 打包构建前先清空 dist
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html', // 以什么为模板
        // 压缩 HTML 的配置
        minify: {
          removeComments: true, // 是否去掉注释
          collapseWhitespace: true, // 折叠成一行
        },
      }),

      // 抽离 css  将 css 从 js 中抽离出来，减少 js 体积，有利于减少页面加载时间
      new MiniCssExtractPlugin({
        filename: 'css/main.[contenthash:8].css', // 分离到到 main.css  使用 contenthash 值
      }),
      // 压缩 css
      new OptimizeCssAssetsWebpackPlugin(),

      // pwa
      new WorkboxWebpackPlugin.GenerateSW({
        /**
         * 1、帮助 serviceWorker 快速启动
         * 2、删除旧的 serviceWorker
         *
         * 生成一个 serviceWorker 配置文件
         * 需要在入口文件注册 serviceWorker
         */
        clientsClaim: true,
        skipWaiting: true,
      }),

      // 动态使用 cdn
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'jquery',
            entry:
              'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min.js',
            global: 'jQuery',
          },
        ],
      }),

      // 使用 dll
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'dll', 'zepto.manifest.json'),
      }),
      // 通过这样引入 dll 后的第三方库
      new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, 'dll', 'zepto.dll.js'),
      }),
    ],

    optimization: {
      // 代码分割
      splitChunks: {
        chunks: 'all',
      },
    },
  }
}
