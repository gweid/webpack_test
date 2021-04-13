const { transform } = require('@babel/core')
const { getOptions } = require('loader-utils')

module.exports = function(content) {
  const callback = this.async()

  const options = getOptions(this)

  transform(content, options, (err, res) => {
    // 在回调里面返回，必须使用异步 loader
    if(err) {
      callback(err)
    } else {
      callback(null, res.code)
    }
  })
}