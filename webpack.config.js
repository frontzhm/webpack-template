const path = require('path')
// 这个插件会在 output.path下生成html文件 默认生成的文件名是index.html,默认自动引入output.filename
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var options = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    math: path.resolve(__dirname, 'src/math.js')
  },
  output: {
    // 注意加引号
    filename: 'js/[name].bundle.js',
    // 目录下的dist
    path: path.resolve(__dirname, 'dist')
    // public
  },
  module: {
    rules:[{
      test: /\.pug$/,
      use: ['html-loader',{
        loader: 'pug-html-loader',
        options: {
          pretty: true,
          data: {name:'lala'}
        }
      }],
      include: path.resolve(__dirname, 'src')
    // },{
    //   test: /\.css$/,
    //   use: ['style-loader','css-loader'],
    //   include: path.resolve(__dirname, 'src')
    // },{
    //   test: /\.css$/,
    //   use: ['style-loader',{ loader: 'css-loader', options: { importLoaders: 1 } },'postcss-loader'],
    //   include: path.resolve(__dirname, 'src')
    // }
    },{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        // 没有塞进css文件的还是放到style标签
        fallback: "style-loader",
        use: [{ loader: 'css-loader', options: { importLoaders: 1 } },'postcss-loader'],
      }),
      include: path.resolve(__dirname, 'src')
    }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      filename: 'index.html',
      chunks:['index']
    }),
    new HtmlWebpackPlugin({
      template: 'src/math.html',
      filename: 'math.html',
      chunks:['math']
    }),
    // name就是chunk名,单入口可以定义,多入口可以这样的
    new ExtractTextPlugin('css/[name].css'),
  ]
}
module.exports = options
