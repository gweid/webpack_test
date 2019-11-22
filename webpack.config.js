const path = require("path")
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')  // webpack4 之后使用这个在打包时移除 console.log
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // webpack4 以后的版本需要这样引入
// const Happypack = require('happypack')
const os = require('os')

// 获取 cpu 进程
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    context: path.join(__dirname, "./src"), // 资源入口的路径前缀，必须为绝对路径
    entry: "./index.js", // 入口
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
        path: path.join(__dirname, "dist"), // 出口路径，必须为绝对路径 webpack 4 之后，默认为 dist 目录
        // filename: "[name].js" // 类似模板语言方式动态生成文件名, 多入口时用到  例如上面多入口，会生成 index.js 和 content.js
        filename: "bundle.js", // 输出文件名
        // publicPath: "", // 指定资源的请求位置
        // publicPath: "/", // 表示此时 publicPath 是以当前页面的 host name 为基础路径
        // publicPath: "http://cdn/com/", // 可以配置 cdn
    },

    mode: "development", // mode 为 development时，webpack-dev-server 具备热重载功能
    // devtoll: 'none', // 在开发者模式下，默认开启 sourcemap, 将其关闭
    devtool: 'cheap-module-eval-source-map', //在开发环境推荐使用，提示比较全，打包速度比较快
    //devtool: 'cheap-module-source-map', // 在生产环境中推荐使用，提示效果会好一些
    devServer: {
        // public: 'http://localhost', // 指定域名，默认 http://localhost:8080
        // 建议将 devServer.publicPath 和 output.publicPath 的值保持一
        publicPath: "/dist/", // webpack-dev-server 监控路径 (启动 webpack-dev-server 服务，会把资源指向 localhost:3000/assets/，而 webpack 会默认在 dist 目录下，所以应该配置 publicPath 在 /dist/)
        // post: 3000, 监控端口

        // proxy: {
        //     "/api": {
        //         target: "http://localhost:3000", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
        //         // pathRewrite: {'^api': ''}, // 把 URL 中 path 部分的 `api` 移除掉
        //     }
        // }, // 配置代理

        hot: true, // 配合开启 HMR，这个必须开启
        // open: true, // 自动打开浏览器
    },

    module: {
        rules: [{
            test: '/\.css$/',
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true, // 开启 css-loader 的压缩功能压缩 css
                    }
                }
            ]
        }, {
            test: '/\.scss$/',
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2, // 如果sass文件里还引入了另外一个sass文件，另一个文件还会从postcss-loader向上解析。如果不加，就直接从css-loader开始解析
                        modules: true // 开启css的模块打包。css样式不会和其他模块发生耦合和冲突
                    }
                },
                'postcss-loader', // postcss-loader 配合 postcss.config.js 的 autoprefixer 加入 -webkit, -ms, -o, -moz 这些前缀
                'sass-loader'
            ]
        }, {
            test: '/\.(png|jpe?g|gif|webp)$/',
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192, //小于 8192k,就可以转化成 base64 格式,大于就会打包成文件格式
                    name: '[name].[ext]', // [name]_[hash].[ext] // 打包后的图片名字，后缀和打包的之前的图片一样
                    // outputPath: 'images/', // 输出到那个文件夹下
                }
            }, {
                loader: 'image-webpack-loader', // 图片压缩
                options: {
                    mozjpeg: { // 压缩 jpeg
                        progressive: true,
                        quality: 65
                    },
                    optipng: { // 使用 imagemin-optipn 压缩 png, enable: false 为关闭
                        enable: false
                    },
                    pngquant: { // 使用 imagemin-pngquant 压缩 png
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: { // 压缩 gif
                        interlaced: false,
                    },
                    // webp: { // 把 jpg 和 png 压缩为 webp 
                    //     quality: 75
                    // }
                }
            }]
        }, {
            test: '/\.js$/',
            exclude: /node_modules/, // node_modules 下的不用 babel-loader 转译
            use: 'babel-loader'
        }],
    },

    // 利用 happypack 多核提高构建速度
    plugins: [
        // new Happypack({
        //     id: "js",
        //     threadPool: happyThreadPool,
        //     loaders: []
        // }),

        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'src/index.html', // 以index.html为模板，把打包生成的js自动引入到这个html文件中
        //     minify: { // 压缩 HTML 的配置
        //         minifyCSS: true, // 压缩 HTML 中出现的 css 代码
        //         minifyJS: true // 压缩 HTML 中出现的 JS 代码
        //     },
        // }),

        // 定义全局常量
        new webpack.DefinePlugin({
            VERSION: '1.0.0'
        }),

        // HMR,模块热替换，能局部替换，节省性能
        new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件

        // 在打包之前，可以删除dist文件夹下的所有内容
        new CleanWebpackPlugin(),

        // 打包时去掉 console 打印、debugger 调试(webpack4 之后不能这样子用，4 以后移除了该方法, 用 minimize)
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_debugger: true,
        //         drop_console: true
        //     }
        // })
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin(), // uglifyjs-webpack-plugin 进行 js 压缩
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
        ]
    },

    // resolve.alias 配置文件别名，省去编写相对路径麻烦
    // resolve: {
    //     alias: {
    //         'foo': path.resolve(__dirname, './src/foo')
    //     }
    // },
}