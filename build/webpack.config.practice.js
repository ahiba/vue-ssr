const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
const HTMLPlugin = require('html-webpack-plugin')       //引入html-webpack-plugin
const webpack = require("webpack")                      //引入webpack
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const defaultPlugins = [
  new webpack.DefinePlugin({                      //主要作用是在此处可以根据isdev配置process.env,一是可以在js代码中可以获取到process.env,
    'process.env': {                             //二是webpack或则vue等根据process.env如果是development,会给一些特殊的错误提醒等,而这些特殊项在正式环境是不需要的
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })                                //引入HTMLPlugin
]
const devServer = {                                //这个devServer的配置是在webpack2.x以后引入的,1.x是没有的
  port: 8080,                                     //访问的端口号
  host: '127.0.0.1',                              //可以设置0.0.0.0 ,这样设置你可以通过127.0.0.1或则localhost去访问
  overlay: {
    errors: true,                               //编译中遇到的错误都会显示到网页中去
  },
  // open: true ,                                 //项目启动时,会默认帮你打开浏览器
  hot: true                                       //在单页面应用开发中,我们修改了代码后是整个页面都刷新,开启hot后,将只刷新对应的组件
}
let config
config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',    //官方推荐使用这个配置,作用是在浏览器中调试时,显示的代码和我们的项目中的代码会基本相似,而不会显示编译后的代码,以致于我们调试连自己都看不懂
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
            'vue-style-loader',                     //将css写入到html中去
            {
              loader: 'css-loader',
              options: {
                // module: true,
                localIdentName: '[path]-[name]-[hash:base64:5]',
              }
            },                      //css-loader处理css
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                }                               //那么postcss-loader可以直接引用前面的sourceMap
            },
            'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
        ]
      }
    ]
  },
  devServer,
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config                                 //声明一个config的配置,用于对外暴露
