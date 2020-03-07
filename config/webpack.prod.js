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


// 去除无用样式(如果一些样式开发时没用到，那么这个打包的时候会自动去掉)
const glob = require('glob')
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')

// 动态引入 CDN
const htmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

let {
    smart
} = require("webpack-merge")
let base = require("./webpack.base")

module.exports = smart(base, {
    mode: "production",

    devtool: 'cheap-module-source-map', // 在生产环境中推荐使用，提示效果会好一些 (产生 sourcemap 文件, 可以看到错误)

    plugins: [
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

        // HMR,模块热替换，能局部替换，节省性能
        new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件

        // 在打包之前，可以删除dist文件夹下的所有内容
        new CleanWebpackPlugin(),

        // 打包时去掉 console 打印、debugger 调试( webpack4 之后不能这样子用，4 以后移除了该方法, 用 minimize )
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
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
})