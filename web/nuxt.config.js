// licheng 
const fs = require('fs')
const path = require('path')
const { merge } = require('webpack-merge')

// 业务模块
const globalHead = require('./config/head')
const projectConfig = require('./config/project')

const resolve = src => path.join(__dirname, src)
const whiteSpce = ['dist', 'node_modules', 'servermock', 'assets', 'static']

// 获取项目中的所有文件夹 unless( dist 和node_modules 
const rootDir = fs.readdirSync(__dirname, {
    encoding: 'utf8',
    withFileTypes: true, // http://nodejs.cn/api/fs.html#fs_fs_readdirsync_path_options 返回Dirent对象
}).filter( dir=> {
    if (dir.isDirectory()) {
        if (!whiteSpce.includes(dir.name)) {
            return true
        }
    }
})
console.log(rootDir)
const aliasObj = rootDir.reduce((accumuator, item)=> {
    accumuator[item.name] = resolve(item.name)
    return accumuator
}, {})

export default {
    build: {
        analyze: false, // 编译的时候显示构建包的大小 // https://zh.nuxtjs.org/api/configuration-build/
        extend (config, ctx) {
            let { alias } = config.resolve
            alias = merge(alias, aliasObj)
        }
    },
    buildDir: './dist',
    // ssr: false,
    css: [
        'assets/scss/common.scss'
    ],
    components: true, // 2.13+ // 自动注册组件 https://github.com/nuxt/components
    router: {
        extendRoutes (routes, resolve) {
            for (let i = routes.length; i--;) {
                if (routes[i].path == '/') {
                    routes[i].path = '/index.html'
                } else {
                    routes[i].path = routes[i].path + '.html'
                }
            }
            routes.push({
                path: '/',
                redirect: {
                    path: '/index.html'
                }
            })
        }
    },
    target: 'server', // default server
    head: { // https://vue-meta.nuxtjs.org/api/#htmlattrs
        title: process.env.npm_package_name || projectConfig.title,
        ...globalHead
    },
    
    plugins: [
        'plugins/axios',
        'plugins/terminal'
    ],
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {
        validateStatus: function (status) {
            return status >= 200 && status <= 401 // 如果接口有问题 我会塞一个401
        }
    },
    loading: 'components/loading', // 全局加载loading
    // 运行时配置 https://zh.nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/
    publicRuntimeConfig: {
        baseURL: process.env.baseURL
    },
    privateRuntimeConfig: {
        baseURL: '${PUBLIC_URL}${BASE_URL}'
    },
    server: {
        port: '7000',
        timing: {
            total: true, // 是否开始服务端渲染计时
        }
    },
    serverMiddleware: [
        '~servermock/server'
    ],
    vue: {
        config: {
            productionTip: false
        }
    }
}
