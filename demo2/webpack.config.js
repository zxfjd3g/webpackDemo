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