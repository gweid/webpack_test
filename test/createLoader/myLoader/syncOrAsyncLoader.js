module.exports = function(content, sourcemap, meta) {
  //------------------------ 同步 loader
  // return content

  // 通常需要返回错误的情况下使用 this.callback 返回
  // 参数1：错误信息，没有就 null
  // 参数2：content
  // 参数3：sourcemap
  // 参数4：meta
  // console.log('同步 loader')
  // this.callback(null, content, sourcemap, meta)

  //------------------------ 异步 loader
  console.log('开始了')

  const callback = this.async()

  setTimeout(() =>{
    console.log('异步 loader')
    callback(null, content)
  }, 2000)
}
