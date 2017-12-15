const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

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
    contentBase: './dist'
    // hot: true
  }
}
module.exports = merge(common, options)
