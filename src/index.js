import './font/iconfont.css'
import './index.css'

console.log('index 啦啦自动刷新啦  啦啦啦')

var obj = {x:1,y:2,f:(x) => {
  console.log(x)
  return x+2
}}
var {x,y,f} = obj

console.log(f(x))

