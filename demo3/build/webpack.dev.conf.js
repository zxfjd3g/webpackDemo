/*
开发环境的配置
 */
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
  // 模块加载器
  module: {
    rules: [
      // 加载css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // 开启sourceMap调试
  devtool: 'cheap-module-eval-source-map',
})