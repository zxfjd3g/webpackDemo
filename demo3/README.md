# 开发/生产环境打包
## 1. 目标
    1). 2种环境不同的配置
    2). 开发环境: 实现live-reload, 开启sourceMap调试
    3). 生产环境: 单独打包css, 单独打包第三方JS包, 打包文件缓存处理
    
## 2. 下载依赖包
    npm install --save-dev clean-webpack-plugin   //清理文件插件
    npm install --save-dev extract-text-webpack-plugin  //抽取css单独打包插件
    npm install --save-dev webpack-dev-server  // webpack开发服务器
    npm install --save-dev webpack-merge  // 合并webpack配置
## 3. webpack配置
    1). 基础配置: build/webpack.base.conf.js
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
    2). 开发环境配置: build/webpack.dev.conf.js
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
    3). 生产环境配置: build/webpack.prod.conf.js
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

## 4. 打包运行命令配置
    "scripts": {
      "start": "webpack-dev-server --config build/webpack.dev.conf.js --open",
      "build": "webpack --config build/webpack.prod.conf.js",
      "server": "pushstate-server dist"
    }

## 5. 打包运行
    1). 开发运行
        npm start
        修改js/css, 直接查看效果
    2). 生产打包运行
        npm run build
        npm run server