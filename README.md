# webpack-template
webpack的小模板 用于简单的活动

## 记录下项目的流程

### 基础流程

* git clone ....

* npm init -y

* 添加 .editorconfig

```bash
# This file is for unifying the coding style for different editors and IDEs
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{txt,md}]
trim_trailing_whitespace = false

```

* eslint `npm install eslint --save-dev`  在package.json配置脚本`eslintinit: "eslint --init"`,运行npm run eslintinit,选择标准的

```js
module.exports = {
    "extends": "standard",
    // 需要浏览器的环境
    "env": {
      browser: true
    }
};
```

* 添加src/index.js,`console.log(0)`
* 添加dist/index.html,  `.....<script src="index.bundle.js"></script>..`
* webpack  `npm install webpack --save-dev` 在package.json配置脚本`webpack: "webpack"`
* 添加webpack.config.js,且运行`npm run webpack`

```js
const path = require('path')

var options = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    // 注意加引号
    filename: '[name].bundle.js',
    // 目录下的dist
    path: path.resolve(__dirname, 'dist')
  }
}
module.exports = options
```

## 使用es2015+的语法

安装`npm install babel-loader babel-core babel-preset-env --save-dev`
[文档](https://doc.webpack-china.org/loaders/babel-loader/)关于怎么优化的,不过暂时不考虑
增加`.babelrc`

```js
{
  "presets": ["env"]
}
```

webpack.config.js使用

```js
{
  test: /\.js$/,
    use: {
      loader: 'babel-loader'
    },
    include: path.resolve(__dirname, 'src')
}
```

## html文件的生成

添加`src/math.html,math.js,index.pug`

```pug
doctype html
html
  head
    meta(charset="UTF-8")
    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    meta(http-equiv="X-UA-Compatible" content="ie=edge")
    title test pug
  body
    h1 #{name}
```

### html-webpack-plugin

[html-webpack-plugin详解](https://www.cnblogs.com/wonyun/p/6030090.html)
[html-webpack-plugin用法全解](https://segmentfault.com/a/1190000007294861)
主要作用:

* 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
* 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生N个页面入口

常用到的配置项: template,chunks,filename,title
安装`npm i html-webpack-plugin --save-dev`
webpack.config.js的配置如下,`npm run webpack`会在dist文件夹生成`index.html`,且自动引入脚本`index.bundle.js`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks:['index']
    })
  ]
```

### 和pug的配合

[Webpack 3.x 尝试使用Pug(Jade)模板引擎](http://www.voidcn.com/article/p-qlcovkyd-bqz.html)
安装`npm i pug pug-html-loader html-loader --save-dev`

必须要 `html-loader`,`pretty: true`让生成的html是非压缩状态,`data:{name:'lala'}`可以传数据

```js
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
    filename: '[name].bundle.js',
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
    }]
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
    })
  ]
}
module.exports = options

```

运行`npm run webpack`之后,dist有`index.html,math.html`其中各自引用自己的js

## 添加css

想要在js引入其他资源是需要相应loader的
安装 `npm install --save-dev style-loader css-loader`
`css-loader`将css代码插入到js中,`style-loader`在页面插入style标签

```js
rule:[..,{
  test: /\.css$/,
  use: ['style-loader','css-loader'],
  include: path.resolve(__dirname, 'src')
}]
```

### 添加postcss

[大漠的系列教程](https://www.w3cplus.com/PostCSS/postcss-deep-dive-what-you-need-to-know.html)

postcss是一个用js插件转换css的工具,这些插件可以支持变量,mixins,转译未来的语法,行内图片等等.它是完全可以定制的，可配置的，可以说功能是无限的。

[postcss-cssnext 面向未来的CSS(css4)](https://github.com/jiayisheji/blog/issues/4)
[postcss的github](https://github.com/postcss/postcss)
安装常用的插件`postcss-loader autoprefixer postcss-cssnext postcss-import postcss-pxtorem precss`,`npm i 插件 --save-dev`
`postcss-import`在@import css文件的时候让webpack监听并编译,其他的字面意思
`precss`可以使用scss的语法,用这个可以不用`postcss-cssnext`

添加postcss.config.js

```js
module.exports = {
  // parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'autoprefixer': {},
    'postcss-cssnext': {},
    'precss': {},
    'postcss-pxtorem': {
        // rootValue: 16,
        rootValue: 750,
        // 小数点 0.00001rem
        unitPrecision: 5,
        propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'width', 'height'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0
    }
  },
}

