# 基础功能

#### 1、基础出入口

```
entry: "./src/js/index.js", // 入口名

// 出口
output: {
    filename: "js/bundle.js", // 出口文件名
    path: path.resolve(__dirname, "dist") // 全局路径
},
```

#### 2、css/scss/less 这些 loader

```
npm i style-loader css-loader sass-loader node-sass -D

{
    test: /\.css$/,
    use: [
        "style-loader", // 将 css 插入 head 标签
        "css-loader", // 将 css 以模块引入
    ]
}

{
    test: /\.scss$/,
    use: [
        "style-loader",
        "css-loader",
        "sass-loader"
    ]
}
```

#### 3、图片 loader

-   依赖 file-loader url-loader

```
npm i file-loader url-loader -D

{
    test: /\.(jpg|png|gif)$/,
    use: [{
        loader: "url-loader",
        options: {
            limit: 8 * 1024, // 小于 8k 将转换为 base64，不应该将过大的图片转换为 base64，这样会增加图片体积
            name: "[name]_[hash:8].[ext]",
            outputPath: "images" // 输出到 dist 下哪个目录
        }
    }]
}
```

#### 4、当图片是直接通过 img 便签引入，需要使用 html-withimg-loader

```
npm i html-withimg-loader -D

{
    // 使用这个要将 url-loader 的引入规范改为 CommonJS
    test: /\.(html|htm)$/,
    loader: "html-withimg-loader" // 主要将 html 中使用 img 标签引入的图片使用动态路径 <img src="./aa.jpg">
}
```

#### 5、 编译 html 使用 html-webpack-pligin

```
const HtmlWebpackPlugin = require("html-webpack-plugin")

plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html", // 以什么为模板
    }),
]
```

#### 6、devServer 开发环境自动化

```
npm i webpack-dev-server -D

devServer: {
  // 要运行的目录 只是在内存中编译打包，不指向真正的目录
  contentBase: path.resolve(__dirname, 'dist'),
  compress: true, // 启动 gzip 压缩
  progress: true, // 显示进度条
  port: 3000, // 端口
  open: true, // 自动打开浏览器
},
```

#### 7、每次打包前先清空出口目录 clean-webpack-plugin

```
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin") // webpack4 之后需要这样引入


plugins: [
    new CleanWebpackPlugin()
]
```

#### 8、抽离 css

-   注意：抽离 css 需要配置一下 miniCssExtractPlugin 的 publicPath， 不然 CSS 里面的图片路径是以 CSS 目录为根目录的

```
const miniCssExtractPlugin = require("mini-css-extract-plugin") // 抽离 css, 将 css 从 js 中抽离出来，减少 js 体积，有利于减少页面加载时间

{
    test: /\.css$/,
    use: [
        // "style-loader", // 将 css 插入 head 标签
        {
            loader: miniCssExtractPlugin.loader, // 抽离 css
            options: {
                // 抽离 css 一定要在这里配置 publicPath，不然 CSS 里面的图片路径是以 CSS 目录为根目录的
                publicPath: "../"
            }
        },
        "css-loader", // 将 css 以模块引入
    ]
}, {
    test: /\.scss$/,
    use: [
        // "style-loader",
        {
            loader: miniCssExtractPlugin.loader, // 抽离 css
            options: {
                // 抽离 css 一定要在这里配置 publicPath，不然 CSS 里面的图片路径是以 CSS 目录为根目录的
                publicPath: "../"
            }
        },
        "css-loader",
        "sass-loader"
    ]
}

plugins: [
    // 抽离 css  将 css 从 js 中抽离出来，减少 js 体积，有利于减少页面加载时间
    new MiniCssExtractPlugin({
        filename: "css/main.css" // 分离到到 main.css
    }),
]
```

#### 9、配置 css 浏览器兼容

-   使用 postcss-loader autoprefixer
-   在 postcss.config.js 中配置 autoprefixer (也可以使用 postcss-proset-env)
-   在 package.json 中配置 browserslist
-   在 webpack 中配置 postcss-loader

```
npm i postcss-loader autoprefixer -D

postcss.config.js 中
module.exports = {
    // autoprefixer 没用需要设置 browserslist
    plugins: [
        require('autoprefixer') // 浏览器的兼容性，有时候我们必须加入 -webkit, -ms, -o, -moz 这些前缀
    ]
}

package.json 中
"browserslist": [
    "last 1 version", // 即支持各类浏览器最近的一个版本
    "> 0.2%",  // 支持市场份额大于 0.2% 的浏览器。
    "not dead" // 除了死亡的浏览器
]

webpack.config.js
{
    test: /\.css$/,
    use: [
        // "style-loader", // 将 css 插入 head 标签
        {
            loader: miniCssExtractPlugin.loader, // 抽离 css
            options: {
                // 抽离 css 一定要在这里配置 publicPath，不然 CSS 里面的图片路径是以 CSS 目录为根目录的
                publicPath: "../"
            }
        },
        "css-loader", // 将 css 以模块引入
        "postcss-loader",  // postcss-loader 配合 postcss.config.js 的 autoprefixer 加入 -webkit, -ms, -o, -moz 这些前缀
    ]
}, {
    test: /\.scss$/,
    use: [
        // "style-loader",
        {
            loader: miniCssExtractPlugin.loader, // 抽离 css
            options: {
                // 抽离 css 一定要在这里配置 publicPath，不然 CSS 里面的图片路径是以 CSS 目录为根目录的
                publicPath: "../"
            }
        },
        "css-loader",
        "postcss-loader",
        "sass-loader"
    ]
}
```

