const path = require('path')
// 这个插件会在 output.path下生成html文件 默认生成的文件名是index.html,默认自动引入output.filename
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离css
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// 每次运行命令的时候 先清除dist的其他文件
const CleanWebpackPlugin = require('clean-webpack-plugin')
// treeShaking
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')


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
        // 这样css中引用背景图片的时候 ../img/i.png而不是默认的./img/i.png
        publicPath: '../'
      }),
      include: path.resolve(__dirname, 'src')
    },{
      test: /\.(eot|svg|ttf|woff)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath:'font/'
          // 用于服务器
          // publicPath: '/'
        }
      },
      include: path.resolve(__dirname, 'src')
    },{
      // 生成文件 file.png，输出到输出目录并返回 public URL
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          // name: '[path][hash][name].[ext]'
          name: '[name].[ext]',
          // 超过多少就不用base64
          limit: 5000,
          outputPath: 'img/'
          // publicPath: '/'
        }
      },
      include: path.resolve(__dirname, 'src')
    }
  ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
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
    // treeshaking
    new UglifyJSPlugin(),
    // 热替换增加的地方2
    new webpack.HotModuleReplacementPlugin(),
    // 热替换增加的地方3 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
    new webpack.NamedModulesPlugin()
  ],
  devtool: 'inline-source-map',
  // 设置本地服务器的根目录  webpack-dev-server --open  代码变动自动编译且没有生成dist
  devServer: {
    contentBase: './dist',
    // 热替换增加的地方1
    hot: true
  }
}
module.exports = options
