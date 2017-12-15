const path = require('path')
// 这个插件会在 output.path下生成html文件 默认生成的文件名是index.html,默认自动引入output.filename
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    rules: [{
      // pug
      test: /\.pug$/,
      use: ['html-loader', {
        loader: 'pug-html-loader',
        options: {
          pretty: true,
          data: {
            name: 'lala'
          }
        }
      }],
      include: path.resolve(__dirname, 'src')
    }, {
      // 字体
      test: /\.(eot|svg|ttf|woff)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'font/'
          // 用于服务器
          // publicPath: '/'
        }
      },
      include: path.resolve(__dirname, 'src')
    }, {
      // 生成文件 file.png，输出到输出目录并返回 public URL
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          // name: '[path][hash][name].[ext]'
          name: '[name].[ext]',
          // 超过多少就不用base64
          limit: 9000,
          outputPath: 'img/'
          // publicPath: '/'
        }
      },
      include: path.resolve(__dirname, 'src')
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: 'src/math.html',
      filename: 'math.html',
      chunks: ['math']
    }),
  ],
}
module.exports = options
