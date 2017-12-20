import './font/iconfont.css'
import './index.css'
import axios from 'axios'

console.log('index 啦啦自动刷新啦  啦啦啦')

var obj = {x:1,y:2,f:(x) => {
  console.log(x)
  return x+2
}}
var {x,y,f} = obj

console.log(f(x))

axios.get('/activity-lagou/get-lg-code.html?uid=263522')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