```

配置webpack.config.js

```js
{
  test: /\.css$/,
  use: ['style-loader',{ loader: 'css-loader', options: { importLoaders: 1 } },'postcss-loader'],
  include: path.resolve(__dirname, 'src')
}
```

将index.css简单的改写成

```scss
$red:red;
body{
  color:$red;
  font-size: 30px;
}

```

### 分离css样式

安装插件`npm i extract-text-webpack-plugin --save-dev`
[官方文档](https://doc.webpack-china.org/plugins/extract-text-webpack-plugin)

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ]
```

可以增加`math.css`,并且在`math.js`引入

```js
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
```

运行`npm run webpack`,就会发现`index.html`和`math.html`有了各自的link

## 增加字体和图片资源

两个插件`file-loader`,`url-loader`,两者都是给资源url的,后者还能在将资源生产dataURL,也就是base64常用于图片

### 各大浏览器对font的支持

|Browser|@font-face|TrueType|WOFF|EOT|SVG|SVGZ|
|:----    |:---|:----- |-----   |-----   |-----   |-----   |
|ie|4+|	9+|	9+|	4+|	 | 	 |
|firefox|3.5+|	3.5+|	3.6+| | |	 |
|google|4+|	4+|	6+	| 	4+	| |6+|
|safari|3.1+	|3.1+|	6+	 	| |3.1+|	3.1+|
|opera|10+	|10+|	11.1+|	 	| 10+|	10+|

总结下,现代浏览器都支持TrueType和Woff

安装`npm i file-loader url-loader --save-dev`,在src里增加font文件夹和img文件夹,里面放上相应资源,然后在pug,js,css里引用
这两个插件会将在css,html,js中相应的资源转化成相应路径

[官方文档](https://doc.webpack-china.org/loaders/file-loader/)

```js
{
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

```

特别注意一点在css里引用图片路径可能会有问题,对此[解决方案,pspgbhu的回答](https://github.com/vuejs/vue-loader/issues/481)

```js
{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        // 没有塞进css文件的还是放到style标签
        fallback: "style-loader",
        use: [{ loader: 'css-loader', options: { importLoaders: 1 } },'postcss-loader'],
        // 这样css中引用背景图片的时候 ../img/i.png而不是默认的./img/i.png
        publicPath: '../'
      }),
      include: path.resolve(__dirname, 'src')
    }
```

## 每次生成dist前先清除

```js
// 每次运行命令的时候 先清除dist的其他文件
const CleanWebpackPlugin = require('clean-webpack-plugin')
// ...
plugins:[
  new CleanWebpackPlugin(['dist']),
  // ...
]
```

## 增加source-map

一般开发环境使用

```js
devtool: 'inline-source-map'
```

## 清除不必要的代码(tree-shaking)

一般发布环境使用,可以在压缩这边增加source-map,具体[参照官方文档](https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin)
安装`npm i --save-dev uglifyjs-webpack-plugin`

```js
plugins: [
  new UglifyJSPlugin()
]
```

## 本地服务器实现代码改动自动编译,并且能够实时重新加载(live reloading

webpack-dev-server为你提供了一个简单的 web 服务器，自动打开浏览器。且本地不生成dist文件夹.

* 一个本地的服务器，用于通过http协议来访问 html/js/css 等资源，实现前后端分离。
* 实现编译输出webpack打包后的文件，方便开发调试。
* hot reload实现热替换，可以不刷新更新修改内容。
* 可实现资源虚拟路径，修改源文件直接的相对关系。
* 可实现本地的 proxy，因为本地server都是起在127.0.0.1的，可通过配置解决开发时接口跨域问题。

```js
// 设置服务器的根目录
devServer: {
    contentBase: './dist'
}
```

```js
// 设置脚本
"start": "webpack-dev-server --open",
```

运行`npm start`之后,我改了`index.pug`和`index.css`,`index.js`,其重新编译且浏览器自动刷新了

## 模块热替换

[HMR](https://doc.webpack-china.org/guides/hot-module-replacement/) 不适用于生产环境，这意味着它应当只在开发环境使用
它允许在运行时更新各种模块，而无需进行完全刷新。(但是好像很多时候浏览器不显示改动的地方)

```js
devServer: {
    contentBase: './dist',
    hot: true
},
plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
],
```

运行命令之后,虽然重新编译了,页面也没有刷新,但是改动的地方也没显示...所以简单项目里就不想用热替换了,重新刷新就重新刷新呗.

## 
