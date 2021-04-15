const { NodeSSH } = require('node-ssh')

class UploadAssetPlugin {
  constructor(options) {
    this.options = options

    this.ssh = new NodeSSH()
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('upload-asset-plugin', async (compilation, callback) => {
      console.log('准备上传资源到服务器...')

      // 获取到打包后的资源输出目录
      const outputPath = compilation.outputOptions.path

      // 创建 ssh 连接
      await this.connectSSH()

      // 删除服务器中原来的资源
      const serverDir = this.options.remotePath
      await this.ssh.execCommand(`rm -rf ${serverDir}/*`)

      // 通过 ssh 将打包后的资源上传到服务器
      await this.uploadAsset(outputPath, this.options.remotePath)

      // 关闭 ssh 连接
      this.ssh.dispose()
      
      // 异步一般需要 callback 返回
      callback()
    })
  }

  async connectSSH() {
    try {
      await this.ssh.connect({
        host: this.options.host, // 主机 host 地址
        username: this.options.username, // 用户名
        password: this.options.password // 密码
      })

      console.log('ssh 链接成功...')
    } catch (error) {
      console.log('ssh 连接失败！！！')
    }
  }

  async uploadAsset(outputPath, remotePath) {
    const status = await this.ssh.putDirectory(outputPath, remotePath, {
      recursive: true,
      concurrency: 10
    })

    console.log(`资源上传${status ? '成功' : '失败'}`)
  }
}

module.exports = UploadAssetPlugin
