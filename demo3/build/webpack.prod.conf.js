/*
生产环境的配置
 */
const path = require('path')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base.conf')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseConfig, { // 合并配置
  // 出口
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].[chunkhash].js'
  },
  // 模块加载
  module: {
    rules: [
      // 加载css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ // 抽取css
          use: 'css-loader'
        })
      }
    ]
  },

  plugins: [
    // 清理dist文件夹
    new CleanPlugin(['dist'], {
      root: resolve('')
    }),
    // 抽取所有css到指定文件
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css'
    })
  ]
})