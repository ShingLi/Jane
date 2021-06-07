// licheng 
const fs = require('fs')
const path = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require("terser-webpack-plugin") // 压缩代码

import BASE_URL from './config/env'


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

export default function (configContext) {
    console.log('configContext', configContext)
    return {
        alias: {
            // 之前没有别名选项，后续nuxt升级增加该配置
            config: resolve('config')
        },
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
                    ],
                    '@babel/plugin-proposal-optional-chaining', // 可选链
                    '@babel/plugin-proposal-nullish-coalescing-operator'
                ],
                cacheDirectory: true, // babel 缓存，加快构建速度
            },
            cache: false, // Enable cache of terser-webpack-plugin and cache-loader， 这玩意开了速度变慢
            extend (config, ctx) {
                let { alias } = config.resolve
                alias = merge(alias, aliasObj)
                /* 添加sourcemap (这里需要一个动态值)
                -------------------------- */
                if (ctx.isClient) {
                    config.devtool = 'none'
                    
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
                    // console.log(config.module.rules)
                }
                config.module.unknownContextCritical = true
            },
            loaders: {
                imgUrl: {
                    limit: 10000000, // 转成base64 直接打包到css里面
                },
                vue: {
                    prettify: false, // https://vue-loader.vuejs.org/zh/options.html#prettify
                }
            },
            optimization: {
                minimize: true,
                minimizer: [
                    // https://webpack.docschina.org/configuration/optimization/#optimizationminimize
                    // 2021.3.6 这玩意会导致开发环境编译过慢
                    // new TerserPlugin(
                    //     {
                    //         cache: true,
                    //         parallel: true,
                    //         sourceMap: false, // 如果在生产环境中使用 source-maps，必须设置为 true
                    //     }
                    // ),
                ],
                splitChunks: {
                    // https://zh.nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#optimization
                    chunks: 'all',
                    automaticNameDelimiter: '.',
                    name: undefined,
                    cacheGroups: {}
                }
            },
            parallel: true, // 多线程编译，加快编译速度
            profile: false, // 显示编译时间
        },
        buildDir: './dist',
        // ssr: false,
        css: [
            'assets/scss/index'
        ],
        components: true, // 2.13+ // 自动注册组件 https://github.com/nuxt/components
        env: {
            NODE_ENV: process.env.NODE_ENV, // 为什么这里又要赋值一遍？ 不是在package.json 里面用cross-env 设置了吗？不设置有的地方取得变量不正确
        },
        loading: 'components/Load/Load.vue', // 全局加载loading
        router: {
            extendRoutes (routes, resolve) {
                
                for (let i = routes.length; i--;) {
                    
                    if (routes[i].path == '/') {
                        routes[i].path = '/index.html'
                    } else {

                        routes[i].path = routes[i].path + '.html'

                        // 修改子路由路径，避免出现 /xx.html/jane.html
                        // 2021、06、01 文章页不用子路由，改为动态路由，子路由 seo 爬虫抓不到
                        if (routes[i].children) {
                            
                            for (let v of routes[i].children) {
                                if (v.path.includes(':id?')) {
                                    // 强制路由是必选路由 https://www.nuxtjs.cn/guide/routing
                                    v.path = `/${routes[i].name}/:id.html`
                                } else {
                                    v.path = `/${routes[i].name}/${v.path}.html`
                                }
                            }
                        }
                    }
                }

                console.info(JSON.stringify(routes, null, '  '))

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
            'plugins/svg',
            'plugins/loadscript.client'
        ],
        render: {
            crossorigin: 'anonymous', // 跨域
        },
        // buildModules: [
        //     // Doc: https://github.com/nuxt-community/eslint-module
        //         eslint-module 这玩意太坑了，导致编译速度是在是太慢了
        
        //     [
        //         '@nuxtjs/eslint-module',
        //         {
        //             fix: true, // 修复eslint 报错
        //             exclude: [
        //                 'node_modules',
        //                 'assets',
        //                 'dist',
        //                 'static',
        //                 'servermock'
        //             ]
        //         }
        //     ]
        // ],
        modules: [
            '@nuxtjs/axios'
        ],
        axios: {
            validateStatus: function (status) {
                return status >= 200 && status <= 401 // 如果接口有问题 我会塞一个401
            },
            // baseURL 在 plugins/axios 设置
            baseURL: BASE_URL,
        },
        // 运行时配置 https://zh.nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/
        // 从$config 里面获取
        // publicRuntimeConfig: {
        //     baseURL: process.env.BASE_URL
        // },
        // privateRuntimeConfig: {
        //     baseURL: '${PUBLIC_URL}${BASE_URL}'
        // },
        server: {
            port: '7000',
            timing: {
                total: true, // 是否开始服务端渲染计时
            }
        },
        serverMiddleware: [
            '~servermock/server'
        ],
        pageTransition: {
            name: 'side',
            mode: 'out-in'
        },
        vue: {
            config: {
                productionTip: false
            }
        }
    }
}
