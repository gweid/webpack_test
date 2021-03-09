# webpack 认知

#### 1、本质：

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle

#### 2、安装：

使用 webpack 目前需要安装 webpack、webpack-cli

- 执行 webpack 命令会执行 node_modules 下的.bin目录下的webpack
- webpack 的执行依赖于 webpack-cli，而webpack-cli中代码执行时，才是真正利用webpack进行编译和打包的过程

#### 3、npx 命令：

npx webpack：npx 的作用： 默认去node_modules/.bin路径和环境变量`$PATH`里面，检查命令是否存在

#### 4、webpack.config.js

执行 webpack 命令，会先看看有没有 webpack.config.js 文件，如果有，会合并这里分配置

可以通过命令改变，不使用 webpack.config.js

```js
"scripts": {
    "build": "webpack --config wp.config.js"
}
// 这样就会默认去合并 wp.config.js 下的配置
```

#### 5、基本打包原则

- 在 webpack 执行的时候，会根据命令或者配置文件找到入口文件
- 从入口文件开始，查找出每一个依赖，生成一个依赖图
- 然后遍历递归依赖图，根据文件不同，使用不同loader 处理文件，打包一个个模块
- 最后将结果输出（当然，中间打包的过程可以通过 plugin 控制整个生命周期）

#### 6、loader 和 plugin 差别

**loader：** loader 是在对模块进行转换的时候起作用

**plugin：** plugin 可以贯穿整个 webpack 的生命周期，执行更加广泛的任务，比如打包优化、资源管理等



# 基础功能

#### 1、基础出入口

```
entry: "./src/js/index.js", // 入口名

// 出口
output: {
    filename: "js/bundle.js", // 出口文件名
    path: path.resolve(__dirname, "dist") // 全局路径，这个必须是绝对路径
}
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

使用 file-loader 或者 url-loader



一般在项目中是使用 url-loader，因为 url-loader 可以将图片文件，转成 base64 的 URI，直接打包到 bundle.js 中

- 小的图片转换base64之后可以和页面一起被请求，减少不必要的请求过程
- 如果大的图片也进行转换，那么会导致 bundle.js 过大，反而会影响页面的请求速度

所以，对于是否转换需要一个阈值，一般只会将一些 icon 小图标转换为 base64



url-loader 使用的一些 placeholder（空间占位符）：

- [ext]： 原文件扩展名
- [name]：原文件名
- [hash]：文件的内容，使用MD4的散列函数处理，生成的一个128位的hash值（32个十六进制）
- [hash:<length>]：截图hash的长度，默认32个字符太长了

安装：

```js
npm i url-loader -D
```

使用：

```
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

在 webpack 中，是需要一个 html 模板的，这个 html 模板可以通过 html-webpack-pligin 自动生成，当然，也可以新建一个 index.html 模板，一般都这样做，因为可以通过 ejs 语法动态插值。而且，html-webpack-pligin 生成的 html 会自动引入 bundle.js。除此以外，还可以做一些优化 html 的工作，比如压缩一行等

html-webpack-pligin 是根据 .ejs 文件去生成的 html 模板

![](/imgs/img3.png)

安装：

```js
npm i html-webpack-plugin -D
```

使用：

```
const HtmlWebpackPlugin = require("html-webpack-plugin")

plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html", // 以什么为模板
    }),
]
```



除了这样，还可以通过一些参数去动态插值到 html 模板

> 注意，使用了 html-withimg-loader 后 <%= %> 这些语句不生效；注释掉 html-withimg-loader  后在入口 entry: ['./src/js/index.js', './src/index.html'], // 加 index.html 主要是 html 修改不会热替换  要删除 './src/index.html'

index.html

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>

<body>
    <div id="app"></div>
</body>

