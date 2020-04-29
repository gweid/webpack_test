console.log("hello.js 执行了11111");


function hello() {
    console.log("helle 哈哈哈哈哈哈");

}


export default hello

// webpack 中loader 推荐用 loader-utils 获取 options 传过来的参数
const loaderUtils = require('loader-utils')

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