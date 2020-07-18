const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
console.log(__dirname)
module.exports = {
    configureWebpack: config => {
        return {
            resolve: {
                alias: {
                    views: resolve('src/views'),
                    components: resolve('src/components'),
                    router: resolve('src/router'),
                    store: resolve('src/store'),
                    utils: resolve('src/utils')
                }
            }
        }
    }
}