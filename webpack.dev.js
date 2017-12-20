const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const proxyOptions = require('./proxy')

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
      include: path.resolve(__dirname, 'src')
    }]
  },
  plugins: [],
  // 增加source-map,容易找到报错所在地
  devtool: 'inline-source-map',
  // 设置本地服务器的根目录  webpack-dev-server --open  代码变动自动编译且没有生成dist
  devServer: {
    contentBase: './dist',
    // proxy:{
    //   // '/'表示请求的任意路径都会转向下面的域名 也就是  /\//.test(path)就转向下面的域名且后面路径不变
    //   '/':{
    //     target: 'http://test2.yiduyongche.com',
    //     changeOrigin: true,
    //     secure: true,
    //     // pathRewrite 是匹配转向的链接的路径 也就是  url.path.replace(key,value)
    //     pathRewrite: {'^/activity-lagou' : '/'}
    //   }
    // },
    proxy: proxyOptions
    // hot: true
  }
}
module.exports = merge(common, options)
