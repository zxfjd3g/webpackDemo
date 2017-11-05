# 编译打包各种类型资源
## 1. 目标
    1). 利用webpack打包项目中的各种资源
        * JS(ES6)
        * CSS
        * 图片
        * JSON
    2). 加深对loader和plugin的理解
    
## 2. 下载依赖包
    1). jquery包
        npm install --save jquery@1.12
    2). babel相关包
        npm install --save-dev babel-core babel-loader babel-preset-env babel-plugin-transform-runtime
    3). 处理css文件的包
        npm install --save-dev css-loader style-loader
    4). 处理图片的包
        npm install --save-dev url-loader file-loader
    5). 处理HTML
        npm install --save-dev html-webpack-plugin
    
## 3. 编码
    1). 创建整体结构
        demo2
            |--src
                |--assets
                    |--css
                    |--img
                    |--json
                |--index.js
            |--index.html
            |--webpack.config.js
    2). index.html
        <h1>尚硅谷后期课程</h1>
        <div id="app"></div>   
    3). 添加图片: assets/img/atguigu.jpg
		![atguigu](https://i.imgur.com/UP73Jdt.jpg)
    4). 添加样式: assets/css/style.css
        body {
          padding: 20px;
          background: url("../img/atguigu.jpg");
          font-size: 20px;
        }
    5). 添加json: assets/json/lessons.json
        [
          {
            "name": "ES5/6/7",
            "days": 2
          },
          {
            "name": "JS高级",
            "days": 3
          },
          {
            "name": "JS模块化",
            "days": 1.5
          },
          {
            "name": "react及项目",
            "days": 8
          },
          {
            "name": "redux",
            "days": 1
          },
          {
            "name": "vue及项目",
            "days": 8
          },
          {
            "name": "vue源码分析",
            "days": 2
          },
          {
            "name": "vuex",
            "days": 1
          },
          {
            "name": "webpack模块化打包",
            "days": 2
          },
          {
            "name": "项目实战",
            "days": 7
          }
        ]
    6). 添加自定义JS模块: src/math.js
        export function square(x) {
          return x * x
        }
        export function cube(x) {
          return x * x * x
        }
    7). 实现入口js编码
        import $ from 'jquery'
        import {cube} from "./math"
        import lessons from './assets/json/lessons.json'
        import './assets/css/style.css'
        
        console.log(cube(3))
        
        $(function () {
          const $app = $('#app')
          const $ul = $('<ul>')
          $app.append($ul)
          lessons.forEach(lesson => {
            $ul.append(`<li>课程名: ${lesson.name}, 时间: ${lesson.days}天</li>`)
          })
        })
        
## 4. 配置
    1). babel配置: .babelrc
        {
          "presets": ["env"],
          "plugins": ["transform-runtime"]
        }  
    2). webpack配置: webpack.config.js
        var path = require('path')
        var HtmlPlugin = require('html-webpack-plugin')
        
        // 得到指定文件夹的绝对路径
        function resolve(dir) {
          return path.resolve(__dirname, dir)
        }
        
        module.exports = {
          // 入口
          entry: './src/index.js',
          // 出口
          output: {
            path: resolve('dist'),
            filename: 'bundle.js'
          },
          // 模块加载器
          module: {
            rules: [
              // 将src下所有js从es6编译为es5
              {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
              },
              // 加载css
              {
                test: /\.css$/,
                use: [
                  'style-loader', // 将js中的css动态插入到DOM中
                  'css-loader' // 将css加载到打包的js中
                ]
              },
              // 加载图片
              {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
              }
            ]
          },
          // 插件
          plugins: [
            // 根据模板生成html(自动引入js/css)
            new HtmlPlugin({
              filename: 'index.html', //生成文件
              template: 'index.html', //模板文件
              inject: true //自动注入js/css
            })
          ]
        };
    3). 添加打包命令配置: package.json
        "scripts": {
          "build": "webpack"
        },
        
## 5. 打包并运行项目
    npm run build
    npm install -g pushstate-server
    pushstate-server dist
    访问: http://localhost:9000
