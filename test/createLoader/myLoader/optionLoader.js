const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils');

const schema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "请输入name"
    },
    "needLog": {
      "type": "boolean",
      "description": "请输入needLog"
    }
  }
}

module.exports = function (content) {
  // 获取参数
  const options = getOptions(this)

  // 参数检验
  validate(schema, options, 'optionLoader')

  return content
}