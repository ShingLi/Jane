/*  自动引入svg 文件
-------------------------- */
const context = require.context('../assets/svg', false, /\.svg$/)

function importAll (r) {
    r.keys().forEach(r)
}

importAll(context)