#### 10、压缩 css 使用 optimize-css-assets-webpack-plugin

```
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css

plugins: [
    // 直接使用默认配置已经足够
    new OptimizeCssAssetsWebpackPlugin()
]
```

#### 11、babel 做 js 兼容性处理

-   @babel/preset-env 只能转换一些基本语法，类似 promise 之类不转换
-   使用 core-js 对更高级语法的转换

```
npm i babel-loader @babel/core @babel/preset-env core-js -D

{
    test: /\.js/,
    exclude: /node_modules/, // 排除 node_modules
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
  },
}
```

#### 12、js 压缩

-   在 webpack4, 只要将 mode 改为 production 将自动压缩 js 代码 或者在 package.json 中把 mode 配置

#### 13、html 压缩

-   使用 html-webpack-plugin

```
plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html', // 以什么为模板
      // 压缩 HTML 的配置
      minify: {
        removeComments: true, // 是否去掉注释
        collapseWhitespace: true, // 折叠成一行
      },
    })
]
```

# webpack 性能优化

## 一、开发环境性能优化

### 1、优化构建速度

#### HMR hot module replacement 热模块替换 作用：只对有变动的模块进行重新打包更新

```
// !!!!!!!!!! 注意：使用 MiniCssExtractPlugin 抽离的 css 对热替换没用， 一般开发环境不抽离 css，使用热替换；生产环境抽离 css !!!!!!!!!!
* 1、css 因为有 style-loader, 所以可以 HMR
* 2、js 默认不能使用 HRM
* 3、html 也没办法做 HMR。 但开启了 HMR 会导致修改 html 不会更新   解决: 将入口修改  entry: ['./src/js/index.js', './src/index.html']


// 1、在 devServer 将 hot 开启

const webpack = require("webpack")

devServer: {
  // 要运行的目录 只是在内存中编译打包，不指向真正的目录
  contentBase: path.resolve(__dirname, 'dist'),
  compress: true, // 启动 gzip 压缩
  progress: true, // 显示进度条
  port: 3000, // 端口
  open: true, // 自动打开浏览器
  hot: true, // 打开 HMR 模块热替换
},
```

### 2、优化代码调试 source-map: 源代码到构建代码的映射

-   就是源代码有几十个模块，构建后可能只有一个模块，source-map 可以通过映射关系在构建后的代码中找到错误代码在源代码所在位置

```
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

devtool: MODE == "development" ? "cheap-module-eval-source-map" : "none",
```

## 二、生产环境性能优化

### 1、优化打包速度

#### a、oneOf

-   就是有很多 loader，每个文件都会被 所有的 loader 过一遍，其实这里面只有处理相关文件的 loader 会被命中(注意： 如果多个 loader 处理一个文件，需要把多出来的 loader 提到 oneOf 外面)

```
rules: [
    {}, // 另外一个处理 js 的 loader
    {oneOf: [
        {}, 处理 css 的 loader
        {}, 处理 js 的 loader
    ]}
]
```

#### b、缓存

-   babel 缓存 就是在生产环境中，当只改变一个 js，其他没变，那么打包时不可能又把所有的 js 编译一次，这时候应该使用 babel 缓存

```
// 使用 babel 缓存只需要在 babel 的 options 中加入 cacheDirectory: true

{
    test: /\.js/,
    exclude: /node_modules/, // 排除 node_modules
    loader: 'babel-loader',
    options: {
        // 开启 babel 缓存，第二次打包时，会读取之前的缓存，优化打包速度
        cacheDirectory: true
    },
}
```

#### c、多进程打包

```
npm i thread-loader -D

/**
 * 使用 thread-loader 多进程编译
 * 进程启动要600ms，进程通讯也要开销，所以一般给 babel 使用，或者打包时间短的不建议使用
 */
 // 使用只需要在要开启多进程打包的 loader 之前使用 thraed-loader 即可

'thread-loader',
```

#### d、动态链接库 dll

-   主要就是对某一些第三方库进行单独打包, 后续打包不需要再打包第三方库，直接使用 dll

```
// 新建 webpack.dll.config.js, 并且在 package.json 配置 dll 启动命令   "dll": "webpack --config webpack.dll.config.js --mode production"

// webpack.dll.config.js
const path = require('path')
const webpack = require('webpack')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin') // 打包时先清空 dist 目录 webpack4 之后这样引入

module.exports = {
    entry: {
        zepto: ['zepto-webpack']
    },
    output: {
        filename: "[name].dll.js",
        path: path.resolve(__dirname, "dll"),
        library: "dll_[name]"
    },
    plugins: [
        new CleanWebpackPlugin(),

        new webpack.DllPlugin({
            name: 'dll_[name]',
            path: path.resolve(__dirname, "dll", "[name].manifest.json")
        })
    ]
}

// webpa|ck.config.js 中使用
npm i add-asset-html-webpack-plugin -D

plugins: [
    // 使用 dll
    new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, "dll", "zepto.manifest.json")
    }),
    // 通过这样引入 dll 后的第三方库
    new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, "dll", "zepto.dll.js")
    }),
]
```

