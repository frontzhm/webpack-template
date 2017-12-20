const proxyOptions = {
  // '/'表示请求的任意路径都会转向下面的域名 也就是  /\//.test(path)就转向下面的域名且后面路径不变
  '/':{
    target: 'http://test.yourself.com',
    changeOrigin: true,
    secure: true,
    // pathRewrite 是匹配转向的链接的路径 也就是  url.path.replace(key,value)
    pathRewrite: {'^/api' : ''}
  }
}
module.exports = proxyOptions
