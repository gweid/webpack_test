let {
    smart
} = require("webpack-merge")
let base = require("./webpack.base")

module.exports = smart(base, {
    mode: "development",
    
    devtool: 'cheap-module-eval-source-map', // 在开发环境推荐使用，提示比较全，打包速度比较快(不会产生 sourcemap 文件, 可以看到错误)
})