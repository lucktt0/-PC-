const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭 eslint
  // lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      // 发送请求时，路径中出现/api，则启用代理服务器，找真实服务器请求数据
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
