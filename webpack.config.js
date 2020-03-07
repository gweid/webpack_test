const os = require('os')
const path = require("path")
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离 css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin') // webpack4 之后使用这个在打包时移除 console.log
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin') // 打包显示进度条
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // webpack4 以后的版本需要这样引入

const HappyPack = require('happypack')
// 获取 cpu 进程
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});


// 去除无用样式(如果一些样式开发时没用到，那么这个打包的时候会自动去掉)
const glob = require('glob')
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')

// 动态引入 CDN
const htmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')


module.exports = {
    context: path.resolve(__dirname, "./src"), // 资源入口的路径前缀，必须为绝对路径

    entry: "./index.js", // 入口
    // babel-polyfill: 主要转换es6，es7 的 api，如 '123'.includes('1')
    // entry: ['babel-polyfill', './index.js'], // 数组型入口[传入数组的作用，将资源合并(将 babel-polyfill 在 index.js 中引入)，最后一个元素为入口路径]
    // entry: {
    //     index: ['babel-polyfill', './index.js'],
    //     content: "./src/addContent.js"
    // }, // 对象型入口[多用于定义多入口, key 是 chunk name, value 是入口路径]
    // entry: () => ({
    //     index: ['babel-polyfill', './index.js'],
    //     content: "./src/addContent.js"
    // }), // 函数类型入口[好处：可以进行一些动态操作]

    output: {
        path: path.resolve(__dirname, "dist"), // 出口路径，必须为绝对路径 webpack 4 之后，默认为 dist 目录
        // filename: "[name].js" // 类似模板语言方式动态生成文件名, 多入口时用到  例如上面多入口，会生成 index.js 和 content.js
        filename: "bundle.js", // 输出文件名
        // publicPath: "http://www.gweid.com/", // 指定资源的请求位置(如使用的线上资源)
        // publicPath: "/", // 表示此时 publicPath 是以当前页面的 host name 为基础路径
        // publicPath: "http://cdn/com/", // 可以配置 cdn
    },

    mode: "development", // mode 为 development 时，webpack-dev-server 具备热重载功能, 两种模式 production development

    // devtool 源码映射, 主要是报错时能指出哪里报错了
    // devtoll: 'none', // 在开发者模式下，默认开启 sourcemap, 将其关闭
    devtool: 'cheap-module-eval-source-map', // 在开发环境推荐使用，提示比较全，打包速度比较快(不会产生 sourcemap 文件, 可以看到错误)
    // devtool: 'cheap-module-source-map', // 在生产环境中推荐使用，提示效果会好一些 (产生 sourcemap 文件, 可以看到错误)

    devServer: {
        contentBase: "./dist", // 
        // public: 'http://localhost', // 指定域名，默认 http://localhost:8080
        // 建议将 devServer.publicPath 和 output.publicPath 的值保持一致
        // publicPath: "/dist/", // 从哪里加载资源
        // post: 3000, 监控端口
        progress: true, // 显示进度条
        // compress: true, // 开启 zip 压缩

        // proxy: {
        //     "/api": {
        //         target: "http://localhost:3000", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
        //         // pathRewrite: {'^api': ''}, // 把 URL 中 path 部分的 `api` 移除掉
        //     }
        // }, // 配置代理

        hot: true, // 配合开启 HMR, 这个必须开启
        open: true, // 自动打开浏览器
    },

    stats: {
        children: false
    },

    // watch 作用主要是实时打包
    // watch: true, // 监控代码变化实时打包
    // watchOptions: { // 监控的选项
    //     poll: 1000, // 每秒监控 1000 次
    //     aggregateTimeout: 1000, // 防抖，1000 毫秒内输入只打包一次
    //     ignored: /node_modules/
    // },

    module: {
        rules: [{
                test: /\.(html|htm)$/i,
                loader: 'html-withimg-loader' // 主要将 html 中使用 img 标签引入的图片使用动态路径 <img src="./aa.jpg"> 
            },
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', // 把 css 插入到 head 标签中
                    MiniCssExtractPlugin.loader, // 抽离 css
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader, // 抽离 css
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, // 如果 sass 文件里还引入了另外一个 sass 文件，另一个文件还会从 postcss-loader 向上解析。如果不加，就直接从 css-loader 开始解析
                            modules: true, // 开启 css 的模块打包。css样式不会和其他模块发生耦合和冲突
                        }
                    },
                    'postcss-loader', // postcss-loader 配合 postcss.config.js 的 autoprefixer 加入 -webkit, -ms, -o, -moz 这些前缀
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192, //小于 8192 字节, 就可以转化成 base64 格式, 大于就会打包成文件格式
                        esModule: false, // 该配置项为图片打包后的默认路径，带 default 对象, 将其改为 false 才能使用 html-withimg-loader
                        name: '[name]_[hash:8].[ext]', // [name]_[hash].[ext] // 打包后的图片名字，后缀和打包的之前的图片一样 [hash:8]: 加 hash 串, 八位
                        outputPath: 'imgs/', // 输出到 dist 那个文件夹下
                        // publicPath: "http://www.gweid.com/", // 单独对图片使用静态资源服务器, 或者 cdn 等
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // node_modules 下的不用 babel-loader 转译
                // use: 'babel-loader', 
                use: 'happypack/loader?id=js' // happypack 多核优化
            }
        ],
    },

    plugins: [
        // 利用 happypack 多核提高构建速度
        new HappyPack({
            id: "js",
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'], // 这样才能将 es6 转 es5
                    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'] // es7 转换
                }
            }]
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html', // 以 index.html 为模板，把打包生成的 js 自动引入到这个 html 文件中, 默认就是读取 src 下的，加 ./src/ 会报错
            // minify: { // 压缩 HTML 的配置
            //     minifyCSS: true, // 压缩 HTML 中出现的 css 代码
            //     minifyJS: true, // 压缩 HTML 中出现的 JS 代码
            //     removeComments: true, // 是否去掉注释
            //     collapseWhitespace: true, // 折叠成一行
            // },
            hash: true, // 加 hash 解决缓存问题
        }),

        // 定义全局常量
        new webpack.DefinePlugin({
            VERSION: '1.0.0',
            ENV: JSON.stringify(process.env.NODE_ENV)
        }),

        // HMR,模块热替换，能局部替换，节省性能
        new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件

        // 在打包之前，可以删除dist文件夹下的所有内容
        new CleanWebpackPlugin(),

        // 打包时去掉 console 打印、debugger 调试( webpack4 之后不能这样子用，4 以后移除了该方法, 用 minimize )
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_debugger: true,
        //         drop_console: true
        //     }
        // }),

        // 抽离 css 注意
        new MiniCssExtractPlugin({
            filename: 'css/index.css', // 分离到 dist/css/
        }),

        // 打包显示进度条
        new ProgressBarWebpackPlugin(),

        // 去除无用样式
        // new PurgecssWebpackPlugin({
        //     // glob: 同步查找 src 目录下的任意文件夹下的任意文件,返回一个数组，如['真实路径 /src/css/style.css','真实路径 /src/index.js',...]
        //     // paths 表示指定要去解析的文件名数组路径
        //     // Purgecss 会去解析这些文件然后把无用的样式移除
        //     paths: glob.sync("./src/**/*", {
        //         nodir: true
        //     })
        // }),

        // 动态引入 CDN
        // new htmlWebpackExternalsPlugin({
        //     externals: [{
        //         module: 'vue',
        //         entry: "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
        //         global: 'Vue'
        //     }]
        // })
    ],

    // 优化项(这些配置需要在环境是 production 中才生效)
    optimization: {
        minimizer: [
            // uglifyjs-webpack-plugin 进行 js 压缩
            new UglifyJsPlugin({
                cache: true, // 开启缓存
                parallel: true, // 开启多核编译
            }),
            // 打包时去除 console
            new TerserPlugin({
                minify: (file, sourceMap) => {
                    // https://github.com/mishoo/UglifyJS2#minify-options
                    const uglifyJsOptions = {
                        /* your `uglify-js` package options */
                        compress: {
                            drop_console: true
                        }
                    };

                    if (sourceMap) {
                        uglifyJsOptions.sourceMap = {
                            content: sourceMap,
                        };
                    }

                    return require('uglify-js').minify(file, uglifyJsOptions);
                },
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },

    // resolve.alias 配置文件别名，省去编写相对路径麻烦
    resolve: {
        alias: {
            'imgs': path.resolve(__dirname, './src/imgs')
        }
    },
}