#### e、配置文件别名

-   优点：减少打包时的搜索文件时间

```
resolve: {
  // 配置文件别名
  // 优点： 减少打包时查找文件的时间
  alias: {
    '@css': path.resolve(__dirname, 'src/css'),
  },
},
```

### 2、优化代码运行性能

#### a、文件资源缓存

-   主要就是借助浏览器缓存，服务端设置资源缓存，webpack 为 js 和 css 等文件添加文件 hash-->contenthash

```
output: {
    filename: 'js/bundle.[contenthash:8].js', // contenthash: 文件 hash，根据文件来生成 hash
},

plugins: [
    new MiniCssExtractPlugin({
        filename: 'css/main.[contenthash:8].css', // 分离到到 main.css  使用 contenthash 值
    }),
]
```

#### b、tree shaking 作用：去除无用代码，减少代码体积

-   js 使用条件 1、使用 es6 模块化 2、开启 production 环境
-   tree shaking 可能会把一些 css 干掉，所以需要在 package.json 中配置 "sideEffects": ["*.css", "*.scss"] 代表这些文件不会被 tree shaking

#### c、代码分割 code split

-   splitChunk 代码分割, 代码分割还会分析多入口是否有公用文件，有会单独打包成一个 chunk
-   作用: 将一个很大的 js 文件拆分成多个 js 文件，利于并行加载，提高运行速度

```
optimization: {
    // 代码分割
    splitChunks: {
        chunks: 'all'
    }
}
```

#### d、懒加载和预加载

```
index.js 中

const btn = document.querySelector('#btn')
btn.addEventListener('click', (e) => {
  // 懒加载: 体验稍微差，兼容性好一点
  // import('./sub').then(({ addSub }) => {
  //   console.log(addSub(1, 7))
  // })

  // 懒加载代码分割
  // import(/* webpackChunkName: 'sub' */'./sub').then(({ addSub }) => {
  //   console.log(addSub(1, 7))
  // })

  // 预加载：体验好，兼容性差
  import(/* webpackChunkName: 'sub', webpackPrefetch: true */ './sub').then(
    ({ addSub }) => {
      console.log(addSub(1, 9))
    }
  )
})
```

#### ｅ、pwa 渐进式网络开发应用程序 离线可访问

-   可靠 - 即使在网络不稳定甚至断网的环境下，也能瞬间加载并展现
-   用户体验 - 快速响应，具有平滑的过渡动画及用户操作的反馈
-   用户黏性 - 和 Native App 一样，可以被添加到桌面，能接受离线通知，具有沉浸式的用户体验

```
npm i workbox-webpack-plugin -D

plugins: [
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
]

// 并且在入口文件注册 serviceWorker，还有处理兼容性
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('serviceWorker 注册成功')
      })
      .catch(() => {
        console.log('serviceWorker 注册失败')
      })
  })
}
```

#### f、使用 cdn

```
npm i html-webpack-externals-plugin -D

plugins: [
    new HtmlWebpackExternalsPlugin({
        externals: [{
            module: "jquery",
            entry: "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min.js",
            global: "jQuery"
        }]
    })
]
```

# 优化体验

#### 打包构建显示进度条

```
package.json 启动命令行加 --progress

"build": "webpack --mode production --progress",
```

# webpack 拓展

#### 写一个 loader

```
myLoader.js

module.exports = function (source) {
    // source 传进来的代码

    /**
     * this 有几个常用的
     * this.query  通过 options 传过来的参数
     * this.callback  可以代替 return 返回
     * 
     * this.callback(
     *    err: Error | null,
     *    content: string | Buffer,
     *    sourceMap?: SourceMap,
     *    meta?: any
     * );
     *   第一个参数必须是 Error 或者 null
     *   第二个参数是一个 string 或者 Buffer。
     *   可选的：第三个参数必须是一个可以被这个模块解析的 source map。
     *   可选的：第四个选项，会被 webpack 忽略，可以是任何东西（例如一些元数据）。
     * 
     * 
     */

    const options = loaderUtils.getOptions(this)
    const reset = source.replace("", options.xx)
    this.callback(null, reset)
}

// 使用就像正常 loader 一样使用
```

#### 编写一个 plugin
```
class CoptyWebpackPlugin {
  constructor() {}

  apply(compiler) {
    compiler.hooks.emit.tapAsync('CoptyWebpackPlugin', (compilation, cb) => {
      compilation.assets['copty.js'] = {
        source() {
          return 'copty'
        },
        size() {
          return 5
        },
      }
      cb()
    })
  }
}

module.exports = CoptyWebpackPlugin
```
