const path = require('path')
const fs = require('fs-extra')

const resolve = dir => path.resolve(__dirname, dir)


const config = {
    configureWebpack: config => {
        return {
            resolve: {
                alias: {
                    views: resolve('src/views'),
                    components: resolve('src/components'),
                    router: resolve('src/router'),
                    store: resolve('src/store'),
                    utils: resolve('src/utils'),
                    config: resolve('src/config'),
                    plugins: resolve('src/plugins'),
                    assets: resolve('src/assets')
                }
            },
        }
    },
    chainWebpack: config => {
        
        config.module.rule('svg').exclude.add(resolve('src/assets/svg'))

        config
            .plugin('html')
                .tap(args => {
                    args[0].title = '一片云'
                    return args
                })
                .end()
            .module
                .rule('svg-loader')
                .test(/\.svg$/)
                .include
                .add(resolve('src/assets/svg'))
                .end()
                .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({
                    symbolId: 'icon-[name]'
                })
                .end()

                console.log(config.toString())
    },
    productionSourceMap: false, // 去掉生产sourcemap
}

module.exports = config
