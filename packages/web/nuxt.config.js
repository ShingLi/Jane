// licheng 
const fs = require('fs')
const path = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require("terser-webpack-plugin") // 压缩代码


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
                ],
                cacheDirectory: true, // babel 缓存，加快构建速度
            },
            cache: false, // Enable cache of terser-webpack-plugin and cache-loader， 这玩意开了速度变慢
            extend (config, ctx) {
                let { alias } = config.resolve
                alias = merge(alias, aliasObj)
                /* licheng 添加sourcemap (这里需要一个动态值)
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
            profile: true, // 显示编译时间
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
