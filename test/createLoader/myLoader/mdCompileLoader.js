const marked = require('marked')
const hljs = require('highlight.js')

module.exports = function(content) {

  // 这样主要是利用 highlight 给标签设置上 class 类，后面就可以通过 class 类写 css
  marked.setOptions({
    highlight: (code, lang) => {
      return hljs.highlight(lang, code).value;
    }
  })

  // 使用 marked 将 md 代码转换为 html
  const htmlContent = marked(content)

  // 将 html 壮观为 模板字符串，因为 loader 必须返回 string 或者 buffer
  const strContent = "`" + htmlContent + "`"

  // 为了在 index.js 中可以通过 import code from './doc/webpack.md' 的形式引入
  const resContent = `var code = ${strContent}; export default code;`

  return resContent
}