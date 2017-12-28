const fs = require('fs')
const path = require('path')

// 默认每个项目的entry 是各自的pug文件名,且生成的js也是如此
// dist的目录机构是项目名划分文件夹
const getPugsName = dir => {
  dir = fs.readdirSync('src/hello-world')
  return dir.filter(item => path.extname(item) === '.pug')
    .map(item => path.basename(item,'.pug'))
}

const getEntry = (pugNames,projectName) => {
  let obj = {}
  pugNames.forEach(item => {
    obj[item] = path.resolve(__dirname, 'src', projectName, `${item}.js`)
  })
  return obj
}

// html插件必须在plugins里才行,这边只是生成参数
const getHtmlWebpackPluginsOptions = (pugNames,projectName) => {
  return pugNames.map(item => {
    return {
        template: path.resolve(__dirname, 'src', projectName, `${item}.pug`),
        filename: `${item}.html`,
        chunks: [item],
         // 增加favicon.ico
        favicon: path.resolve(__dirname, 'src', projectName, 'favicon.ico')
      }
  })
}

const allProjects = [
  // 0
  {
    projectName: 'hello-world'
  }

]
allProjects.forEach(item => {
  item.pugNames = getPugsName('src/' + item.projectName)
  item.entry = getEntry(item.pugNames,item.projectName)
  item.htmlWebpackPluginsOptions = getHtmlWebpackPluginsOptions(item.pugNames,item.projectName)

})
// console.log(allProjects)
// 编辑哪个项目,将索引改成相应的即可
module.exports = allProjects[0]
