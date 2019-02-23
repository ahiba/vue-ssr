module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // template模版中去除空格
    extractCSS: !isDev, // .vue文件中的css单独打包
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    },
    // hotReload: false // 根据环境变量生成
    // loaders: {
    // },
    // preLoader: {
    // },
    // postLoader: {
    // }
  }
}