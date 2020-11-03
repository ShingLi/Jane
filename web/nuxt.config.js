
const meta = require('./config/meta')
const projectConfig = require('./config/project')

export default {
    build: {
        analyze: true, // 编译的时候显示构建包的大小 // https://zh.nuxtjs.org/api/configuration-build/
    },
    buildDir: './dist',
    // ssr: false,
    css: [
        '~/assets/scss/common.scss'
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
    head: {
        title: process.env.npm_package_name || projectConfig.title,
        meta,
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },
    
    plugins: [
        '~/plugins/axios'
    ],
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {

    },
    loading: '~/components/loading', // 全局加载loading
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
    }
}
