class UploadAssetPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('upload-asset-plugin', (compilation, callback) => {
      
    })
  }
}

module.exports = UploadAssetPlugin
