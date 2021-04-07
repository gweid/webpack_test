const webpack = require('webpack')

const configFun = require('./webpack.config')

const webpackConfig = configFun(null, { mode: 'production' })

const compiler = webpack(webpackConfig, (err, res) => {
  if (err) {
    console.log(err)
  }
})