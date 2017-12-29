import './layer.css'
/**
 * 弹出层的类型:
 * 1. msg 简单的文字提示(包括加载层)
 * 2. 单个按钮的提示
 * 3. 两个按钮的提示
 *
 * 共同属性
 * 1.是否有遮罩
 * 2.点击遮罩能不能关闭弹出层
 * 3.标题
 * 4.内容
 * 5.弹出层的层数
 * 6.图标的加载
 * 7.自动关闭的时间
 */
var optionsDefault = {
  // 0表示msg 1表示1个按钮 2表示两个按钮
  type: 0,
  // 为空表示没有标题栏
  // 标题的css样式
  title: '',
  // 内容的样式
  content: '',
  // 按钮 数组或者单个字符串 默认第一项为确定 一个按钮的默认为确定事件
  btns: [],
  // 按钮点击的函数
  leftBtnFn: () => {},
  rightBtnFn: () => {},
  // 关闭按钮的显示
  // closeBtn: false,
  // 遮罩的显示
  shade: false,
  // 自动关闭的时间,设置为0表示不自动关闭
  autoClose: 2000,
  // 层成功弹出的回调函数
  show: () => {},
  // 层销毁的回调函数
  destroy: () => {}
}

let type1Options = {
    // 0表示msg 1表示1个按钮 2表示两个按钮
    type: 1,
    // 为空表示没有标题栏
    // 标题的css样式
    title: '',
    // 内容的样式
    content: '',
    // 按钮 数组或者单个字符串 默认第一项为确定 一个按钮的默认为确定事件
    btns: ['确定'],
    // 按钮点击的函数
    leftBtnFn: () => {layer.close()},
    rightBtnFn: () => {},
    // 关闭按钮的显示
    // closeBtn: false,
    // 遮罩的显示
    shade: true,
    // 自动关闭的时间,设置为0表示不自动关闭
    autoClose: 0,
    // 层成功弹出的回调函数
    show: () => {},
    // 层销毁的回调函数
    destroy: () => {}
}

let layerContainer = document.createElement('section')
layerContainer.id = 'z-layer'
const layer = {}
layer.open = (options = optionsDefault) => {
  options = Object.assign(optionsDefault,options)
  if(options.type === 0){
    layerContainer.innerHTML = `

    <div id="z-layer-mask">
      <main class="z-layer-box">
        <div class="z-layer-main">
          <p class="z-layer-content">${options.content}</p>
        </div>
      </main>
    </div>

  `
  }
  if(options.type === 1 || options.type === 2){
    // type不等于0就一定有按钮
    let title = options.title === '' ? '' : `<h3 class="z-layer-title">${options.title}</h3>`
    let leftBtn = document.createElement('a')
    leftBtn.className = 'z-layer-btn'
    leftBtn.href = 'javascript:;'
    leftBtn.innerHTML = options.btns[0]
    leftBtn.onclick = options.leftBtnFn
    leftBtn.onclick = () => {
      alert(0)
    }
    let rightBtn = ''
    if(options.btns.length===2){
      rightBtn = document.createElement('a')
      rightBtn.className = 'z-layer-btn'
      righttBtn.href = 'javascript:;'
      leftBtn.innerHTML = options.btns[1]
      rightBtn.onclick = options.rightBtnFn
    }
    let btns = leftBtn.outerHTML + rightBtn.outerHTML
    layerContainer.innerHTML = `
      <div id="z-layer-mask">
        <div class="z-layer-wrap">
          <main class="z-layer-box">
            <div class="z-layer-main">
              ${title}
              <p class="z-layer-content">${options.content}</p>
            </div>
            <div class="z-layer-btns-wrap"><a class="z-layer-btn">确定</a><a class="z-layer-btn">取消</a></div>
          </main>
        </div>
      </div>
    `

  }
  console.log(options)

  // let fragment = document.createDocumentFragment()
  // layerContainer.innerHTML = `

  //   <div id="z-layer-mask">
  //     <main class="z-layer-box">
  //       <div class="z-layer-main">
  //         <h3 class="z-layer-title">标题</h3>
  //         <p class="z-layer-content">你可能已经知道，webpack 用于编译 JavaScript 模块。一旦完成安装，你就可以通过 webpack 的 CLI 或 API 与其配合交互。如果你还不熟悉 webpack，请阅读核心概念和打包器对比，了解为什么你要使用 webpack，而不是社区中的其他工具。</p>
  //       </div>
  //       <div class="z-layer-btns-wrap"><a class="z-layer-btn">确定</a><a class="z-layer-btn">取消</a></div>
  //     </main>
  //   </div>

  // `
  document.body.appendChild(layerContainer)
  return layerContainer
}

layer.close = () => {
  layerContainer.parentNode.removeChild(layerContainer)
}
layer.open({type:2,content:'成功啦',leftBtnFn:()=>{console.log('left')},rightBtnFn:()=>{console.log('right')}})
// setTimeout(()=>{
//   layer.close()
// },1000)
