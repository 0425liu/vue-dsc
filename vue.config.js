// vue.config.js 配置说明
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        scss: "@/assets/scss",
        images: "@/images"
      }
    }
  },
  css: {
    sourceMap: true // css预设器配置项
  }
};