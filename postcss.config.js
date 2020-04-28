  module.exports = {
      // autoprefixer 没用需要设置 browserslist
      plugins: [
          require('autoprefixer') // 浏览器的兼容性，有时候我们必须加入 -webkit, -ms, -o, -moz 这些前缀
      ]
  }