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