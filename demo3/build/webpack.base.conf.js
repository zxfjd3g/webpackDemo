/*
基础配置
 */
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  // 入口
  entry: {
    app: './src/index.js'
  },
  // 出口
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  // 模块加载
  module: {
    rules: [
      // 处理js
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src')]
      },
      // 处理图片
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'static/img/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  // 插件
  plugins: [
    // 生成html
    new HtmlPlugin({
      template: 'index.html',
      filename: 'index.html', //目标文件夹是: dist
      inject: true
    })
  ]
}