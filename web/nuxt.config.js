// licheng 
const fs = require('fs')
const path = require('path')
const { merge } = require('webpack-merge')

// 业务模块
const globalHead = require('./config/head')
const projectConfig = require('./config/project')

const resolve = src => path.join(__dirname, src)
const whiteSpace = ['dist', 'node_modules', 'servermock', 'assets', 'static', 'components']

// 获取项目中的所有文件夹 unless( dist 和node_modules ）
const rootDir = fs.readdirSync(__dirname, {
    encoding: 'utf8',
    withFileTypes: true, // http://nodejs.cn/api/fs.html#fs_fs_readdirsync_path_options 返回Dirent对象
}).filter( dir=> {
    if (dir.isDirectory()) {
        if (!whiteSpace.includes(dir.name)) {
            return true
        }
    }
})

const aliasObj = rootDir.reduce((accumuator, item)=> {
    accumuator[item.name] = resolve(item.name)
    return accumuator
}, {})

export default {
    build: {
        analyze: false, // 编译的时候显示构建包的大小 // https://zh.nuxtjs.org/api/configuration-build/
        babel: {
            plugins: [
                [
                    'component',
                    {
                        libraryName: "element-ui",
                        styleLibraryName: "theme-chalk"
                    }
                ]
            ]
        },
        extend (config, ctx) {
            let { alias } = config.resolve
            alias = merge(alias, aliasObj)
            /* licheng 添加sourcemap (这里需要一个动态值)
            -------------------------- */
            if (ctx.isClient) {
                // config.devtool = 'source-map'
                
                const fileloader = config.module.rules.find(v => v.test.test('.svg'))
                fileloader.exclude = resolve('assets/svg')

                config.module.rules.push({
                    test: /\.svg$/i,
                    loaders: 'svg-sprite-loader',
                    include: resolve('assets/svg'),
                    options: {
                        symbolId: 'icon-[name]'
                    }
                })
            }
        },
        loaders: {
            imgUrl: {
                limit: 10000000, // 转成base64 直接打包到css里面
            }
        }
    },
    buildDir: './dist',
    // ssr: false,
    css: [
        'assets/scss/index'
    ],
    components: true, // 2.13+ // 自动注册组件 https://github.com/nuxt/components
    loading: 'components/Loading/loading.vue', // 全局加载loading
    router: {
        extendRoutes (routes, resolve) {
            for (let i = routes.length; i--;) {
                if (routes[i].path == '/') {
                    routes[i].path = '/index.html'
                } else {
                    routes[i].path = routes[i].path + '.html'
                }
            }
            for (let i = 0, length = projectConfig.customRoutes.length; i < length; i++) {
                routes.push(projectConfig.customRoutes[i])
            }
        }
    },
    target: 'server', // default server
    head: { // https://vue-meta.nuxtjs.org/api/#htmlattrs
        title: process.env.npm_package_name || projectConfig.title,
        ...globalHead
    },
    
    plugins: [
        'plugins/axios',
        'plugins/terminal',
        'plugins/elementui',
        {
            src: 'plugins/loadscript',
            mode: 'client'
        },
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