</html>
```

webpack.config.js

```js
new HtmlWebpackPlugin({
    title: 'gweid webpack',
    filename: 'index.html',
    template: './src/index.html', // 以什么为模板
}),
new DefinePlugin({
    BASE_URL: '"./"'
})
```

- <%= htmlWebpackPlugin.options.title %> 这个由 HtmlWebpackPlugin 中的 title 获得
- <%= BASE_URL %> 这个由 DefinePlugin 定义的全局常量获得



如果使用了 `<link rel="icon" href="<%= BASE_URL %>favicon.ico">`，需要将 ico 复制到 dist

安装：

```js
npm i copy-webpack-plugin@6.3.2 -D
```

> 注意，可能新版本 copy-webpack-plugin 有问题，所以安装 6.3.2 版本

使用：

在 patterns 中设置复制规则

- **from：**设置从哪一个源中开始复制
- **to：**复制到的位置，可以省略，会默认复制到打包的目录下
- **globOptions：**设置一些额外的选项，比如可以编写需要忽略的文件：

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')

new CopyWebpackPlugin({
    patterns: [
        {
            from: 'public',
            globOptions: {
                ignore: [
                    '**/index.html',
                    '**/.DS_Store' // mac 系统忽略这个
                ]
            }
        }
    ]
}),
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

使用 postcss-loader + autoprefixer

**认识 postcss：**

首先，postcss 本身是独立的，它可以在很多地方使用，并不局限于 webpack 中；但是它本身提供很少的功能，更多的功能依赖于插件，比如加浏览器前缀就是需要 autoprefixer 这个插件

而在 webpack 中使用 postcss，那么需要的就是 postcss-loader



- 在 postcss.config.js 中配置 autoprefixer；**但更多的是使用 postcss-preset-env**，因为 postcss-preset-env 除了本身内置了 autoprefixer 的功能，还可以帮助我们将一些现代的 css 特性，转成大多数浏览器认识的 css，并且会根据目标浏览器或者运行时环境添加所需的 polyfill； 很多框架的 cli 也是使用的 postcss-preset-env
- 在 package.json 中配置 browserslist，或者使用 .browserslistrc

  - Browserslist：是一个在不同的前端工具之间，共享目标浏览器和 Node.js 版本的配置，比如下面的都会依赖于 Browserslist
    - autoprefixer
    - babel
    - postcss-preset-env
    - ......
  - Browserslist 常用规则：
    - defaults：Browserslist的默认浏览器（> 0.5%, last 2 versions, Firefox ESR, not dead）
    - \> 5%：浏览器市场占有份额大于 5%
    - dead：24个月内没有官方支持或更新的浏览器，一般配置 not dead
    - last 2 versions：每个浏览器的最后2个版本，这个版本指的的大版本
  - Browserslist 怎么知道这些规则：
    - 在 node_modules/browserslist/index.js 下引入了 caniuse-lite 去判断

  - 查看浏览器市场占有率：https://www.caniuse.com/usage-table
- 在 webpack 中配置 postcss-loader

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

或者不单独使用 postcss.config.js 文件，直接在 webpack.config.js 中配置：

```js
{
    test: /\.css$/,
    use: [
        "style-loader", // 将 css 插入 head 标签
        "css-loader", // 将 css 以模块引入
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        require('autoprefixer')
                    ]
                }
            }
        }
    ]
}
```

**postcss-preset-env：**
安装：

```js
npm i postcss-preset-env -D
```

使用：

```js
{
    test: /\.css$/,
    use: [
        "style-loader", // 将 css 插入 head 标签
        "css-loader", // 将 css 以模块引入
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        require('postcss-preset-env')
                    ]
                }
            }
        }
    ]
}
```

**使用 @import "./test.css" 问题：**

当在 index.css 中通过 @import "./test.css" 引入 css，那么这个引入的 css 是不会被 postcss-loader 去处理的，因为 @import "./test.css" 属于 css 语法，不属于 js，直接被 css-loader 处理，那么需要配置一下 css-loader

- importLoaders 的值取决于 css-loader 之前还有几个 loader，如这里，之前只有一个 postcss-loader，那么值为 1

```js
{
    test: /\.css$/,
    use: [
        "style-loader", // 将 css 插入 head 标签
        {
            loader: "css-loader",
            options: {
                importLoaders: 1
            }
        }, // 将 css 以模块引入
        {
            loader: "postcss-loader",
            option,
            options: {
                importLoaders: 1
}s: {
                postcssOptions: {
                    plugins: [
                        require('postcss-preset-env')
                    ]
                }
            }
        }
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



# 优化体验和打包分析

#### 1、打包构建显示进度条

```
package.json 启动命令行加 --progress

"build": "webpack --mode production --progress",
```

#### 2、分析打包各个模块使用时间

安装：

```js
npm install speed-measure-webpack-plugin -D
```

使用：

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new SpeedMeasurePlugin()

const webpackConfig = (env, options) => {
    return {
        plugins: []
    }
}

module.exports = smp.wrap(webpackConfig)
```

#### 3、配置不同环境

在 webpack 中，可以使用 NODE_ENV=development 配置不同环境，但是直接使用 NODE_ENV 在不同平台（window、mac）有不同的使用方式，所以需要借助 cross-env 来抹平平台差异

安装：

```js
npm install cross-env -D
```

使用：

```js
"scripts": {
    "build": "cross-env NODE_ENV=production webpack"
}
```

取值：

```js
process.env.NODE_ENV
```

#### 4、分析打包大小

安装：

```js
npm install webpack-bundle-analyzer -D
```

使用：

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

plugins: [
    new BundleAnalyzerPlugin()
]
```



# webpack 拓展

### 1、一些实用的 plugins



### 2、自定义 loader 和 plugins

#### a、写一个 loader

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

#### b、编写一个 plugin

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



# webpack 打包原理

### 流程

-   首先，需要读到入口文件里的内容（也就是 index.js 的内容）
-   其次，分析入口文件，递归的去读取模块所依赖的文件内容，生成依赖图
-   最后，根据依赖图，生成浏览器能够运行的最终代码

![webpack 流程图](/imgs/img1.png)

#### 1、读取入口文件里的内容

使用 node.js 的 fs 模块读取内容

```
const fs = require('fs)

const getModuleInfo = file => {
    const body = fs(file, 'utf-8')

    // body 就是 ./src/index.js 中的内容
    console.log(body)
}

getModuleInfo('./src/index.js')
```

#### 2、分析模块内容

借助 babel 的 parser 进行模块分析，即将入口文件生成 ast

```
const fs = require('fs')
const parser = require('@babel/parser')

const getModuleInfo = file => {
    const body = fs(file, 'utf-8')

    const ast = parser.parse(body, {
        // 表示 es6 模块
        sourceType: 'module'
    })

    // 文件内容在 ast.program.body 里面
    console.log(ast.program.body)
}

getModuleInfo('./src/index.js')
```

#### 3、对得到的 ast 做处理，返回一份结构化的数据

利用 @babel/traverse 对 ast.program.body 部分数据处理

```
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default

const getModuleInfo = file => {
    const body = fs(file, 'utf-8')

    const ast = parser.parse(body, {
        // 表示 es6 模块
        sourceType: 'module'
    })

    // 用来收集自身模块引入的依赖
    const deps = {}

    // 使用 traverse 遍历 ast，对 ImportDeclaration 的节点做处理（ImportDeclaration 代表自身模块引入的依赖），实际上就是把相对路径转化为绝对路径，并加到 deps
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(file)
            const absPath = './' + path.join(dirname, node.source.value)
            deps[node.source.value] = absPath
        }
    })
}

getModuleInfo('./src/index.js')
```

#### 4、对 ast 做语法转换，把 es6 的语法转化为 es5 的语法，使用 babel 核心模块@babel/core 以及@babel/preset-env 完成

```
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const getModuleInfo = file => {
    const body = fs(file, 'utf-8')

    const ast = parser.parse(body, {
        // 表示 es6 模块
        sourceType: 'module'
    })

    // 用来收集自身模块引入的依赖
    const deps = {}

    // 使用 traverse 遍历 ast，对 ImportDeclaration 的节点做处理（ImportDeclaration 代表自身模块引入的依赖），实际上就是把相对路径转化为绝对路径，并加到 deps
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(file)
            const absPath = './' + path.join(dirname, node.source.value)
            deps[node.source.value] = absPath
        }
    })

    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })

    // 将代码信息转化为对象形式
    // {
    //     file: './src/index.js',
    //     deps: ['./xx.js', './src/xxa.js'],
    //     code: '...'
    // }
    const moduleInfo = { file, deps, code }

    return moduleInfo
}

getModuleInfo('./src/index.js')
```

#### 5、递归的获取所有模块的信息

这个过程，也就是获取依赖图(dependency graph)的过程，这个过程就是从入口模块开始，对每个模块以及模块的依赖模块都调用 getModuleInfo 方法就行分析，最终返回一个包含所有模块信息的对象

```
const parseModules = file => {
    // 定义依赖图
    const depsGraph = {}

    // 获取入口的信息
    const entry = getModuleInfo(file)

    const temp = [entry]

    for (let i = 0; i < temp.length; i++) {
        const item = temp[i]
        const deps = item.deps
        if (deps) {
            // 遍历模块的依赖，递归获取模块信息
            for (const key in deps) {
                if (deps.hasOwnProperty(key)) {
                    temp.push(getModuleInfo(deps[key]))
                }
            }
        }
    }

    temp.forEach(moduleInfo => {
        depsGraph[moduleInfo.file] = {
            deps: moduleInfo.deps,
            code: moduleInfo.code
        }
    })

    return depsGraph
}
parseModules('./src/index.js')
```

#### 6、生成浏览器可执行的代码，并写入 dist/bundle.js

```
// 生成浏览器可执行的代码
const bundle = file => {
    const depsGraph = JSON.stringify(parseModules(file))

    return `(function(graph){
        function require(file) {
            var exports = {};
            // 将相对路径转为绝对路径
            function absRequire(relPath){
                return require(graph[file].deps[relPath])
            }
            (function(require, exports, code){
                // 通过 eval 去执行代码
                eval(code)
            })(absRequire, exports, graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`
}


const build = file => {
    const content = bundle(file)

    // 写入到 dist/bundle.js
    fs.mkdirSync('./dist')
    fs.writeFileSync('./dist/bundle.js', content)
}

build('./src/index.js')
```

#### 7、最终代码

```
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const getModuleInfo = file => {
    const body = fs(file, 'utf-8')

    const ast = parser.parse(body, {
        // 表示 es6 模块
        sourceType: 'module'
    })

    // 用来收集自身模块引入的依赖
    const deps = {}

    // 使用 traverse 遍历 ast，对 ImportDeclaration 的节点做处理（ImportDeclaration 代表自身模块引入的依赖），实际上就是把相对路径转化为绝对路径，并加到 deps
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(file)
            const absPath = './' + path.join(dirname, node.source.value)
            deps[node.source.value] = absPath
        }
    })

    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })

    // 将代码信息转化为对象形式
    // {
    //     file: './src/index.js',
    //     deps: ['./xx.js', './src/xxa.js'],
    //     code: '...'
    // }
    const moduleInfo = { file, deps, code }

    return moduleInfo
}

const parseModules = file => {
    // 定义依赖图
    const depsGraph = {}

    // 获取入口的信息
    const entry = getModuleInfo(file)

    const temp = [entry]

    for (let i = 0; i < temp.length; i++) {
        const item = temp[i]
        const deps = item.deps
        if (deps) {
            // 遍历模块的依赖，递归获取模块信息
            for (const key in deps) {
                if (deps.hasOwnProperty(key)) {
                    temp.push(getModuleInfo(deps[key]))
                }
            }
        }
    }

    temp.forEach(moduleInfo => {
        depsGraph[moduleInfo.file] = {
            deps: moduleInfo.deps,
            code: moduleInfo.code
        }
    })

    return depsGraph
}

const bundle = file => {
    const depsGraph = JSON.stringify(parseModules(file))

    return `(function(graph){
        function require(file) {
            var exports = {};
            // 将相对路径转为绝对路径
            function absRequire(relPath){
                return require(graph[file].deps[relPath])
            }
            (function(require, exports, code){
                // 通过 eval 去执行代码
                eval(code)
            })(absRequire, exports, graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`
}


const build = file => {
    const content = bundle(file)

    // 写入到 dist/bundle.js
    fs.mkdirSync('./dist')
    fs.writeFileSync('./dist/bundle.js', content)
}

build('./src/index.js')
```



## 附录：

1. webpack 流程图

![webpack 完整流程图](/imgs/img2.jpg)

​       [webpack基本原理](https://blog.didiyun.com/index.php/2019/12/06/wepack-%e9%80%8f%e8%a7%86-%e6%8f%90%e9%ab%98%e5%b7%a5%e7%a8%8b%e5%8c%96%ef%bc%88%e5%ae%9e%e8%b7%b5%e7%af%87%ef%bc%89/)



2. [简单实现一个 webpack](https://juejin.cn/post/6854818576470933512)