import './layer.css'
/**
 * 弹出层的类型:
 * 1. toastOptions 简单的文字提示(包括加载层)
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
const body = document.body
const root = document.documentElement

let modalOptions = {
  // 标题样式
  title: '',
  // 内容的样式
  content: '',
  // 按钮 数组或者单个字符串 默认第一项为确定 一个按钮的默认为确定事件
  // 默认取消在左边,确定在右边
  btns: ['取消', '确定'],
  // 按钮点击的函数
  clickLeftBtn: () => {
    hideModal()
  },
  clickRightBtn: () => {
    hideModal()
  },
  // 遮罩的显示
  // shade: true,
  canClickShadeCloseModal: true,
  // 自动关闭的时间,设置为0表示不自动关闭
  autoClose: 0,
  // 层成功弹出的回调函数
  // show: () => {},
  // 层销毁的回调函数
  // destroy: () => {}
}

function showModal(options) {
  // opt = {...modalOpt, ...opt}
  options = Object.assign(modalOptions, options)
  const hasTwoBtns = options.btns.length === 2
  const hasTitle = options.title !== ''
  /**
   * 按钮
   */
  let btnOpts = {
    class: 'z-layer-btn',
    href: 'javascript:;'
  }
  let leftBtn = createElement('a', Object.assign(btnOpts, {
    innerHTML: options.btns[0],
    onclick: options.clickLeftBtn
  }))
  let btnWrap = createElement('div', {
    class: 'z-layer-btns-wrap'
  })
  btnWrap.appendChild(leftBtn)
  if (hasTwoBtns) {
    let rightBtn = createElement('a', Object.assign(btnOpts, {
      innerHTML: options.btns[1],
      onclick: options.clickRightBtn
    }))
    btnWrap.appendChild(rightBtn)
  }
  // 内容
  let content = createElement('p', {
    class: 'z-layer-content',
    innerHTML: options.content
  })
  // main主要是标题和内容区
  let titleAndCntWrap = createElement('div', {
    class: 'z-layer-main'
  })
  if (hasTitle) {
    let title = createElement('h3', {
      class: 'z-layer-title',
      innerHTML: options.title
    })
    titleAndCntWrap.appendChild(title)
  }
  titleAndCntWrap.appendChild(content)
  // box是main和按钮区
  let box = createElement('main', {
    class: 'z-layer-box'
  })
  box.appendChild(titleAndCntWrap)
  box.appendChild(btnWrap)
  // wrap包含box,宽高为整屏幕
  let mask = createElement('div', {
    class: 'z-layer-mask'
  })
  mask.appendChild(box)
  // section就是整个layer
  let layerSection = createElement('section', {
    class: 'z-layer'
  })
  layerSection.appendChild(mask)
  forbidScroll()
  body.appendChild(layerSection)

  options.show && options.show()
  return layerSection
}

function hideModal(callback) {
  body.remove(document.querySelector('.z-layer'))
  callback && callback()
  canScroll()
}
// showModal({title:'标题',content:'你确定要修改么'})
// showModal({title:'标题2',content:'你确定要修改么',clickLeftBtn:()=>{console.log('取消')}})
function createElement(elementName, attr) {
  let element = document.createElement(elementName)
  for (let key in attr) {
    if (attr.hasOwnProperty(key)) {
      key === 'class' && (element['className'] = attr[key])
      element[key] = attr[key]
    }
  }
  return element
}
function forbidScroll(){
  root.className += ' noscroll'
}
function canScroll(){
  root.className = root.className.replace(' noscroll','')
}

// let toastOptions = {
//   content: '',
//   icon: '',
//   duration: 2000,
// }
// const successIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAOVBMVEUAAAD///////////////////////////////////////////////////////////////////////8KOjVvAAAAEnRSTlMAEPDQoDDPYLCQIN/An4BwUEAtwvFNAAAAiElEQVQ4y9WQSwrDMAwFn/y3m/Sj+x+2aqEkMs3bhszGoBmMEC6PdKE+3zQxf1eNQr5fuM+B+6rcd+5lNR+ILx+f/Wz2WqeLNNmtb3S/ss1K3vsIR1Qj1M2HAYdYYawCCeoWmIqSy/dtwEFhHF1A2hY88Jf08wvAixd4kQBeDPAiAbwY4DxxAm+JAQldhppBqgAAAABJRU5ErkJggg=='
const loadingIcon = 'http://omizt4opc.bkt.clouddn.com/loading200.gif'

function showToast(toastOptions) {
  const toastOptionsIsObj = (typeof toastOptions) === 'object'
  let duration = 2000
  const hasIcon = toastOptionsIsObj && 'icon' in toastOptions
  let contentString
  if (toastOptionsIsObj) {
    contentString = toastOptions.content
    const hasNewDuration = 'duration' in toastOptions
    duration = hasNewDuration && toastOptions.duration
  } else {
    const hasNewDuration = arguments.length === 2
    duration = arguments[1]
    contentString = toastOptions
  }
  let box = createElement('div', {
    class: 'z-toast-box'
  })
  // if(content!==''){
  let content = createElement('p', {
    class: 'z-toast-content',
    innerHTML: contentString
  })
  box.appendChild(content)
  // }
  if (hasIcon) {
    box.className += ' has-icon'
    let img = createElement('img', {
      class: 'z-toast-icon',
      src: toastOptions.icon
    })
    box.insertBefore(img, content)
    // box.appendChild(img)
  }
  let mask = createElement('div', {
    class: 'z-toast-mask'
  })
  mask.appendChild(box)
  // section就是整个layer
  let layerSection = createElement('section', {
    class: 'z-toast'
  })
  layerSection.appendChild(mask)
  document.body.appendChild(layerSection)
  console.log(duration)
  forbidScroll()
  // duration !== 0  && setTimeout(hideToast, duration)
}

function hideToast(callback) {
  body.remove(document.querySelector('.z-toast'))
  callback && callback()
  canScroll()
}
// showToast('修改成功!',9000)
function showLoading() {
  showToast({
    content: '',
    duration: 0,
    icon: loadingIcon
  })
}
function hideLoading(){
  hideToast()
}
// showLoading()
// setTimeout(hideLoading, 3000)
// alert(0)
export {
  showModal,
  hideModal,
  showToast,
  hideToast,
  showLoading,
  hideLoading
}
