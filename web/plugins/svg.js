/* licheng 自动引入项目中的assets/svg 目录下面所有的svg文件
-------------------------- */
const path = require('path')
// var requireContext = require('require-context')

// console.d(requireContext)
console.dir(require.context)
// const svgContext = require.context(path.join(process.cwd(), 'assets/svg'), true, /\.svg$/ig)

// console.log(svgContext)
