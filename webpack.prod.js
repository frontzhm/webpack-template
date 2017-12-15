const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')
// 分离css
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// 每次运行命令的时候 先清除dist的其他文件
const CleanWebpackPlugin = require('clean-webpack-plugin')
// treeShaking
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


var options = {
  module: {
    rules: [{
      // es5+的转化
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      include: path.resolve(__dirname, 'src')
      // 提取css
    },{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        // 没有塞进css文件的还是放到style标签
        fallback: "style-loader",
        use: [{ loader: 'css-loader', options: { importLoaders: 1 } },'postcss-loader'],
        // 这样css中引用背景图片的时候 ../img/i.png而不是默认的./img/i.png
        publicPath: '../'
      }),
      include: path.resolve(__dirname, 'src')
    }]
  },
  plugins: [
    // name就是chunk名,单入口可以定义,多入口可以这样的
    new ExtractTextPlugin('css/[name].css'),
    // treeshaking  压缩加减少代码
    new UglifyJSPlugin(),
    // 生产环境的全局变量 js中可以使用 process.env.NODE_ENV === 'production'
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}
module.exports = merge(common, options)
