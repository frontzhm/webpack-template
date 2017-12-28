const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const proxyOptions = require('./proxy')
const webpack = require('webpack')


const { projectName } = require('./project.config')

var options = {
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }, 'postcss-loader'],
      include: path.resolve(__dirname, 'src', projectName)
    }]
  },
  plugins: [
    // 热替换增加的地方2
    new webpack.HotModuleReplacementPlugin(),
    // 热替换增加的地方3 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
    new webpack.NamedModulesPlugin()
  ],
  // 增加source-map,容易找到报错所在地
  devtool: 'inline-source-map',
  // 设置本地服务器的根目录  webpack-dev-server --open  代码变动自动编译且没有生成dist
  // 默认文件在dist里 默认的publicPath是/
  devServer: {
    contentBase: './dist',
    // http://localhost:8080/projectName/index.html
    // publicPath: '/' + projectName + '/',
    // proxy:{
    //   // '/'表示请求的任意路径都会转向下面的域名 也就是  /\//.test(path)就转向下面的域名且后面路径不变
    //   '/':{
    //     target: 'http://test2.d.com',
    //     changeOrigin: true,
    //     secure: true,
    //     // pathRewrite 是匹配转向的链接的路径 也就是  url.path.replace(key,value)
    //     pathRewrite: {'^/activity-lagou' : '/'}
    //   }
    // },
    proxy: proxyOptions,
    // 热替换增加的地方1
    hot: true
  }
}
module.exports = merge(common, options)
